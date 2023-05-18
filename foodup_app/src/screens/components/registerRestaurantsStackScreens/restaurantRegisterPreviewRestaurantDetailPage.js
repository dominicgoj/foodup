import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RestaurantDetailViewStyles } from "../../../styles/restaurantDetailViewStyles";
import { commonStyles } from "../../../styles/commonstyles";
import RenderStars from '../renderstars.js' 
import Icon from 'react-native-vector-icons/Entypo';
import RestaurantRegisterPreviewImageList from "./restaurantRegisterPreviewImageList";

export default RestaurantRegisterPreviewRestaurantDetailPage = ({getRestaurantImages, setRestaurantImage, getRestaurantName}) => {
    const photo = getRestaurantImages()[0]
    return(
        <View>
            <View style={RestaurantDetailViewStyles.detailheader}>
            <Image style={RestaurantDetailViewStyles.headerimage} source={{ uri: photo.uri }} />
            </View>
            <View style={RestaurantDetailViewStyles.container}>   
            <Text style={commonStyles.restaurantTitleDetailView}>{getRestaurantName()}</Text>
            <View style={RestaurantDetailViewStyles.ratingBox}>
            <RenderStars rating={5}/>
            </View>
            <View style={{marginTop: 20}}>
               <RestaurantRegisterPreviewImageList />
            </View>
            <View style={RestaurantDetailViewStyles.rowWebIcons}>
            <TouchableOpacity onPress={()=>{Linking.openURL(restaurant.website)}}><Text style={RestaurantDetailViewStyles.webIcon}>.com</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(restaurant.instagram)}}><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="instagram" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(restaurant.facebook)}}><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="facebook"/></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${restaurant.telephone}`)}}><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="phone"/></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(`mailto:${restaurant.email}`)}}><Icon style={RestaurantDetailViewStyles.socialmediaIcons} name="mail"/></TouchableOpacity>
            </View>
            </View>
            
        </View>
    )
}