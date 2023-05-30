import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RatingButtons from './ratingbuttons';
import { commonStyles } from '../../styles/commonstyles.js';
import ratingstexts from '../../data/ratingtexts.json'
import SwipeDownBox from './swipeDownBox';
export default function RateRestaurant({onRatingPlaced, showTooltip, resetData}){
    const randomIndex = Math.floor(Math.random() * ratingstexts.length);
    const selectedItem = ratingstexts[randomIndex].title;
    const [localTooltipShow, setLocalTooltipShow] = useState(false)

    const triggerTooltip = () => {
        setLocalTooltipShow(true)
    }
    
    return(
        <View>
            <View style={{flexGrow:1, justifyContent:'center', alignItems:'center', position:'absolute', top: 0, alignSelf: 'center'}}>
            {localTooltipShow?<SwipeDownBox waitTime={10000} />:null}
            </View>
            <View style={{marginTop: 20}}>
            <Text style={commonStyles.header}>{selectedItem}</Text>
            <RatingButtons onRatingPlaced={onRatingPlaced} resetData={resetData} triggerTooltip={triggerTooltip} />
            <Text style={commonStyles.subheader}>Bewerte deine Location mit bis zu 5 Bananen.</Text>
            </View>  
               
            
            </View>
    )

    }
const styles = StyleSheet.create({
    header:
    {   fontSize: 20,
        textAlign: 'center',
        
    }
})