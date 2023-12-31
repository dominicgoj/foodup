import React from "react";
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, View } from "react-native";

export default RenderStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Icon key={i} name='star-outlined' style={styles.star} />);
    } else {
      stars.push(<Icon key={i} name='star' style={styles.starInactive} />);
    }
  }

  return (
    <View style={{ flexDirection: 'row' }}>{stars}</View>
  );
};
  const styles = StyleSheet.create({
    star:{
        fontSize: 16,
        color: 'orange',
        textShadowColor: 'orange',
        textShadowRadius: 4,
        
    },
    starInactive:{
      fontSize: 16,
      color: '#D4D4D4',
      
      
  }
})