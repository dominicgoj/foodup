import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { RestaurantDetailViewStyles } from "../../styles/restaurantDetailViewStyles";
import { Colors } from "../../styles/colors.js"
import { useNavigation } from "@react-navigation/native";

export default AddRestaurantButton = () =>{
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("UserRegisterRestaurantName")}>
        <View style={{flex: 1, marginTop: 25, justifyContent: 'center', alignItems: 'center'}}>
        <View style={[RestaurantDetailViewStyles.detailViewEditButton, Colors.secondaryBackground]}>
            <Text style={RestaurantDetailViewStyles.detailViewEditButtonText}>Restaurant hinzufügen</Text>
        </View>
        </View>
        </TouchableOpacity>
    )
}