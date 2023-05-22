import React, {useEffect, useState} from "react";
import { Text, View } from "react-native";
import { LoginFormStyle } from "../../../styles/loginFormStyles";

export default LoginSelectProfilImage = () => {
    return(
        <View key={"loginSelectProfileImg"} style={LoginFormStyle.container}>
          <Text style={LoginFormStyle.title}>Wähle ein Profilbild aus</Text>
            
         
        </View>
    )
}