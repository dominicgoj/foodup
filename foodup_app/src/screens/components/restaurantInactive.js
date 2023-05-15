import React from "react";
import { View, Text } from "react-native";

export default RestaurantInactiveRibbon = ({restaurant}) => {
    return(
        
        <View style={{width: 50, position: 'absolute',
    top: 0, right: 0,height: 20, backgroundColor: restaurant.active ? 'green' : 'red', 
    borderBottomLeftRadius: 5, borderTopRightRadius: 5, 
    justifyContent:'center', alignItems:'center'}}>

        {restaurant.active?(
        <Text style={{fontWeight:'bold', color:'white', fontSize: 10}}>Aktiv</Text>):
        (<Text style={{fontWeight:'bold', color:'white', fontSize: 10}}>Inaktiv</Text>)}
        </View>
    )
    
}