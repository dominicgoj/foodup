import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PreviewImageStyles } from "../../../styles/previewImageStyles";
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from "../../../styles/colors";
export default RestaurantRegisterPreviewImageList = () => {
    const dummyPosts = [
        {"id": 0, "rating": 5}, {"id": 1, "rating": 3}, {"id": 2, "rating": 4},
        {"id": 0, "rating": 3}, {"id": 1, "rating": 4}, {"id": 2, "rating": 2},
        {"id": 0, "rating": 4}, {"id": 1, "rating": 5}, {"id": 2, "rating": 3},
    ]
    const renderCommentRows = () => {
        const rows = [];
    
        for (let i = 0; i < dummyPosts.length; i += 3) {
          const rowOfPosts = dummyPosts.slice(i, i + 3);
          
          const row = (
            <View key={i} style={[styles.row]}>
              {rowOfPosts.map((post, index) => {
               
                
              
                return(
                
                    <TouchableOpacity key={post.id} style={[PreviewImageStyles.imageContainer, Colors.lightGreyBackground]}>
                    <View style={PreviewImageStyles.image}>
                        
                    <View key={post.id} style={PreviewImageStyles.starsRow}>
                      {renderStars(post.rating)}
                    </View>
                    </View>
              </TouchableOpacity>
              )
        })}
            </View>
          );
          rows.push(row);
        }
        return rows;
      };

      const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
          stars.push(<Icon key={i} name='star-outlined' style={PreviewImageStyles.star} />);
        }
    
        return stars;
      };

    return(
        <View>
           {renderCommentRows()} 
        </View>
    )
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems:'left',
        
    },

    
})