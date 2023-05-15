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
  import createRestaurant from "../../../api/createRestaurant";

  export default RenderRestaurantRegistered = ({dataset, setDataset, userinfo}) => {
    const navigation = useNavigation()
    const handleRestaurantRegistered = async () => {
      const response = await createRestaurant(dataset, userinfo)
      navigation.navigate("UserContent")
    };

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={CreateRestaurantStyles.container}>
          <Text style={CreateRestaurantStyles.title}>Danke für Deine Registrierung.</Text>
          <Text style={CreateRestaurantStyles.info}>
            Wir melden uns bei Dir nachdem wir Deine Registrierungsanfrage geprüft haben.
          </Text>
          <TouchableOpacity
            style={CreateRestaurantStyles.smallbutton}
            onPress={handleRestaurantRegistered}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Zurück zu Home</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };