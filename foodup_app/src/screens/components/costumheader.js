import React from "react";
import { useNavigation } from "@react-navigation/native";
import {View, TouchableWithoutFeedback, Image, Text} from 'react-native'
import { commonStyles } from "../../styles/commonstyles";
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from "../../styles/colors";

const CustomHeader = ({arrowShown, logoShown, headerText }) => {
    const navigation = useNavigation();
    
    return (
      
        <View style={[commonStyles.headerContainer]}>
        {arrowShown ? (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={[commonStyles.iconContainerButtonBack]}>
              <Icon name='chevron-small-left' style={commonStyles.headerBackButton} />
              
            </View>
            
            </TouchableWithoutFeedback>
        ) : null}
        {logoShown ? <View style={commonStyles.foodUpLogo}><Image source={require("../../../assets/img/foodup_logo_small.png")} style={{height: 50, width: 150}}/></View>:null}
        {headerText?<View style={{justifyContent: 'flex-end', flex: 1, alignContent:'center', paddingRight: arrowShown ? 40 : 0}}><Text style={[commonStyles.headerText, Colors.primaryText]}>{headerText}</Text></View>:null}
          
      </View>
      
    );
  };

export default CustomHeader;