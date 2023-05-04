import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Text, View } from 'react-native';
import { MapStyles } from '../../styles/mapstyles';
import { Colors } from '../../styles/colors';
import Renderstars from './renderstars';
export default function RestaurantMapPoint(restaurant) {
  useEffect(() => {
    
  }, []);
 

  
  return (
    <Marker coordinate={{ latitude: restaurant.restaurant.latitude_gps, longitude: restaurant.restaurant.longitude_gps }}
            >
        <Callout style={MapStyles.calloutContainer}>
        <Renderstars rating={restaurant.restaurant.average_rating}/>
            <Text style={[MapStyles.restaurantNameText, Colors.primaryText]}>{restaurant.restaurant.restaurant_name}</Text>
        </Callout>
        </Marker>
   
  );
}
