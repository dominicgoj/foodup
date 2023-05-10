import React from "react";
import { View, Text, StyleSheet, SafeAreaView} from "react-native";
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { Colors } from "../../styles/colors";

const Loading = ({loading}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <SpinnerOverlay visible={loading} textContent={'Gleich gehts los'} textStyle={Colors.secondaryText} />
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