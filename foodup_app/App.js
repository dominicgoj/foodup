import React, {useEffect, useState} from "react";
import { View } from "react-native";
import axios from 'axios';
import { BACKEND_URL } from "./config";
export default function App() {
  const [test, setTest] = useState('')
  const testFunc = async () => {
    try{
      request = await axios.get(BACKEND_URL+"/restaurant/")
      console.log("request ist: ", request.data)

    }catch(error){
      console.log(error)
    }

  }
  testFunc()

  return (
    <View></View>
  );
}
