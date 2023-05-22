import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { View, ScrollView, Text, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantCard from '../components/restaurantcard';
import RestaurantDetail from '../components/restaurantdetail';
import CostumHeader from '../components/costumheader.js';
import RestaurantListScreen from '../components/restaurantListScreen';
import LocationServiceOffAlert from '../components/locationServiceOffAlert';
import AuthContext from '../../utilities/authcontext';
import MapScreen from '../components/map.js';
import FilteredRestaurantsView from '../../api/filteredRestaurantsView';

const HomeScreen = ({ restaurantData, onRefresh }) => {
  const Stack = createStackNavigator();
  const authcontext = useContext(AuthContext)
   return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ header: () => <CostumHeader arrowShown={false} logoShown={true} /> }}
        >{()=><ScrollView refreshControl={
          <RefreshControl onRefresh={onRefresh} />
        }>
          <RestaurantListScreen restaurantData={restaurantData} showSearchbar={true}/>
          
          </ScrollView>}</Stack.Screen>
        <Stack.Screen
          name="Detail"
          component={RestaurantDetail}
          options={{
            header: () => <CostumHeader arrowShown={true} logoShown={false} />,
          }}
        />
        <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}/>
        <Stack.Screen name="FilteredRestaurants" 
        component={FilteredRestaurantsView}
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} headerText={"Filter"} />,
        }} />
        
      </Stack.Navigator>
      {typeof authcontext.globalUserLocation==="string"?
      <LocationServiceOffAlert />:
      null
      }
      
      
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  noRestaurantsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  noRestaurantsText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#424242',
    paddingBottom: 20,
  },
  noRestaurantsSubtitleText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#424242',
  },
});

export default HomeScreen;
