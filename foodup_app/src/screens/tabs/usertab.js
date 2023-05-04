import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { commonStyles } from '../../styles/commonstyles';
import Icon from 'react-native-vector-icons/Entypo';
import ImageList from '../components/imageList';
import { SettingsStyle } from '../../styles/settingsstyle';
import ModalView from '../components/modalView';
import data from '../../data/dummydata.json';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import UserSettings from '../components/usersettings';
import AuthContext from '../../utilities/authcontext';
import {useFocusEffect} from '@react-navigation/native'

function UserScreen() {
  
  const authContext = useContext(AuthContext); // Retrieve the AuthContext
  const [modalVisible, setModalVisible] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState("")
  const [userLikes, setUserLikes] = useState("")
  const [userPosts, setUserPosts] = useState("")
  useEffect(() => {   
    getLoggedInUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserLikes();
      getUserPosts();
      return;
    }, [])
  );

const getLoggedInUser = async () =>{
    try {
      
    const response = await axios.get(BACKEND_URL+'/user/'+authContext.loggedInUserData.id);
    setUserLoggedIn(response.data);    
    } catch (error) {
      
    console.error(error);
    }
};  
const getUserLikes = async () =>{
  try {
    
  const response = await axios.get(BACKEND_URL+'/like/?userid='+authContext.loggedInUserData.id);
  setUserLikes(response.data);    
  
  } catch (error) {
    
  console.error(error);
  }
};  
const getUserPosts = async () =>{
  try {
    
  const response = await axios.get(BACKEND_URL+'/post/?userid_posted='+authContext.loggedInUserData.id);
  setUserPosts(response.data);    
  
  } catch (error) {
    
  console.error(error);
  }
};  
  
  
  
  
  return (
      <ScrollView>
      <View style={styles.menuRow}>
        <View style={styles.userNameBox}>
        <Text style={styles.usernameHeader}>{userLoggedIn.username}</Text>
        
        </View>
        <View style={styles.thumbsCameraBox}>
          <View>
        <Icon name='heart' style={styles.thumbsCameraIcon}/>
        <Text style={styles.counterText}>{userLikes.length}</Text>
        </View>
        <View>
        <Icon name='camera' style={styles.thumbsCameraIcon}/>
        <Text style={styles.counterText}>{userPosts.length}</Text>
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
      <ImageList restaurant={authContext.loggedInUserData} searchby='userid_posted'/>
      
      {modalVisible ?
        <ModalView onClose={()=>(setModalVisible(false))} visible={modalVisible} modalContent={<UserSettings />}/>:null}
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

export default UserScreen;
