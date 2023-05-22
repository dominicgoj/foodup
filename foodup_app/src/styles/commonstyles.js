import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    header:
    {   fontSize: 24,
        textAlign: 'center',
        color: 'black',
        paddingTop:50,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 25,
    },
  text: {
    fontSize: 20,
    color: 'black',
  },
  restaurantTitle:{
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 10,
    color: '#303030',
    fontWeight: 'bold'
},
restaurantTitleDetailView:
{
  fontSize: 25,
    paddingLeft: 10,
    paddingTop: 20,
    color: '#303030',
    fontWeight: 'bold',
    textAlign: 'center'
},
star: {
  color: '#FF7B46',
  fontSize: 20,
},
ratingBox: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
  marginRight: 10
 
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between'
},
thumbsUp: {
  fontSize: 28,
  color: '#F5385F',
},
thumbsUpPressed:{
  fontSize: 28,
  color: '#F5385F'
},
chevronIconModal:{
  fontSize: 28,
  color: '#D6D6D6',
  textAlign: 'center',
  marginBottom: 10,
},
thumbsUpContainer: {
  alignItems: 'right',
  justifyContent: 'center',
  marginRight: 10,
},
ribbonContainer:{
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingRight: 0,

},
locationMarkerContainer:{
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 20,
},

ribbon: {
  fontSize: 32,
},
bottomImageContainer: {
  flexDirection:'row', 
  justifyContent:'space-between',
  marginTop: 10,
  marginBottom: 10,
},
modalView: {
  marginLeft: 20,
  marginRight: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 10,
  
},
subheader: {
  textAlign: 'center',
  padding: 20,
},
 sendButton:{
  backgroundColor: 'blue',

 },
 headerBackButton:{
  fontWeight: 'bold',
  fontSize: 36,
  marginBottom: '3%',
  color: 'white',
  
  
 },
 headerContainer: {
     height: 120,
     backgroundColor: '#4dad88',
     flexDirection: 'row',
 },
 iconContainerButtonBack: {
  padding: 5,
  borderRadius: 10,
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
  bottom: 5,
},
foodUpLogo: {
  marginBottom: 10,
  marginLeft: 5,
  justifyContent: 'flex-end', 
  flex: 1, 
  alignContent:'center'
},
headerText: {
  fontSize: 24,
  textAlign:'center',
  fontWeight: 'bold',
  marginBottom: 15,
  },
  navigationHeaderContainer: {
    height: 120,
    backgroundColor: '#4dad88',
    justifyContent: 'flex-end',
},
});