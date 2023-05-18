import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo';
import * as Location from 'expo-location';
import FetchRestaurants from '../../api/fetchRestaurants';
import RestaurantMapPoint from '../components/restaurantMapPoint';
import AuthContext from '../../utilities/authcontext';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitudeDelta, setLatitudeDelta] = useState(20.22)
  const [longitudeDelta, setLongitudeDelta] = useState(10.421)
  const [allRestaurantData, setAllRestaurantData] = useState(null)
  const { globalUserLocation } = useContext(AuthContext);

  const getAllRestaurants = async () =>{
    const allRestaurants = await FetchRestaurants(null)
    setAllRestaurantData(allRestaurants)
  }
  useEffect(() => {
    
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    getAllRestaurants()
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const renderRestaurantMapPoints = () => {
    if (allRestaurantData) {
      return allRestaurantData.map((restaurant) => {
        return <RestaurantMapPoint key={restaurant.id} restaurant={restaurant} />;
      });
    }
    return null; // Add this line to handle the case when `allRestaurantData` is null or empty
  };

  
  return (
    
    <View style={styles.container}>
      <MapView style={styles.map} region={{ latitude: location?.coords.latitude, longitude: location?.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }}>
        {globalUserLocation && <Marker coordinate={{ latitude: globalUserLocation.coords.latitude, globalUserLocation: location.coords.longitude }} />}
        {renderRestaurantMapPoints()}
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
    height: '100%',
  },
});