import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { commentStyles } from '../../styles/commentstyles';
import { useState, useEffect } from 'react';
import { commonStyles } from '../../styles/commonstyles';
import ThumbsUp from './thumbsup.js';
import calculateTimeAgo from '../../utilities/calculateTimeAgo';
import DeleteContent from './deleteContent';
import ThreeDots from './threedots';
import fetchData from '../../api/fetchData';
import PostedImage from './postedImage';
import createPostLike from '../../api/createPostLike';
import getPostLike from '../../api/getPostLike';
import deletePostLike from '../../api/deletePostLike';
export default CommentContent = ({post, userinfo, triggerModalView}) =>{
  const [deletePostBoxVisible, setDeletePostBoxVisible] = useState(false)
  const [restaurant, setRestaurant] = useState([])
  const [userPosted, setUserPosted] = useState([])
  const [likedData, setLikedData] = useState([])
  const [isLiked, setIsLiked] = useState(false);
  
  const handleSetDeletePostVisible = () =>{
    setDeletePostBoxVisible(!deletePostBoxVisible)
  }
  

  useEffect(()=>{
    
    fetchUserOfPost()
    fetchRestaurantOfPost()
    fetchLikedData()
  },[])

    const fetchUserOfPost = async () => {
      const query_string = "/user/"+post.post.userid_posted
      const request = await fetchData(query_string)
      setUserPosted(request)
    }
    const fetchRestaurantOfPost = async () => {
      const query_string = "/restaurant/"+post.post.restaurant_id
      const request = await fetchData(query_string)
      setRestaurant(request)
    }
    const fetchLikedData = async () => {
      const query_string = "/like/?commentid="+post.post.id+"&&restaurantid="+post.post.restaurant_id+"&&userid="+userinfo.id
      const request = await fetchData(query_string)
      setLikedData(request)
  }
  const likeTriggered = () => {
    if (isLiked) {
      deletePostLike(userinfo, post);
    } else {
      createPostLike(userinfo, post)
    }
    setIsLiked(!isLiked);
  }
  
  useEffect(() => {
    if(likedData.length>0)
    {setIsLiked(getPostLike(likedData))}
  }, [likedData]);
 
    return(
      <View style={{ height: '94%' }}>
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row'}}>
          <View style={{ flex: 1 }}>
            <Text style={commentStyles.commentUserTitleHeader}>
              {userPosted.username} @ {restaurant.restaurant_name}
            </Text>
          </View>
          
          {userinfo.id==post.post.userid_posted?(<ThreeDots handleSetDeletePostVisible={handleSetDeletePostVisible} />):null}

        </View>
        
          <PostedImage post={post} likeTriggered={likeTriggered} isLiked={isLiked}/>
        
        <View style={commonStyles.bottomImageContainer}>
          <View style={commentStyles.topBox}>
            <Text style={commentStyles.commentUserTitle}>
            {userPosted.username}
            </Text>
            <Icon name="star" style={commentStyles.star} />
            <Text style={commentStyles.ratingText}>{post.post.rating}</Text>
            <Text style={commentStyles.date}>vor {calculateTimeAgo(post.post.created_at)}</Text>
          </View>
          <ThumbsUp post={post} isLiked={isLiked} likeTriggered={likeTriggered} />


        </View>
        <View>
          <Text style={commentStyles.commentText}>
            {post.post.comment}
          </Text>
        </View>
      </View>
      {deletePostBoxVisible ? (
        <View style={{ alignItems: 'center' }}>
          <DeleteContent id={post.post.id} deleteSuccessful={triggerModalView}/>



        </View>
      ) : null}
    </View>
       
    )
  }

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
