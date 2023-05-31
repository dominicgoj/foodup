import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, ScrollView, Text, StyleSheet, RefreshControl } from "react-native";
import RestaurantCard from "./restaurantcard";
import NoContentsAvailable from "./nocontentsavailable";
import AddRestaurantButton from "./addRestaurantButton";
import { commonStyles } from "../../styles/commonstyles";
import AuthContext from "../../utilities/authcontext";
const UserRestaurantListScreen = ({restaurantData}) => {
    const navigation = useNavigation();
    const authcontext = useContext(AuthContext)
    const RenderRestaurantList = () => {
      return restaurantData.map((restaurant, index) => {
        return (
          <TouchableOpacity
              key={index}
              onPress={()=>navigation.navigate("UserRestaurantDetailView", {restaurant:restaurant})}
            >
              <RestaurantCard
                restaurant={restaurant}
                style={{ height: 200 }}
                showActivity={true}
              />
            </TouchableOpacity>
          )
      });
    };
            
    return (
        <ScrollView style={{flex: 1}} refreshControl={
          <RefreshControl onRefresh={authcontext.handleGlobalRefresh} />
        }>
          <Text style={commonStyles.header}>Dein Restaurantbereich</Text>
          {restaurantData.length>0?<RenderRestaurantList />:
          (<NoContentsAvailable />)}
          <AddRestaurantButton />
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