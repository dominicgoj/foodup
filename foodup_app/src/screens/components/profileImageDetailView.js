import React, {useState} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { BACKEND_URL } from "../../../config";

export default ProfileImageDetailView = ({userinfo, image}) => {
    console.log(image)
    return(
        <View style={styles.container}>
            <Text style={styles.usernameText}>{userinfo.username}</Text>
            <Image source={{uri: BACKEND_URL+image}} style={styles.profileImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        width: '90%',
        aspectRatio: 1,
        
      },
    container: {
        flexGrow: 1,
        verticalAlign: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    usernameText:{
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 30,
        marginTop: 30,
    }
})