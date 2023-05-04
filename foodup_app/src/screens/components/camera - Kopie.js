import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, Touchable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from './button.js';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'; 
import Icon from 'react-native-vector-icons/Entypo';   
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function TakePhoto({onPhotoTaken, resetData}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  useEffect(()=> {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

    })();
  }, [])

  useEffect(() => {
    if (resetData) {
      resetPicture()
    }
  }, [resetData]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
   
  };
  
  const startScan = () => {
    setScanned(false);
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        const compressedImage = await compressImage(data.uri)
        onPhotoTaken(["photo", compressedImage]);
        setImage(compressedImage.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const compressImage = async (uri, format = SaveFormat.JPEG) => { // SaveFormat.PNG
    const result = await manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, format }
    );

    return  { name: `${Date.now()}.${format}`, type: `image/${format}`, ...result };
    // return: { name, type, width, height, uri }
};

  const resetPicture = () => {
    setImage(null)
    onPhotoTaken(["photo", null])
  }
  function saveImage(){
    console.log("saved")
  }
  if(hasCameraPermission === false){
    return <Text>No access to camera</Text>
  }
  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View style={styles.iconOverlay}>
        {image ? (
          <View>
            <TouchableOpacity
              onPress={resetPicture}
            ><Icon name='circle-with-cross' style={styles.iconButton} /></TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={takePicture}><Icon name='circle' style={styles.iconButton} /></TouchableOpacity>
        )}
      </View>
    </View>
  );
        }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      justifyContent: 'center'
    },
    camera: {
      flex: 1,
      borderRadius: 20
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'space-between',
      padding: 30
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    iconOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 20
    },
    iconButton: {
      marginHorizontal: 20,
      fontSize:64,
      color: 'white'
    }
  });
  