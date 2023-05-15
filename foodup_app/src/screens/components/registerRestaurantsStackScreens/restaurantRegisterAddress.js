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

  export default RenderRestaurantRegisterAdress = ({getRestaurantStreet, getRestaurantZip, getRestaurantCity, setRestaurantStreet, setRestaurantZip, setRestaurantCity}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [street, setStreet] = useState(getRestaurantStreet);
    const [zip, setZip] = useState(getRestaurantZip);
    const [city, setCity] = useState(getRestaurantCity);
    const navigation = useNavigation();

    const handleRegisterRestaurantAdress = () => {
      if (street && zip && city) {
        setRestaurantStreet(street);
        setRestaurantZip(zip);
        setRestaurantCity(city);
        navigation.navigate("UserRegisterRestaurantPhoneEmail");
      } else {
        setErrorMsg("Bitte gib eine gültige Adresse ein.");
      }
    };
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={CreateRestaurantStyles.container}>
          <Text style={CreateRestaurantStyles.title}>
            Teile uns die Adresse Deines Restaurants mit.
          </Text>
          <TextInput
            style={CreateRestaurantStyles.input}
            placeholder="Straße und Hausnummer"
            value={street}
            onChangeText={setStreet}
            keyboardType="default"
          />
          <TextInput
            style={CreateRestaurantStyles.input}
            placeholder="Postleitzahl"
            value={zip}
            onChangeText={setZip}
            keyboardType="default"
          />
          <TextInput
            style={CreateRestaurantStyles.input}
            placeholder="Stadt"
            value={city}
            onChangeText={setCity}
            keyboardType="default"
          />
          {errorMsg ? <Text>{errorMsg}</Text> : null}
          <TouchableOpacity
            style={CreateRestaurantStyles.smallbutton}
            onPress={handleRegisterRestaurantAdress}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };