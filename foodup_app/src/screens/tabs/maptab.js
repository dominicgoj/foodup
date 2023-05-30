import React from 'react';
import { StyleSheet } from 'react-native';
import Map from '../components/map.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDetail from '../components/restaurantdetail.js';
import CostumHeader from '../components/costumheader.js' 
import RestaurantInfoCard from '../components/restaurantInfoCard.js';
export default function MapScreen({restaurantData}) {

  const Stack = createStackNavigator();
  const route = {params: {
                  "restaurantData": restaurantData}} //fake "route"
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Map"
          options={{ header: () => <CostumHeader arrowShown={false} logoShown={false} headerText={'Karte'}/>}}
          component={Map}
          
        />
        <Stack.Screen
          name="Detail"
          component={RestaurantDetail}
          options={{
            header: () => <CostumHeader arrowShown={true} logoShown={false} />,
          }}
        />
         <Stack.Screen
      name="RestaurantInfoCard"
      options={{
        header: () => <CostumHeader arrowShown={true} logoShown={false} />,
      }}
      component={RestaurantInfoCard}
      />
      <Stack.Screen name="FilteredRestaurants" 
        component={FilteredRestaurantsView}
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} headerText={"Filter"} />,
        }} />
        <Stack.Screen
      name="RestaurantDetailFeed"
      component={Feed} />
      </Stack.Navigator>
     
    </NavigationContainer>
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