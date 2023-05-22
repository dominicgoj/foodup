import React, { useRef, useEffect, useContext, useState } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Colors } from "../../styles/colors";
import Icon from "react-native-vector-icons/Entypo";

export default LocationServiceOffAlert = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [showAlert, setShowAlert] = useState(true)
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    {
      useNativeDriver: true,
    }
  );

  const onHandlerStateChange = (event) => {
    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationY > 0
    ) {
      setShowAlert(false)
      fadeOut();
    }
  };

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View>
      {showAlert?(
        <Animated.View
        style={[{ opacity: fadeAnim, transform: [{ translateY: translateY }] }]}
      >
        <View
          style={[
            {
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 30,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              shadowColor: "grey",
              shadowRadius: 5,
              shadowOpacity: 0.4,
            },
            Colors.secondaryBackground,
          ]}
        >
          <Icon name="chevron-down" style={{textAlign:'center', fontSize: 32, color:'white', paddingBottom: 15, paddingTop: 15}} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
              paddingBottom: 20,
              textAlign: "center",
            }}
          >
            Ortungsdienst ausgeschaltet
          </Text>
          <Text style={{ fontSize: 14, color: 'white', textAlign: "justify" }}>
           Um die App umfänglich nutzen zu können, schalte bitte den Ortungsdienst in den Einstellungen deines Gerätes ein.
          </Text>
        </View>

      </Animated.View>

      ):null}
      
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};

