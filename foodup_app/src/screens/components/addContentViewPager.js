import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

import TakePhoto from '../components/camera.js';
import RateRestaurant from '../components/rating.js';
import ViewPager from '@react-native-community/viewpager';
import CommentSection from '../components/commentsection.js';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BACKEND_URL } from '../../../config.js';
import AuthContext from '../../utilities/authcontext';

const AddContentScreen = ({onPressLinkToRestaurant}) => {
  
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [sendDataRequest, setSendDataRequest] = useState(false)
  const [resetData, setResetData] = useState(false)
  const [restaurant, setRestaurant] = useState(null)
  
  const [formState, setFormState] = useState({
    photo: null,
    photo_preview : null,
    rating: 0,
    comment: '',
    success: null,
  });
  const viewPagerRef = useRef(null);

  const handlePageSelected = (event) => {
    const currentPage = event.nativeEvent.position;
    if (currentPage === 0 && sendDataRequest) {
      viewPagerRef.current.setPage(0);
    }
  };

  const sendPostToAPI = async () => {
    const { photo, rating, comment } = formState;
    if(restaurant){ //checks if there is a restaurant, otherwise nothing can be posted
      
      if (!comment) {
        setFormState((prevState) => ({ ...prevState, comment: ' ' }));
      }
      if (!rating) {
        setFormState((prevState) => ({ ...prevState, rating: 0 }));
      }

      const formData = new FormData();
      formData.append('userid_posted', authContext.loggedInUserData.id);
      formData.append('restaurant_id', restaurant.id);
      formData.append('rating', formState.rating);
      formData.append('comment', formState.comment);
      formData.append('timestamp', 2);
      formData.append('image', {
        uri: formState.photo.uri,
        type: 'image/jpeg', // Set the correct MIME type for the image file
        name: 'photo.jpg', // Set a desired filename for the image
      }); // Append the image file to the form data
      formData.append('image_preview', {
        uri: formState.photo_preview.uri,
        type: 'image/jpeg', // Set the correct MIME type for the image file
        name: 'photo.jpg', // Set a desired filename for the image
      }); 
  
      
      try {
        const response = await axios.post(BACKEND_URL + '/post/create/', formData);
      } catch (error) {
        console.error('Error sending post request:', error);
      }
    }
    else{
    }
   
  };

  const handleData = (incomingData) => {
    const [key, value] = incomingData;
    
    if (key === "photo") {
      // If the key is "photo", update the formState with the photo file data
      setFormState((prevState) => ({ ...prevState, photo: value }));
    } 
    else if (key==="photo_preview"){
      setFormState((prevState) => ({ ...prevState, photo_preview: value }));
    }
    else {
      // Otherwise, update the formState with other data
      setFormState((prevState) => ({ ...prevState, [key]: value }));
    }
  };

  const checkDataValid = () =>{
    if(formState.photo){
      setSendDataRequest(true)
    }  
    else{
      viewPagerRef.current.setPage(0)
    }
  }
  const resetStates = () =>{
    setSendDataRequest(false)
    setFormState({
      comment : '',
      photo: null,
      rating: null
    })
    setRestaurant(null)
  }



  useEffect(() => {
    if (sendDataRequest) {
      
      sendPostToAPI();
      setResetData(true);
      resetStates();
      setTimeout(() => {
        viewPagerRef.current.setPage(0);
      }, 200);
      setTimeout(() => {
        setResetData(false);
        navigation.navigate('For You');
      }, 400);
    }
  }, [sendDataRequest, navigation]);
    
  /// handles the restaurant which is identified by camera and qr code
  const handleRestaurantIdentified = (identifiedRestaurant) => {
    setRestaurant(identifiedRestaurant)
    
  };

  return (
    <ViewPager key={0} style={styles.viewPager} initialPage={0} orientation="vertical" onPageSelected={handlePageSelected} ref={viewPagerRef}>
      <View key={0}style={styles.page}><TakePhoto key="1" onPhotoTaken={handleData} onRestaurantIdentified={handleRestaurantIdentified} onPressLinkToRestaurant={onPressLinkToRestaurant}/></View>
      <View key={1} style={styles.page}><RateRestaurant onRatingPlaced={handleData} resetData={resetData} /></View>
      <View key={2} style={styles.page}><CommentSection onCommentPlaced={handleData} onCommentSent={checkDataValid} resetData={resetData}/></View>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

export default AddContentScreen;
