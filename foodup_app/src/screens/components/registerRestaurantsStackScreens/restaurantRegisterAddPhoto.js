import React, { useState, useEffect } from "react";
import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";

import OpenRetrievePhotos from "../../../utilities/openPhotosRetrievePhotos"; 
import { useNavigation } from "@react-navigation/native";

  export default RenderRestaurantAddPhotos = ({setRestaurantImages}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedPhotos, setSelectedPhotos] = useState([])
    const navigation = useNavigation()
    useEffect(()=>{
      if(selectedPhotos.length>0){
        setRestaurantImages(selectedPhotos)
        navigation.navigate("RestaurantRegisterSelectPhoto")
      }
    },[selectedPhotos])
    return(
      <View style={{flex: 1}}>
        <View style={[CreateRestaurantStyles.container, {height:'100%'}]}>
          <View style={CreateRestaurantStyles.headerContainer}>
            <Text style={CreateRestaurantStyles.title}>Füge ein Fotos für Dein Restaurant hinzu.</Text>
            
          
          </View>
            
          <View style={CreateRestaurantStyles.addPhotoContainer}>
          <OpenRetrievePhotos setPhotos={setSelectedPhotos}/>
          </View>
        
        
        {errorMsg ? <Text style={CreateRestaurantStyles.info}>{errorMsg}</Text> : null}
       
        </View>
      </View>
      
    
    )
  }