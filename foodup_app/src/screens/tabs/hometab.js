import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantCard from '../components/restaurantcard';
import RestaurantDetail from '../components/restaurantdetail';
import CostumHeader from '../components/costumheader.js';
import infomsg from '../../data/infomsg.json';

const HomeScreen = ({ restaurantData, onRefresh }) => {
  const Stack = createStackNavigator();

  const RestaurantListScreen = () => {
    const navigation = useNavigation();

    return (
      <ScrollView refreshControl={
        <RefreshControl onRefresh={onRefresh} />
      }>
        {restaurantData ? (
          restaurantData.length > 0 ? (
            restaurantData.map((restaurant, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Detail', { restaurant })}
              >
                <RestaurantCard
                  restaurant={restaurant}
                  style={{ height: 200 }}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noRestaurantsContainer}>
              <Text style={styles.noRestaurantsText}>
                {infomsg.find((msg) => msg.name === 'no-restaurants-at-your-place')?.title || ''}
              </Text>
              <Text style={styles.noRestaurantsSubtitleText}>
                {infomsg.find((msg) => msg.name === 'no-restaurants-at-your-place')?.subtitle || ''}
              </Text>
            </View>
          )
        ) : null}
      </ScrollView>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={RestaurantListScreen}
          options={{ header: () => <CostumHeader arrowShown={false} logoShown={true} /> }}
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
