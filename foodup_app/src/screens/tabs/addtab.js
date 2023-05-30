import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import TakePhoto from '../components/camera.js';
import RateRestaurant from '../components/rating.js';
import PagerView from 'react-native-pager-view';
import CommentSection from '../components/commentsection.js';
import { useNavigation } from '@react-navigation/native';
import createPost from '../../api/createPost.js';
import AuthContext from '../../utilities/authcontext';
import calculatePointsIncrease from '../../utilities/calculatePointsIncrease.js';
import ModalView from '../components/modalView.js'
import UpdateUserPoints from '../../api/updateUserPoints.js';
import BananaPointsUserView from '../components/bananaPointsUserView.js';
const AddContentScreen = () => {
  
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [sendDataRequest, setSendDataRequest] = useState(false)
  const [resetData, setResetData] = useState(false)
  const [restaurant, setRestaurant] = useState(null)
  const [increasedPoints, setIncreasedPoints] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const onPressLinkToRestaurant = (restaurant) =>{
    navigation.navigate('RestaurantDetail', {restaurant})
  }
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
        setFormState((prevState) => ({ ...prevState, rating: '0' }));
      }

      const formData = new FormData();
      formData.append('userid_posted', authContext.loggedInUserData.id);
      formData.append('restaurant_id', restaurant.id);
      formData.append('rating', formState.rating);
      formData.append('comment', formState.comment);
      formData.append('timestamp', 2);
      formData.append('active', true);
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
  
      const post_request = await createPost(formData, restaurant.id)
      // UPDATING AUTHCONTEXT
      const updatedUserPosts = [...authContext.userPosts, post_request.post_response];
      authContext.setUserPosts(updatedUserPosts);
      const increasePoints = calculatePointsIncrease(updatedUserPosts)
      setIncreasedPoints(increasePoints)
      const updatedPoints = authContext.loggedInUserData.banana_points + increasePoints;
      const updatedUserData = {
        ...authContext.loggedInUserData,
        banana_points: updatedPoints
      };
      authContext.setLoggedInUserData(updatedUserData);
      setShowSuccessModal(true)
      await UpdateUserPoints(authContext.loggedInUserData, updatedPoints)

      
      
      
      
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
      photo: null,
      photo_preview : null,
      rating: 0,
      comment: '',
      success: null,
    })
    setRestaurant(null)
  }

  

  useEffect(() => {
    if (sendDataRequest) {
      sendPostToAPI();
      setResetData(true);
      resetStates();
    }
  }, [sendDataRequest, navigation]);
    
  /// handles the restaurant which is identified by camera and qr code
  const handleRestaurantIdentified = (identifiedRestaurant) => {
    setRestaurant(identifiedRestaurant)
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    viewPagerRef.current.setPage(0);
    setResetData(false);
    navigation.navigate('For You');
  }

  return (

    <View style={{ flex: 1 }}>
    <PagerView key={0} style={styles.viewPager} initialPage={0} orientation="vertical" onPageSelected={handlePageSelected} ref={viewPagerRef}>
      <View key={0}style={styles.page}><TakePhoto key="1" onPhotoTaken={handleData} onRestaurantIdentified={handleRestaurantIdentified} onPressLinkToRestaurant={onPressLinkToRestaurant}/></View>
      <View key={1} style={styles.page}><RateRestaurant onRatingPlaced={handleData} resetData={resetData}/></View>
      <View key={2} style={styles.page}><CommentSection onCommentPlaced={handleData} onCommentSent={checkDataValid} resetData={resetData}/></View>
    </PagerView>
    {showSuccessModal ? (
        <ModalView 
        onClose={() => handleCloseSuccessModal()}
        visible={showSuccessModal}
        modalContent={<BananaPointsUserView userinfo={authContext.loggedInUserData} 
        userPosts={authContext.userPosts} increasedPoints={increasedPoints}
        triggerModalView={()=>handleCloseSuccessModal()}/>}
        />
      ) : null}
    </View>
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
