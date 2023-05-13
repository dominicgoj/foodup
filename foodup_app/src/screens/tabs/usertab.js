import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { commonStyles } from '../../styles/commonstyles';
import Icon from 'react-native-vector-icons/Entypo';
import ImageList from '../components/imageList';
import ModalView from '../components/modalView';
import UserSettings from '../components/usersettings';

function UserScreen({posts, likes, userinfo, onRefresh}) {
  const [modalVisible, setModalVisible] = useState(false)
  
  return (
      <ScrollView refreshControl={
        <RefreshControl onRefresh={onRefresh} />
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
      <ImageList restaurant={userinfo} searchby='userid_posted' posts={posts}/>
      {modalVisible ? (
          <ModalView
            onClose={() => setModalVisible(false)}
            visible={modalVisible}
            modalContent={<UserSettings/>}
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

export default UserScreen;
