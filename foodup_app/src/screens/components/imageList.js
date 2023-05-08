import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { commonStyles } from '../../styles/commonstyles';
import { commentStyles } from "../../styles/commentstyles";
import ThumbsUp from './thumbsup.js';
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import ModalView from './modalView';
import moment from "moment";
import AuthContext from '../../utilities/authcontext';
import FetchRestaurants from "../../api/fetchRestaurants";

const ImageList = ({ restaurant, searchby }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const authContext = useContext(AuthContext);
  const userData = authContext.loggedInUserData;


  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(BACKEND_URL + '/post/', {
        params: {
          [searchby]: restaurant.id,
          sort_by: 'created_at', // Add the sorting parameter here, e.g., 'createdAt' for sorting by the createdAt field
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name='star-outlined' style={styles.star} />);
    }

    return stars;
  };

  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const renderCommentRows = () => {
    const rows = [];
    for (let i = 0; i < posts.length; i += 3) {
      const rowOfPosts = posts.slice(i, i + 3);
      const row = (
        <View key={i} style={styles.row}>
          {rowOfPosts.map((post, index) => (
            <TouchableOpacity key={post.id} style={styles.imageContainer} onPress={() => openComment(post)}>
              <ImageBackground style={styles.image} source={{uri: post.image}}>
              <View key={post.id} style={styles.starsRow}>
                {renderStars(post.rating)}
              </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  const GetUsernameOfComment = ({ userID }) => {
    const [userOfComment, setUserOfComment] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(BACKEND_URL + '/user/' + userID);
          setUserOfComment(response.data);
        } catch (error) {
          console.error(error);
          setUserOfComment('Unknown');
        }
      };

      fetchData();
    }, [userID]);

    return userOfComment ? <Text>{userOfComment.username}</Text> : null;
  };

  const TimeAgo = ({ timestamp }) => {
    const currentTime = moment();
    const previousTime = moment(timestamp);
    const duration = moment.duration(currentTime.diff(previousTime));
  
    const weeks = Math.floor(duration.asWeeks());
    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes());
    const seconds = Math.floor(duration.asSeconds());
  
    let formattedTimeAgo = '';
      
        if (weeks > 0) {
          formattedTimeAgo = `${weeks} Woche${weeks !== 1 ? 'n' : ''}`;
        } else if (days > 0) {
          formattedTimeAgo = `${days} Tag${days !== 1 ? 'en' : ''}`;
        } else if (hours > 0) {
          formattedTimeAgo = `${hours} Stunde${hours !== 1 ? 'n' : ''}`;
        } else if (minutes > 0) {
          formattedTimeAgo = `${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
        }
        else {
            formattedTimeAgo = `${seconds} Sekunde${seconds !== 1 ? 'n' : ''}`;
        }
        
        return formattedTimeAgo
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


    const CommentContent = (post) =>{
        return(
            <ScrollView>
            <Text style={commentStyles.commentUserTitleHeader}><GetUsernameOfComment userID={post.post.userid_posted} /> @ {post.post.restaurant_name}</Text>
            <Image source={{ uri: post.post.image }} style={commentStyles.commentImg} />
            
            <View style={commonStyles.bottomImageContainer} >
            <View style={commentStyles.topBox}>
              <Text style={commentStyles.commentUserTitle}><GetUsernameOfComment userID={post.post.userid_posted} /></Text>
              <Icon name="star" style={commentStyles.star} />
              <Text style={commentStyles.ratingText}>{post.post.rating}</Text>
              <Text style={commentStyles.date}>vor <TimeAgo timestamp={post.post.created_at} /></Text>
              
            </View>
              <ThumbsUp likedData={likedData}/>
              </View>
            <View>
              <Text style={commentStyles.commentText}>
              {post.post.comment}
              
              </Text>
            </View>
            </ScrollView>
        )
      }

      //here we need to get the restaurant name first because usertab doesnt pass any specific restaurant from the restaurant
      //card. 
    const openComment = async (post) => {
      setSelectedPost({
        ...post,
        restaurant_name: (await FetchRestaurants(post.restaurant_id, 'id'))[0].restaurant_name
      });
        setCommentModalVisible(true);
      };

      return(
        <View>
        {renderCommentRows()}
        
        <ModalView modalContent={<CommentContent post={selectedPost}/>} visible={commentModalVisible} onClose={()=>setCommentModalVisible(false)} />
        
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
        borderColor:'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
      height: '100%',
      width: '100%',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center'
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