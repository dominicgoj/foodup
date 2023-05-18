import React, { Component, useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { commonStyles } from '../../styles/commonstyles';
import DistanceLocation from './distanceLocation';
import { useNavigation } from '@react-navigation/native';
import ContentLoader from 'react-native-easy-content-loader';
import RestaurantInactiveRibbon from './restaurantInactive';
const RestaurantCard = ({restaurant, showActivity}) => {
    const [isLoaded, setIsLoaded] = useState(true)
    const imageSource = restaurant.title_image_preview;
    const handleImageLoad = () => {
        setIsLoaded(false);
      };

    return(
        //hier muss dann API abgerufen werden, map und erzeugen
        <View style={styles.container}>
            <View style={styles.imageContainer} >
            <ContentLoader active loading={isLoaded} />
            <Image style={styles.image} onLoad={handleImageLoad} source={{uri: imageSource}}/>
            </View>
            <View style={styles.row}>
            <Text style={commonStyles.restaurantTitle}>{restaurant.restaurant_name}</Text>
            <View style={styles.ratingBox}>
            <Icon name="star" style={styles.star}/>
            <Text style={styles.ratingText}>{restaurant.average_rating}</Text>
            </View>
            </View>
            <View style={styles.secondrow}>
            <View style={styles.locationContainer}>
            <Icon name='direction' style={styles.direction} />
            <DistanceLocation restaurant={restaurant} />
            </View>
            <View style={styles.locationContainer}>
            <Icon name='location-pin' style={styles.direction} />
            <Text style={styles.distance}>{restaurant.street}, {restaurant.city}</Text>
            </View>
            
            </View>
            {showActivity?<RestaurantInactiveRibbon restaurant={restaurant}/>:null}
        </View>
    );
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    secondrow: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
    },
    imageContainer: {
        alignItems: 'center',
        maxHeight: 120
    },
    locationContainer: {
        flexDirection: 'row',
        paddingRight: 20,
    },
    star: {
        color: '#FF7B46',
        fontSize: 20,
    },
    direction: {
        color: '#919191',
        fontSize: 14,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 10
       
    },
    ratingText: {
        fontSize: 14,
        color: '#FF7B46',
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
        
    },
    container:{
        justifyContent: 'center',
        alignSelf: 'center',
        maxHeight: 200,
        backgroundColor: '#E6E6E6',
        width: '90%',
        marginTop: 10,
        borderRadius: 5,
        paddingBottom: 10,
        marginBottom: 10,
        
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
        
        
    },
    
    rating: {
        fontSize: 8,
        paddingLeft: 10,

    },
    distance: {
        fontSize: 10,
        paddingLeft: 5,
        color: '#303030',
    }
})
export default RestaurantCard;