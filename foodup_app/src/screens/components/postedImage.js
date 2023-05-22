import React, { useState, useRef, useEffect } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { BACKEND_URL } from "../../../config";
import { commentStyles } from "../../styles/commentstyles";
import DoubleClick from 'react-native-double-tap';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHeartBroken as brokenHeart } from '@fortawesome/free-solid-svg-icons/faHeartBroken';


import { commonStyles } from "../../styles/commonstyles";
import ImageLoader from "./imageLoader";
export default PostedImage = ({ post, likeTriggered, isLiked }) => {
  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const post_image = post.post.image.replace(baseRegex, '');
  const [isLoading, setIsLoading] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [likeBool, setLikeBool] = useState(isLiked)
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleDoubleTap = () => {
    setShowHeart(true);
    likeTriggered()
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setShowHeart(false);
      fadeAnim.setValue(1);
    });
  };


  const RenderLikeHeart = () => {
    return showHeart ? (
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <FontAwesomeIcon icon={isLiked?solidHeart:brokenHeart} size={116} style={[commonStyles.thumbsUpPressed]} />
      </Animated.View>
    ) : null;
  }

  return (
    <DoubleClick
      singleTap={() => {
        //console.log("single tap");
      }}
      doubleTap={handleDoubleTap}
      delay={200}
    >
      <View style={[commentStyles.commentImgContainer]}>
        <ImageLoader loading={isLoading} />
        <Image source={{ uri: BACKEND_URL + post_image }} style={commentStyles.commentImg} onLoad={handleImageLoaded} />
        <RenderLikeHeart />
      </View>
    </DoubleClick>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
