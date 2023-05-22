import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
  Image
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import ModalView from "./modalView";
import { commonStyles } from "../../styles/commonstyles";
import ImageList from "./imageList";
import UserSettings from "./usersettings";
import NoContentsAvailable from "./nocontentsavailable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BACKEND_URL } from "../../../config";
import ProfileImageDetailView from "./profileImageDetailView";
const UserContent = ({ posts, likesAssociatedWithUser, userinfo, onRefresh, userRestaurantLikes }) => {
  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      return;
    }, [])
  );
  const navigation = useNavigation()
  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const user_profile_img = userinfo.profile_img.replace(baseRegex, '')
  const returnLengthUserSavedContents = () => {
    let counter = 0
    if(userRestaurantLikes){
      counter = counter + userRestaurantLikes.length
    }
    return counter
  }
  const returnLikesAssociatedWithUser = () => {
    counter = 0
    if(likesAssociatedWithUser){
      counter += likesAssociatedWithUser.length
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
  const [modalVisible, setModalVisible] = useState(false);
  const [userprofileImgModal, setUserprofileImgModal] = useState(false)
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} />
      }
    >
      <View style={styles.menuRow}>
        <View style={[styles.userBox]}>
          <View style={styles.profileImgContainer} >
            <TouchableOpacity onPress={()=>setUserprofileImgModal(true)}>
          <Image source={{uri: BACKEND_URL+user_profile_img}} style={styles.profileImg} />
          </TouchableOpacity>
          </View>
          <View style={styles.usernameContainer}>
          <Text style={styles.usernameHeader}>{userinfo.username}</Text>
          </View>
        </View>
        <View style={styles.thumbsCameraBox}>
          <TouchableOpacity onPress={()=>navigation.navigate("UserSavedContents")}>
            <FontAwesomeIcon name="bookmark" style={styles.thumbsCameraIcon} />
              <Text style={styles.counterText}>{returnLengthUserSavedContents()}</Text>
              </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={()=>navigation.navigate("UserLikeContents")}>
            <Icon name="heart" style={styles.thumbsCameraIcon} />
            <Text style={styles.counterText}>{returnLikesAssociatedWithUser()}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Icon name="camera" style={styles.thumbsCameraIcon} />
            <Text style={styles.counterText}>{returnLengthUserPosts()}</Text>
          </View>
        </View>
        <View style={styles.menuIconBox}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Icon name="menu" style={styles.menuIcon} />
          </Pressable>
        </View>
      </View>
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Text style={commonStyles.restaurantTitleDetailView}>
          Deine Bewertungen
        </Text>
      </View>
      <View style={commonStyles.row}></View>
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
        modalContent={<ProfileImageDetailView userinfo={userinfo} image={user_profile_img}/>}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    fontSize: 34,
    color: "#303030",
  },
  counterText: {
    textAlign: "center",
    fontSize: 14,
  },
  menuIconBox: {
    justifyContent: "center",
  },
  usernameHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  thumbsCameraIcon: {
    padding: 20,
    fontSize: 21,
  },
  thumbsCameraBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userBox: {
    justifyContent: "center",
    alignItems: 'center'
  },
  usernameContainer: {
    justifyContent: "center",
    alignItems: 'center'
  },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  profileImgContainer: {
    justifyContent: "center",
    alignItems: 'center',

  }
});

export default UserContent;
