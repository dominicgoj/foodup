import React from "react";
import { View, Text, ScrollView } from "react-native";
import RestaurantListScreen from "./restaurantListScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { Colors } from "../../styles/colors";
import { StyleSheet } from "react-native";
export default FilteredRestaurantsView = ({route}) => {
    const {restaurantData} = route.params
    const {tag} = route.params
    return(
        <ScrollView>
            <View style={[styles.filterContainer]}>
                <View style= {[styles.filterIconContainer, Colors.secondaryBackground]}>

                <FontAwesomeIcon icon={faFilter} style={styles.filterIcon} size={24}/>
                </View>
                <View style={[styles.filterTextContainer, Colors.secondaryOutline]}>
            <Text style={styles.filterText}>{tag}</Text>
            </View>
            </View>
        <RestaurantListScreen restaurantData={restaurantData} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection:'row',
        margin: 20,
    },
    filterIcon: {
        color: 'white',
    },
    filterTextContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    filterText: {
        fontSize: 16, 
        color:'#262626', 
    },
    filterIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
    }
})