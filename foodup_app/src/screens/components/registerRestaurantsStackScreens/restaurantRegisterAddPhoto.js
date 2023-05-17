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
        console.log("Selected photos in add photos", selectedPhotos)
        setRestaurantImages(selectedPhotos)
        navigation.navigate("RestaurantRegisterSelectPhoto")
      }
    },[selectedPhotos])
    return(
      <View style={{flex: 1}}>
        <View style={[CreateRestaurantStyles.container, {height:'100%'}]}>
          <View style={CreateRestaurantStyles.headerContainer}>
            <Text style={CreateRestaurantStyles.title}>Füge repräsentative Fotos für Deine Restaurant und Deine Küche hinzu.</Text>
            <Text style={CreateRestaurantStyles.info}>Wähle 1 bis 3 Bilder aus Deiner Galerie aus.</Text>
            
          
          </View>
            
          <View style={CreateRestaurantStyles.addPhotoContainer}>
          <OpenRetrievePhotos setPhotos={setSelectedPhotos}/>
          </View>
        
        
        {errorMsg ? <Text style={CreateRestaurantStyles.info}>{errorMsg}</Text> : null}
       
        </View>
      </View>
      
    
    )
  }