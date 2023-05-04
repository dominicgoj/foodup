import { StyleSheet } from "react-native";
export const commentStyles = StyleSheet.create({
chevronIconModal:{
    fontSize: 28,
    color: '#D6D6D6',
    textAlign: 'center',
    marginBottom: 10,
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
    fontWeight: 'bold',
    fontSize: 15,
    paddingRight: 15,
    paddingLeft: 5,
    paddingBottom: 10,
},
commentImg:{
    width: "100%",
    height: 400,
    borderRadius: 15,
},
centeredView: {
    
    
  },
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