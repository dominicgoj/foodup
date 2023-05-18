import React, { useState, useEffect } from "react";
import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";

import RestaurantImageList from "./restaurantImageList";
import RestaurantRegisterPreviewRestaurantDetailPage from "./restaurantRegisterPreviewRestaurantDetailPage";
import { useNavigation } from "@react-navigation/native";


  export default RenderRestaurantSelectPhoto = ({getRestaurantImages, setRestaurantImage, getRestaurantName}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation()
    
    
    const handleRegisterRestaurantSendPhoto = () => {
      setRestaurantImage(getRestaurantImages()[0])
      navigation.navigate("RenderRestaurantRegisterFinal")
    }
    return(
      <ScrollView style={{flex: 1}}>
        <View style={[CreateRestaurantStyles.container, {height:'100%'}]}>
          <View>
          
            <Text style={CreateRestaurantStyles.title}>So sieht deine Seite aus:</Text>
            {errorMsg ? <Text style={CreateRestaurantStyles.info}>{errorMsg}</Text> : null}
          
          </View>
          <TouchableOpacity
            style={[CreateRestaurantStyles.smallbutton]}
            onPress={handleRegisterRestaurantSendPhoto}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
            <View style={CreateRestaurantStyles.imageContainer}>
              
              
            </View>
        </View>
        <RestaurantRegisterPreviewRestaurantDetailPage getRestaurantImages={getRestaurantImages} getRestaurantName={getRestaurantName} setRestaurantImage={setRestaurantImage} />
      </ScrollView>
      
    
    )
  }