import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from "../../../styles/colors";
export default RestaurantImageList = ({ getRestaurantImages, setRestaurantImage }) => {
  const [photoIDActive, setPhotoIDActive] = useState(0)
  
  const photos = getRestaurantImages()
  const initialSetting = () => {
    
  }
  const handleSelectPhotoByUser = (key) => {
    console.log(key)
    setPhotoIDActive(key)
    setRestaurantImage(photos[key])
  }
  useEffect(() => {
    setRestaurantImage(photos[0]); // Set the initial selected photo as the one with key zero
  }, []);
  return (
    <View>
  {photos.map((photo, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[CreateRestaurantStyles.PreviewImageContainer]}
        onPress={() => handleSelectPhotoByUser(index)}
      >
        <Image
          style={[
            CreateRestaurantStyles.PreviewImage,
            { opacity: photoIDActive === index ? 0.5 : 1 },
          ]}
          source={{ uri: photo.uri }}
        />
        {photoIDActive === index ? (
          <View
            style={[
              Colors.primaryOutline,
              {
                borderWidth: 3,
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                opacity: 1,
                position: "absolute",
                bottom: 20,
                right: 20,
              },
            ]}
          >
            <Icon name="check" style={[{ fontSize: 20 }, Colors.primaryText]} />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  })}
</View>


  );
};
