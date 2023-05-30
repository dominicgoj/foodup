import React, { useContext } from "react"
import { ScrollView, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import RestaurantListScreen from "./restaurantListScreen"
import NoContent from "./nocontent"
import { RefreshControl } from "react-native-gesture-handler"
import AuthContext from "../../utilities/authcontext"
export default UserSavedContents = ({userRestaurantLikes}) => {
    const navigation = useNavigation();
    const nocontentText = "Du hast noch keine Restaurants gespeichert."
    const authcontext = useContext(AuthContext)
    return(
        <View style={{marginTop: 10, flex: 1}}>
            <ScrollView
      refreshControl={
        <RefreshControl onRefresh={authcontext.handleGlobalRefresh}/>
      }
      
    > 
        {userRestaurantLikes.length>0?(
            <RestaurantListScreen restaurantData={userRestaurantLikes} supressLocationAlert={true}/>
        ):(
            null
        )
    }
    </ScrollView>
    {userRestaurantLikes.length<1?(
        
        <NoContent headerText={nocontentText} />
     
    ):null}
    </View>
        
       
    )
}