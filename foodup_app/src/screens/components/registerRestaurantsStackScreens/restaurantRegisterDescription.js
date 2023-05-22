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

  export default RenderRestaurantRegisterDescription = ({getRestaurantDescription, setRestaurantDescription}) => {

    const navigation = useNavigation()
    const [errorMsg, setErrorMsg] = useState(null);
    const [localRestaurantDescription, setLocalRestaurantDescription] = useState(getRestaurantDescription);

    const handleRegisterRestaurantDescription = () => {
      
      setRestaurantDescription(localRestaurantDescription);
        navigation.navigate("UserRegisterRestaurantTags");
      
    };
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={CreateRestaurantStyles.container}>
          <Text style={CreateRestaurantStyles.title}>
            Gib uns eine kurze Beschreibung deines Restaurants!
          </Text>
          <TextInput
            style={CreateRestaurantStyles.inputTextbox}
            multiline={true}
            placeholder="Optional, aber maximal 400 Zeichen"
            value={localRestaurantDescription}
            onChangeText={(text) => {
              if (text.length <= 400) {
                setLocalRestaurantDescription(text);
              }
            }}
            keyboardType="default"
          />
          {errorMsg ? <Text>{errorMsg}</Text> : null}
          <TouchableOpacity
            style={CreateRestaurantStyles.smallbutton}
            onPress={handleRegisterRestaurantDescription}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
          
        </View>
      </TouchableWithoutFeedback>
    );
  };