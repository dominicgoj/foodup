import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, ScrollView, Text, StyleSheet } from "react-native";
import RestaurantCard from "./restaurantcard";
import infomsg from '../../data/infomsg.json';

const UserRestaurantListScreen = ({restaurantData}) => {
    const navigation = useNavigation();
    return (
        <ScrollView style={{marginTop:20}}>
        {restaurantData ? (
            restaurantData.map((restaurant, index) => {
                
                    return(
              <TouchableOpacity
                key={index}
                onPress={()=>navigation.navigate("UserRestaurantDetail", {restaurant})}
              >
                <RestaurantCard
                  restaurant={restaurant}
                  style={{ height: 200 }}
                />
              </TouchableOpacity>
            )})
          ):(null)}
          </ScrollView>
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
  export default UserRestaurantListScreen;