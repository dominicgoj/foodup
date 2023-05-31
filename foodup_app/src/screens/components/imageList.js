import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text} from "react-native";
import AuthContext from '../../utilities/authcontext';
import FetchRestaurants from "../../api/fetchRestaurants";
import PreviewImage from "./previewImage";
import { useNavigation } from "@react-navigation/native";
import sortPostByNewestAndBest from "../../utilities/sortPosts/sortPostByNewestAndBest";

const ImageList = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState();
  const [sortedPosts, setSortedPosts] = useState([])

  const authContext = useContext(AuthContext);
  const userData = authContext.loggedInUserData;
  const navigation = useNavigation()

  const renderCommentRows = () => {
    
    const rows = [];

    for (let i = 0; i < sortedPosts.length; i += 3) {
      const rowOfPosts = sortedPosts.slice(i, i + 3);
      
      const row = (
        <View key={i} style={[styles.row]}>
          {rowOfPosts.map((post, index) => (
  <PreviewImage key={index} post={post} openComment={(post) => openComment(post, i + index)}/>
))}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };


  useEffect(()=>{
    if(posts.length>0){
      handleSortByNewest()
    }
    
  }, [posts])

  const handleSortByNewest = () => {
    setSortedPosts(sortPostByNewestAndBest(posts))
  }

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
      const openComment = async (post, index) => {
        const postObject = { post };
        const restaurant_name = await FetchRestaurants(post.restaurant_id, 'id')


        setSelectedPost({
          ...postObject,
          restaurant_name: restaurant_name[0].restaurant_name
        });
        const headerTextOfStack = "Posts"
        navigation.setOptions()
        navigation.push("RestaurantDetailFeed", {posts: sortedPosts, selectedPost:{post, index}, headerTextOfStack:headerTextOfStack, costumHeaderBool:true})
      };  

      return(
        <View>
         
          
          
          
          
        {renderCommentRows()}
        
          
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
    sortOptionsRow: {
      marginLeft: 5,
      borderRadius: 5,
      padding: 5,
    },
    sortOptionsRowText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white'
    }

    
})
      export default ImageList;