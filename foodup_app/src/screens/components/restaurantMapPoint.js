import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout, CalloutSubview, CalloutPressEvent } from 'react-native-maps';
import { Text, View } from 'react-native';
import { MapStyles } from '../../styles/mapstyles';
import { Colors } from '../../styles/colors';
import Renderstars from './renderstars';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantMapPoint(restaurant) {
  const navigation = useNavigation();
  useEffect(() => {
    
  }, []);
 const handleCalloutPress = () =>{
  navigation.navigate('Detail', { restaurant: restaurant.restaurant });
 }

  
  return (
    <Marker coordinate={{ latitude: restaurant.restaurant.latitude_gps, 
                          longitude: restaurant.restaurant.longitude_gps,
                           }} image={require('../../../assets/img/cutlery_icon.png')}
            >
        <Callout>
          <CalloutSubview style={MapStyles.calloutContainer} onPress={handleCalloutPress}>
        <Renderstars rating={restaurant.restaurant.average_rating}/>
            <Text style={[MapStyles.restaurantNameText, Colors.primaryText]}>{restaurant.restaurant.restaurant_name}</Text>
            </CalloutSubview>
        </Callout>
        </Marker>
   
  );
}
