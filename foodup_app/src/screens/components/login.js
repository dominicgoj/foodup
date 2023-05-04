import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import storeUserLoginInfo from '../../utilities/storeloggedin.js'
import Regex from './regex';

const LoginForm = (props) => {
  const { onLoginSuccess } = props;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [chosenusername, setChosenUsername] = useState('');
  const [loginChoiceViewBool, setLoginChoiceViewBool] = useState(true)
  const [phoneLoginViewBool, setPhoneLoginViewBool] = useState(false)
  const [emailLoginViewBool, setEmailLoginViewBool] = useState(false)
  const [usernameChoiceViewBool, setUsernameChoiceViewBool] = useState(false)
  const [sendVerificationCodeBool, setSendVerificationCodeBool] = useState(false)
  const [phoneValidationMessage, setPhoneValidationMessage] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [accountThere, setAccountThere] = useState(false)
  const [accountCredentials, setAccountCredentials] = useState(null)


  const handlePhoneLogin = () => {
    setLoginChoiceViewBool(false)
    setPhoneLoginViewBool(true)
    
  };

  const handleEmailLogin = () => {
    setLoginChoiceViewBool(false)
    setEmailLoginViewBool(true)
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlePhoneValidation = async () =>{
    const type = 'telephone'
    const response = Regex(type, phoneNumber)
    if (response) {
      setPhoneValidationMessage('Die Telefonnummer ist inkorrekt.');
      return;
    }
    const loginCredentials = await handleUserThereAPIRequest({ input: phoneNumber, datatype: type });
    setAccountThereFalseIfLoginCredNotFound(loginCredentials)
    setSendVerificationCodeBool(true);
    setPhoneValidationMessage('');
    setPhoneLoginViewBool(false);
  }

  const handleUserThereAPIRequest = async ({input, datatype}) =>{
    try {
        const htmlinput = input.replace('+', '%2B');
        const response = await axios.get(`${BACKEND_URL}/user/search?${datatype}=${htmlinput}`);
        return response.data; 
    }
    catch(error){
        console.error(error)
        return null;
    }
  }

  const handleEmailValidation = async () =>{
    const type = 'email'
    const response = Regex(type, email)
    if (response) {
      setEmailValidationMessage('Die E-Mail-Adresse ist inkorrekt. Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
   
    const loginCredentials = await handleUserThereAPIRequest({ input: email, datatype: type });
    setAccountThereFalseIfLoginCredNotFound(loginCredentials)
    setSendVerificationCodeBool(true);
    setEmailValidationMessage('');
    setEmailLoginViewBool(false);
  }

  const setAccountThereFalseIfLoginCredNotFound = (data) =>{
    if(data.length>0){
        setAccountThere(true)
        setAccountCredentials(data)
    }
  }
  
  const handleUsernameInput = () => {
    if(!accountThere){
      setUsernameChoiceViewBool(true)
    }
    else{
      handleLogin()
    }
    setSendVerificationCodeBool(false)
    
  }

  const handleLogin = async () => {
    
    datasetToCreate = {telephone: phoneNumber, 
    email: email, username: chosenusername}
    // Implement the logic to verify the entered verification code
    // and authenticate the user
    if(!accountThere){
        const createdDataSet = await createAccount({datasetToCreate})
        await storeUserLoginInfo(createdDataSet) //this should provide the information to be stored on the device
        onLoginSuccess();
    }
    else if(accountThere){
      storeUserLoginInfo(accountCredentials[0]) //this should provide the information to be stored on the device
      onLoginSuccess();
    }
    
    
    return
  };
  const createAccount = async ({datasetToCreate}) =>{
    try{
        console.log(datasetToCreate)
        const input = await axios.post(BACKEND_URL+'/user/create/' , datasetToCreate)
        createdDataSet = {username: input.data.username, email: input.data.email, telephone: input.data.telephone, id: input.data.id}
        setAccountCredentials(createdDataSet);
        return createdDataSet
    }
    
    catch(error){
        console.log(error)
    }
  }
  
  const renderLoginChoice = () =>{
    return(
      
        <View key={'loginChoice'} style={styles.container}>
      <Text style={styles.title}>Wilkommen bei FoodUp</Text>
      <View style={{flexDirection:'row'}} >
      <TouchableOpacity style={styles.bigbutton} onPress={handlePhoneLogin}>
        <Text style={styles.buttonText}>Login mit Telefonnummer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigbutton} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login mit Emailadresse</Text>
      </TouchableOpacity>
     </View>
     </View>
    )
  }
  const renderPhoneLogin = () => {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={'loginChoice'} style={styles.container}>
          <Text style={styles.title}>Einloggen mit deiner Telefonnummer</Text>

          <TextInput
            style={styles.input}
            placeholder="+43 XXX XXXX XXX"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          {phoneValidationMessage ? (
            <Text style={styles.warning}>{phoneValidationMessage}</Text>
          ) : null}
          
          <TouchableOpacity style={styles.smallbutton} onPress={handlePhoneValidation}>
            <Text style={styles.buttonText}>Aktivierungscode senden</Text>
          </TouchableOpacity>
          <Text style={styles.info}>Wenn du noch keinen Account hast, erstellen wir Dir automatisch einen.</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const renderEmailLogin = () =>{
    return(
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={'loginChoice'} style={styles.container}>
      <Text style={styles.title}>Einloggen mit deiner Emailadresse</Text>
      
      <TextInput
        style={styles.input}
        placeholder="max.mustermann@musterfrau.at"
        value={email}
        onChangeText={text => {
            // Convert the entered text to lowercase
            const lowercaseText = text.toLowerCase();
            setEmail(lowercaseText)}}
        keyboardType='email-address'
        autoCapitalize="none"
        
      />
      {emailValidationMessage ? (
            <Text style={styles.warning}>{emailValidationMessage}</Text>
          ) : null}
      <TouchableOpacity style={styles.smallbutton} onPress={handleEmailValidation}>
        <Text style={styles.buttonText}>Aktivierungscode senden</Text>
      </TouchableOpacity>
     <Text style={styles.info}>Wenn du noch keinen Account hast, erstellen wir Dir automatisch einen.</Text>
     </View></TouchableWithoutFeedback>
    )
  }
  const renderActivationCode = () =>{
    return(
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={'loginChoice'} style={styles.container}>
      <Text style={styles.title}>Aktivierungscode eingeben</Text>
      
      <TextInput
        style={styles.input}
        placeholder="XXXXX"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType='numeric'
        maxLength={5}
        
        
      />
      <TouchableOpacity style={styles.smallbutton} onPress={handleUsernameInput}>
        <Text style={styles.buttonText}>Los gehts</Text>
      </TouchableOpacity>
     </View></TouchableWithoutFeedback>
    )
  }
  const renderUsernameInput = () =>{
    return(
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={'usernameChoice'} style={styles.container}>
      <Text style={styles.title}>Such dir einen Namen aus</Text>
      
      <TextInput
        style={styles.input}
        placeholder="XXXXX"
        value={chosenusername}
        onChangeText={setChosenUsername}
        keyboardType='default'
        
        
        
      />
      <TouchableOpacity style={styles.smallbutton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Los gehts</Text>
      </TouchableOpacity>
     </View></TouchableWithoutFeedback>
    )
  }
  const renderLoginComponents = () => {
    if (loginChoiceViewBool) {
      return renderLoginChoice();
    } else if (phoneLoginViewBool) {
      return renderPhoneLogin();
    } else if (emailLoginViewBool) {
      return renderEmailLogin();
    } else if (sendVerificationCodeBool) {
      return renderActivationCode();
    }
    else if (usernameChoiceViewBool) {
      return renderUsernameInput();
    }
  };

  

  return (
    <View style={styles.container}>
    {renderLoginComponents()}
    </View>
        
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4dad88'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center'
  },
  input: {
    width: '80%',
    height: 80,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  bigbutton: {
    width: '50%',
    height: 120,
    backgroundColor: '#142A6B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  smallbutton: {
    padding: 30,
    height: 80,
    backgroundColor: '#142A6B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warning:{
    textAlign:'center',
  }
});

export default LoginForm;
