import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { LoginFormStyle } from '../../../styles/loginFormStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../../../../config';
import updateUserProfileImg from '../../../api/updateUserProfileImg'
import AuthContext from '../../../utilities/authcontext';

export default RenderSelectProfileImg = ({setLoginFinalisedBoolTrue, setAccountProfileImage, userinfo, changePhotoFromUsertab}) => {
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(false);
    const [updateProfileImg, setUpdateProfileImg] = useState(false)
    const authcontext = useContext(AuthContext)
    const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
    const navigation = useNavigation()
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
      }
    })();
  }, []);

  useEffect(()=>{
    if(changePhotoFromUsertab){
      setSelectedImage(BACKEND_URL+userinfo.profile_img.replace(baseRegex, ''))
    }
  }, [])

  useEffect(()=>{
    if(updateProfileImg){
      const handleUpdate = async () => {
        const req = await updateUserProfileImg(userinfo, selectedImage)
        authcontext.setLoggedInUserData(req)
      }
      handleUpdate();
      setUpdateProfileImg(false)
      navigation.navigate("UserContent")
    }
  }, [updateProfileImg])

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      const croppedImage = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 1, format: 'jpeg' }
      );
      setSelectedImage(croppedImage.uri);
    }
  };
  const handleRegisterSelectedProfileImage = () => {
    
    if(selectedImage){
      setAccountProfileImage(selectedImage)
      if(!changePhotoFromUsertab){
        setLoginFinalisedBoolTrue()
      }
      else{
        setUpdateProfileImg(true)
      }
      }
      
      else{
        setAccountProfileImage("")
        console.log("select image")
        setLoginFinalisedBoolTrue()
      }
  }

  return (
    <View key={"selectPhotoChoice"} style={LoginFormStyle.container}>
        <View style={{paddingBottom: 30,}}>
          <Text style={LoginFormStyle.title}>Zeig dich von Deiner besten Seite.</Text>
          <Text style={LoginFormStyle.info}>Wähle ein Profilbild aus.</Text>
          </View>
      <TouchableOpacity onPress={handleImagePicker}>
        <View style={style.imageContainer}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={style.image}
          />
        ) : (
          <FontAwesomeIcon icon={faCamera} size={96} color='lightgray'/>
        )}
        </View>
      </TouchableOpacity>

      {
            selectedImage?(
                <TouchableOpacity
            style={LoginFormStyle.smallbutton}
            onPress={handleRegisterSelectedProfileImage}
          >
            <Text style={LoginFormStyle.buttonText}>Weiter</Text>
          </TouchableOpacity>
            ):(
                <TouchableOpacity
            style={LoginFormStyle.smallbuttonInactive}
            onPress={handleRegisterSelectedProfileImage}
            
          >
            <Text style={LoginFormStyle.buttonText}>Weiter ohne Profilbild</Text>
          </TouchableOpacity>
            )
        }
      
    </View>
  );
};

const style = StyleSheet.create({
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 300,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 300,
    }
})