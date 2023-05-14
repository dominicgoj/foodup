import React, {useState} from "react";
import { TouchableOpacity, ImageBackground, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { PreviewImageStyles } from "../../styles/previewImageStyles";
import ImageLoader from "./imageLoader";
const PreviewImage = ({post, openComment}) => {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(<Icon key={i} name='star-outlined' style={PreviewImageStyles.star} />);
        }
    
        return stars;
      };
    const [imageLoading, setImageLoading] = useState(true)
    const handleIsLoading = () =>{
        setImageLoading(false)
    }
    return(
            
        <TouchableOpacity key={post.id} style={PreviewImageStyles.imageContainer} onPress={() => openComment(post)}>
              <ImageBackground style={PreviewImageStyles.image} source={{uri: post.image_preview}} onLoad={handleIsLoading}>
              <ImageLoader loading={imageLoading} />
              <View key={post.id} style={PreviewImageStyles.starsRow}>
                {!imageLoading?(renderStars(post.rating)):null}
              </View>
              </ImageBackground>
            
          
        </TouchableOpacity>
      )
}

export default PreviewImage;