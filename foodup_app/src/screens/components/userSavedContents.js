import React from "react"
import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import RestaurantListScreen from "./restaurantListScreen"
import NoContent from "./nocontent"
export default UserSavedContents = ({userRestaurantLikes}) => {
    const navigation = useNavigation();
    const nocontentText = "Du hast noch keine Restaurants gespeichert."
    console.log("Saved contents", userRestaurantLikes)
    return(
        <View>
        {userRestaurantLikes.length>0?(
            <RestaurantListScreen restaurantData={userRestaurantLikes} supressLocationAlert={true}/>
        ):(
            <NoContent headerText={nocontentText} />
        )
    }
    </View>
        
       
    )
}