import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContainer from './src/screens/components/appcontainer';
import LoginForm from './src/screens/components/login.js';
import getUserLoginInfo from './src/utilities/retrieveloggedin.js';
import { deleteUserLoginInfo } from './src/utilities/deleteloggedin';
import AuthContext from './src/utilities/authcontext';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import TestComponent from './src/screens/components/testcomponent';
import getUserLocation from './src/utilities/getUserLocation';
import createLoginData from './src/utilities/createLoginData';
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [globalUserLocation, setGlobalUserLocation] = useState()
  const [testMode, setTestmode] = useState(false)
  // Rest of your app code

  useEffect(() => {
    checkUserLoginStatus();
  }, [loggedIn]); // Include loggedIn in the dependency array
  useEffect(()=>{
    handleGetUserLocation();
  },[])

  const checkUserLoginStatus = async () => {
    const userInfo = await getUserLoginInfo(handleLoginSuccess);
    if (userInfo) {
      setLoggedIn(true);
      setLoggedInUserData(userInfo)
      createLoginData(userInfo.id)
    } else {
      setLoggedIn(false);
    }
    setLoginChecked(true);
  };
  const handleGetUserLocation = async () => {
    const location = await getUserLocation()
    if(location){
      setGlobalUserLocation(location)
    }
    
  }
  const handleLogout = async () =>{
    await deleteUserLoginInfo()
    setLoggedIn(false)
    setLoggedInUserData(null)

  }

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {testMode ? (
        <TestComponent />
      ) : (
        <AuthContext.Provider
          value={{
            loggedInUserData: loggedInUserData,
            onLogout: handleLogout,
            globalUserLocation : globalUserLocation,
          }}
        >
          {loginChecked ? (
            loggedIn ? (
              <AppContainer />
            ) : (
              <View style={{ flex: 1 }}>
                <NavigationContainer>
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                </NavigationContainer>
              </View>
            )
          ) : null}
        </AuthContext.Provider>
      )}
    </SafeAreaView>
  );
  
}
