import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../styles/colors';
export default ProgressBar = ({ value, maxValue, handleIncrementAmountOfAnimations, amountOfAnimations, involvedLevels }) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [currentValue, setCurrentValue] = useState(0);
  useEffect(() => {
    //progressBarAnimStopped is used to track if the user gets to a new level
    if(amountOfAnimations<involvedLevels.length)
    {
      progressAnimation.setValue(0)
    }
    
    
    
    const animationDuration = 2000; // Duration in milliseconds
    const intervalDelay = 100; // Update interval in milliseconds
    let animationFinished = false;
    const animation = Animated.timing(progressAnimation, {
      toValue: value,
      duration: animationDuration,
      useNativeDriver: false,
    });

    const interval = setInterval(() => {
      setCurrentValue(progressAnimation._value);
    }, intervalDelay);

    animation.start(({ finished }) => {
      if (finished && !animationFinished) {
        animationFinished = true;
        if(amountOfAnimations<involvedLevels.length){
          handleIncrementAmountOfAnimations()
          
        }
        
        
        
      }
    });

    return () => {
      animation.stop();
      clearInterval(interval);
            
    };
  }, [value, progressAnimation, amountOfAnimations]);

  const progress = Math.min(currentValue, maxValue) / maxValue; // Calculate progress percentage

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }, Colors.secondaryBackground]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginRight: 100
    
  },
  progressBar: {
    height: '100%',
  },
});
