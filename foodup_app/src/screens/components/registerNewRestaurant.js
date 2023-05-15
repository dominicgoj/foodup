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
const RegisterRestaurant = () =>{
    const [registerRestaurantName, setRegisterRestaurantName] = useState("");
    const [registerRestaurantTelephone, setRegisterRestaurantTelephone] =useState("");
    const [registerRestaurantEmail, setRegisterRestaurantEmail] = useState("");
    const [registerRestaurantWebsite, setRegisterRestaurantWebsite] =useState("");
    const [registerRestaurantStreet, setRegisterRestaurantStreet] = useState("");
    const [registerRestaurantZip, setRegisterRestaurantZip] = useState("");
    const [registerRestaurantCity, setRegisterRestaurantCity] = useState("");
    const [registerRestaurantTags, setRegisterRestaurantTags] = useState([]);
    const [registerRestaurantFirstName, setRegisterRestaurantFirstName] =useState("");
    const [registerRestaurantLastName, setRegisterRestaurantLastName] =useState("");
    const navigation = useNavigation()
    
    const RenderHowFoodUpWorks = () => {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>So funktioniert foodup!</Text>
        </View>
      );
    };
  
    const RenderRestaurantRegisterUser = () => {
      const [errorMsg, setErrorMsg] = useState(null);
      const [firstname, setFirstname] = useState(registerRestaurantFirstName);
      const [lastname, setLastname] = useState(registerRestaurantLastName);
      const handleRegisterRestaurantUser = () => {
        if (firstname && lastname) {
          setRegisterRestaurantFirstName(firstname);
          setRegisterRestaurantLastName(lastname);
          navigation.navigate("RestaurantRegistered");
        } else {
          setErrorMsg("Bitte gib Deinen Vor- und Nachnamen ein.");
        }
      };
      return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            <Text style={styles.title}>Erzähl uns wer Du bist.</Text>
            <TextInput
              style={styles.input}
              placeholder="Vorname"
              value={firstname}
              onChangeText={setFirstname}
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              placeholder="Nachname"
              value={lastname}
              onChangeText={setLastname}
              keyboardType="default"
            />
            {errorMsg ? <Text style={styles.info}>{errorMsg}</Text> : null}
            <TouchableOpacity
              style={styles.smallbutton}
              onPress={handleRegisterRestaurantUser}
            >
              <Text style={styles.buttonText}>Registrierung abschließen</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      );
    };
    

          
}

export default RegisterRestaurant;