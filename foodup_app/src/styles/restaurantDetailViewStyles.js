import { StyleSheet } from "react-native";

export const RestaurantDetailViewStyles = StyleSheet.create({

        crossIconModal:{
            fontSize: 28,
            color: '#D6D6D6',
            textAlign: 'right'
        },
        commentUserTitle:{
            fontWeight: 'bold',
            fontSize: 15,
            padding: 15,
        },
        commentImg:{
            width: "100%",
            height: 400,
        },
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            width: "100%",
            height: "100%",
            marginTop: 22,
          },
          ratingText:{
            fontSize: 16,
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
        container:{
            flex:1,
            paddingLeft: 15,
            paddingRight: 15,
        },
        titleContainer:{
            
        },
        titleContainerRow:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 10,
            
        },
        restaurantDescriptionTextContainer:{
            marginTop: 0,

        },
        tagContainer: {
            borderWidth: 1,
            padding: 3,
            marginLeft: 5,
            marginRight: 0,
            borderColor: "#332E33",
            marginBottom: 5,
          },
          tagFont: {
            fontSize: 12,
          },
          tagRow: {
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 0,
            maxWidth: '80%',
            justifyContent:'flex-end'
          },
        unwrapDescriptionContainer:{
            paddingTop: 15,
            justifyContent: 'center',
            alignItems: 'center'

        },
        unwrapDescriptionText:{
            fontWeight: '600'
        },
        
        restaurantDescriptionText:{
            fontSize: 14,
        },
        restaurantTitleDetailView:
        {
            fontSize: 24,
            flexWrap: 'wrap',
            paddingTop: 20,
            color: '#303030',
            fontWeight: 'bold',
            maxWidth: '70%',
            minWidth: '65%',
        },
        restaurantSubTitleDetailView: {
            fontSize: 16,
            paddingBottom: 10,
            color: '#303030',
            
        },
        webIcon:{
            fontSize: 20,
            fontWeight: 'bold',
            margin: 10,
        },
        socialmediaIcons:{
            fontSize: 30,
            margin: 10,
        },
        detailheader:{
            height: 100,
            width: "100%",
            backgroundColor: 'white',
            
            
        },
        starsRow:{
            flexDirection: 'row'
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        rowWebIcons:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            
        },
    
        headerimage:{
            resizeMode: 'cover',
            width: "100%",
            height: "100%"
        },
        image:{
            backgroundColor: '#D9D9D9',
            height: 150,
            width: "32%",
            margin: 2,
            borderWidth: 1,
            borderColor: "#C7C7C7",
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        ratingBox:{
            flexDirection:'row',
            justifyContent: 'center',
            marginTop: 5,
            
        },
        detailViewEditContainer: {
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: 100, 
            justifyContent:'center',
            alignItems:'center',
        },
        detailViewEditButton: {
            width: 120,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginBottom: 30,
        },
        detailViewEditButtonText: {
            fontWeight: 'bold',
            color: 'white'
        },
        contactInformationRow: {
            flexDirection:'row',
            marginBottom: 20,
            
        },
        contactInformationText: {
            fontWeight: 'bold',
            fontSize: 16,
            flexWrap: 'wrap'

            
        },
        contactInformationTextContainer: {
            justifyContent: 'center',
            maxWidth: '90%',
        }

    })
