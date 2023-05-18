import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../tabs/hometab.js";
import SearchTab from "../tabs/searchtab.js";
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
import getUserLikes from "../../utilities/getUserLikes.js";
import fetchRestaurantData from "../../api/fetchRestaurantData.js";
import { View } from "react-native";
import SpinningWheel from "./spinningWheel.js";
import AuthContext from "../../utilities/authcontext.js";


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
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [userLikes, setUserLikes] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const { globalUserLocation } = useContext(AuthContext);
  console.log(globalUserLocation)
  const onRefresh = () => {
    setRefreshing(true);
    // Perform the necessary actions to refresh the screen or fetch new data
    gatherAllDataFromUser()
      .then(() => {
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
      });
  };

  const gatherAllDataFromUser = async () => {
    
    const userinfo = await getUserLoginInfo();
    const restaurants = await fetchRestaurantData();
    const userposts = await getUserPosts(userinfo.id, {"active":"true"});
    const userlikes = await getUserLikes(userinfo.id);

    setUserLoggedIn(userinfo);
    setUserPosts(userposts);
    setUserLikes(userlikes);
    setRestaurantData(restaurants);
    setIsLoading(false)
  };
  useEffect(() => {
    onRefresh();
  }, []);

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
            <HomeScreen restaurantData={restaurantData} onRefresh={onRefresh} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={tabTitles.search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="voicemail" size={size} color={color} />
            ),
            headerShown: false,
          }}
          component={SearchTab}
        />
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
          component={MapScreen}
        />
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
              likes={userLikes}
              onRefresh={onRefresh}
              userinfo={userLoggedIn}
              tabTitles={tabTitles}
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
    </Stack.Navigator>
  );
};
