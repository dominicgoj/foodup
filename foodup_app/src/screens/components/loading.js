import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView} from "react-native";
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { Colors } from "../../styles/colors";

const Loading = ({loading, textContent}) => {
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <SpinnerOverlay visible={loading} textContent={textContent} textStyle={Colors.secondaryText} />
          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              
            </View>
          ) : (
            null
          )}
        </SafeAreaView>
      );
}
export default Loading;