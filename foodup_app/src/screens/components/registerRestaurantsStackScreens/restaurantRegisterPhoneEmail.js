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
  import Regex from "../regex";

  export default RenderRestaurantRegisterPhoneAndEmail = ({getRestaurantTelephone, setRestaurantTelephone, getRestaurantWebsite, setRestaurantWebsite, getRestaurantEmail, setRestaurantEmail, userLoggedOut}) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [phone, setPhone] = useState(getRestaurantTelephone);
    const [email, setEmail] = useState(getRestaurantEmail);
    const [website, setWebsite] = useState(getRestaurantWebsite);
    const navigation = useNavigation();
    const handleRegisterRestaurantPhoneAndEmail = () => {
      if (phone && email) {
        const phoneRegex = Regex("telephone", phone);
        const emailRegex = Regex("email", email);
        if (!phoneRegex && !emailRegex) {
          setRestaurantTelephone(phone);
          setRestaurantEmail(email);
          if (website) {
            const websiteRegex = Regex("website", website);
            if (!websiteRegex) {
              setRestaurantWebsite(website);
              if(userLoggedOut===true){
                navigation.navigate("RestaurantRegisterFirstLastName")
              }
              else{
                navigation.navigate("RestaurantRegisterAddPhoto");}
              
            } else {
              setErrorMsg(
                "Bitte gib eine korrekte Internetadresse ein. (optional)"
              );
            }
          } else {
            if(userLoggedOut===true){
              navigation.navigate("RestaurantRegisterFirstLastName")
            }
            else{
              navigation.navigate("RestaurantRegisterAddPhoto");}
          }
        } else {
          setErrorMsg(
            "Bitte gib eine korrekte Telefonnummer und Emailadresse ein. (Pflichtfeld)"
          );
        }
      } else {
        setErrorMsg("Bitte gib Deine Geschäftsinformationen ein.");
      }
    };

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={CreateRestaurantStyles.container}>
          <Text style={CreateRestaurantStyles.title}>
            Teile uns die Kontaktinformationen für Kunden mit.
          </Text>
          <TextInput
            style={CreateRestaurantStyles.input}
            autoCapitalize="none"
            placeholder="Geschäftliche Telefonnummer mit Vorwahl"
            value={phone}
            onChangeText={setPhone}
            keyboardType="default"
          />
          <TextInput
            style={CreateRestaurantStyles.input}
            autoCapitalize="none"
            placeholder="Geschäftliche Emailadresse"
            value={email}
            onChangeText={setEmail}
            keyboardType="default"
          />
          <TextInput
            style={CreateRestaurantStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Geschäftliche Webseite (optional)"
            value={website}
            onChangeText={setWebsite}
            keyboardType="default"
          />
          {errorMsg ? <Text style={CreateRestaurantStyles.info}>{errorMsg}</Text> : null}
          <TouchableOpacity
            style={CreateRestaurantStyles.smallbutton}
            onPress={handleRegisterRestaurantPhoneAndEmail}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  