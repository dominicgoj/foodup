import { StyleSheet } from "react-native";
export const commentStyles = StyleSheet.create({
chevronIconModal:{
    fontSize: 28,
    color: '#D6D6D6',
    textAlign: 'center',
    marginBottom: 10,
},

foreignUserProfileImg: {
  width: 40,
  height: 30,
  justifyContent: 'center'
},
date:{
    
},
ratingText:{
    marginRight: 15,
},
commentUserTitle:{
    fontWeight: 'bold',
    fontSize: 15,
    paddingRight: 15,
    paddingLeft: 5,
    
},
commentUserTitleHeader:{
    paddingRight: 15,
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row'
},
commentUserTitleHeaderBoldText: {
  fontWeight: 'bold',
    fontSize: 15,
},
commentImg:{
    width: "100%",
    height: 400,
},
commentImgContainer:{
    alignItems: 'center',
    maxHeight: 400

},
animatedStyleContainer:{
  height: '100%', 
  width: '100%', 
  backgroundColor: '#E6E6E6', 
  justifyContent: 'center', 
  alignItems: 'center', 
  borderRadius: 15, 
},
animatedStyleText: { 
  fontSize: 96, 
  textAlign: 'center',
  color: '#516B6B' },
  
  modalView: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    
  },
  star: {
    color: '#FF7B46',
    fontSize: 20,
    paddingRight: 10,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginRight: 10,
   
  },
  commentText:{
    padding: 5,
    textAlign: 'justify',
  }
})