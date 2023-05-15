import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import { createStackNavigator } from '@react-navigation/stack';
import UserContent from '../components/userContent';
import UserRestaurantListScreen from '../components/userRestaurantListScreen';
import CustomHeader from '../components/costumheader';
import RenderRestaurantRegisterName from '../components/registerRestaurantsStackScreens/restaurantRegisterName'
import RestaurantRegisterHelpers from '../components/registerRestaurantsStackScreens/restaurantRegisterHelpers';
import RenderRestaurantRegisterTags from '../components/registerRestaurantsStackScreens/restaurantRegisterTags'
import RenderRestaurantRegisterAddress from '../components/registerRestaurantsStackScreens/restaurantRegisterAddress'
import RenderRestaurantRegisterPhoneEmail from '../components/registerRestaurantsStackScreens/restaurantRegisterPhoneEmail'
import RenderRestaurantRegistered from '../components/registerRestaurantsStackScreens/restaurantRegisterFinal';
import UserRestaurantEdit from '../components/userRestaurantEdit';
import UserRestaurantDetailView from '../components/userRestaurantDetailView';
function UserScreen({posts, likes, userinfo, onRefresh, tabTitles}) {
  const Stack = createStackNavigator();
  const [userRestaurants, setUserRestaurants] = useState([])
  const [refreshBool, setRefreshBool] = useState(false)
  const {
    getRestaurantName,
    getRestaurantTelephone,
    getRestaurantEmail,
    getRestaurantWebsite,
    getRestaurantStreet,
    getRestaurantZip,
    getRestaurantCity,
    getRestaurantTags,
    setRestaurantName,
    setRestaurantTelephone,
    setRestaurantEmail,
    setRestaurantWebsite,
    setRestaurantStreet,
    setRestaurantZip,
    setRestaurantCity,
    setRestaurantTags,
    getRestaurantDataset,
    setRestaurantDataset
} = RestaurantRegisterHelpers()

  const triggerRefresh = () =>{
    console.log("refresh triggered")
    setRefreshBool(!refreshBool)
  }

  useEffect(()=>{
    const fetchUserRestaurants = async () => {
      try {
        const requestAllRestaurants = await axios.get(
          BACKEND_URL + "/restaurant/search?userid=" + userinfo.id
        );
        const userRestaurantsData = requestAllRestaurants.data;
        setUserRestaurants(userRestaurantsData);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchUserRestaurants();
  }, [refreshBool])

  useFocusEffect(
    React.useCallback(() => {
      // Add your focus effect logic here
      triggerRefresh();
      
      return () => {
        // Add your clean-up logic here
        console.log('Screen unfocused');
      };
    }, [])
  );

  return (
      <Stack.Navigator>
        <Stack.Screen name="UserContent" options={{
          header: () => <CustomHeader arrowShown={false} logoShown={false} headerText={tabTitles.profile}/>,
        }}>{()=><UserContent posts={posts} likes={likes} userinfo={userinfo} onRefresh={onRefresh} triggerRefresh={triggerRefresh}/>}</Stack.Screen>
        
        <Stack.Screen name="UserRestaurants" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><UserRestaurantListScreen restaurantData={userRestaurants} triggerRefresh={triggerRefresh}/>}
        </Stack.Screen>

        <Stack.Screen
        name="UserRestaurantEdit"
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {({ route }) => (
          <UserRestaurantEdit
            route={route}
            triggerRefresh={triggerRefresh}
          />
        )}
      </Stack.Screen>
        <Stack.Screen name="UserRegisterRestaurantName" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><RenderRestaurantRegisterName getRestaurantName={getRestaurantName} setRestaurantName={setRestaurantName}/>}
        </Stack.Screen>
        <Stack.Screen name="UserRegisterRestaurantTags" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><RenderRestaurantRegisterTags getRestaurantTags={getRestaurantTags} setRestaurantTags={setRestaurantTags}/>}
        </Stack.Screen>
        <Stack.Screen name="UserRegisterRestaurantAddress" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><RenderRestaurantRegisterAddress 
          getRestaurantStreet={getRestaurantStreet} 
          setRestaurantStreet={setRestaurantStreet}
          getRestaurantZip={getRestaurantZip} 
          setRestaurantZip={setRestaurantZip}
          getRestaurantCity={getRestaurantCity} 
          setRestaurantCity={setRestaurantCity}
          />}
        </Stack.Screen>
        <Stack.Screen name="UserRegisterRestaurantPhoneEmail" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><RenderRestaurantRegisterPhoneEmail 
          getRestaurantTelephone={getRestaurantTelephone} 
          setRestaurantTelephone={setRestaurantTelephone}
          getRestaurantEmail={getRestaurantEmail}
          setRestaurantEmail={setRestaurantEmail} 
          getRestaurantWebsite={getRestaurantWebsite}
          setRestaurantWebsite={setRestaurantWebsite} 
          />}
        </Stack.Screen>
        <Stack.Screen name="RenderRestaurantRegistered" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><RenderRestaurantRegistered dataset={getRestaurantDataset} setDataset={setRestaurantDataset} userinfo={userinfo}/>}
        </Stack.Screen>
        <Stack.Screen
        name="UserRestaurantDetailView"
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
        component={UserRestaurantDetailView} // Pass the component directly
      />
        
          
      </Stack.Navigator>
    
  );
}

export default UserScreen;