import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { commonStyles } from '../../styles/commonstyles';


class RestaurantCard extends Component {
    
    render(){
    return(
        //hier muss dann API abgerufen werden, map und erzeugen
        <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("Detail", {restaurant : this.props.restaurant})}>
            <View style={styles.imageContainer} >
            <Image source={require('../../../assets/img/food.jpg')}
            style={styles.image}/>
            </View>
            <View style={styles.row}>
            <Text style={commonStyles.restaurantTitle}>{this.props.restaurant.restaurant_name}</Text>
            <View style={styles.ratingBox}>
            <Icon name="star" style={styles.star}/>
            <Text style={styles.ratingText}>{this.props.restaurant.average_rating}</Text>
            </View>
            </View>
            <View style={styles.secondrow}>
            <View style={styles.locationContainer}>
            <Icon name='direction' style={styles.direction} />
            <Text style={styles.distance}>230 m</Text>
            </View>
            <View style={styles.locationContainer}>
            <Icon name='location-pin' style={styles.direction} />
            <Text style={styles.distance}>{this.props.restaurant.street}, {this.props.restaurant.city}</Text>
            </View>
            </View>
            
        </TouchableOpacity>
    );
}
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
        flex:1,
        justifyContent: 'center',
        alignSelf: 'center',
        maxHeight: 200,
        backgroundColor: '#E6E6E6',
        width: '90%',
        marginTop: 10,
        borderRadius: 5,
        paddingBottom: 10,
        
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