import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { SettingsStyle } from "../../styles/settingsstyle";
import AuthContext from '../../utilities/authcontext';
import SettingsOption from '../../data/settingsoptions.json';
import { Colors } from "../../styles/colors";
import Dialog from "react-native-dialog";
import FetchUserData from "../../api/fetchUser";
import UpdateUser from "../../api/updateuser";
import Regex from "./regex";
import UpdateUserToInactive from "../../api/deleteuser";
import { deleteUserLoginInfo } from "../../utilities/deleteloggedin";
const UserSettings = () => {
  const settingsoptions_german = SettingsOption.German;
  const authContext = useContext(AuthContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneNumberNotValid, setPhoneNumberNotValid] = useState(false)
  const [emailNotValid, setEmailNotValid] = useState(false)
  
  const [text, setText] = useState({});
  const [showInput, setShowInput] = useState({});

  const setUserData = async () => {
    const userdata = await FetchUserData(authContext.loggedInUserData);
    setUsername(userdata.username);
    setPhone(userdata.telephone);
    setEmail(userdata.email);
    setText({
      'change_username': userdata.username,
      'change_email': userdata.email,
      'change_phone': userdata.telephone,
    });
  };
  
  useEffect(() => {
    setUserData();
  }, []);
  
  const handleTextChange = (inputText, key) => {
    if (key === 'change_email') {
      inputText = inputText.toLowerCase();
    }
    setText((prevState) => ({
      ...prevState,
      [key]: inputText,
    }));
  };

  const handleRowClick = (key) => {
    if (key === 'delete_account') {
      setShowInput({})
      setShowConfirmation(true)
      
    } else if (key === 'logout') {
      setShowInput({})
      authContext.onLogout();
    }
    else{
      setShowInput(prevState => {
        const updatedState = { ...prevState };
        for (const stateKey in updatedState) {
          if (stateKey !== key) {
            updatedState[stateKey] = false;
          }
        }
        updatedState[key] = !prevState[key];
        return updatedState;
      });
      setUserData()
      setPhoneNumberNotValid(false)
      setEmailNotValid(false)
    }
    
  

    
  };
   const handleConfirm = (key) => {
    //first regex
    const phone_valid = Regex('telephone', text.change_phone)
    const email_valid = Regex('email', text.change_email)
    if(phone_valid){
      setPhoneNumberNotValid(true)
    }
    else if(email_valid){
      setEmailNotValid(true)
    }
    else{
      UpdateUser(authContext.loggedInUserData, text)
      setShowInput(false)
    }
    
    
  };
  const handleDeleteAccount = () =>{
    UpdateUserToInactive(authContext.loggedInUserData)
    authContext.onLogout();
    deleteUserLoginInfo()
    setShowConfirmation(false);
  }
  const handleCancel = () => {
    // Handle the cancel action
    setShowConfirmation(false);
  };



  const renderFields = () => {
    return Object.entries(settingsoptions_german).map(([key, value]) => {
      const inputValue = text[key] || '';
      return(
      
      <View key={key}>
        {key === 'settings_header' ? (
          <View style={[SettingsStyle.row, { justifyContent: 'center' }]}>
            <Icon name={value[1]} style={SettingsStyle.settingsIcons} />
            <Text style={SettingsStyle.headerSettings}>{value[0]}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => handleRowClick(key)}>
            <View style={[SettingsStyle.row]}>
              <Icon name={value[1]} style={SettingsStyle.settingsIcons} />
              <Text style={SettingsStyle.settingsOptionsText}>{value[0]}</Text>
            </View>
          </TouchableOpacity>
        )}
        {showInput[key] && (
          <View>
             {phoneNumberNotValid?<Text style={SettingsStyle.warningText}>Telefonnummer ist inkorrekt.</Text>:emailNotValid?<Text style={SettingsStyle.warningText}>Email-Adresse ist inkorrekt</Text>:null}
          <View style={[SettingsStyle.row]}>
           
            <TextInput
              style={SettingsStyle.inputField}
              onChangeText={(text) => handleTextChange(text, key)}
              value={inputValue}
              multiline={false}
            />
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleConfirm(key)}>
              <View style={[SettingsStyle.buttonContainer, Colors.primaryBackground]}>
                <Text style={SettingsStyle.buttonText}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
          </View>
        )}
      </View>
    )});
  };

  return (
    <AuthContext.Consumer>
      {authContext => (
        <View style={SettingsStyle.container}>
          {renderFields()}
          {showConfirmation ? (<Dialog.Container visible={showConfirmation}>
        <Dialog.Title>Bestätigen</Dialog.Title>
        <Dialog.Description>
         Bist du dir sicher dass du deinen Account löschen möchtest?
        </Dialog.Description>
        <Dialog.Button label="Abbrechen" onPress={handleCancel} />
        <Dialog.Button label="Bestätigen" onPress={handleDeleteAccount} />
      </Dialog.Container>):(null)}
          
        </View>
      )}
    </AuthContext.Consumer>
  );
};

export default UserSettings;
