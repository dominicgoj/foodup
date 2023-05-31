import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { View, ScrollView, Text, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../components/feed';
import RestaurantDetail from '../components/restaurantdetail';
import CostumHeader from '../components/costumheader.js';
import ForeignUserProfile from '../components/foreignUserProfile';
import LocationServiceOffAlert from '../components/locationServiceOffAlert';
import AuthContext from '../../utilities/authcontext';
import MapScreen from '../components/map.js';
import FilteredRestaurantsView from '../components/filteredRestaurantsView';
import RestaurantInfoCard from '../components/restaurantInfoCard';
import HomeScreen from '../components/homescreen';
const ForYouTab = ({ restaurantData }) => {
  const Stack = createStackNavigator();
  const authcontext = useContext(AuthContext)
   return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
      <Stack.Screen
        name="HomeFeed"
        options={{ header: () => <CostumHeader arrowShown={false} logoShown={true} /> }}
        component={HomeScreen}
      />
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
        <Stack.Screen
      name="RestaurantInfoCard"
      options={{
        header: () => <CostumHeader arrowShown={true} logoShown={false} />,
      }}
      component={RestaurantInfoCard}
      />
      <Stack.Screen
      name="RestaurantDetailFeed"
      component={Feed} />
      <Stack.Screen 
      name="ShowForeignUserContent"
      component={ForeignUserProfile}
      options={{
        header: () => <CostumHeader arrowShown={true} logoShown={false} />,
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

export default ForYouTab;
