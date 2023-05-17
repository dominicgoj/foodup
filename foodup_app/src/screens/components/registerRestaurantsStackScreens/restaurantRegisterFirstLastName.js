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
  import { useNavigation } from "@react-navigation/native";
  import dismissKeyboard from "../../../functions/dismissKeyboard";
  import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";

  export default RenderRestaurantRegisterFirstLastName = ({setRestaurantFirstName, setRestaurantLastName, getRestaurantFirstName, getRestaurantLastName}) => {


    const navigation = useNavigation()
    const [errorMsg, setErrorMsg] = useState(null);
    const [localFirstName, setLocalFirstName] = useState(getRestaurantFirstName);
    const [localLastName, setLocalLastName] = useState(getRestaurantLastName);
    const handleRegisterRestaurantFirstLastName = () => {
      if (localFirstName&&localLastName) {
        setRestaurantFirstName(localFirstName);
        setRestaurantLastName(localLastName)
        navigation.navigate("RestaurantRegisterAddPhoto")

      } else {
        setErrorMsg("Bitte gib deinen vollen Namen ein.");
      }
    };
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={CreateRestaurantStyles.container}>
          <Text style={CreateRestaurantStyles.title}>
            Bitte teile uns deinen Namen mit:
          </Text>
          <TextInput
            style={CreateRestaurantStyles.input}
            placeholder="Vorname"
            value={localFirstName}
            onChangeText={setLocalFirstName}
            keyboardType="default"
          />
          <TextInput
            style={CreateRestaurantStyles.input}
            placeholder="Nachname"
            value={localLastName}
            onChangeText={setLocalLastName}
            keyboardType="default"
          />
          {errorMsg ? <Text>{errorMsg}</Text> : null}
          <TouchableOpacity
            style={CreateRestaurantStyles.smallbutton}
            onPress={handleRegisterRestaurantFirstLastName}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
          
        </View>
      </TouchableWithoutFeedback>
    );
  };