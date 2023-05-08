import React from 'react';
import { StyleSheet } from 'react-native';
import Map from '../components/map.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDetail from '../components/restaurantdetail.js';
import CostumHeader from '../components/costumheader.js' 
export default function MapScreen() {

  const Stack = createStackNavigator();
  
  return (
    
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Map"
          component={Map}
          options={{ header: () => <CostumHeader arrowShown={false} logoShown={false} headerText={'Karte'}/>}}
          
          
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