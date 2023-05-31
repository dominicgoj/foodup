import React, {useContext} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { commentStyles } from '../../styles/commentstyles';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { commonStyles } from '../../styles/commonstyles';
import ThumbsUp from './thumbsup.js';
import calculateTimeAgo from '../../utilities/calculateTimeAgo';
import DeleteContent from './deleteContent';
import ThreeDots from './threedots';
import fetchData from '../../api/fetchData';
import PostedImage from './postedImage';
import createPostLike from '../../api/createPostLike';
import getPostLike from '../../api/getPosts/getPostLike';
import deletePostLike from '../../api/deletePostLike';
import updateUserNotification from '../../api/updateUserNotification';
import getUserNotifications from '../../api/getUserNotifications';
import { Colors } from '../../styles/colors';
import AuthContext from '../../utilities/authcontext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../../../config';

export default CommentContent = ({post, commentHeight, triggerModalView}) =>{
  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const [deletePostBoxVisible, setDeletePostBoxVisible] = useState(false)
  const [restaurant, setRestaurant] = useState([])
  const [userPosted, setUserPosted] = useState([])
  const [userProfileImg, setUserProfileImg] = useState()
  const [likedData, setLikedData] = useState([])
  const [isLiked, setIsLiked] = useState(false);
  const [allLikes, setAllLikes] = useState([])
  
  const authContext = useContext(AuthContext)
  const userinfo = authContext.loggedInUserData
  const navigation = useNavigation()
  const handleSetDeletePostVisible = () =>{
    setDeletePostBoxVisible(!deletePostBoxVisible)
  }
  
  useEffect(()=>{
  }, [deletePostBoxVisible])
  useEffect(()=>{
    fetchUserOfPost()
    fetchRestaurantOfPost()
    fetchLikedData()
    fetchAllLikesOfPost()
    
  },[])

    const fetchUserOfPost = async () => {
      const query_string = "/user/"+post.post.userid_posted
      const request = await fetchData(query_string)
      
      setUserPosted(request)
      setUserProfileImg(BACKEND_URL+request.profile_img.replace(baseRegex, ''))
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
  const fetchAllLikesOfPost  = async () => {
    const query_string = "/like/?commentid="+post.post.id
    const request = await fetchData(query_string)
    setAllLikes(request.length)
  }
  const likeTriggered = async () => {
    const likesAssociatedWithUser = authContext.likesAssociatedWithUser
    const userNotifications = authContext.userNotifications
    
    setIsLiked(!isLiked);
    const localLike = !isLiked

    if (!localLike) {
      const deletedLikeInstance = await deletePostLike(userinfo, post);
      const invisibleNotification = await updateUserNotification(userinfo, deletedLikeInstance.hex_identifier)
      setAllLikes(allLikes-1)
    // Filter out the deleted like_instance from the likesAssociatedWithUser list
      const updatedLikes = likesAssociatedWithUser.filter(
        (like) =>
          like.userid !== deletedLikeInstance.userid ||
          like.restaurantid !== deletedLikeInstance.restaurantid ||
          like.commentid !== deletedLikeInstance.commentid
      );
      // filter out notifications based on notification set inactive
      const updatedNotifications = userNotifications.filter(
        (notification) => notification.id !== invisibleNotification.id);

      authContext.setLikesAssociatedWithUser(updatedLikes);
      authContext.setUserNotifications(updatedNotifications)

    } else {
      setAllLikes(allLikes+1)
      const newLikeData = await createPostLike(userinfo, post)
      const newNotificationData = await getUserNotifications(null, newLikeData.hex_identifier)
      const updatedLikes = [...likesAssociatedWithUser, newLikeData];
      const updatedNotifications = [...userNotifications, newNotificationData]
      authContext.setLikesAssociatedWithUser(updatedLikes);
      authContext.setUserNotifications(updatedNotifications);

    }
    
    
  }
  handleRemoveUserPostFromContext = (post) => {
    const updatedUserPosts = authContext.userPosts.filter((userPost) => userPost.id !== post.id);
    authContext.setUserPosts(updatedUserPosts)
  }
  handleNavigateToRestaurant = () => {
    navigation.navigate("Detail", {restaurant: restaurant})
    if(triggerModalView)
    {triggerModalView()}
  }
  handleNavigateToForeignUser = () => {
    navigation.navigate("ShowForeignUserContent", {foreignUser:userPosted})
    if(triggerModalView)
    {triggerModalView()}
  }
  useEffect(() => {
    if(likedData.length>0)
    {setIsLiked(getPostLike(likedData))}
  }, [likedData]);
 
    return(
         
      <View style={{paddingTop: 10, paddinBottom: 10, height: commentHeight, backgroundColor: 'white'}}>
        
      <View style={{ flexGrow: 1}}>
        <View style={{ flexDirection: 'row'}}>
          <View style={{ flex: 1 }}>
            <View style={[commentStyles.commentUserTitleHeader]}>
              <View style={commentStyles.foreignUserProfileImg}>
            <Image source={{uri:userProfileImg}} style={{width: 30, height: 30,}}/>
            </View>

            <View style={{flexDirection: 'row', flexWrap: 1, marginRight: 20}}>

            <View style={{justifyContent:'center'}}>
              <TouchableOpacity onPress={handleNavigateToForeignUser}>
                <Text style={commentStyles.commentUserTitleHeaderBoldText}>{userPosted.username}</Text>
                </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center'}}>
               <Text> @ </Text> 
               </View>
               <View style={{justifyContent:'center'}}>
              <TouchableOpacity onPress={handleNavigateToRestaurant}>
              <Text style={commentStyles.commentUserTitleHeaderBoldText}>{restaurant.restaurant_name}</Text>
              </TouchableOpacity>
              </View>
            </View>

            </View>
          </View>
          <View style={{marginRight: 20}}>
          {userinfo.id==post.post.userid_posted?(<ThreeDots handleSetDeletePostVisible={handleSetDeletePostVisible} />):null}
          {deletePostBoxVisible ? (
        
        <View style={{ alignItems: 'center'}}>
          
          <DeleteContent id={post.post.id} deleteSuccessful={()=>navigation.goBack()} 
          handleSetDeletePostVisible={handleSetDeletePostVisible} handleRemoveUserPostFromContext={handleRemoveUserPostFromContext}/>
          
        </View>
      ) : null}
          
          </View>
        </View>

        {!post.post.active?(
          <View style={[{maxWidth: 70, alignItems:'center', borderRadius: 5, padding: 5, marginTop: 5, marginBottom: 5,}, Colors.tertiaryBackground]}>
          <Text style={{color:'white'}}>Inaktiv</Text>
          </View>
        ):null}
          

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
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent:'center', paddingRight: 10,}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>{allLikes}</Text>
          </View>
          <View style={{justifyContent:'center'}}>
          <ThumbsUp post={post} isLiked={isLiked} likeTriggered={likeTriggered} />
          </View>
          </View>

        </View>
        <View style={{paddingLeft: 10, paddingRight: 10,}}>
          <Text style={commentStyles.commentText}>
            {post.post.comment}
          </Text>
        </View>
      </View>
      
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
