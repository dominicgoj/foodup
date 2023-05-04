import React, { useState, useEffect, useRef, useContext } from 'react';
import { Animated, Text, View, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from './button.js';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'; 
import Icon from 'react-native-vector-icons/Entypo';   
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { BACKEND_URL } from '../../../config.js';
import queryString from 'query-string';
import AuthContext from '../../utilities/authcontext';
import {useFocusEffect} from '@react-navigation/native'
import { parse } from 'query-string/base.js';

export default function TakePhoto({onPhotoTaken, onRestaurantIdentified }) {
  const authContext = useContext(AuthContext);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [qrURL, setQrURL] = useState(null)
  const [identifiedRestaurant, setIdentifiedRestaurant] = useState(null)
  const [userAllowedToPost, setuserAllowedToPost] = useState(false)
  const cameraRef = useRef(null);
  const [barcodePoints, setBarcodePoints] = useState([]);
  const alertMessages = {
    'alreadyposted': ['Schon gepostet', 'Du hast zu diesem Restaurant schon eine Bewertung abgegeben'],
    'restaurantnotfound': ['QR ungültig', 'Der QR Code ist leider nicht gültig.']
  }
  useFocusEffect(
    React.useCallback(() => {
      resetPicture()
      setQrURL(null)
      setScanned(false)
      setuserAllowedToPost(false)
      return;
    }, [])
  );
  ////////CAMERA SECTION BEGIN
  useEffect(()=> {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

    })();
  }, [])


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

  if(hasCameraPermission === false){
    return <Text>No access to camera</Text>
  }
  /////// CAMERA SECTION END

  ////// BAR CODE READING SECTION

  const handleBarCodeScanned = ({ type, data, bounds }) => {
    setBarcodePoints(bounds);
    setTimeout(() => {
      setQrURL(data)
      setScanned(true)
    }, 1500);
    
    

  };
  const checkIfUserHasPostedAlreadyForThatRestaurant = async(restaurantScanned) =>{
    try{
      request = await axios.get(BACKEND_URL+'/post?userid_posted='+authContext.loggedInUserData.id+'&restaurant_id='+restaurantScanned.id);
      return request.data
    }catch(error){
      console.log(error)
    }
  }

  const parseURL = (url) =>{
    const parsed = queryString.parseUrl(url);
    const qrId = parsed.query.qr_id;
    return qrId
  }
  const getRestaurantIDbyQR = async (qr_id) =>{
    try{
      request = await axios.get(BACKEND_URL + '/restaurant?qr_id='+qr_id);
      return (request.data)
    }
    catch(error){
      console.log(error)
    }
  }
  // hook to check if scanned and then search db
  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (scanned) {
        const parsed_qr_url = parseURL(qrURL)
        const restaurantScanned = await getRestaurantIDbyQR(parsed_qr_url)
        if(restaurantScanned){
          const checkedUserForRestaurantPost = await checkIfUserHasPostedAlreadyForThatRestaurant(restaurantScanned)
        if(checkedUserForRestaurantPost.length>0){
          showAlert(alertMessages.alreadyposted)
        }
        else{
          setuserAllowedToPost(true)
          setIdentifiedRestaurant(restaurantScanned)
          onRestaurantIdentified(restaurantScanned)
          
        }
        }else{
          showAlert(alertMessages.restaurantnotfound)
        }
        
        
      }
    };
  
    fetchRestaurantData();
  }, [scanned]); //if the url qr code is scanned and set true
  const getOverlayStyles = () => {
    console.log(barcodePoints)
    if(barcodePoints.origin) {
      
      const { origin, size } = barcodePoints;
      const { x, y } = origin;
      const { width, height } = size;

      const screenWidth = Dimensions.get('window').width;
      const screenHeight = Dimensions.get('window').height;


      // Calculate the position and size of the overlay
      const overlayX = x;
      const overlayY = y;
      const overlayWidth = width;
      const overlayHeight = height;
      return {
        position: 'absolute',
        left: overlayX,
        top: overlayY,
        width: overlayWidth,
        height: overlayHeight,
        borderWidth: 2,
        borderColor: 'orange',
        opacity: 0.7,
      };
      
    }
    
    return null
  }
  /////
  // Animated Scan Barcode Text
  const AnimatedText = () => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
      const fadeIn = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      });
  
      const fadeOut = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        delay: 3000, // Delay before starting the fade-out animation
        useNativeDriver: true,
      });
  
      const sequence = Animated.sequence([fadeIn, fadeOut]);
  
      Animated.loop(sequence).start();
    }, []);
  
    return (
      <Animated.View style={[styles.scanBarcodeView, { opacity: fadeAnim }]}>
        <Text style={styles.scanBarcodeText}>Scanne einen foodup Restaurant QR Code.</Text>
      </Animated.View>
    );
  };
  const showAlert = (errormsg) => {
    Alert.alert(
      errormsg[0],
      errormsg[1],
      [
        {
          text: 'OK',
          onPress: () => setuserAllowedToPost(false),
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(()=>{
    console.log(userAllowedToPost)
  }, [userAllowedToPost])
  ////////////////////
  ////////////////////
  return (
    <View style={styles.container}>
      {!image && !scanned? (
  <View style={styles.camera}>
    <BarCodeScanner
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned={handleBarCodeScanned}
    />
    <AnimatedText />
    <View style={[styles.overlay, getOverlayStyles()]}>
    
  </View>
  </View>) : 
    !image ? (
      <Camera
      style={styles.camera}
      type={type}
      flashMode={flash}
      ref={cameraRef}
    >
      
    </Camera>)
    : (
    <Image source={{ uri: image }} style={styles.camera} />)}
      <View style={styles.iconOverlay}>
        
      {userAllowedToPost ? (
      image ? (
        <View>
          <TouchableOpacity onPress={resetPicture}>
            <Icon name='circle-with-cross' style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={takePicture}>
          <Icon name='circle' style={styles.iconButton} />
        </TouchableOpacity>
      )
    ) : null}
       
      </View>
    </View>
  );
        }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f1f1',
      justifyContent: 'center',
      position: 'relative'
    },
    camera: {
      flex: 1,
      borderRadius: 20
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
    },
    overlay: {
      backgroundColor: 'transparent',

    },
    warningText:{
      fontSize: 16,
      color: 'red'
    },
    overlayWarning: {
      position: 'absolute',
      top: '25%',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'red',
      padding: 15,

    },
    scanBarcodeText:{
      fontSize: 24,
      textAlign: 'center',
      color: 'white'

    },
    scanBarcodeView:{
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
      marginBottom: 30,
      marginLeft: 30,
      marginRight: 30,
      
    }
  });
  