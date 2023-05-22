import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RatingButtons from './ratingbuttons';
import { commonStyles } from '../../styles/commonstyles.js';
import ratingstexts from '../../data/ratingtexts.json'
import SwipeDownBox from './swipeDownBox';
export default function RateRestaurant({onRatingPlaced, resetData}){
    const randomIndex = Math.floor(Math.random() * ratingstexts.length);
    const selectedItem = ratingstexts[randomIndex].title;
    const [showTooltip, setShowTooltip] = useState(false)
    const triggerTooltip = () => {
        setShowTooltip(true)
    }
    useEffect(() => {
        return () => {
          // Cleanup function
          console.log("set to false")
          setShowTooltip(false); // Reset showTooltip to false when component is unmounted
          
        };
      }, []);
    return(
        <View>
            <View style={{flexGrow:1, justifyContent:'center', alignItems:'center', position:'absolute', top: 0, alignSelf: 'center'}}>
            {showTooltip?<SwipeDownBox waitTime={1000} />:null}
            </View>
            <View style={{marginTop: 20}}>
            <Text style={commonStyles.header}>{selectedItem}</Text>
            <RatingButtons onRatingPlaced={onRatingPlaced} resetData={resetData} triggerTooltip={triggerTooltip}/>
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