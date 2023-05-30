import React, { useState, useEffect } from 'react';
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
import FilteredRestaurantsView from '../components/filteredRestaurantsView';
import RenderChangeSelectProfileImg from '../components/loginComponents/changeSelectProfileImg'
import LoginHelper from '../components/loginComponents/loginHelper';
import RestaurantInfoCard from '../components/restaurantInfoCard';
import Feed from '../components/feed';
import ForeignUserProfile from '../components/foreignUserProfile';
function UserScreen({posts, likesAssociatedWithUser, userinfo, tabTitles, userRestaurantLikes, userNotifications, postsByHex, userRestaurants, userPosts}) {
  const Stack = createStackNavigator();
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
    setRestaurantName,
    setRestaurantTelephone,
    setRestaurantEmail,
    setRestaurantWebsite,
    setRestaurantStreet,
    setRestaurantZip,
    setRestaurantCity,
    setRestaurantTags,
    getRestaurantDataset,
    setRestaurantImage,
    getRestaurantImages,
    setRestaurantImages,
    resetRegisterRestaurant,
    getRestaurantDescription,
    setRestaurantDescription
} = RestaurantRegisterHelpers()

const {
  getUserProfileImage,
  setAccountProfileImage
} = LoginHelper()

  useEffect(()=>{
    if(restaurantRegistered){
      resetRegisterRestaurant()
    }
    return(
      setRestaurantRegistered(false)
    )
  },[restaurantRegistered])



  return (
      <Stack.Navigator>
        <Stack.Screen name="UserContent" options={{
          header: () => <CustomHeader arrowShown={false} logoShown={false} headerText={tabTitles.profile}/>,
        }}>{()=><UserContent 
          userNotifications={userNotifications} 
          posts={posts} 
          likesAssociatedWithUser={likesAssociatedWithUser} 
          userinfo={userinfo}
          userRestaurantLikes={userRestaurantLikes}
          postsByHex={postsByHex}
          userPosts={userPosts}
          />}</Stack.Screen>
        
        <Stack.Screen name="UserRestaurants" options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}>
          {()=><UserRestaurantListScreen restaurantData={userRestaurants}/>}
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
        {() => <RestaurantRegisterAddPhoto setRestaurantImages={setRestaurantImages} cameToChangePhotoOnly={false}/>}
      </Stack.Screen>
      <Stack.Screen
        name="RestaurantRegisterSelectPhoto"
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} />,
        }}
      >{()=><RestaurantRegisterSelectPhoto getRestaurantImages={getRestaurantImages} 
      getRestaurantName={getRestaurantName} setRestaurantImage={setRestaurantImage}
      getRestaurantTags={getRestaurantTags} getRestaurantDescription={getRestaurantDescription}
      setRestaurantDescription={setRestaurantDescription} setRestaurantName={setRestaurantName}
      setRestaurantTags={setRestaurantTags}/>}</Stack.Screen>
      <Stack.Screen name="UserSavedContents" options={{header: () => <CustomHeader arrowShown={true} logoShown={false} headerText={"Gespeicherte Restaurants"}/>}} >
        {()=><UserSavedContents userRestaurantLikes={userRestaurantLikes} userNotifications={userNotifications} />}
        </Stack.Screen>
        <Stack.Screen name="UserLikeContents" options={{header: () => <CustomHeader arrowShown={true} logoShown={false} headerText={"Neuigkeiten"}/>}} >
        {()=><UserLikeContents userinfo={userinfo} 
        likesAssociatedWithUser={likesAssociatedWithUser} 
        userNotifications={userNotifications}
        posts={posts} 
        postsByHex={postsByHex}
        
        />}
        </Stack.Screen>
        <Stack.Screen
          name="Detail"
          options={{
            header: () => <CustomHeader arrowShown={true} logoShown={false} />,
          }}
          component={RestaurantDetail}
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
      <Stack.Screen name="FilteredRestaurants" 
        component={FilteredRestaurantsView}
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} headerText={"Filter"} />,
        }} />
        <Stack.Screen name="UserChangePhotoPage" 
        options={{
          header: () => <CustomHeader arrowShown={true} logoShown={false} headerText={"Profilbild ändern"} />,
        }}
         >
        {()=><RenderChangeSelectProfileImg userinfo={userinfo} setAccountProfileImage={setAccountProfileImage} />}
        </Stack.Screen>
        <Stack.Screen
      name="RestaurantInfoCard"
      options={{
        header: () => <CustomHeader arrowShown={true} logoShown={false} />,
      }}
      component={RestaurantInfoCard}
      />
        <Stack.Screen
      name="RestaurantDetailFeed"
      component={Feed} />
      <Stack.Screen 
      name="ShowForeignUserContent"
      component={ForeignUserProfile}
      options={{
        header: () => <CustomHeader arrowShown={true} logoShown={false} />,
      }} />
      </Stack.Navigator>
      
    
  );
}

export default UserScreen;