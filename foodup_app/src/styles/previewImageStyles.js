import { StyleSheet } from "react-native/";
export const PreviewImageStyles = StyleSheet.create({
    imageContainer:{
        height: 150,
        width: "32%",
        margin: 2,
        borderColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
  
    },
    image:{
      height: '100%',
      width: '100%',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },  
    starsRow:{
        flexDirection: 'row'
    },
    star:{
        fontSize: 16,
        color: 'orange',
        textShadowColor: 'orange',
        textShadowRadius: 4,
        
    },
})