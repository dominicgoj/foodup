import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Input, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userRestaurantsStyles } from "../../styles/userRestaurantStyles";
import { Colors } from "../../styles/colors.js"
import userRestaurantsInputField from '../../data/userRestaurantsInputField.json'
import UpdateRestaurant from "../../api/updaterestaurant";

const UserRestaurantEdit = ({ route, triggerRefresh }) => {
  const restaurant = route.params.restaurant;
  const navigation = useNavigation();
  const fieldsException = [
    "id",
    "longitude",
    "latitude",
    "timestamp",
    "image_url",
    "instagram",
    "facebook",
    "qr_id",
    "average_rating",
    "active",
    "userid",
    "tags"
  ];
  
  const [restaurantData, setRestaurantData] = useState(restaurant);
  const [updatedRestaurantData, setUpdatedRestaurantData] = useState(restaurant)
  const [changeDetected, setChangeDetected] = useState(false)
  const handleChange = (key, value) => {
    
    setChangeDetected(true)
    setUpdatedRestaurantData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(()=>{
  }, [updatedRestaurantData])

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleChanges = () => {
    UpdateRestaurant(updatedRestaurantData)
    triggerRefresh()
    navigation.navigate("UserRestaurants")
  }
  const RenderChangeButton = () =>{
    
      return(
        <TouchableOpacity onPress={handleChanges} style={[userRestaurantsStyles.changeButton, Colors.primaryBackground]}>
          <Text style={userRestaurantsStyles.changeButtonText}>Änderungen übernehmen</Text>
          </TouchableOpacity>
      )
    
  }
  const RenderChangeDummyButton = () =>{
    
    return(
      <View style={[userRestaurantsStyles.changeButton, {backgroundColor: '#E6E6E6'}]}>
        <Text style={userRestaurantsStyles.changeButtonText}>Änderungen übernehmen</Text>
        </View>
    )
  
}
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <Text style={userRestaurantsStyles.header}>{updatedRestaurantData.restaurant_name}</Text>
        {Object.entries(updatedRestaurantData).map(([key, value]) => {
          const field = userRestaurantsInputField.German[key];
          if (fieldsException.some((exception) => key.includes(exception))) {
            return null; // Skip rendering
          }
          return (
            <View key={key} style={userRestaurantsStyles.container}>
              <View style={userRestaurantsStyles.inputTextDescriptionContainer}>
              <Text style={userRestaurantsStyles.inputTextDescription}>{field}:</Text>
              </View>
              <View style={userRestaurantsStyles.inputFieldContainer}>
              <TextInput
                style={userRestaurantsStyles.inputField}
                multiline={false}
                value={value}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => handleChange(key, text)}
              />
              </View>
              
            </View>
          );
        })}
        {changeDetected?<RenderChangeButton/>:<RenderChangeDummyButton />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserRestaurantEdit;

