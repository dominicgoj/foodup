import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { commonStyles } from "../../styles/commonstyles";

const ThumbsUp = ({ isLiked, likeTriggered }) => {
  

  return (
    <Pressable style={commonStyles.thumbsUpContainer} onPress={likeTriggered}>
      <Icon
        name={isLiked ? "heart" : "heart-outlined"}
        style={isLiked ? commonStyles.thumbsUp : commonStyles.thumbsUpPressed}
      />
    </Pressable>
  );
};

export default ThumbsUp;
