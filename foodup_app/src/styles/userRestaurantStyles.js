import { StyleSheet } from "react-native/";
export const userRestaurantsStyles = StyleSheet.create({
    inputField:{
        borderWidth: 2,
        borderColor: '#E6E6E6',
        borderRadius: 2,
        fontSize: 14,
        width: '100%',
        height: 40,
       
    },

    inputTextDescription: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputTextDescriptionContainer:{
        width: 120,      
        justifyContent: 'center',
    },
    container:{
        flexDirection:'row' , 
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    inputFieldContainer:{
        flex: 1,
        alignContent: 'right',
        alignItems: 'right',
        marginLeft: 10,
        
        
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        margin: 30,
    },
    changeButton:{
        width: '38%',
        alignSelf: 'center',
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 30,
        
    },
    changeButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    selectImageButton:{
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
       
    }
})
