import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RestaurantDetailViewStyles } from "../../../styles/restaurantDetailViewStyles";
import { commonStyles } from "../../../styles/commonstyles";
import RenderStars from '../renderstars.js' 
import Icon from 'react-native-vector-icons/Entypo';
import RestaurantRegisterPreviewImageList from "./restaurantRegisterPreviewImageList";
import { FontAwesomeIcon as FAI } from '@fortawesome/react-native-fontawesome'
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { Colors } from "../../../styles/colors";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default RestaurantRegisterPreviewRestaurantDetailPage = ({getRestaurantImages, 
    setRestaurantImage, getRestaurantName, getRestaurantTags, getRestaurantDescription}) => {
    const photo = getRestaurantImages()[0].uri
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    const handleUnwrapDescription = () => {
        setDescriptionExpanded(!isDescriptionExpanded)
      }
  
    return(
        <View>
            <View style={RestaurantDetailViewStyles.detailheader}>
       
                <Image
                  style={RestaurantDetailViewStyles.headerimage}
                  source={{ uri: photo}}
                />
      </View>
      <View style={RestaurantDetailViewStyles.container}>

        <View style={RestaurantDetailViewStyles.titleContainer}>

        <View style={RestaurantDetailViewStyles.titleContainerRow}>
        <Text style={RestaurantDetailViewStyles.restaurantTitleDetailView}>
          {getRestaurantName()}
        </Text>
        <View style={commonStyles.ribbonContainer}>
        <FAI icon={faInfoCircle} size={32} style={[commonStyles.locationMarkerContainer, Colors.secondaryText]} />
        <FAI icon={faMapMarkerAlt} size={32} style={[commonStyles.locationMarkerContainer, Colors.secondaryText]}/>
       <FontAwesomeIcon name="bookmark" style={[commonStyles.ribbon, Colors.secondaryText]}/>
        </View>
        </View>
        <View style={[RestaurantDetailViewStyles.titleContainerRow]}>
        <RenderStars rating={5} />
        <View style={[RestaurantDetailViewStyles.tagRow]}>
        {getRestaurantTags().map((tag, index) => (
               
               <View key={index} style={RestaurantDetailViewStyles.tagContainer}>
                 <Text style={RestaurantDetailViewStyles.tagFont}>{tag}</Text>
                
          </View>
             
           ))}
          </View>
        </View>  
        <View style={[RestaurantDetailViewStyles.titleContainerRow, {marginBottom: 15}]}>
        <Text>0 Bewertungen</Text>
        </View>  

        <View style={RestaurantDetailViewStyles.restaurantDescriptionTextContainer}>
      <Text style={RestaurantDetailViewStyles.restaurantDescriptionText}>
        {isDescriptionExpanded
          ? getRestaurantDescription()
          : getRestaurantDescription().slice(0, 50) + '...'}
      </Text>
          
        <TouchableOpacity onPress={handleUnwrapDescription} style={RestaurantDetailViewStyles.unwrapDescriptionContainer}>
          {isDescriptionExpanded?<Text style={RestaurantDetailViewStyles.unwrapDescriptionText}>Zuklappen</Text>:<Text style={RestaurantDetailViewStyles.unwrapDescriptionText}>Weiterlesen</Text>}
        </TouchableOpacity>
      
         </View>


        </View>
            
            <View style={{marginTop: 20}}>
               <RestaurantRegisterPreviewImageList />
            </View>
            <View style={RestaurantDetailViewStyles.rowWebIcons}>
            <TouchableOpacity><Text style={RestaurantDetailViewStyles.webIcon}>.com</Text></TouchableOpacity>
            <TouchableOpacity><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="instagram" /></TouchableOpacity>
            <TouchableOpacity><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="facebook"/></TouchableOpacity>
            <TouchableOpacity><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="phone"/></TouchableOpacity>
            <TouchableOpacity><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="mail"/></TouchableOpacity>
            </View>
            </View>
            
        </View>
    )
}