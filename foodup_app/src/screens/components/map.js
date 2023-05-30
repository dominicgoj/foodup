import React, { useState, useEffect, useContext } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import RestaurantMapPoint from '../components/restaurantMapPoint';
import AuthContext from '../../utilities/authcontext';
import fetchRestaurantDataBasedOnGPS from '../../api/fetchRestaurantDataBasedOnGPS';
import MapView from 'react-native-map-clustering';

export default function Map({ route }) {
  

  const [restaurantData, setRestaurantData] = useState([]);
  const [latitudeDelta, setLatitudeDelta] = useState(0.1);
  const [longitudeDelta, setLongitudeDelta] = useState(0.1);
  const { globalUserLocation } = useContext(AuthContext);
  const [mapRegion, setMapRegion] = useState({
    latitude: globalUserLocation?.latitude,
    longitude: globalUserLocation?.longitude,
    latitudeDelta: 0.11,
    longitudeDelta: 0.11,
  });
  
  const RenderRestaurantMapPoints = () => {
    const delay = 1000;
    if (restaurantData.length > 0) {
      return restaurantData.map((restaurant) => (
        <RestaurantMapPoint
          key={restaurant.id}
          restaurant={restaurant}
        />
      ));
    }
  
    return null;
  };

  useEffect(() => {
    if (route.params && route.params.restaurant) {
      const { restaurant } = route.params;
      setMapRegion({
        latitude: restaurant.latitude_gps,
        longitude: restaurant.longitude_gps,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })

      setRestaurantData([restaurant]);
    }
  }, [route.params]);

  useEffect(()=>{
    handleMapRegionChange(mapRegion)
    
  }, [])

  const handleMapRegionChange = async (region) => {
    const { 
      latitudeDelta: newLatDelta, 
      longitudeDelta: newLngDelta, 
      latitude: regionLatitude, 
      longitude: regionLongitude } = region;
  
    // Check if zoom level change requires loading more data
    const zoomThreshold = 0.005; // Adjust this value as needed

    if (newLatDelta > latitudeDelta + zoomThreshold || newLngDelta > longitudeDelta + zoomThreshold) {

      const req = await fetchRestaurantDataBasedOnGPS(newLatDelta, newLngDelta, regionLatitude, regionLongitude);
      const addedRestaurants = req.filter((newRestaurant) => !restaurantData.find((oldRestaurant) => oldRestaurant.id === newRestaurant.id));

      if (addedRestaurants.length > 0) {
        const restaurantsWithFocus = addedRestaurants.map((restaurant) => ({
          ...restaurant,
          focused: false,
        }));
        setRestaurantData((prevRestaurantData) => [...prevRestaurantData, ...restaurantsWithFocus]);
      }
    }
  };


  useEffect(() => {
    const setMapZoom = () => {
      const coordinates = restaurantData.map((restaurant) => ({
        latitude: restaurant.latitude_gps,
        longitude: restaurant.longitude_gps,
      }));
      
      // Calculate the map zoom based on coordinates if available
      if (coordinates.length > 0) {
        const minLat = Math.min(...coordinates.map((coord) => coord.latitude));
        const maxLat = Math.max(...coordinates.map((coord) => coord.latitude));
        const minLng = Math.min(...coordinates.map((coord) => coord.longitude));
        const maxLng = Math.max(...coordinates.map((coord) => coord.longitude));
        const latDelta = maxLat - minLat;
        const lngDelta = maxLng - minLng;
        const padding = 0; // Adjust this value as needed
        const adjustedLatDelta = latDelta + padding;
        const adjustedLngDelta = lngDelta + padding;
        setLatitudeDelta(adjustedLatDelta);
        setLongitudeDelta(adjustedLngDelta);
      } 
    };
    setMapZoom();

  }, [restaurantData]);

  return (
    <View style={styles.container}>
      
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={handleMapRegionChange} // Use onRegionChangeComplete instead of onRegionChange
      >
        {globalUserLocation && (
          <Marker coordinate={{ latitude: globalUserLocation.latitude, longitude: globalUserLocation.longitude }}>
            <Image source={require('../../../assets/img/user_location_small.png')} style={{ width: 25, height: 25 }} />
          </Marker>
        )}
        
        <RenderRestaurantMapPoints />

      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  
});
