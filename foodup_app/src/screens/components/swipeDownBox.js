import React, { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import { Colors } from "../../styles/colors";
import Icon from "react-native-vector-icons/Entypo";

export default SwipeDownBox = ({ text, durationIn, durationOut, delayTime, waitTime }) => {
  const AnimatedText = () => {
    const fadeAnim = new Animated.Value(0);
    const [durIn, setDurIn] = useState(durationIn || 1000)
    const [durOut, setDurOut] = useState(durationOut || 1000)
    const [delTime, setDelTime] = useState(delayTime || 1000)
    const [waitingTime, setWaitingTime] = useState(waitTime || 5000)
    
    useEffect(() => {
      const fadeIn = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: durIn,
        useNativeDriver: true,
      });

      const fadeOut = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: durOut,
        delay: delTime, // Delay before starting the fade-out animation
        useNativeDriver: true,
      });

      const sequence = Animated.sequence([fadeIn, fadeOut]);

      const timeout = setTimeout(() => {
        Animated.loop(sequence).start();
      }, waitingTime); // 15000 milliseconds = 15 seconds

  return () => clearTimeout(timeout); // Clear the timeout when the component unmounts
}, []);

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
      <View style={[Colors.secondaryBackground, {borderBottomRightRadius: 15, borderBottomLeftRadius: 15, padding: 10,}]}>
        <Text style={{fontSize: 14, textAlign: 'center', color:'white', marginBottom: 10 }}>Swipe nach unten</Text>
        <Icon name="chevron-down" style={{fontSize: 15, textAlign: 'center', color:'white'}} />
      </View>
    </Animated.View>
    );
  };

  return (
    <View>
    <AnimatedText />
    </View>
  );
};
