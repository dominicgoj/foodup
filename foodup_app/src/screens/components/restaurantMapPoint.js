import React, { useEffect } from 'react';
import { Marker, Callout, CalloutSubview } from 'react-native-maps';
import { Text, Image, View } from 'react-native';
import { MapStyles } from '../../styles/mapstyles';
import { Colors } from '../../styles/colors';
import Renderstars from './renderstars';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RestaurantMapPoint({restaurant}) {

  const navigation = useNavigation();
  

 const handleCalloutPress = () =>{
  navigation.navigate('Detail', { restaurant: restaurant });
 }

 const getBoxLength = () => {
  const len = restaurant.restaurant_name.length*7
  return len
 }

  
  return (
    <Marker coordinate={{ latitude: restaurant.latitude_gps, 
                          longitude: restaurant.longitude_gps,
                           }}
                           
            ><Image source={require('../../../assets/img/resto_location_small.png')} style={{width: 45, height: 45}} />
            
        <Callout>
          <CalloutSubview style={[MapStyles.calloutContainer, {width: getBoxLength()}]} onPress={handleCalloutPress}>
           
        <Renderstars rating={restaurant.average_rating}/>
            <Text style={[MapStyles.restaurantNameText, Colors.primaryText]}>{restaurant.restaurant_name}</Text>
       
            </CalloutSubview>
        </Callout>
        
        </Marker>
   
  );
}
