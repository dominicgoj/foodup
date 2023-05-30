import React, { useState, useEffect } from "react";

export default function LoginHelper() {

  const initialUserLoginState = {
    userPhoneNumber: '',
    userEmail: '',
    userActivationDevice: {},
    userAccountThere: false,
    userAccountCredentials: null,
    username: "",
    userProfileImage: null,
  };

  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userActivationDevice, setUserActivationDevice] = useState({});
  const [userAccountThere, setUserAccountThere] = useState(false)
  const [userAccountCredentials, setUserAccountCredentials] = useState(null)
  const [Username, setUsername] = useState("")
  const [userProfileImage, setUserProfileImage] = useState("")
  

  // Getter methods
  const getLoginPhoneNumber = () => userPhoneNumber;
  const getLoginEmail = () => userEmail;
  const getLoginActivationDevice = () => userActivationDevice;
  const getLoginAccountThere = () => userAccountThere;
  const getLoginAccountCredentials = () => userAccountCredentials;
  const getLoginUsername = () => Username;
  const getUserProfileImage = () => userProfileImage;
  const getAllStates = () => {
    return {
      userPhoneNumber,
      userEmail,
      userActivationDevice,
      userAccountThere,
      userAccountCredentials,
      userProfileImage,
      Username
    };
  };

  // Setter methods
  const setLoginPhoneNumber = (newValue) => setUserPhoneNumber(newValue);
  const setLoginEmail = (newValue) => setUserEmail(newValue);
  const setLoginActivationDevice = (newValue) => setUserActivationDevice(newValue);
  const setAccountThere = (newValue) => setUserAccountThere(newValue);
  const setAccountCredentials = (newValue) => setUserAccountCredentials(newValue);
  const setLoginUsername = (newValue) => setUsername(newValue);
  const setAccountProfileImage = (newValue) => setUserProfileImage(newValue)

  //Reset States
  const resetLoginStates = () => {
    setUserPhoneNumber(initialUserLoginState.userPhoneNumber);
    setUserEmail(initialUserLoginState.userEmail);
    setUserActivationDevice(initialUserLoginState.userActivationDevice);
    setUserAccountThere(initialUserLoginState.userAccountThere);
    setUserAccountCredentials(initialUserLoginState.userAccountCredentials);
    setUsername(initialUserLoginState.username);
    setUserProfileImage(initialUserLoginState.userProfileImage)
  };


  return {
    getLoginPhoneNumber,
    setLoginPhoneNumber,
    getLoginEmail,
    setLoginEmail,
    getLoginActivationDevice,
    setLoginActivationDevice,
    getLoginAccountThere,
    getLoginAccountCredentials,
    setAccountThere,
    setAccountCredentials,
    getLoginUsername,
    setLoginUsername,
    getUserProfileImage,
    setAccountProfileImage,
    resetLoginStates,
    getAllStates



    
  };
}
