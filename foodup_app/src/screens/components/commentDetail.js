import React from 'react';
import { View, Modal, Text, Image, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import GestureRecognizer from 'react-native-swipe-gestures';
import { commonStyles } from '../../styles/commonstyles';
import ThumbsUp from './thumbsup.js';
import ModalView from './modalView';

const Comment = ({ visible, onClose, restaurant }) => {
   // define here the content of the comment, then passed to ModalView
  const CommentContent = () =>{
    return(
      <Text>Visible</Text>
    )
  }

  return (
    <ModalView modalContent={CommentContent} onClose={onClose} visible={visible}/>
    
  );
};

const styles = StyleSheet.create({
    
    chevronIconModal:{
        fontSize: 28,
        color: '#D6D6D6',
        textAlign: 'center',
        marginBottom: 10,
    },
    

    date:{
        
    },
    ratingText:{
        marginRight: 15,
    },
    commentUserTitle:{
        fontWeight: 'bold',
        fontSize: 15,
        paddingRight: 15,
        paddingLeft: 5,
        
    },
    commentUserTitleHeader:{
        fontWeight: 'bold',
        fontSize: 15,
        paddingRight: 15,
        paddingLeft: 5,
        paddingBottom: 10,
    },
    commentImg:{
        width: "100%",
        height: 400,
        borderRadius: 15,
    },
    centeredView: {
        
        
      },
      modalView: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        
      },
      star: {
        color: '#FF7B46',
        fontSize: 20,
        paddingRight: 10,
      },
      topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
        marginRight: 10,
       
      },
      commentText:{
        padding: 5,
        textAlign: 'justify',
      }
})
export default Comment;