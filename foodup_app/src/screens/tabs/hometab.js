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

const HomeScreen = () => {
  const Stack = createStackNavigator();
  const [restaurantData, setRestaurantData] = useState([])
    useFocusEffect(
      React.useCallback(() => {
        fetchRestaurantData();
        return;
      }, [])
    );

    const fetchRestaurantData = async () =>{
      try {
        const response = await axios.get(BACKEND_URL+'/restaurant/');
        setRestaurantData(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    const RestaurantListScreen = ({ navigation }) => {



      return (
        <ScrollView>
          
          {restaurantData.map((restaurant, index) => {
            
            return (
              <RestaurantCard
              key={index}
              restaurant={restaurant}
              navigation={navigation}
              style={{height: 200}}
            />
          )})}
        </ScrollView>
      );
    };
  return (
    
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
  
});

export default HomeScreen;
