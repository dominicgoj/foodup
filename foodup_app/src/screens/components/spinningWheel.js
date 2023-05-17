import React, {useRef, useEffect} from "react";
import { ActivityIndicator, View, Text, Animated } from "react-native";
import { Colors } from "../../styles/colors";
import SpinningWheelStyles from "../../styles/spinningWheelStlyes";

const SpinningWheel = () => {
    const fadeInAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      startAnimation();
    }, []);
  
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(fadeInAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.delay(3000), // Adjust the delay between each text fade-in
      ]).start();
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[SpinningWheelStyles.header, Colors.secondaryText]}>Foodup</Text>
        <ActivityIndicator size="large" color={Colors.secondaryText.color} />
        <View style={SpinningWheelStyles.subtitleRow}>
          <Animated.Text
            style={[SpinningWheelStyles.subtitle, { opacity: fadeInAnim }]}
          >
            Bewerten.
          </Animated.Text>
          <Animated.Text
            style={[
              SpinningWheelStyles.subtitle,
              { opacity: fadeInAnim, marginLeft: 10 },
            ]}
          >
            Teilen.
          </Animated.Text>
          <Animated.Text
            style={[
              SpinningWheelStyles.subtitle,
              { opacity: fadeInAnim, marginLeft: 10 },
            ]}
          >
            Genießen.
          </Animated.Text>
        </View>
      </View>
    );
  };
  
  export default SpinningWheel;