import React, {useEffect, useRef} from "react";
import { commentStyles } from "../../styles/commentstyles";
import { View, Text, Animated } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
const ImageLoader = ({ loading }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    const animateFadeInFadeOut = () => {
      const fadeIn = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      });
  
      const fadeOut = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      });
  
      const sequence = Animated.sequence([fadeIn, fadeOut]);
  
      Animated.loop(sequence).start();
    };
    animateFadeInFadeOut()

    useEffect(()=>{
      console.log(loading)
    }, [])
    return loading ? (
        <Animated.View style={[commentStyles.animatedStyleContainer, {
            opacity: fadeAnim, }]}>
          <Icon name="documents" style={commentStyles.animatedStyleText} />
        </Animated.View>

    ) : null;
  };
  
  export default ImageLoader;
  
