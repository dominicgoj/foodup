import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import Icon from "react-native-vector-icons/Entypo";
import ModalView from "./modalView";
import { commonStyles } from "../../styles/commonstyles";
import ImageList from "./imageList";
import NoContentsAvailable from "./nocontentsavailable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BACKEND_URL } from "../../../config";
import ProfileImageDetailView from "./profileImageDetailView";
import AuthContext from "../../utilities/authcontext";
import BananaIcon from "./bananaComponent";
import getUserPosts from "../../utilities/getUserPosts";
import UserContentStyles from "../../styles/userContentStyles";
export default ForeignUserContent = ({ route }) => {
  const {foreignUser} = route.params
  
  const navigation = useNavigation()
  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const user_profile_img = foreignUser.profile_img.replace(baseRegex, '')
  const authcontext = useContext(AuthContext)
  const userProfileImageURLCleared = BACKEND_URL+foreignUser.profile_img.replace(baseRegex, '')
  const [userPosts, setUserPosts] = useState([])
  useEffect(()=>{
    
    const fetchForeignUserPosts = async () => {
      try{
        const req = await getUserPosts(foreignUser.id, {active:true})
        setUserPosts(req)
      }catch(error){
      }
    }
    fetchForeignUserPosts()
  }, [])
  
  
  const returnLengthUserPosts = () => {
    counter = 0
    if(userPosts){
      counter += userPosts.length
    }
    return counter
  }
  

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={authcontext.handleGlobalRefresh}/>
      }
    >
      <View style={UserContentStyles.menuRow}>
        <View style={[UserContentStyles.userBox]}>
          <View style={UserContentStyles.profileImgContainer} >
           
          <Image source={{uri: userProfileImageURLCleared}} style={UserContentStyles.profileImg} />
          
          </View>
          
        </View>
        <View style={[UserContentStyles.thumbsCameraBox, {justifyContent:'center'}]}>
        
              
            
            <View>
          
            <View style={{paddingRight: 50}}>
              <Icon name="camera" style={UserContentStyles.thumbsCameraIcon} />
              <Text style={UserContentStyles.counterText}>{returnLengthUserPosts()}</Text>
            </View>
          
          </View>
          
          <View>

          <TouchableOpacity>
            <View style={UserContentStyles.thumbsCameraIcon}>
            
          <BananaIcon width={21} height={21}/>
          
          </View>  
          </TouchableOpacity>
              <Text style={UserContentStyles.counterText}>{foreignUser.banana_points}</Text> 
          
          </View>
        </View>
        <View style={UserContentStyles.menuIconBox}>
          
        </View>
      </View>
      <View style={UserContentStyles.menuRow}>
      <View style={UserContentStyles.usernameContainer}>
          <Text style={UserContentStyles.usernameHeader}>{foreignUser.username}</Text>
          </View>
      </View>
      <View style={[{ alignItems: "center", marginBottom: 10 }]}>
        <Text style={commonStyles.restaurantTitleDetailView}>
          Bewertungen
        </Text>
      </View>
      {userPosts.length > 0 ? (
        <ImageList
          
          posts={userPosts}
        />
      ) : (
        <NoContentsAvailable />
      )}
 
      
      
    </ScrollView>
  );
};

