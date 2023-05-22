import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View} from "react-native";
import CommentContent from './commentDetail'
import ModalView from './modalView';

import AuthContext from '../../utilities/authcontext';
import FetchRestaurants from "../../api/fetchRestaurants";

import PreviewImage from "./previewImage";
const ImageList = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState();
  const authContext = useContext(AuthContext);
  const userData = authContext.loggedInUserData;
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const renderCommentRows = () => {
    const rows = [];

    for (let i = 0; i < posts.length; i += 3) {
      const rowOfPosts = posts.slice(i, i + 3);
      
      const row = (
        <View key={i} style={[styles.row]}>
          {rowOfPosts.map((post, index) => {
            return(
            
           <PreviewImage key={index} post={post} openComment={openComment}/>
          )
    })}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

 
      const [likedData, setLikedData] = useState({
        
        userid: userData.id,
        restaurantid: '',
        commentid: '',
        created_at: ''
      });

      useEffect(() => {
        
        // Update the created_at value whenever selectedPost changes
        if (selectedPost) {
          
          const currentDateTime = new Date().toISOString();
          setLikedData((prevLikedData) => ({
            ...prevLikedData,
            commentid: selectedPost.id,
            restaurantid: selectedPost.restaurant_id
          }));
        }
        
      }, [selectedPost]);
    
      
      //here we need to get the restaurant name first because usertab doesnt pass any specific restaurant from the restaurant
      //card. 
    const openComment = async (post) => {
      const postObject = {"post": post}
      setSelectedPost({
        ...postObject,
        restaurant_name: (await FetchRestaurants(post.restaurant_id, 'id'))[0].restaurant_name
      });
        setCommentModalVisible(true);
      };

      return(
        <View>
        {renderCommentRows()}
        <ModalView modalContent={<CommentContent post={selectedPost} userinfo={authContext.loggedInUserData}/>} visible={commentModalVisible} onClose={()=>setCommentModalVisible(false)} />
        
        </View>
      )

}
const styles = StyleSheet.create({
    star:{
        fontSize: 16,
        color: 'orange',
        textShadowColor: 'orange',
        textShadowRadius: 4,
        
    },
    imageContainer:{
        height: 150,
        width: "32%",
        margin: 2,
        borderColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
  
    },
    image:{
      height: '100%',
      width: '100%',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },  
    starsRow:{
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        alignItems:'left',
        
    },

    
})
      export default ImageList;