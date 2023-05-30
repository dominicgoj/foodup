import React from "react";
import { Text, View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFaceSadTear } from '@fortawesome/free-regular-svg-icons/faFaceSadTear'
import { Colors } from "../../styles/colors";


export default NoContent = ({headerText}) => {
    return(
        <View style={{flexGrow: 1, alignItems:'center', justifyContent:'center', height:'100%'}}>
            <FontAwesomeIcon icon={faFaceSadTear} size={96} style={Colors.secondaryText} />
            <Text style={[{fontWeight: 'bold', marginTop: 20, marginLeft: 25, marginRight: 25, textAlign:'center'}, Colors.secondaryText]}>{headerText}</Text>
            </View>
    )
}