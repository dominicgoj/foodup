import React, {useEffect} from "react"
import { Text, View } from "react-native"
import { DeleteBox } from "../../styles/deletebox"
import { Colors } from "../../styles/colors"
import infomsg from '../../data/infomsg.json';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import deletePost from "../../api/deletepost";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Animated, Easing } from 'react-native';
const DeleteContent = ({id, deleteSuccessful, handleRemoveUserPostFromContext, handleSetDeletePostVisible}) => {
    const scaleValue = new Animated.Value(1);
        
    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 350,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start(() => {
                handleSetDeletePostVisible(); // Call the function after animation completes
            });
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const handleDeletePost = async () =>{
        try{
            const request = await deletePost(id)
            handleRemoveUserPostFromContext(request)
            deleteSuccessful()
        }catch(error){
            console.log(error)
        }
        

    }
    return(
        
        <TouchableOpacity onPress={handleDeletePost} style={{marginBottom: 20, marginTop: 20,}}>
            <Animated.View style={{
            transform: [{ scale: scaleValue }],
            opacity: scaleValue,
          }}
        >
        <View style={[DeleteBox.deleteboxContainer, {opacity: 0.8}, Colors.redHeartColourBackground]}>
            <FontAwesomeIcon icon={faTrash} size={28} color={"white"}/>
        </View>
        </Animated.View>
        </TouchableOpacity>
        
    )
}

export default DeleteContent