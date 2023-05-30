import React, { useState, useContext, useEffect } from "react";
import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
import { ActivityIndicator } from 'react-native';
import AuthContext from "../../../utilities/authcontext";
import RestaurantRegisterPreviewRestaurantDetailPage from "./restaurantRegisterPreviewRestaurantDetailPage";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import UpdateRestaurant from "../../../api/updaterestaurant";
import updateAuthContextUserRestaurants from "../../../utilities/updateAuthContextUserRestaurants";

  export default RenderRestaurantSelectPhoto = ({
    getRestaurantImages, setRestaurantImage, getRestaurantName, getRestaurantDescription, getRestaurantTags,
    setRestaurantDescription, setRestaurantName, setRestaurantTags}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false)
    const navigation = useNavigation()
    const route = useRoute();
    const authcontext = useContext(AuthContext)
    const { cameToChangePhotoOnly, restaurant } = route.params || {}; //or nothing, because its only passed when photo is changed from existing restaurant

    const handleRegisterRestaurantSendPhoto = async () => {
      setRestaurantImage(getRestaurantImages()[0])
      if(!cameToChangePhotoOnly){
        navigation.navigate("RenderRestaurantRegisterFinal")
      }else{
        setUploadingImage(true)
        await updateRestaurantImages()
        navigation.navigate("UserRestaurants")
      }
    }
    useEffect(()=>{
      if(cameToChangePhotoOnly){
        
        setRestaurantName(restaurant.restaurant_name)
        setRestaurantTags(JSON.parse(restaurant.tags))
        setRestaurantDescription(restaurant.description)
      }
    },[])
    const updateRestaurantImages = async () => {
        const formData = new FormData();
        formData.append('title_image', {
          uri: getRestaurantImages()[0].uri,
          type: getRestaurantImages()[0].type,
          name: getRestaurantImages()[0].name,
        });
        formData.append('title_image_preview', {
          uri: getRestaurantImages()[0].uri,
          type: getRestaurantImages()[0].type,
          name: getRestaurantImages()[0].name,
        });

        const req = await UpdateRestaurant(formData, restaurant.id)
        const updatedUserRestaurants = updateAuthContextUserRestaurants(authcontext, req)
        /// UPDATE AUTHCONTEXT WITH UPDATED RESTAURANT
        authcontext.setUserRestaurants(updatedUserRestaurants)
        setUploadingImage(false)
    
    }
    return(
      <ScrollView style={{flex: 1}}>
       
        <View style={[CreateRestaurantStyles.container, {height:'100%'}]}>
          <View>
          
            <Text style={CreateRestaurantStyles.title}>So sieht deine Seite aus:</Text>
            {errorMsg ? <Text style={CreateRestaurantStyles.info}>{errorMsg}</Text> : null}
          
          </View>
          {uploadingImage?
          <View>
            <ActivityIndicator color="white" size="large" />
            <Text>Hochladen</Text></View>
          :(
            <TouchableOpacity
            style={[CreateRestaurantStyles.smallbutton]}
            onPress={handleRegisterRestaurantSendPhoto}
          >{!cameToChangePhotoOnly?(<Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>):(<Text style={CreateRestaurantStyles.buttonText}>Speichern</Text>)}
            
          </TouchableOpacity>
          )}
          
            <View style={CreateRestaurantStyles.imageContainer}>
              
              
            </View>
        </View>
        <RestaurantRegisterPreviewRestaurantDetailPage getRestaurantImages={getRestaurantImages} getRestaurantName={getRestaurantName} setRestaurantImage={setRestaurantImage}
        getRestaurantDescription={getRestaurantDescription} getRestaurantTags={getRestaurantTags} />
      </ScrollView>
      
    
    )
  }