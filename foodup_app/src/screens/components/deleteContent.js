import React, {useContext} from "react"
import { Text, View } from "react-native"
import { DeleteBox } from "../../styles/deletebox"
import { Colors } from "../../styles/colors"
import infomsg from '../../data/infomsg.json';
import { TouchableOpacity } from "react-native-gesture-handler";
import deletePost from "../../api/deletepost";
const DeleteContent = ({id, deleteSuccessful}) => {
    
    const handleDeletePost = async () =>{
        try{
            request = await deletePost(id)
            deleteSuccessful()
        }catch(error){
            console.log(error)
        }
        

    }
    return(
        <TouchableOpacity onPress={handleDeletePost}>
        <View style={[DeleteBox.deleteboxContainer, Colors.tertiaryBackground, {opacity: 0.8}]}>
            <Text style={DeleteBox.deleteboxText}>{infomsg["delete-post"].title}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default DeleteContent