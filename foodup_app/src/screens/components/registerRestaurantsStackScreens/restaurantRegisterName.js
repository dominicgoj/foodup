import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
  } from "react-native";
  import { createStackNavigator } from "@react-navigation/stack";
  import { useNavigation } from "@react-navigation/native";
  import dismissKeyboard from "../../../functions/dismissKeyboard";
  import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";

  export default RenderRestaurantRegisterName = ({getRestaurantName, setRestaurantName}) => {

    const navigation = useNavigation()
    const [errorMsg, setErrorMsg] = useState(null);
    const [localRestaurantName, setLocalRestaurantName] = useState(getRestaurantName);

    const handleRegisterRestaurantName = () => {
      if (localRestaurantName) {
        setRestaurantName(localRestaurantName);
        navigation.navigate("UserRegisterRestaurantTags");
      } else {
        setErrorMsg("Bitte gib den Namen Deines Restaurants an.");
      }
    };
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={CreateRestaurantStyles.container}>
          <Text style={CreateRestaurantStyles.title}>
            Registriere Dein Restaurant und werde Teil der foodup Community!
          </Text>
          <TextInput
            style={CreateRestaurantStyles.input}
            
            placeholder="Restaurantname"
            value={localRestaurantName}
            onChangeText={setLocalRestaurantName}
            keyboardType="default"
          />
          {errorMsg ? <Text>{errorMsg}</Text> : null}
          <TouchableOpacity
            style={CreateRestaurantStyles.smallbutton}
            onPress={handleRegisterRestaurantName}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
          
        </View>
      </TouchableWithoutFeedback>
    );
  };