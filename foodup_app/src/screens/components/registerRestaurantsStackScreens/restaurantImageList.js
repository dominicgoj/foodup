import React, {useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from "../../../styles/colors";
export default RestaurantImageList = ({ photos, setRestaurantImage }) => {
  const [photoIDActive, setPhotoIDActive] = useState("0")
  const handleSelectPhotoByUser = (key) => {
    setPhotoIDActive(key)
    console.log(photos[key])
    setRestaurantImage(photos[key])
    console.log("Selected photo", photos[key])
    console.log("Callback fct setimage: ", setRestaurantImage)
  }
  return (
    <View>
  {Object.entries(photos).map(([key, photo]) => {
    return (
      <TouchableOpacity
        key={key}
        style={[CreateRestaurantStyles.PreviewImageContainer]}
        onPress={() => handleSelectPhotoByUser(key)}
      >
<Image style={[CreateRestaurantStyles.PreviewImage, {opacity: photoIDActive === key ? 0.5 : 1}]} source={{ uri: photo }} />
        {
          photoIDActive===key?(
            <View style={[Colors.primaryOutline, {borderWidth: 3, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5, opacity:1, position:'absolute', bottom:20, right: 20,}]}>
        <Icon name="check" style={[{fontSize: 20}, Colors.primaryText]}/>
        </View>
          ):(null)
        }
        
        
      </TouchableOpacity>
    );
  })}
</View>

  );
};
