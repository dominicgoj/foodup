import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import { createStackNavigator } from '@react-navigation/stack';
import UserContent from '../components/userContent';
import UserRestaurantDetail from '../components/userRestaurantDetail';
import UserRestaurantListScreen from '../components/userRestaurantListScreen';
import CustomHeader from '../components/costumheader';


function UserScreen({posts, likes, userinfo, onRefresh, tabTitles}) {
  const Stack = createStackNavigator();
  const [userRestaurants, setUserRestaurants] = useState([])
  const [refreshBool, setRefreshBool] = useState(false)
  useEffect(() => {
    const fetchUserRestaurants = async () => {
      try {
        const requestAllRestaurants = await axios.get(
          BACKEND_URL + "/restaurant/search?userid=" + userinfo.id
        );
        const userRestaurantsData = requestAllRestaurants.data;
        setUserRestaurants(userRestaurantsData);
        console.log("ausgeführt")
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchUserRestaurants();
  },[refreshBool]);

  useEffect(()=>{
    console.log("userRestaurants changed")
  }, [userRestaurants])

  const triggerRefresh = (updatedRestaurantData) =>{
    setRefreshBool(!refreshBool)
   
    
 
  }
  return (
      <Stack.Navigator>
        <Stack.Screen name="UserContent" options={{
          header: () => <CustomHeader arrowShown={false} logoShown={false} headerText={tabTitles.profile}/>,
        }}>{()=><UserContent posts={posts} likes={likes} userinfo={userinfo} onRefresh={onRefresh} />}</Stack.Screen>
        
        <Stack.Screen name="UserRestaurants" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><UserRestaurantListScreen restaurantData={userRestaurants}/>}
        </Stack.Screen>

        <Stack.Screen name="UserRestaurantDetail" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {(props) => (
          <UserRestaurantDetail
            {...props}
            restaurant={props.route.params.restaurant}
            triggerRefresh={triggerRefresh}
          />
        )}

        </Stack.Screen>
      </Stack.Navigator>
    
  );
}

export default UserScreen;