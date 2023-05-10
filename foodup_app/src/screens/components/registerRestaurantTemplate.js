import React from "react";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TouchableOpacity from "react-native-gesture-handler";

const RegisterRestaurantTemplate = () =>{
    return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Registriere Dein Restaurant und werde Teil der foodup Community!</Text>
        <TextInput style={styles.input} placeholder="Restaurant Name" value={registerRestaurantName} onChangeText={setRegisterRestaurantName} keyboardType='default' />
        <TouchableOpacity style={styles.smallbutton} onPress={handleRegisterRestaurantName}>
          <Text style={styles.buttonText}>Weiter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHowFoodupWorks}><Text style={styles.info}>Wie funktioniert foodup?</Text></TouchableOpacity>
        
      </View>
      </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#4dad88',
      paddingBottom: 100,
      
  
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 80,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
      },
      smallbutton: {
        padding: 30,
        height: 80,
        backgroundColor: '#142A6B',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      warning:{
        textAlign:'center',
      }
    }
)
export default RegisterRestaurantTemplate