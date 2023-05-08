import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { commonStyles } from "../../styles/commonstyles";

const ThumbsUp = ({ likedData }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    viewLikeAPI();
  }, []);

  const viewLikeAPI = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/like/`, {
        params: {
          userid: likedData.userid,
          restaurantid: likedData.restaurantid,
          commentid: likedData.commentid,
        },
      });
      
      setIsLiked(response.data.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLikeAPI = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/like/delete/`, {
        params: {
          userid: likedData.userid,
          restaurantid: likedData.restaurantid,
          commentid: likedData.commentid,
        },
      });
      // Handle success (e.g., update state, show notification)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  const createLikeAPI = async () => {
    try {
      const currentDateTime = new Date().toISOString();
      const requestData = {
        userid: likedData.userid,
        restaurantid: likedData.restaurantid,
        commentid: likedData.commentid,
        created_at: currentDateTime,
        // Add other data fields if needed
      };
      await axios.post(`${BACKEND_URL}/like/create/`, requestData);
      // Handle success (e.g., update state, show notification)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  const onThumbPress = () => {
    if (isLiked) {
      deleteLikeAPI();
    } else {
      createLikeAPI();
    }
    setIsLiked(!isLiked);
  };

  return (
    <Pressable style={commonStyles.thumbsUpContainer} onPress={onThumbPress}>
      <Icon
        name={isLiked ? "heart" : "heart-outlined"}
        style={isLiked ? commonStyles.thumbsUp : commonStyles.thumbsUpPressed}
      />
    </Pressable>
  );
};

export default ThumbsUp;
