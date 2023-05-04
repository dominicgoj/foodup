import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { commonStyles } from '../../styles/commonstyles.js';
import Icon from 'react-native-vector-icons/Entypo';

function SuccessSending({onSucessPlaced}) {
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Icon name="paper-plane" style={styles.success}/>
      </View>
    );
  }
const styles = StyleSheet.create({
    success:{
        fontSize: 150,
        color: 'green'
    }
})
  export default SuccessSending;
