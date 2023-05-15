import React from "react";
import { View, Text } from "react-native";
import infomsg from '../../data/infomsg.json'
export default NoContentsAvailable = () => {
    return(
        <View style={{paddingTop: 20,}}>
            <Text style={{textAlign: 'center'}}>
                {infomsg.nocontentsavailable.title}
            </Text>
        </View>
    )
}