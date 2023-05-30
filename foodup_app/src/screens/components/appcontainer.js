import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthContext from '../../utilities/authcontext';
import AddContentScreen from "../tabs/addtab.js";
import UserScreen from "../tabs/usertab.js";
import Icon from "react-native-vector-icons/Entypo";
import CostumHeader from "./costumheader.js";
import MapScreen from "../tabs/maptab.js";
import RestaurantDetail from "./restaurantdetail.js";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "./costumheader.js";
import getUserLoginInfo from "../../utilities/retrieveloggedin.js";
import getUserPosts from "../../utilities/getUserPosts.js";
import getLikesAssociatedWithUser from "../../api/getLikesAssociatedWithUser.js";
import fetchRestaurantData from "../../api/fetchRestaurantData.js";
import fetchRestaurantLikeByUserID from "../../api/fetchRestaurantLikeByUserID.js";
import { View } from "react-native";
import SpinningWheel from "./spinningWheel.js";
import FilteredRestaurantsView from "./filteredRestaurantsView.js";
import Map from "./map.js";
import getUserNotifications from "../../api/getUserNotifications.js";
import getPostsByHex from "../../api/getPostsByHex.js";
import getUserRestaurants from "../../api/getUserRestaurants.js";
import ForYouTab from "../tabs/foryoutab.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabTitles = {
  foryou: "For You",
  search: "Suche",
  post: "Beitrag posten",
  map: "Karte",
  profile: "Profil",
  yourrestaurants: "Dein Restaurant",
};
export default function AppContainer() {
  const authContext = useContext(AuthContext)
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [userPosts, setUserPosts] = useState(authContext.userPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [userRestaurantLikes, setUserRestaurantLikes] = useState(authContext.userRestaurantLikes)
  const [likesAssociatedWithUser, setLikesAssociatedWithUser] = useState(authContext.likesAssociatedWithUser)
  const [userNotifications, setUserNotifications] = useState([])
  const [userinfo, setUserInfo] = useState(authContext.loggedInUserData)
  const [postsByHex, setPostsByHex] = useState(authContext.postsForRestaurantOwner)
  const [userRestaurants, setUserRestaurants] = useState(authContext.userRestaurants)
  //// USE EFFECT TO UPDATE LIKES IMMEDIATELY, TO NOT WAIT FOR SERVER
  useEffect(()=>{
    const updateRestaurantLikes = async () => {
      if(authContext.loggedInUserData)
      {
      setUserRestaurantLikes(authContext.userRestaurantLikes)
      //console.log("auth context fetch: restaurant likes")
      const userrestaurantlikes = await fetchRestaurantLikeByUserID(authContext.loggedInUserData); //all likes given by user
      setLikesAssociatedWithUser(userrestaurantlikes);
      //console.log("server fetch: restaurant likes")
      }
    }
    updateRestaurantLikes()
  }, [authContext.userRestaurantLikes])


  useEffect(()=>{
    
      const updateLikesAssociatedWithUser = async () => {
        if(authContext.loggedInUserData){
        setLikesAssociatedWithUser(authContext.likesAssociatedWithUser)
        //console.log("auth context fetch: user likes", authContext.likesAssociatedWithUser)
        const likes = await getLikesAssociatedWithUser(authContext.loggedInUserData); //all likes given by user
        setLikesAssociatedWithUser(likes);
        //console.log("server fetch: user likes: ", likes)
      }
      
    }
    
    updateLikesAssociatedWithUser()
  }, [authContext.likesAssociatedWithUser])

  useEffect(()=>{
    const updateUserNotifications = async () => {
      if(authContext.loggedInUserData){
        setUserNotifications(authContext.userNotifications)
      //console.log("auth context fetch: user notifications", authContext.userNotifications)
      const notifications = await getUserNotifications(authContext.loggedInUserData); //all likes given by user
      setUserNotifications(notifications);
      //console.log("server fetch: user likes: ", notifications)
      }
      
    }
    updateUserNotifications()
  }, [authContext.userNotifications])


  useEffect(()=>{
    const updateUserPosts = async () => {
      if(authContext.loggedInUserData){
        setUserPosts(authContext.userPosts)
      //console.log("auth context fetch: user notifications", authContext.userNotifications)
      const userposts = await getUserPosts(authContext.loggedInUserData.id, {"active":"true"}); //all likes given by user
      setUserPosts(userposts);
      //console.log("server fetch: user likes: ", notifications)
      }
      
    }
    updateUserPosts()
  }, [authContext.userPosts])


  useEffect(()=>{
    const updateUserInfo = async () => {
      if(authContext.loggedInUserData){
        setUserInfo(authContext.loggedInUserData)
      //console.log("auth context fetch: user notifications", authContext.userNotifications)
      const userinfo = await getUserLoginInfo(); //all likes given by user
      
      setUserInfo(userinfo);
      //console.log("server fetch: user likes: ", notifications)
      }
      
    }
    updateUserInfo()
  }, [authContext.loggedInUserData])

  useEffect(()=>{
    const updatePostsByHex = async () => {
      if(authContext.postsByHex){
        setPostsByHex(authContext.postsByHex)
      const postsbyhex = await getPostsByHex(authContext.userNotifications); //all likes given by user
      
      setPostsByHex(postsbyhex);
      }
      
    }
    updatePostsByHex()
  }, [authContext.postsByHex])


  useEffect(()=>{
    const updateUserRestaurants = async () => {
      if(authContext.userRestaurants){
        setUserRestaurants(authContext.userRestaurants)
      const userrestaurants = await getUserRestaurants(authContext.loggedInUserData); //all likes given by user
      
      setUserRestaurants(userrestaurants);
      }
      
    }
    updateUserRestaurants()
  }, [authContext.userRestaurants])

  useEffect(()=>{
    const updateRestaurantData = async () => {
      if(authContext.restaurantData){
        setUserRestaurants(authContext.restaurantData)
      const restaurantdata = await fetchRestaurantData(); //all likes given by user
      
      setRestaurantData(restaurantdata);
      }
      
    }
    updateRestaurantData()
  }, [authContext.restaurantData])

  const gatherAllDataFromUser = async () => {
    const userinfo = await getUserLoginInfo();
    const restaurants = await fetchRestaurantData();
    const userposts = await getUserPosts(userinfo.id, {"active":"true"}); //all posts by user
    const likesAssociatedWithUser = await getLikesAssociatedWithUser(userinfo); //all likes given by user
    const userrestaurantlikes = await fetchRestaurantLikeByUserID(userinfo) //saved restaurants by user
    const usernotes = await getUserNotifications(userinfo)
    const postsbyhex = await getPostsByHex(usernotes)
    setUserLoggedIn(userinfo);
    setUserPosts(userposts);
    setLikesAssociatedWithUser(likesAssociatedWithUser);
    setRestaurantData(restaurants);
    setUserRestaurantLikes(userrestaurantlikes)
    setPostsByHex(postsbyhex)
    setUserNotifications(usernotes)
    setIsLoading(false)
    console.log("refreshing")
  };




  return (
    <View style={{flex: 1}}>
      {isLoading?(
        <SpinningWheel />
      ):(
        <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={tabTitles.foryou}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerShown: false,
          }}
        >
          {() => (
            <ForYouTab restaurantData={restaurantData} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={tabTitles.post}
          component={AddTabStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="camera" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={tabTitles.map}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="location" size={size} color={color} />
            ),
            headerShown: false,
          }}
        >{()=>(<MapScreen restaurantData={restaurantData}/>)}</Tab.Screen>
        <Tab.Screen
          name={tabTitles.profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" size={size} color={color} />
            ),
            headerShown: false,
          }}
        >
          {() => (
            <UserScreen
              posts={userPosts}
              likesAssociatedWithUser={likesAssociatedWithUser}
              userPosts={userPosts}
              userinfo={userinfo}
              tabTitles={tabTitles}
              userRestaurantLikes={userRestaurantLikes}
              userNotifications={userNotifications}
              postsByHex={postsByHex}
              userRestaurants={userRestaurants}
              
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      
    </NavigationContainer>
      )}
    
    
    </View>
  );
}

const AddTabStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddTab"
        component={AddContentScreen}
        options={{
          header: () => (
            <CostumHeader
              arrowShown={false}
              logoShown={false}
              headerText={tabTitles.post}
            />
          ),
        }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}/>
        <Stack.Screen name="FilteredRestaurants" 
        component={FilteredRestaurantsView}
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} headerText={"Filter"} />,
        }} />
    </Stack.Navigator>
    

  );
};
