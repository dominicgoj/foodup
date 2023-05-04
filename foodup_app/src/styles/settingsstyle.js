import { StyleSheet } from "react-native/";
export const SettingsStyle = StyleSheet.create({
    headerLogged: {
        fontSize: 24,
    },
    headerContainer: {
        paddingTop: 20,
    },
    settingsOptionsText:{
        fontSize: 18,
        color: '#303030'


    },
    row: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    settingsIcons: {
        fontSize: 30,
        color: '#303030'
    },
    settingsIconsPressed: {
        color: '#D6D6D6'
    },
    container: {
        marginTop: 35,
        justifyContent: 'space-between',
    },
    headerSettings: {
        fontSize: 24,
        marginBottom: 30
    },
    buttonText:{
  
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10
        
    },
    buttonContainer:{
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 2,
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        marginLeft: 10,
    },
    inputField:{
        borderWidth: 2,
        borderColor: '#E6E6E6',
        borderRadius: 2,
        flex: 1,
        height: 40,
        fontSize: 20,
    },
    warningText:{
        color: 'red',
        textAlign: 'center'
    }

});