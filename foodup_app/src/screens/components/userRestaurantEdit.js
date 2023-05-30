import React, {useContext, useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { userRestaurantsStyles } from "../../styles/userRestaurantStyles";
import { Colors } from "../../styles/colors.js"
import userRestaurantsInputField from '../../data/userRestaurantsInputField.json'
import UpdateRestaurant from "../../api/updaterestaurant";
import { KeyboardAvoidingView } from 'react-native';
import AuthContext from "../../utilities/authcontext";
import updateAuthContextUserRestaurants from "../../utilities/updateAuthContextUserRestaurants";
import updateAuthContextAllRestaurants from "../../utilities/updateAuthContextAllRestaurants";
import Dialog from "react-native-dialog";
const UserRestaurantEdit = ({ route }) => {
  const restaurant = route.params.restaurant;
  const navigation = useNavigation();
  const [showConfirmation, setShowConfirmation] = useState(false);
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
  // filter out title_img and preview
  const { title_image_preview, title_image, ...filteredRestaurant } = restaurant;
  const [updatedRestaurantData, setUpdatedRestaurantData] = useState(filteredRestaurant)
  const [changeDetected, setChangeDetected] = useState(false)
  const [descriptionFieldHeight, setDescriptionFieldHeight] = useState(100);
  const authcontext = useContext(AuthContext)
  const handleChange = (key, value) => {
    if (updatedRestaurantData[key] !== value) {
      setUpdatedRestaurantData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
      setChangeDetected(true);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleChanges = async () => {
    const newRestaurant = await UpdateRestaurant(updatedRestaurantData)
    const updatedUserRestaurants = updateAuthContextUserRestaurants(authcontext, newRestaurant)
    const updatedRestaurantData = updateAuthContextAllRestaurants(authcontext, newRestaurant)
    authcontext.setUserRestaurants(updatedUserRestaurants)
    authcontext.setRestaurantData(updatedRestaurantData)
    navigation.navigate("UserRestaurants")
  }
  
  const handleSetRestaurantInactive = async () => {
    const updatedActivityState = {active: false}
    const newRestaurant = await UpdateRestaurant(updatedActivityState, restaurant.id)
    const updatedUserRestaurants = updateAuthContextUserRestaurants(authcontext, newRestaurant)
    const updatedRestaurantData = updateAuthContextAllRestaurants(authcontext, newRestaurant)
    authcontext.setUserRestaurants(updatedUserRestaurants)
    authcontext.setRestaurantData(updatedRestaurantData)
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

const RenderConfirmationOfInactivity = () => {
  return (
    <Dialog.Container visible={showConfirmation}>
          
        <Dialog.Title>Restaurant inaktivieren</Dialog.Title>
        <Dialog.Description>
         Bist du dir sicher dass du dein Restaurant inaktivieren möchtest? Eine Aktivierung erfordert eine erneute Registrierung deines Restaurants.
        </Dialog.Description>
        <Dialog.Button label="Abbrechen" onPress={handleCancel} />
        <Dialog.Button label="Bestätigen" onPress={handleSetRestaurantInactive} />
      </Dialog.Container>
  )
}
const RenderActivityRestaurantButton = () => {
  if(restaurant.active){
    return (
      <TouchableOpacity onPress={()=>setShowConfirmation(true)} style={[userRestaurantsStyles.changeButton, Colors.tertiaryBackground]}>
            <Text style={userRestaurantsStyles.changeButtonText}>Inaktiv setzen</Text>
            </TouchableOpacity>
    )
  }
  
  
}
const handleCancel = () => {
  // Handle the cancel action
  setShowConfirmation(false);
};
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView>
          <View style={{marginBottom: 50,}}>
        <Text style={userRestaurantsStyles.header}>{updatedRestaurantData.restaurant_name}</Text>
        {Object.entries(updatedRestaurantData).map(([key, value]) => {
          const field = userRestaurantsInputField.German[key];
          if (fieldsException.some((exception) => key.includes(exception))) {
            return null; // Skip rendering
          }
          if(key!="title_image"&&key!="title_image_preview")
          {
            return (
            
              <View key={key} style={userRestaurantsStyles.container}>
                <View style={userRestaurantsStyles.inputTextDescriptionContainer}>
                <Text style={userRestaurantsStyles.inputTextDescription}>{field}:</Text>
                </View>
                <View style={[userRestaurantsStyles.inputFieldContainer]}>
                {key === "description" ? (
                  <TextInput
                    style={[userRestaurantsStyles.inputField, {height: descriptionFieldHeight}]}
                    multiline={true}
                    value={value}
                    autoCorrect={true}
                    onChangeText={(text) => {
                      if (text.length <= 400) {
                        handleChange(key, text);
                      }
                    }}
                    onContentSizeChange={(event) => {
                      // Adjust the height based on the content size
                      const { contentSize } = event.nativeEvent;
                      const newHeight = Math.max(100, contentSize.height); // Set a minimum height of 100
                      setDescriptionFieldHeight(newHeight);
                    }}
                  />
                ) : (
                  <TextInput
                    style={userRestaurantsStyles.inputField}
                    multiline={false}
                    value={value}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(text) => handleChange(key, text)}
                  />
                )}
              </View>
                
              </View>
            );
          }
        })}
        {changeDetected?<RenderChangeButton/>:<RenderChangeDummyButton />}
        <RenderActivityRestaurantButton />
        <RenderConfirmationOfInactivity />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default UserRestaurantEdit;

