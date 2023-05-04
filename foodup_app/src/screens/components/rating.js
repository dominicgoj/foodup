import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RatingButtons from './ratingbuttons';
import { commonStyles } from '../../styles/commonstyles.js';
import ratingstexts from '../../data/ratingtexts.json'

export default function RateRestaurant({onRatingPlaced, resetData}){
    const handleRating = () =>{
        onRatingPlaced()
    }

    

    const randomIndex = Math.floor(Math.random() * ratingstexts.length);
    const selectedItem = ratingstexts[randomIndex].title;
   
    return(
        <View>
            <Text style={commonStyles.header}>{selectedItem}</Text>
            <RatingButtons onRatingPlaced={onRatingPlaced} resetData={resetData}/>
            <Text style={commonStyles.subheader}>Bewerte deine Location mit bis zu 5 Bananen.</Text>
            <View>
        <View style={{height:'60%'}}></View>
        <Text style={{height: '20%', fontSize: 18, textAlign: 'center', color:'#F4A831'}}>
          Nach unten swipen.
        </Text>
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