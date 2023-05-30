import React, { useState } from 'react';
import { View } from 'react-native';
import calculateLevel from '../../utilities/calculateLevel';

const TestComponent = ({}) => {
  const newPoints = 20
  const previousPoints = 18
  const actualLevel = calculateLevel(newPoints)
  const previousLevel = calculateLevel(previousPoints)
  const levels = actualLevel.levels
  //const actualLevelRange = levels.find((levelObj)=> levelObj.level===actualLevel.level)
  //const previousLevelRange = levels.find((levelObj)=>levelObj.level===previousLevel.level)

  if(actualLevel.level!=previousLevel.level){
    
  }
  else{

  }
  return (
    <View>
      
    </View>
  );
};

export default TestComponent;