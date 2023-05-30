import React, {useState} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BACKEND_URL } from "../../../config";
import calculateTimeAgo from "../../utilities/calculateTimeAgo";
import { useNavigation } from "@react-navigation/native";


export default ProfileImageDetailView = ({userinfo, image, setUserprofileImgModal}) => {
    const navigation = useNavigation()
    const handleClickOnUserProfileImgToChange = () => {
        setUserprofileImgModal(false)
        navigation.navigate("UserChangePhotoPage")
    }
    return(
        <View style={styles.container}>
            <Text style={styles.usernameText}>{userinfo.username}</Text>
            <TouchableOpacity onPress={handleClickOnUserProfileImgToChange}>
            <Image source={{uri: BACKEND_URL+image}} style={styles.profileImg} />
            </TouchableOpacity>
            <View style={{padding: 20,}}>
            <Text>Dabei seit: {calculateTimeAgo(userinfo.created_at)}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    profileImg: {
        width: 300,
        height: 300,
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