import React, { useEffect, useState } from 'react';
import { View, Modal, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Pressable, Linking } from 'react-native';
import { commonStyles } from '../../styles/commonstyles';
import Icon from 'react-native-vector-icons/Entypo';
import ImageList from './imageList.js'
import RenderStars from './renderstars';
import getRestaurantPosts from "../../api/getRestaurantPosts";

const RestaurantDetail = ({route}) =>{
    const {restaurant} = route.params
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getRestaurantPosts(restaurant.id);
      console.log(fetchedPosts)
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

    return (
        
        <ScrollView >
            <View style={styles.detailheader}>
            <Image style={styles.headerimage} source={require('../../../assets/img/food.jpg')} />
            </View>
            <View style={styles.container}>   
            <Text style={commonStyles.restaurantTitleDetailView}>{restaurant.restaurant_name}</Text>
            <View style={styles.ratingBox}>
            <RenderStars rating={restaurant.average_rating}/>
            </View>
            <View style={{marginTop: 20}}>
                <ImageList posts={posts}/>
            </View>
            <View style={styles.rowWebIcons}>
            <TouchableOpacity onPress={()=>{Linking.openURL(restaurant.website)}}><Text style={styles.webIcon}>.com</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(restaurant.instagram)}}><Icon style={styles.socialmediaIcons} name="instagram" /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(restaurant.facebook)}}><Icon style={styles.socialmediaIcons} name="facebook"/></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${restaurant.telephone}`)}}><Icon style={styles.socialmediaIcons} name="phone"/></TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(`mailto:${restaurant.email}`)}}><Icon style={styles.socialmediaIcons} name="mail"/></TouchableOpacity>
            </View>
            </View>
            
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    crossIconModal:{
        fontSize: 28,
        color: '#D6D6D6',
        textAlign: 'right'
    },
    commentUserTitle:{
        fontWeight: 'bold',
        fontSize: 15,
        padding: 15,
    },
    commentImg:{
        width: "100%",
        height: 400,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: "100%",
        height: "100%",
        marginTop: 22,
      },
      ratingText:{
        fontSize: 16,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    container:{
        flex:1,
    },
    webIcon:{
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    socialmediaIcons:{
        fontSize: 30,
        color: '#303030',
        margin: 10,
    },
    detailheader:{
        height: 100,
        width: "100%",
        backgroundColor: 'white',
        
    },
    starsRow:{
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowWebIcons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        
    },

    headerimage:{
        resizeMode: 'cover',
        width: "100%",
        height: "100%"
    },
    image:{
        backgroundColor: '#D9D9D9',
        height: 150,
        width: "32%",
        margin: 2,
        borderWidth: 1,
        borderColor: "#C7C7C7",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingBox:{
        flexDirection:'row',
        justifyContent: 'center',
        marginTop: 5,
        
    }
    
})
export default RestaurantDetail;