import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RestaurantDetailViewStyles } from "../../styles/restaurantDetailViewStyles";
import { commonStyles } from "../../styles/commonstyles";
import { Colors } from "../../styles/colors";
import RestaurantDetail from "./restaurantdetail";
const UserRestaurantDetailView = ({route}) => {
  const navigation = useNavigation();
  return(
    <View style={{flex: 1,}}>
    <RestaurantDetail route={route} />
    <View style={RestaurantDetailViewStyles.detailViewEditContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate("UserRestaurantEdit", {restaurant:route.params.restaurant})}>
      <View style={[RestaurantDetailViewStyles.detailViewEditButton, Colors.primaryBackground]}>
      <Text style={RestaurantDetailViewStyles.detailViewEditButtonText}>Bearbeiten</Text>
      </View>
      </TouchableOpacity>
      
    </View>
    </View>
  )
};

export default UserRestaurantDetailView;

