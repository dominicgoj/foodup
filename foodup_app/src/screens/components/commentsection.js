import React, { Component, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { commonStyles } from '../../styles/commonstyles.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function CommentSection({ onCommentPlaced, onCommentSent, resetData }) {
  const [text, setText] = useState('');

  const handleChangeText = (newText) => {
    setText(newText);
    onCommentPlaced(["comment", newText]);

  };

  useEffect(() => {
    if (resetData) {
      setText('');
    }
  }, [resetData]);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View>
    <View style={styles.container}>
      <Text style={commonStyles.header}>
        Verfasse einen kurzen Kommentar über dein Essen oder deinen Aufenthalt.
      </Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={8}
        onChangeText={handleChangeText}
        value={text}
        placeholder="Optional"
        maxLength={330}
      /></View>
        <TouchableOpacity style={styles.sendButtonContainer} onPress={onCommentSent}><Text style={styles.buttonText}>Senden</Text></TouchableOpacity>
    </View></TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
    header:
    {   fontSize: 20,
        textAlign: 'center',
        
    },
    sendButtonContainer:{
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 120,
      marginRight: 120,
      marginTop: 50,
      height: 50,
      backgroundColor: 'blue',
      borderRadius: 5


    },  
    buttonText:{
      color:'white',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    input: {
        width: '80%',
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
      },
})