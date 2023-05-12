import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantCard from '../components/restaurantcard';
import RestaurantDetail from '../components/restaurantdetail';
import { BACKEND_URL } from '../../../config';
import axios from 'axios';
import CostumHeader from '../components/costumheader.js'
import {useFocusEffect} from '@react-navigation/native'
import {getUserLocation, getDistance} from '../../utilities/locationUtils';
import infomsg from '../../data/infomsg.json'
import Loading from '../components/loading';
const HomeScreen = () => {
  const MAX_RESTAURANT_DISTANCE = 50 //in km
  const Stack = createStackNavigator();
  const [restaurantData, setRestaurantData] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRestaurantData();
    }, 60000); // 60000 milliseconds = 1 minute

    return () => {
      clearInterval(interval);
    };
  }, []);
  const fetchRestaurantData = async () => {
    const userLocation = await getUserLocation();
    const restaurants = await getDistance(userLocation.longitude, userLocation.latitude);
    const filteredRestaurants = restaurants.filter((restaurant) => restaurant.distance <= MAX_RESTAURANT_DISTANCE);
    setRestaurantData(filteredRestaurants)
    setTimeout(async ()=> {
      
      setLoading(false)
      
    }, 2000)
    
};
    
    const RestaurantListScreen = ({ navigation }) => {
      return (
        <ScrollView>
      {restaurantData.length > 0 ? (
        restaurantData.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            restaurant={restaurant}
            navigation={navigation}
            style={{ height: 200 }}
          />
        ))
      ) : (
        <View style={styles.noRestaurantsContainer}>
          <Text style={styles.noRestaurantsText}>{infomsg.find((msg) => msg.name === 'no-restaurants-at-your-place')?.title || ''}</Text>
          <Text style={styles.noRestaurantsSubtitleText}>{infomsg.find((msg) => msg.name === 'no-restaurants-at-your-place')?.subtitle || ''}</Text>

        </View>
        
      )}
    </ScrollView>
      );
    };
  return (
    loading ? <Loading loading={loading}/> :
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={RestaurantListScreen}
          options={{ header: () => <CostumHeader arrowShown={false} logoShown={true} />, }}
        />
        <Stack.Screen
          name="Detail"
          component={RestaurantDetail}
          options={{
            header: () => <CostumHeader arrowShown={true} logoShown={false} />,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};




const styles = StyleSheet.create({
  noRestaurantsContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    
  },
  noRestaurantsText:{
    fontSize: 24,
    textAlign: 'center',
    color: '#424242',
    paddingBottom: 20,
  },
  noRestaurantsSubtitleText:{
    ontSize: 16,
    textAlign: 'center',
    color: '#424242'
  }
});

export default HomeScreen;
