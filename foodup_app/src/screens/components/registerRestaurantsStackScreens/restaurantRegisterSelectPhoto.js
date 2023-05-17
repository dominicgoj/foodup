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
import { useNavigation } from "@react-navigation/native";


  export default RenderRestaurantSelectPhoto = ({getRestaurantImages, setRestaurantImage}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation()
    
    const photoDictionary = getRestaurantImages().reduce((dict, photo, index) => {
      dict[index] = photo;
      return dict;
    }, {});
    
    const handleRegisterRestaurantSendPhoto = () => {
      navigation.navigate("RenderRestaurantRegisterFinal")
    }
    return(
      <ScrollView style={{flex: 1}}>
        <View style={[CreateRestaurantStyles.container, {height:'100%'}]}>
          <View>
          
            <Text style={CreateRestaurantStyles.title}>Wähle ein Titelbild aus</Text>
            {errorMsg ? <Text style={CreateRestaurantStyles.info}>{errorMsg}</Text> : null}
          
          </View>
          <TouchableOpacity
            style={[CreateRestaurantStyles.smallbutton]}
            onPress={handleRegisterRestaurantSendPhoto}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
            <View style={CreateRestaurantStyles.imageContainer}>
              <RestaurantImageList photos={photoDictionary} setRestaurantImage={setRestaurantImage}/>
            </View>
          
        
          
        
       
        </View>
      </ScrollView>
      
    
    )
  }