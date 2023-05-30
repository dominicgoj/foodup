import React, {useState, useEffect } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { Colors } from "../../../styles/colors";
import getDummyProfileImg from "../../../utilities/getDummyProfileImg";
import { BACKEND_URL } from "../../../../config";
import {commonStyles} from '../../../styles/commonstyles'
import { LoginFormStyle } from "../../../styles/loginFormStyles";
export default LoginSelectProfilImage = () => {

  const baseRegex = /^(?:https?:\/\/)?[^/]+/i;
  const [dummyImages, setDummyImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(1);
  useEffect(()=>{
    const getProfileImg = async () => {
      const images = await getDummyProfileImg()
      setDummyImages(images)
    }
    getProfileImg()
  },[])
  const img = [
    require("../../../../assets/img/user_img/apple.png"),
    require("../../../../assets/img/user_img/banana.png"),
    require("../../../../assets/img/user_img/chicken.png"),
    require("../../../../assets/img/user_img/dates.png"),
    require("../../../../assets/img/user_img/fish.png"),
    require("../../../../assets/img/user_img/goat.png"),
    require("../../../../assets/img/user_img/horse.png"),
    require("../../../../assets/img/user_img/pomegranate.png"),
    require("../../../../assets/img/user_img/sacred-cow.png"),
    require("../../../../assets/img/user_img/sheep.png")
  ];
  

  const handleImagePress = (index) => {
    setSelectedImage(index);
  };

  return (
    <View style={LoginFormStyle.container}>
      <View style={{paddingBottom: 50,}}>
      <Text style={LoginFormStyle.title}>Suche dir ein Profilbild aus</Text>
      </View>
    <View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
        {dummyImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
            <View style={{ margin: 10,
            width: 120,
            height: 120,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            shadowColor: 'grey',
            shadowOpacity: 0.5,
            shadowRadius: 3,
            
             }}>
              
              <Image
                source={{uri: BACKEND_URL+image.image.replace(baseRegex, '')}}
                style={[{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  borderWidth: selectedImage === index ? 3 : 0,
                  opacity: selectedImage === index ? 0.5 : 1,
                                          
                }, Colors.secondaryOutline]}
              />
              
              {selectedImage === index && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color="#4dad88"
                  size={30}
                  style={{ position: "absolute", bottom: 0, right: 10 }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    </View>
    </View>
  );
};
