import React, { Component }  from "react";
import { StyleSheet, Text, View } from 'react-native';

class MainScreen extends Component{
    render()
    {
        return(
            <View styles={styles.center}>
                <Text style={styles.title}>Main Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    title:{
        fontSize:36,
        marginBottom: 16
    }
})

export default MainScreen;