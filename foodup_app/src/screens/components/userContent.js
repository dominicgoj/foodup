import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Entypo';
import ModalView from "./modalView";
import { commonStyles } from "../../styles/commonstyles";
import ImageList from "./imageList";
import UserSettings from "./usersettings";
import NoContentsAvailable from "./nocontentsavailable";
const UserContent = ({posts, likes, userinfo, onRefresh, triggerRefresh}) =>{

  useFocusEffect(
    React.useCallback(() => {
      // Add your focus effect logic here
      console.log("UserContent refresh")
      triggerRefresh();
      return
    }, [])
  );

    const [modalVisible, setModalVisible] = useState(false)
    return (
        <ScrollView refreshControl={
          <RefreshControl onRefresh={onRefresh} triggerRefresh={triggerRefresh} />
        }>
        <View style={styles.menuRow}>
          <View style={styles.userNameBox}>
          <Text style={styles.usernameHeader}>{userinfo.username}</Text>
          
          </View>
          <View style={styles.thumbsCameraBox}>
            <View>
          <Icon name='heart' style={styles.thumbsCameraIcon}/>
          
          <Text style={styles.counterText}>{likes.length}</Text>
          </View>
          <View>
          <Icon name='camera' style={styles.thumbsCameraIcon}/>
          <Text style={styles.counterText}>{posts.length}</Text>
          </View>
          </View>
          <View style={styles.menuIconBox}>
          <Pressable onPress={() => setModalVisible(true)}>
          <Icon name='menu' style={styles.menuIcon} />
          </Pressable>
          </View>
        </View>
        <View style={{alignItems:'center', marginBottom: 10}}>
        <Text style={commonStyles.restaurantTitleDetailView}>Deine Bewertungen</Text>
        </View>
        <View style={commonStyles.row}>
        
        </View>
        {posts.length>0?(<ImageList restaurant={userinfo} searchby='userid_posted' posts={posts}/>):<NoContentsAvailable />}
        
        {modalVisible ? (
            <ModalView
              onClose={() => setModalVisible(false)}
              visible={modalVisible}
              modalContent={<UserSettings closeModal={()=>setModalVisible(false)}/>}
            />
          ) : null}
        
        </ScrollView>
       
      
    );
  }
  
  const styles = StyleSheet.create({
    menuIcon:{
      fontSize: 34,
      color: '#303030',
      
  
    },
    counterText:{
      textAlign: 'center',
      fontSize: 14,
      
    },
    menuIconBox:{
      justifyContent: 'center',
    },
    usernameHeader:{
      fontSize: 18,
      fontWeight: 'bold',
    },
    thumbsCameraIcon:{
      padding: 20,
      fontSize: 21,
      
    },
    thumbsCameraBox:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      
    },
    userNameBox:{
      justifyContent: 'center',
      
    },
    menuRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      
    }
  })
  
  export default UserContent;
  