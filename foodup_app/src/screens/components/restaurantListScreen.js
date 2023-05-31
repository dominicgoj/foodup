import 'react-native-gesture-handler';
import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RestaurantCard from '../components/restaurantcard';
import infomsg from '../../data/infomsg.json';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './searchbar';
const RestaurantListScreen = ({ restaurantData, supressLocationAlert, showSearchbar }) => {
  const navigation = useNavigation();
  
  return (
    <View>
      {showSearchbar?<SearchBar />:null}
      
      <View style={{zIndex:-1}}>
      {restaurantData ? (
        restaurantData.length > 0 ? (
          restaurantData.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.push("Detail", { restaurant })}
            >
              <RestaurantCard restaurant={restaurant} style={{ height: 200 }} />
            </TouchableOpacity>
          ))
        ) : (
          !supressLocationAlert ? (
            <View style={styles.noRestaurantsContainer}>
              <Text style={styles.noRestaurantsText}>
                {infomsg['no-restaurants-at-your-place']?.title || ""}
              </Text>
              <Text style={styles.noRestaurantsSubtitleText}>
                {infomsg['no-restaurants-at-your-place']?.subtitle || ""}
              </Text>
            </View>
          ) : null
        )
      ) : null}
      </View>
    </View>
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

export default RestaurantListScreen;
