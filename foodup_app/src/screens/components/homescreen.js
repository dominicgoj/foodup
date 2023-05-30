import React, {useContext, useState} from "react";
import AuthContext from "../../utilities/authcontext";
import { View, ScrollView, StyleSheet } from "react-native";
import Feed from "./feed";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./searchbar";
import { RefreshControl } from "react-native-gesture-handler";
export default HomeScreen = ({route}) => {
    return(
        <View>
            <View style={styles.container}>
            <SearchBar />
            </View>
            <View style={{zIndex:-1}}>
            <Feed />
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    headerGreeting: {
        fontSize: 16,
        paddingBottom: 10,
    },
    container: {
        
        paddingBotom: 10,
        height: 60,
        
    }
})