import React, { useState, useEffect, useContext } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import RestaurantMapPoint from '../components/restaurantMapPoint';
import AuthContext from '../../utilities/authcontext';

export default function MapScreen({restaurantData}) {
  const [latitudeDelta, setLatitudeDelta] = useState(0.052)
  const [longitudeDelta, setLongitudeDelta] = useState(0.0821)
  const { globalUserLocation } = useContext(AuthContext);

  console.log("restaurant data in mapscreen: ", restaurantData)

  const RenderRestaurantMapPoints = () => {
    console.log("RenderRestaurantMapPoints rendered")
    if (restaurantData) {
      console.log("restaurant data: ", restaurantData)
      return restaurantData.map((restaurant) => {
        return <RestaurantMapPoint key={restaurant.id} restaurant={restaurant} />;
      });
    }
    return null; // Add this line to handle the case when `allRestaurantData` is null or empty
  };

  
  return (
    
    <View style={styles.container}>
      <MapView style={styles.map} region={{ latitude: globalUserLocation?.latitude, longitude: globalUserLocation?.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }}>
        {globalUserLocation && 

        <Marker 
        coordinate={{ latitude: globalUserLocation.latitude, longitude: globalUserLocation.longitude }} 
        
        >
          <Image source={require('../../../assets/img/user_location_small.png')} style={{width: 25, height: 25}}/>
        </Marker>
        
        }
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
    height: '100%',
  },
});