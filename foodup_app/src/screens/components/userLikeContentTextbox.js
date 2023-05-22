import React, {useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import calculateTimeAgo from "../../utilities/calculateTimeAgo";
import { BACKEND_URL } from "../../../config";
import { TouchableOpacity } from "react-native-gesture-handler";
import getUsername from "../../api/getUsername";

export default UserLikeContentTextbox = ({content, userinfo, handleSelectPost}) => {

    const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
    const [userOfPost, setUserOfPost] = useState("")
    const [userReceivedLike, setUserReceivedLike] = useState("")
    useEffect(() => {
        const getUserOfPost = async () => {
          if (content) {
            if (content.userid === userinfo.id) {
              userinfo["profile_img"] = userinfo.profile_img.replace(baseRegex, '');
              setUserOfPost({ ...userinfo, userAlias: "Dir" });
            } else {
              const request = await getUsername(content.userid);
              request["profile_img"] = request.profile_img.replace(baseRegex, '');
              setUserOfPost({ ...request, userAlias: request.username });
            }
          }
        };
      
        const getUserOfLikedUser = async () => {
          if (content) {
            if (content.userid_got_like === userinfo.id) {
              setUserReceivedLike({ ...userinfo, userAlias: "Dir" });
            } else {
              const request = await getUsername(content.userid_got_like);
              setUserReceivedLike({ ...request, userAlias: request.username });
            }
          }
        };
      
        getUserOfPost();
        getUserOfLikedUser();
      }, [content]);

    return(
        <TouchableOpacity onPress={()=>(handleSelectPost(content.commentid))}>
        <View style={{flex: 1, padding: 15, margin: 5,}}>
            <View style={{flexDirection:'row', paddingLeft: 15}}>
            <View>
                <Image source={{ uri: `${BACKEND_URL}${userOfPost.profile_img}`}}
                style={{ width: 35, height: 35 }}
                />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 7,}}>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>{userOfPost.userAlias}</Text> 
            <Text> gefällt ein Beitrag von </Text>
            <Text style={{fontWeight:'bold'}}>{userReceivedLike.userAlias} </Text>
            </View>
            <Text style={{fontSize: 10, color:'#212121'}}>vor {calculateTimeAgo(content.created_at)}</Text>
            </View>
            </View>
        </View>
        
        </TouchableOpacity>
    )
}