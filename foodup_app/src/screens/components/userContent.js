import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
  Image,
  Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import Icon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {FontAwesomeIcon as FortAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import ModalView from "./modalView";
import { commonStyles } from "../../styles/commonstyles";
import ImageList from "./imageList";
import UserSettings from "./usersettings";
import NoContentsAvailable from "./nocontentsavailable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BACKEND_URL } from "../../../config";
import ProfileImageDetailView from "./profileImageDetailView";
import filterHexId from "../../utilities/filterHexId";
import AuthContext from "../../utilities/authcontext";
import BananaIcon from "./bananaComponent";
import BananaPointsUserView from "./bananaPointsUserView";
import UserContentStyles from "../../styles/userContentStyles";
const UserContent = ({ posts, likesAssociatedWithUser, userinfo, userRestaurantLikes, userNotifications, postsByHex, userPosts }) => {
  
  const navigation = useNavigation()
  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const user_profile_img = userinfo.profile_img.replace(baseRegex, '')
  const [modalVisible, setModalVisible] = useState(false);
  const [userprofileImgModal, setUserprofileImgModal] = useState(false)
  const [bananaPointsModal, setBananaPointsModal] = useState(false)
  const cameraScaleValue = useRef(new Animated.Value(1)).current;
  const authcontext = useContext(AuthContext)
  const userProfileImageURLCleared = BACKEND_URL+authcontext.loggedInUserData.profile_img.replace(baseRegex, '')


  
  const returnLengthUserSavedContents = () => {
    let counter = 0
    if(userRestaurantLikes){
      counter = counter + userRestaurantLikes.length
    }
    return counter
  }
  const returnNotificationsAssociatedWithUser = () => {
    counter = 0
    const visible_dataset_likes = filterHexId(userNotifications, likesAssociatedWithUser)    
    const visible_dataset_postsByHex = filterHexId(userNotifications, postsByHex)   
    if(visible_dataset_likes||visible_dataset_postsByHex){
      counter = counter + visible_dataset_likes.length + visible_dataset_postsByHex.length
    }
    return counter
  }
  const returnLengthUserPosts = () => {
    counter = 0
    if(posts){
      counter += posts.length
    }
    return counter
  }
  
  const handleCameraIconPressed = () => {
   

    // Start the animation
    Animated.spring(cameraScaleValue, {
      toValue: 1.1,
      friction: 2, // Adjust the friction value to control the animation speed
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(cameraScaleValue, {
        toValue: 1,
        friction: 2, // Adjust the friction value to control the animation speed
        useNativeDriver: true,
      }).start(() => {
        
      });
    });
  };

  const animatedCameraStyle = {
    transform: [
      {
        scale: cameraScaleValue.interpolate({
          inputRange: [1, 1.1],
          outputRange: [1, 1.1],
        }),
      },
    ],
  };


  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={authcontext.handleGlobalRefresh}/>
      }
    >
      <View style={[UserContentStyles.menuRow]}>
        <View style={[UserContentStyles.userBox]}>
          <View style={UserContentStyles.profileImgContainer} >
            <TouchableOpacity onPress={()=>setUserprofileImgModal(true)}>
          <Image source={{uri: userProfileImageURLCleared}} style={UserContentStyles.profileImg} />
          </TouchableOpacity>
          </View>
          
        </View>
        <View style={UserContentStyles.thumbsCameraBox}>
        <TouchableOpacity onPress={()=>navigation.navigate("UserSavedContents")}>
          <View>
          
            <FontAwesomeIcon name="bookmark" style={UserContentStyles.thumbsCameraIcon} />
              <Text style={UserContentStyles.counterText}>{returnLengthUserSavedContents()}</Text>
              
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("UserLikeContents")}>
              <View>
            
              <View style={UserContentStyles.bellIcon}>
            <FortAwesomeIcon icon={faBell} size={21} color="#faab14"/>
            </View>
            <Text style={UserContentStyles.counterText}>{returnNotificationsAssociatedWithUser()}</Text>
            
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCameraIconPressed}>
            <View>
          
            <Animated.View style={[animatedCameraStyle]}>
              <Icon name="camera" style={UserContentStyles.thumbsCameraIcon} />
              <Text style={UserContentStyles.counterText}>{returnLengthUserPosts()}</Text>
            </Animated.View>
          
          </View>
          </TouchableOpacity>
          <View>

          <TouchableOpacity onPress={()=>setBananaPointsModal(true)}>
            <View style={UserContentStyles.thumbsCameraIcon}>
            
          <BananaIcon width={21} height={21}/>
          
          </View>  
          </TouchableOpacity>
              <Text style={UserContentStyles.counterText}>{userinfo.banana_points}</Text> 
          
          </View>
        </View>
        <View style={UserContentStyles.menuIconBox}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Icon name="menu" style={UserContentStyles.menuIcon} />
          </Pressable>
        </View>
      </View>
      <View style={UserContentStyles.menuRow}>
      <View style={UserContentStyles.usernameContainer}>
          <Text style={UserContentStyles.usernameHeader}>{userinfo.username}</Text>
          </View>
      </View>
      <Animated.View style={[{ alignItems: "center", marginBottom: 10 }, animatedCameraStyle]}>
        <Text style={commonStyles.restaurantTitleDetailView}>
          Deine Bewertungen
        </Text>
      </Animated.View>
      
      {posts.length > 0 ? (
        <ImageList
          restaurant={userinfo}
          searchby="userid_posted"
          posts={posts}
        />
      ) : (
        <NoContentsAvailable />
      )}

      {modalVisible ? (
        <ModalView
          onClose={() => setModalVisible(false)}
          visible={modalVisible}
          modalContent={
            <UserSettings closeModal={() => setModalVisible(false)} />
          }
        />
      ) : null}
      {userprofileImgModal ? (
        <ModalView 
        onClose={() => setUserprofileImgModal(false)}
        visible={userprofileImgModal}
        modalContent={<ProfileImageDetailView userinfo={userinfo} image={user_profile_img} setUserprofileImgModal={setUserprofileImgModal} />}
        />
      ) : null}
      {bananaPointsModal ? (
        <ModalView 
        onClose={() => setBananaPointsModal(false)}
        visible={bananaPointsModal}
        modalContent={<BananaPointsUserView userinfo={userinfo} userPosts={userPosts} increasedPoints={0} triggerModalView={()=>setBananaPointsModal(false)}/>}
        />
      ) : null}
    </ScrollView>
  );
};


export default UserContent;
