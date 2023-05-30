import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity, View, Alert } from 'react-native';
import { CreateRestaurantStyles } from '../styles/createRestaurantStyles';

export default OpenRetrievePhotos = ({ setPhotos }) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        // Handle permission denied
      }
    }
  };

  const openPhotosApp = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // Handle permission denied
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets.length > 3) {
        showAlertMessage("Das ist zu viel!", "Bitte wähle maximal 3 Bilder aus.");
      } else {
        const selectedPhotos = result.assets.map((asset) => ({
          uri: asset.uri,
          type: 'image/jpeg',
          name: asset.uri.split('/').pop(),
        }));
        setPhotos(selectedPhotos); // Pass the selected photos to the server
      }
    }
  };

  const showAlertMessage = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  return (
    <TouchableOpacity onPress={openPhotosApp}>
      <View>
        <Icon name="circle-with-plus" style={CreateRestaurantStyles.addPhotoIcon} />
      </View>
    </TouchableOpacity>
  );
};
