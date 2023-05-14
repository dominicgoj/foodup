import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { DeleteBox } from '../../styles/deletebox';
import { Colors } from '../../styles/colors';
const ThreeDots = ({handleSetDeletePostVisible}) => {
 
  return (
    
      <TouchableOpacity onPress={handleSetDeletePostVisible}>
        <View style={{ width: 50, height: 20,alignSelf: 'flex-end' }}>
          <Icon name="dots-three-horizontal" style={{ fontSize: 18, textAlign: 'right' }} />
        </View>
      </TouchableOpacity>

  );
};

export default ThreeDots;
