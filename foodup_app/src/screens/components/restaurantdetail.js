import React, { useEffect, useState, useContext } from "react";
import { Colors } from "../../styles/colors";
import {
  View,
  Modal,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Linking,
  Touchable,
} from "react-native";
import { commonStyles } from "../../styles/commonstyles";
import Icon from "react-native-vector-icons/Entypo";
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
import { useNavigation } from "@react-navigation/native";
import getRestaurantsByTags from "../../api/getRestaurantsByTags";
import { BACKEND_URL } from "../../../config";
import CustomHeader from "./costumheader";
const RestaurantDetail = ({ route }) => {
  const authContext = useContext(AuthContext);
  const { restaurant } = route.params;
  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const header_image = restaurant.title_image.replace(baseRegex, '')
  const [posts, setPosts] = useState([]);
  const [restaurantLiked, setRestaurantLiked] = useState(false)
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getRestaurantPosts(restaurant.id, {
        active: "true",
      });
      
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

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
  return (<View style={{flexGrow: 1}}>
    <ScrollView>
      
      <View style={RestaurantDetailViewStyles.detailheader}>
        <Image
          style={RestaurantDetailViewStyles.headerimage}
          source={{ uri: BACKEND_URL+header_image }}
        />
      </View>
      <View style={RestaurantDetailViewStyles.container}>

        <View style={RestaurantDetailViewStyles.titleContainer}>

        <View style={RestaurantDetailViewStyles.titleContainerRow}>
        <Text style={RestaurantDetailViewStyles.restaurantTitleDetailView}>
          {restaurant.restaurant_name}
        </Text>
        <View style={commonStyles.ribbonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Map", { restaurantData: restaurant })}>
        <FAI icon={faMapMarkerAlt} size={32} style={[commonStyles.locationMarkerContainer, Colors.secondaryText]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLikeRestaurant}>
        {restaurantLiked?<FontAwesomeIcon name="bookmark" style={[commonStyles.ribbon, Colors.secondaryText]}/>:<FontAwesomeIcon name="bookmark-o" style={[commonStyles.ribbon, Colors.secondaryText]}/>}
        </TouchableOpacity>
        </View>
        </View>
        <View style={[RestaurantDetailViewStyles.titleContainerRow]}>
        <RenderStars rating={restaurant.average_rating} />
        <View style={[RestaurantDetailViewStyles.tagRow]}>
            {JSON.parse(restaurant.tags).map((tag, index) => (
                <TouchableOpacity key={index} onPress={()=>handleSearchRestaurantsByTags(tag)}>
                <View style={RestaurantDetailViewStyles.tagContainer}>
                  <Text style={RestaurantDetailViewStyles.tagFont}>{tag}</Text>
                </View>
                </TouchableOpacity>
            ))}
          </View>
        </View>  
        <View style={[RestaurantDetailViewStyles.titleContainerRow, {marginBottom: 15}]}>
        <Text>{posts.length} {posts.length>1?"Bewertungen":"Bewertung"}</Text>
        </View>  

        <View style={RestaurantDetailViewStyles.restaurantDescriptionTextContainer}>
      <Text style={RestaurantDetailViewStyles.restaurantDescriptionText}>
        {isDescriptionExpanded
          ? restaurant.description
          : restaurant.description.slice(0, 50) + '...'}
      </Text>
          
        <TouchableOpacity onPress={handleUnwrapDescription} style={RestaurantDetailViewStyles.unwrapDescriptionContainer}>
          {isDescriptionExpanded?<Text style={RestaurantDetailViewStyles.unwrapDescriptionText}>Zuklappen</Text>:<Text style={RestaurantDetailViewStyles.unwrapDescriptionText}>Weiterlesen</Text>}
        </TouchableOpacity>
      
         </View>


        </View>
        
        
       
        <View style={{ marginTop: 20}}>
          <ImageList posts={posts} />
        </View>
        <View style={[RestaurantDetailViewStyles.rowWebIcons]}>
          {restaurant.website ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(restaurant.website);
              }}
            >
              <Text style={RestaurantDetailViewStyles.webIcon}>.com</Text>
            </TouchableOpacity>
          ) : null}
          {restaurant.instagram ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(restaurant.instagram);
              }}
            >
              <Icon
                style={RestaurantDetailViewStyles.socialmediaIcons}
                name="instagram"
              />
            </TouchableOpacity>
          ) : null}
          {restaurant.facebook ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(restaurant.facebook);
              }}
            >
              <Icon
                style={RestaurantDetailViewStyles.socialmediaIcons}
                name="facebook"
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${restaurant.telephone}`);
            }}
          >
            <Icon
              style={RestaurantDetailViewStyles.socialmediaIcons}
              name="phone"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`mailto:${restaurant.email}`);
            }}
          >
            <Icon
              style={RestaurantDetailViewStyles.socialmediaIcons}
              name="mail"
            />
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
    </View>
  );
};
export default RestaurantDetail;
