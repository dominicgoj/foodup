import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDetail from '../components/restaurantdetail.js';
import CostumHeader from '../components/costumheader.js' 
import SearchBar from '../components/searchbar.js'

function SearchTab() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchBar}
        options={{ header: () => <CostumHeader arrowShown={false} logoShown={false} headerText={'Suche'}/>}}
        
        
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
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
});

export default SearchTab;
