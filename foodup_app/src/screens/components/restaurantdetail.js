import React, { useEffect, useState, useContext } from "react";
import { Colors } from "../../styles/colors";
import {
  View,
  Modal,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
 
} from "react-native";
import { commonStyles } from "../../styles/commonstyles";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-native-fontawesome'
import ImageList from "./imageList.js";
import RenderStars from "./renderstars";
import getRestaurantPosts from "../../api/getRestaurantPosts";
import { RestaurantDetailViewStyles } from "../../styles/restaurantDetailViewStyles";
import createRestaurantLike from "../../api/createRestaurantLike";
import fetchRestaurantLikeByRestaurantAndUserID from '../../api/fetchRestaurantLikeByRestaurantAndUserID'
import AuthContext from "../../utilities/authcontext";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import getRestaurantsByTags from "../../api/getRestaurantsByTags";
import { BACKEND_URL } from "../../../config";
import { RefreshControl } from "react-native-gesture-handler";
const RestaurantDetail = ({ route, cameToChangePhotoOnly }) => {
  const authContext = useContext(AuthContext);
  const { restaurant } = route.params;

  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const header_image = restaurant.title_image.replace(baseRegex, '')
  const [posts, setPosts] = useState([]);
  const [restaurantLiked, setRestaurantLiked] = useState(false)
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    const fetchPosts = async () => {
      
      const fetchedPosts = await getRestaurantPosts(restaurant.id, {
        active: "true",
      });
      
      setPosts(fetchedPosts);
      
    };
    fetchPosts();
    
  }, [refreshPosts]);

 

  const handleRefreshPosts = () => {
    setRefreshPosts(!refreshPosts)
  }

  useEffect(()=>{
    const fetchUserLikedRestaurant = async () => {
      const fetchLike = await fetchRestaurantLikeByRestaurantAndUserID(authContext.loggedInUserData, restaurant)
      if(fetchLike.length>0){
        setRestaurantLiked(true)
      }
      
    }
    fetchUserLikedRestaurant()
    
  },[])

  const handleLikeRestaurant = () => {
    const userRestaurantLikes = authContext.userRestaurantLikes
    if (restaurantLiked) {
      // Remove the restaurant object from userRestaurantLikes
      const updatedLikes = userRestaurantLikes.filter(item => item.id !== restaurant.id);
      authContext.setUserRestaurantLikes(updatedLikes);
    } else {
      // Add the restaurant object to userRestaurantLikes
      const updatedLikes = [...userRestaurantLikes, restaurant];
      authContext.setUserRestaurantLikes(updatedLikes);
    }
    createRestaurantLike(authContext.loggedInUserData, restaurant)
    setRestaurantLiked(!restaurantLiked)
  }

  const handleUnwrapDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded)
  }

  const handleSearchRestaurantsByTags = async (tag) => {
    const restaurantsByTagsAndLocation = await getRestaurantsByTags(tag, authContext.globalUserLocation.longitude, authContext.globalUserLocation.latitude)
    navigation.navigate("FilteredRestaurants", {restaurantData:restaurantsByTagsAndLocation, tag:tag})
    
  }
  const handleNavigationToJustChangeRestaurantPhoto = () => {

    navigation.navigate("RestaurantRegisterAddPhoto", 
       { cameToChangePhotoOnly: cameToChangePhotoOnly, restaurant: restaurant })
  }
  return (<View style={{flexGrow: 1}}>
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={() => {
          authContext.handleGlobalRefresh();
          handleRefreshPosts();
        }} />
      }
    >
      
      <View style={RestaurantDetailViewStyles.detailheader}>
       {cameToChangePhotoOnly?(
       <TouchableOpacity onPress={handleNavigationToJustChangeRestaurantPhoto}>
          <Image
          style={RestaurantDetailViewStyles.headerimage}
          source={{ uri: BACKEND_URL+header_image }}
          /></TouchableOpacity>

              ):(
                <Image
                  style={RestaurantDetailViewStyles.headerimage}
                  source={{ uri: BACKEND_URL+header_image }}
                />
              )}
        
        
      </View>
      <View style={RestaurantDetailViewStyles.container}>

        <View style={RestaurantDetailViewStyles.titleContainer}>

        <View style={[RestaurantDetailViewStyles.titleContainerRow]}>
        <Text style={[RestaurantDetailViewStyles.restaurantTitleDetailView]}>
          {restaurant.restaurant_name}
        </Text>
        <View style={commonStyles.ribbonContainer}>
        <TouchableOpacity onPress={() => {
          if (cameToChangePhotoOnly) {
            navigation.navigate("RestaurantInfoCard", { restaurant: restaurant, cameToChangePhotoOnly: true });
          } else {
            navigation.navigate("RestaurantInfoCard", { restaurant: restaurant });
          }
        }}>
            <FAI icon={faInfoCircle} size={32} style={[commonStyles.locationMarkerContainer, Colors.secondaryText]} />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Map", { restaurant: restaurant })}>
        <FAI icon={faMapMarkerAlt} size={32} style={[commonStyles.locationMarkerContainer, Colors.secondaryText]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLikeRestaurant}>
        {restaurantLiked?<FontAwesomeIcon name="bookmark" style={[commonStyles.ribbon, Colors.secondaryText]}/>:<FontAwesomeIcon name="bookmark-o" style={[commonStyles.ribbon, Colors.secondaryText]}/>}
        </TouchableOpacity>
        </View>
        </View>
        <View style={[RestaurantDetailViewStyles.titleContainerRow, {marginBottom: 0}]}>
        <Text>{posts.length} {posts.length!=1?"Bewertungen":"Bewertung"}</Text>
        </View>  
        <View style={[RestaurantDetailViewStyles.titleContainerRow]}>
        <RenderStars rating={restaurant.average_rating} />
        <View style={[RestaurantDetailViewStyles.tagRow]}>
        {typeof restaurant.tags === 'string' ? JSON.parse(restaurant.tags).map((tag, index) => (
        <TouchableOpacity key={index} onPress={() => handleSearchRestaurantsByTags(tag)}>
          <View style={RestaurantDetailViewStyles.tagContainer}>
            <Text style={RestaurantDetailViewStyles.tagFont}>{tag}</Text>
          </View>
        </TouchableOpacity>
      )) : restaurant.tags.map((tag, index) => (
        <TouchableOpacity key={index} onPress={() => handleSearchRestaurantsByTags(tag)}>
          <View style={RestaurantDetailViewStyles.tagContainer}>
            <Text style={RestaurantDetailViewStyles.tagFont}>{tag}</Text>
          </View>
        </TouchableOpacity>
      ))}
          </View>
        </View>  
        

        <View style={RestaurantDetailViewStyles.restaurantDescriptionTextContainer}>
      <Text style={RestaurantDetailViewStyles.restaurantDescriptionText}>
        {isDescriptionExpanded
          ? restaurant.description
          : restaurant.description.slice(0, 50) + '...'}
      </Text>
          
        <TouchableOpacity onPress={handleUnwrapDescription} 
        style={RestaurantDetailViewStyles.unwrapDescriptionContainer}>
          {isDescriptionExpanded?
          <FAI icon={faChevronUp} />
          :<FAI icon={faChevronDown} />}
        </TouchableOpacity>
      
         </View>


        </View>
        
        
       
        <View style={{ marginTop: 20}}>
          <ImageList posts={posts} handleRefreshPosts={handleRefreshPosts}/>
        </View>
        <View style={[RestaurantDetailViewStyles.rowWebIcons]}>
          
          
        </View>
      </View>
      
    </ScrollView>
    </View>
  );
};
export default RestaurantDetail;
