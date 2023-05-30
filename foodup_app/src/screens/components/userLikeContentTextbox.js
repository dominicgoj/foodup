import React, { useState, useEffect, memo } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import calculateTimeAgo from "../../utilities/calculateTimeAgo";
import { BACKEND_URL } from "../../../config";
import { TouchableHighlight } from "react-native-gesture-handler";
import getUsername from "../../api/getUsername";
import { Colors } from "../../styles/colors";

export default UserLikeContentTextbox = ({ content, userinfo, handleSetRenderSelectBoxes, 
  isSelected, handleOpenPost, type_like, 
  type_restaurant_post, handleSelectNotification, renderSelectBoxes }) => {
  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const [userOfPost, setUserOfPost] = useState("")
  const [userReceivedLike, setUserReceivedLike] = useState("")
  const [middleMessage, setMiddleMessage] = useState("gefällt ein Beitrag von")

  useEffect(() => {
    const getUserOfPost = async () => {
      if (content.type === type_restaurant_post) {
        if (content.userid_posted === userinfo.id) {
          userinfo['profile_img'] = userinfo.profile_img.replace(baseRegex, '');
          setUserOfPost({ ...userinfo, userAlias: "Du" });
          getString("hast dein Restaurant mit")
        } else {
          const request = await getUsername(content.userid_posted);
          request['profile_img'] = request.profile_img.replace(baseRegex, '');
          setUserOfPost({ ...request, userAlias: request.username });
          getString("hat dein Restaurant mit")
        }
      }
    }
    

    const getUserOfLikedUser = async () => {
      if (content.type === type_like) {
        if (content.userid_got_like === userinfo.id) {
          userinfo['profile_img'] = userinfo.profile_img.replace(baseRegex, '');
          setUserReceivedLike({ ...userinfo, userAlias: "Dir" })
        } else {
          const request = await getUsername(content.userid_got_like);
          request['profile_img'] = request.profile_img.replace(baseRegex, '');
          setUserReceivedLike({ ...request, userAlias: request.username })
        }
        if (content.userid === userinfo.id) {
          userinfo['profile_img'] = userinfo.profile_img.replace(baseRegex, '');
          setUserOfPost({ ...userinfo, userAlias: "Dir" });
        } else {
          const request = await getUsername(content.userid);
          request['profile_img'] = request.profile_img.replace(baseRegex, '');
          setUserOfPost({ ...request, userAlias: request.username });
        }
      }
    };

    const getString = async (text) => {
      if (content.type === type_restaurant_post) {
        let ratingString = "";
        if (content.rating === 0 || content.rating >= 2) {
          ratingString = "Sterne";
        } else if (content.rating === 1) {
          ratingString = "Stern";
        }

        setMiddleMessage(
          <>
            {text}{" "}
            <Text style={{ fontWeight: 'bold' }}>{content.rating}</Text>{" "}
            <Text style={{ fontWeight: 'bold' }}>{ratingString}</Text> bewertet
          </>
        );
      }
    }

    getUserOfPost();
    getUserOfLikedUser();
  }, []);





  const RenderCircleFilled = () => {
    return (
      <View style={[styles.circle, { backgroundColor: '#4DADAE', borderColor: '#439899', shadowRadius: 5, shadowColor: '#D5CFC0', shadowOpacity: 0.6 }]}></View>
    )
  }

  const RenderCircleEmpty = () => {
    return (
      <View style={[styles.circle, Colors.secondaryOutline]}></View>
    )
  }

  const handleShortPress = () => {
    if(renderSelectBoxes){
      handleSelectNotification(content.id)
    }else{
      if(content.type==="restaurant_post"){
        handleOpenPost(content.id)
      }else if(content.type==="like"){
        handleOpenPost(content.commentid)
      }
      else{
        console.log("cant open comment")
      }
      
    }
  }


  return (
    <TouchableHighlight underlayColor="lightgray" onPress={()=>handleShortPress()} onLongPress={()=>handleSetRenderSelectBoxes()}>
      <View key={content.id} style={{ padding: 15, margin: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
          {renderSelectBoxes?(

          (isSelected ? <RenderCircleFilled /> : <RenderCircleEmpty />)

          ):null}
          
          <View>
            <Image
              source={{ uri: `${BACKEND_URL}${userOfPost.profile_img}` }}
              style={{ width: 35, height: 35 }}
            />
          </View>
          <View style={{ marginLeft: 7, flex: 1 }}>
            <View>
              <Text style={{ flexShrink: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{userOfPost.userAlias}</Text> {middleMessage} <Text style={{ fontWeight: 'bold' }}>{userReceivedLike.userAlias}</Text>
              </Text>
            </View>
            <Text style={{ fontSize: 10, color: '#212121' }}>vor {calculateTimeAgo(content.created_at)}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 2,
    marginRight: 10,
  },
});
