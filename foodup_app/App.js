import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContainer from './src/screens/components/appcontainer';
import LoginForm from './src/screens/components/login.js';
import getUserLoginInfo from './src/utilities/retrieveloggedin.js';
import { deleteUserLoginInfo } from './src/utilities/deleteloggedin';
import AuthContext from './src/utilities/authcontext';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import TestComponent from './src/screens/components/testcomponent';
import getUserLocation from './src/utilities/getUserLocation';
import createLoginData from './src/utilities/createLoginData';
import fetchRestaurantLikeByUserID from './src/api/fetchRestaurantLikeByUserID';
import getLikesAssociatedWithUser from './src/api/getLikesAssociatedWithUser';
import getUserNotifications from './src/api/getUserNotifications';
import getUserPosts from './src/utilities/getUserPosts';
import getUserSpecifications from './src/utilities/getUserSpecifications';
import getUserRestaurants from './src/api/getUserRestaurants';
import fetchRestaurantData from './src/api/fetchRestaurantData';
import getPostsByHex from './src/api/getPostsByHex';
import SpinningWheel from './src/screens/components/spinningWheel';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [globalUserLocation, setGlobalUserLocation] = useState();
  const [testMode, setTestmode] = useState(false);
  const [userRestaurantLikes, setUserRestaurantLikes] = useState([]);
  const [likesAssociatedWithUser, setLikesAssociatedWithUser] = useState([])
  const [userNotifications, setUserNotifications] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [userSpecifications, setUserSpecifications] = useState(null)
  const [postsByHex, setPostsByHex] = useState([])
  const [userRestaurants, setUserRestaurants] = useState([])
  const [restaurantData, setRestaurantData] = useState([])
  const [restaurantIds, setRestaurantIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    checkUserLoginStatus();
  }, [loggedIn]); // Include loggedIn in the dependency array
  useEffect(()=>{
    handleGetUserLocation();
  },[])

  const checkUserLoginStatus = async () => {
    const userInfo = await getUserLoginInfo(handleLoginSuccess);
    setLoggedInUserData(userInfo)
    if(userInfo){
      setLoggedIn(true);
      const userRestaurantLikes = await fetchRestaurantLikeByUserID(userInfo)
      const likesAssociatedWithUser = await getLikesAssociatedWithUser(userInfo)
      const usernotes = await getUserNotifications(userInfo)
      const userposts = await getUserPosts(userInfo.id, {"active":"true"}); //all posts by user
      const userspecs = await getUserSpecifications(userInfo)
      const postsbyhex = await getPostsByHex(usernotes)
      const userrestaurants = await getUserRestaurants(userInfo)
      const restaurantdata = await fetchRestaurantData()
      const restaurantIds = restaurantdata.map((item)=>item.id)
      
      createLoginData(userInfo.id)
      setUserRestaurantLikes(userRestaurantLikes)
      setLikesAssociatedWithUser(likesAssociatedWithUser)
      setUserNotifications(usernotes)
      setUserPosts(userposts)
      setUserSpecifications(userspecs)
      setPostsByHex(postsbyhex)
      setUserRestaurants(userrestaurants)
      setRestaurantData(restaurantdata)
      setRestaurantIds(restaurantIds)
      setIsLoading(false)
      

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

  const handleGlobalRefresh = () => {
    checkUserLoginStatus()
    console.log("fresh")
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {testMode ? (
        <TestComponent />
      ) : (

        <AuthContext.Provider
          value={{
            loggedInUserData: loggedInUserData,
            setLoggedInUserData : setLoggedInUserData,
            onLogout: handleLogout,
            globalUserLocation : globalUserLocation,
            userRestaurantLikes : userRestaurantLikes,
            setUserRestaurantLikes : setUserRestaurantLikes,
            likesAssociatedWithUser : likesAssociatedWithUser,
            setLikesAssociatedWithUser : setLikesAssociatedWithUser,
            userNotifications : userNotifications,
            setUserNotifications : setUserNotifications,
            userPosts : userPosts,
            setUserPosts : setUserPosts,
            userSpecifications : userSpecifications,
            postsByHex : postsByHex,
            userRestaurants : userRestaurants,
            setUserRestaurants : setUserRestaurants,
            handleGlobalRefresh : handleGlobalRefresh,
            restaurantData : restaurantData,
            setRestaurantData : setRestaurantData,
            restaurantIds : restaurantIds
            
          }}
        >
          {loggedIn?(
            isLoading?(
              <View style={{flex: 1}}><SpinningWheel /></View>
            ):(
              <AppContainer />
            )
          ):(
            <View style={{ flex: 1 }}>
                <NavigationContainer>
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                </NavigationContainer>
              </View>
          )}
          
        </AuthContext.Provider>
      )}
    </SafeAreaView>
  );
  
}
