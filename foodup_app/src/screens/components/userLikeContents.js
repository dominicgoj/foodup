import React, {useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import UserLikeContentTextbox from "./userLikeContentTextbox";
import { ScrollView } from "react-native-gesture-handler";
import ModalView from "./modalView";
import CommentContent from './commentDetail.js'
import NoContent from "./nocontent";
import fetchData from "../../api/fetchData";

export default UserLikeContents = ({likesAssociatedWithUser, userinfo}) => {
    //userLiked => which contents from this user were liked by others
    //userLikedPosts => which contents did this user instance like
    const nocontentText = "Du hast noch keine Inhalte markiert."
    const dataset = likesAssociatedWithUser.sort((a, b) => new Date(b.created_at)-new Date(a.created_at));  
    const [showModal, setShowModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState({})  
    const handleSelectPost = async (postselected) => {
        
        const selected_comment_id = postselected
        const request_string = "/post/"+selected_comment_id
        const request = await fetchData(request_string)
        setSelectedPost({"post":request})
        setShowModal(!showModal)
    }

    const triggerModalView = () => {
        setShowModal(!showModal)
    }
    
    return(
        <View style={{flex: 1, marginTop: 10,}}>
        {dataset.length>0?(
            <ScrollView style={{flex: 1}}>
           
            {dataset.map((content, index)=>{
                return(
                    <UserLikeContentTextbox key={index} content={content} userinfo={userinfo} handleSelectPost={handleSelectPost}/>
                )
            })}
           {showModal?(
            <ModalView modalContent={<CommentContent userinfo={userinfo} post={selectedPost} triggerModalView={triggerModalView}/>} onClose={()=>setShowModal(false)} />
        ):null}
        </ScrollView>
        ):<NoContent headerText={nocontentText}/>}
        
        </View>
    )
}