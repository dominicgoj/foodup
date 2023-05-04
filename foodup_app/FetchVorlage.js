import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from './config.js';

export default function App() {
  
  const [data, setData] = useState([]);

  

  const fetchData = async () => {
    try {
      const response = await axios.get(BACKEND_URL+'/user/2');
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex:1, justifyContent:'center'}}>
     <Button title='Hello' onPress={fetchData}/>
     <Text>{data.telephone}</Text>
    </View>
  );
};