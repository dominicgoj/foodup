import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LoginFormStyle } from "../../../styles/loginFormStyles";
import { useFocusEffect } from "@react-navigation/native";

export default RenderLoginDeviceChoice = ({resetLoginStates}) => {
    const navigation = useNavigation()
    const handlePhoneLogin = () => {
        navigation.navigate("LoginPhoneChoice");
      };
      const handleEmailLogin = () => {
        navigation.navigate("LoginEmailChoice");
      };
  
      const handleRestaurantRegister = () => {
        navigation.navigate("UserRegisterRestaurantName");
      };


      return (
        <View key={"loginChoice"} style={LoginFormStyle.mainScreenContainer}>
          <Text style={LoginFormStyle.title}>Wilkommen bei FoodUp</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={LoginFormStyle.bigbutton} onPress={handlePhoneLogin}>
              <Text style={LoginFormStyle.buttonText}>Login mit Telefonnummer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={LoginFormStyle.bigbutton} onPress={handleEmailLogin}>
              <Text style={LoginFormStyle.buttonText}>Login mit Emailadresse</Text>
            </TouchableOpacity>
          </View>
          <View style={LoginFormStyle.registerRestaurantContainer}>
            <TouchableOpacity onPress={handleRestaurantRegister}>
              <Text>Sie möchten ein Restaurant anmelden?</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
