import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RatingButtons = ({ onRatingPlaced, resetData, triggerTooltip}) => {
  
  const [selected, setSelected] = useState([])
  const handleButtonPress = (buttonIndex) => {
    setSelected([...Array(buttonIndex + 1).keys()]);
    onRatingPlaced(["rating", buttonIndex+1]);
    triggerTooltip()
  };
  useEffect(()=>{
    setSelected([])
  }, [resetData])
  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map((index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleButtonPress(index)}
          style={[
            styles.button
          ]}
        >
          <Image
            source={selected.includes(index) ? require('../../../assets/img/banana.png') : require('../../../assets/img/greybanana.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    
  },
  selectedButton: {
    
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});

export default RatingButtons;
