import React, {useState, useContext} from "react"
import AuthContext from "../../utilities/authcontext";
import { View, ScrollView, Image, TouchableOpacity, Text, Linking, } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { RestaurantDetailViewStyles } from "../../styles/restaurantDetailViewStyles";
import { BACKEND_URL } from "../../../config";
import Icon from "react-native-vector-icons/Entypo";
import { FontAwesomeIcon as FAI } from '@fortawesome/react-native-fontawesome'
import { faWifi } from "@fortawesome/free-solid-svg-icons/faWifi";
import { Colors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
export default RestaurantInfoCard = ({route}) => {
    const authContext = useContext(AuthContext)
    const {restaurant, cameToChangePhotoOnly} = route.params
    const navigation = useNavigation()
    const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
    const header_image = restaurant.title_image.replace(baseRegex, '')
    const websiteUrlDisplayed = restaurant.website.replace(/^https?:\/\//, '');
    const handleNavigationToJustChangeRestaurantPhoto = () => {

        navigation.navigate("RestaurantRegisterAddPhoto", 
           { cameToChangePhotoOnly: cameToChangePhotoOnly, restaurant: restaurant })
      }
    return(
        <View style={{flexGrow: 1}}>
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={() => {
          authContext.handleGlobalRefresh();
          
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
        </View>
        <Text style={[RestaurantDetailViewStyles.restaurantSubTitleDetailView]}>
          Kontakt:
        </Text>
        </View>
        <View>
        <TouchableOpacity>
                 <View style={RestaurantDetailViewStyles.contactInformationRow}>
                 <Image source={require('../../../assets/img/resto_location_small.png')} style={{width: 30, height: 30, margin: 10}} />
            
            <View style={RestaurantDetailViewStyles.contactInformationTextContainer}>
              <Text style={[RestaurantDetailViewStyles.contactInformationText]}>{restaurant.street}, {restaurant.city} {restaurant.zip}</Text>
              </View>
              </View>
              </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${restaurant.telephone}`);
            }}
          >
            <View style={RestaurantDetailViewStyles.contactInformationRow}>
          
            <Icon
              style={[RestaurantDetailViewStyles.socialmediaIcons, Colors.secondaryText]}
              name="phone"
            />
          
          <View style={RestaurantDetailViewStyles.contactInformationTextContainer}>
          <Text style={[RestaurantDetailViewStyles.contactInformationText]}>{restaurant.telephone}</Text>
          </View>
          </View>
          </TouchableOpacity>

          

            {restaurant.email?(
                <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`mailto:${restaurant.email}`);
                }}
              >
                 <View style={RestaurantDetailViewStyles.contactInformationRow}>
                <Icon
                  style={[RestaurantDetailViewStyles.socialmediaIcons, Colors.secondaryText]}
                  name="mail"
                />
            
            <View style={RestaurantDetailViewStyles.contactInformationTextContainer}>
              <Text style={[RestaurantDetailViewStyles.contactInformationText]}>{restaurant.email}</Text>
              </View>
              </View>
              </TouchableOpacity>
            ):null}
          

          {restaurant.website ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(restaurant.website);
              }}
            >
                 <View style={RestaurantDetailViewStyles.contactInformationRow}>
              <FAI icon={faWifi} size={32} style={[RestaurantDetailViewStyles.socialmediaIcons, Colors.secondaryText]}/>
              <View style={RestaurantDetailViewStyles.contactInformationTextContainer}>
              <Text style={[RestaurantDetailViewStyles.contactInformationText]}>{websiteUrlDisplayed}</Text>
              </View>
              </View>
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
        </View>
        </View>
        
    </ScrollView>
    </View>
    )
}