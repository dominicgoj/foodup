import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContainer from './src/screens/components/appcontainer';
import LoginForm from './src/screens/components/login.js';
import getUserLoginInfo from './src/utilities/retrieveloggedin.js';
import { deleteUserLoginInfo } from './src/utilities/deleteloggedin';
import AuthContext from './src/utilities/authcontext';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState(null)

  // Rest of your app code

  useEffect(() => {
    checkUserLoginStatus();
  }, [loggedIn]); // Include loggedIn in the dependency array
  useEffect(()=>{
    console.log("change in authcontext")
  },[AuthContext.loggedInUserData])

  const checkUserLoginStatus = async () => {
    const userInfo = await getUserLoginInfo(handleLoginSuccess);
    if (userInfo) {
      setLoggedIn(true);
      setLoggedInUserData(userInfo)
    } else {
      setLoggedIn(false);
    }
    setLoginChecked(true);
  };
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
      <AuthContext.Provider value={{ loggedInUserData: loggedInUserData, onLogout: handleLogout }}>
      {loginChecked ? (loggedIn ? <AppContainer /> : <LoginForm onLoginSuccess={handleLoginSuccess} />) : null}
      </AuthContext.Provider>
    </SafeAreaView>
  );
}
