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
import RestaurantRegisterAddPhoto from "../components/registerRestaurantsStackScreens/restaurantRegisterAddPhoto";
import RestaurantRegisterSelectPhoto from "../components/registerRestaurantsStackScreens/restaurantRegisterSelectPhoto";
import UserSavedContents from '../components/userSavedContents';
import UserLikeContents from '../components/userLikeContents';
import RestaurantDetail from '../components/restaurantdetail';
import RestaurantRegisterDescription from '../components/registerRestaurantsStackScreens/restaurantRegisterDescription';
import MapScreen from '../components/map';
function UserScreen({posts, likesAssociatedWithUser, userinfo, onRefresh, tabTitles, userRestaurantLikes}) {
  const Stack = createStackNavigator();
  const [userRestaurants, setUserRestaurants] = useState([])
  const [refreshBool, setRefreshBool] = useState(false)
  const [restaurantRegistered, setRestaurantRegistered] = useState(false);
  const {
    getRestaurantName,
    getRestaurantTelephone,
    getRestaurantEmail,
    getRestaurantWebsite,
    getRestaurantStreet,
    getRestaurantZip,
    getRestaurantCity,
    getRestaurantTags,
    getRestaurantFirstName,
    getRestaurantLastName,
    setRestaurantName,
    setRestaurantTelephone,
    setRestaurantEmail,
    setRestaurantWebsite,
    setRestaurantStreet,
    setRestaurantZip,
    setRestaurantCity,
    setRestaurantTags,
    setRestaurantFirstName,
    setRestaurantLastName,
    getRestaurantDataset,
    getRestaurantImage,
    setRestaurantImage,
    getRestaurantImages,
    setRestaurantImages,
    resetRegisterRestaurant,
    getRestaurantDescription,
    setRestaurantDescription
} = RestaurantRegisterHelpers()

  const triggerRefresh = () =>{
    setRefreshBool(!refreshBool)
  }
  useEffect(()=>{
    if(restaurantRegistered){
      resetRegisterRestaurant()
    }
    return(
      setRestaurantRegistered(false)
    )
  },[restaurantRegistered])

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
      onRefresh();
      
    }, [])
  );

  return (
      <Stack.Navigator>
        <Stack.Screen name="UserContent" options={{
          header: () => <CustomHeader arrowShown={false} logoShown={false} headerText={tabTitles.profile}/>,
        }}>{()=><UserContent posts={posts} likesAssociatedWithUser={likesAssociatedWithUser} userinfo={userinfo} onRefresh={onRefresh} triggerRefresh={triggerRefresh}
        userRestaurantLikes={userRestaurantLikes}/>}</Stack.Screen>
        
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
        <Stack.Screen name="RenderRestaurantRegisterFinal" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><RenderRestaurantRegistered 
          dataset={getRestaurantDataset} 
          setRestaurantRegistered={setRestaurantRegistered} 
          userinfo={userinfo} 
          navigateBackDestination={"UserContent"} />}
        </Stack.Screen>
        <Stack.Screen
        name="UserRestaurantDetailView"
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
        component={UserRestaurantDetailView} // Pass the component directly
      />
      <Stack.Screen
        name="RestaurantRegisterAddPhoto"
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => <RestaurantRegisterAddPhoto setRestaurantImages={setRestaurantImages}/>}
      </Stack.Screen>
      <Stack.Screen
        name="RestaurantRegisterSelectPhoto"
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
      >{()=><RestaurantRegisterSelectPhoto getRestaurantImages={getRestaurantImages} getRestaurantName={getRestaurantName} setRestaurantImage={setRestaurantImage}/>}</Stack.Screen>
      <Stack.Screen name="UserSavedContents" options={{header: () => <CustomHeader arrowShown={true} logoShown={false} headerText={"Gespeicherte Restaurants"}/>}} >
        {()=><UserSavedContents userRestaurantLikes={userRestaurantLikes} />}
        </Stack.Screen>
        <Stack.Screen name="UserLikeContents" options={{header: () => <CustomHeader arrowShown={true} logoShown={false} headerText={"Markierte Inhalte"}/>}} >
        {()=><UserLikeContents userinfo={userinfo} likesAssociatedWithUser={likesAssociatedWithUser}/>}
        </Stack.Screen>
        <Stack.Screen
          name="Detail"
          component={RestaurantDetail}
          options={{
            header: () => <CustomHeader arrowShown={true} logoShown={false} />,
          }}
        />
        <Stack.Screen
        name="RestaurantRegisterDescription"
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RestaurantRegisterDescription
            getRestaurantDescription={getRestaurantDescription}
            setRestaurantDescription={setRestaurantDescription}
            
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}/>

      </Stack.Navigator>
      
    
  );
}

export default UserScreen;