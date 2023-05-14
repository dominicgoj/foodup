import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import storeUserLoginInfo from '../../utilities/storeloggedin.js'
import Regex from './regex';
import { sendActivation } from '../../api/sendActivation';
import { checkActivation } from '../../api/checkActivation';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from './costumheader';
import createRestaurant from '../../api/createRestaurant';
const LoginForm = (props) => {
  const { onLoginSuccess } = props;

  const [phoneValidationMessage, setPhoneValidationMessage] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [accountThere, setAccountThere] = useState(false)
  const [accountCredentials, setAccountCredentials] = useState(null)
  const [activationDevice, setActivationDevice] = useState({})
  const [activationValidationMessage, setActivationValidationMessage] = useState('')
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const [globalPhoneNumber, setGlobalPhoneNumber] = useState('')
  const [globalEmail, setGlobalEmail] = useState('')
  const [globalActivationCode, setGlobalActivationCode] = useState('')
  const [registerRestaurantName, setRegisterRestaurantName] = useState('')
  const [registerRestaurantTelephone, setRegisterRestaurantTelephone] = useState('')
  const [registerRestaurantEmail, setRegisterRestaurantEmail] = useState('')
  const [registerRestaurantWebsite, setRegisterRestaurantWebsite] = useState('')
  const [registerRestaurantStreet, setRegisterRestaurantStreet] = useState('')
  const [registerRestaurantZip, setRegisterRestaurantZip] = useState('')
  const [registerRestaurantCity, setRegisterRestaurantCity] = useState('')
  const [registerRestaurantTags, setRegisterRestaurantTags] = useState([])
  const [registerRestaurantFirstName, setRegisterRestaurantFirstName] = useState('')
  const [registerRestaurantLastName, setRegisterRestaurantLastName] = useState('')

  
  const handleUserThereAPIRequest = async ({input, datatype}) =>{
    try {
        const htmlinput = input.replace('+', '%2B');
        const response = await axios.get(`${BACKEND_URL}/user/search?${datatype}=${htmlinput}`);
        return response.data; 
    }
    catch(error){
        console.error(error)
        return null;
    }
  }

  

  const setAccountThereFalseIfLoginCredNotFound = (data) =>{
    if(data.length>0){
        setAccountThere(true)
        setAccountCredentials(data)
    }
  }
  

  const handleLogin = async (username) => {
    
    datasetToCreate = {telephone: globalPhoneNumber, 
    email: globalEmail, username: username}
    // Implement the logic to verify the entered verification code
    // and authenticate the user
    if(!accountThere){
        const createdDataSet = await createAccount({datasetToCreate})
        await storeUserLoginInfo(createdDataSet) //this should provide the information to be stored on the device
        onLoginSuccess();
    }
    else if(accountThere){
      storeUserLoginInfo(accountCredentials[0]) //this should provide the information to be stored on the device
      onLoginSuccess();
    }
    
    
    return
  };
  const createAccount = async ({datasetToCreate}) =>{
    try{
        console.log(datasetToCreate)
        const input = await axios.post(BACKEND_URL+'/user/create/' , datasetToCreate)
        createdDataSet = {username: input.data.username, email: input.data.email, telephone: input.data.telephone, id: input.data.id}
        setAccountCredentials(createdDataSet);
        return createdDataSet
    }
    
    catch(error){
        console.log(error)
    }
  }
  
  const RenderLoginChoice = () =>{
    const handlePhoneLogin = () => {
      navigation.navigate('PhoneLogin');
      
    };
    const handleEmailLogin = () => {
      navigation.navigate('EmailLogin')
    };

    const handleRestaurantRegister = () =>{
      navigation.navigate('RestaurantRegisterName')
    }
      return(
        <View key={'loginChoice'} style={styles.container}>
      <Text style={styles.title}>Wilkommen bei FoodUp</Text>
      <View style={{flexDirection:'row'}} >
      <TouchableOpacity style={styles.bigbutton} onPress={handlePhoneLogin}>
        <Text style={styles.buttonText}>Login mit Telefonnummer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigbutton} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login mit Emailadresse</Text>
      </TouchableOpacity>
     </View>
     <View style={styles.registerRestaurantContainer}>
      <TouchableOpacity onPress={handleRestaurantRegister}>
     <Text>Sie möchten ein Restaurant anmelden?</Text>
     </TouchableOpacity>
     </View>
     </View>
    )
    
    
  }
  const dismissKeyboard = () =>{
    Keyboard.dismiss()
  }
  const RenderPhoneLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const handlePhoneValidation = async () =>{
      console.log("Phone: ", phoneNumber)
      const type = 'telephone'
      const response = Regex(type, phoneNumber)
      if (response) {
        setPhoneValidationMessage('Die Telefonnummer ist inkorrekt.');
        return;
      }
      const loginCredentials = await handleUserThereAPIRequest({ input: phoneNumber, datatype: type });
      const sendingActivationKey = await sendActivation("phone", phoneNumber)
      setAccountThereFalseIfLoginCredNotFound(loginCredentials)
      setPhoneValidationMessage('');
      setActivationDevice({type: "phone", input: phoneNumber})
      setGlobalPhoneNumber(phoneNumber)
      navigation.navigate('ActivationScreen')
    }
    
      return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View key={'loginChoice'} style={styles.container}>
            <Text style={styles.title}>Einloggen mit deiner Telefonnummer</Text>
  
            <TextInput
              style={styles.input}
              placeholder="+43 XXX XXXX XXX"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            {phoneValidationMessage ? (
              <Text style={styles.warning}>{phoneValidationMessage}</Text>
            ) : null}
            
            <TouchableOpacity style={styles.smallbutton} onPress={handlePhoneValidation}>
              <Text style={styles.buttonText}>Aktivierungscode senden</Text>
            </TouchableOpacity>
            <Text style={styles.info}>Wenn du noch keinen Account hast, erstellen wir Dir automatisch einen.</Text>
          </View>
          </TouchableWithoutFeedback>
      );
    
    
  };
  const RenderEmailLogin = () =>{
      const [email, setEmail] = useState('')
      const handleEmailValidation = async (email) =>{
        const type = 'email'
        const response = Regex(type, email)
        if (response) {
          setEmailValidationMessage('Die E-Mail-Adresse ist inkorrekt. Bitte gib eine gültige E-Mail-Adresse ein.');
          return;
        }
       
        const loginCredentials = await handleUserThereAPIRequest({ input: email, datatype: type });
        const sendingActivationKey = await sendActivation("email", email)
        setAccountThereFalseIfLoginCredNotFound(loginCredentials)
        setEmailValidationMessage('');
        setActivationDevice({type: "email", input: email})
        console.log("activation device")
        setGlobalEmail(email)
        navigation.navigate('ActivationScreen');
      }
      return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View key={'loginChoice'} style={styles.container}>
          <Text style={styles.title}>Einloggen mit deiner Emailadresse</Text>
          
          <TextInput
            style={styles.input}
            placeholder="max.mustermann@musterfrau.at"
            value={email}
            onChangeText={text => {
                // Convert the entered text to lowercase
                const lowercaseText = text.toLowerCase();
                setEmail(lowercaseText)}}
            keyboardType='email-address'
            autoCapitalize="none"
            
          />
          {emailValidationMessage ? (
                <Text style={styles.warning}>{emailValidationMessage}</Text>
              ) : null}
          <TouchableOpacity style={styles.smallbutton} onPress={() => handleEmailValidation(email)}>
            <Text style={styles.buttonText}>Aktivierungscode senden</Text>
          </TouchableOpacity>
         <Text style={styles.info}>Wenn du noch keinen Account hast, erstellen wir Dir automatisch einen.</Text>
         </View>
         </TouchableWithoutFeedback>
        )
    
   
  }
  const RenderActivationCode = () =>{
      const [verificationCode, setVerificationCode] = useState('')
      const handleActivation = async () => {
        try {
          const response = await checkActivation(activationDevice.type, activationDevice.input, verificationCode);
          const message = response.message;
          
            if (!accountThere) {
              navigation.navigate('ChooseUsername')
            } else {
              setGlobalActivationCode(verificationCode)
              
              handleLogin();
            }
            setActivationValidationMessage('')
            
          
          
        } catch (error) {
          console.log(error)
          setActivationValidationMessage('Der eingegebene Aktivierungscode ist inkorrekt')
          // Handle the error case
        }
      };
      return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View key={'loginChoice'} style={styles.container}>
          <Text style={styles.title}>Aktivierungscode eingeben</Text>
          
          <TextInput
            style={[styles.input, {textAlign: 'center'}]}
            placeholder="XXXXX"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType='numeric'
            maxLength={5}
          />
          {activationValidationMessage ? (
                <Text style={styles.warning}>{activationValidationMessage}</Text>
              ) : null}
          <TouchableOpacity style={styles.smallbutton} onPress={handleActivation}>
            <Text style={styles.buttonText}>Los gehts</Text>
          </TouchableOpacity>
          
         </View>
         </TouchableWithoutFeedback>
        )
    
    
  }
  const RenderUsernameInput = () =>{
      const [chosenusername, setChosenUsername] = useState('')
      return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View key={'usernameChoice'} style={styles.container}>
        <Text style={styles.title}>Such dir einen Namen aus</Text>
        
        <TextInput
          style={styles.input}
          placeholder="XXXXX"
          value={chosenusername}
          onChangeText={setChosenUsername}
          keyboardType='default'
          
          
          
        />
        <TouchableOpacity style={styles.smallbutton} onPress={()=>handleLogin(chosenusername)}>
          <Text style={styles.buttonText}>Los gehts</Text>
        </TouchableOpacity>
       </View>
       </TouchableWithoutFeedback>
      )
    
  }
  const RenderRestaurantRegisterName = () =>{
    const [errorMsg, setErrorMsg] = useState(null)
    const [restaurantName, setRestaurantName] = useState(registerRestaurantName)
    const handleRegisterRestaurantName = () =>{
      if(restaurantName){
        setRegisterRestaurantName(restaurantName)
        navigation.navigate("RestaurantRegisterTags")
      }
      else{
        setErrorMsg("Bitte gib den Namen Deines Restaurants an.")
      }
      
    }
    const handleHowFoodupWorks = () =>{
      navigation.navigate("HowFoodupWorks")
    }
    return(
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Registriere Dein Restaurant und werde Teil der foodup Community!</Text>
        <TextInput style={styles.input} autoCapitalize="none" placeholder="Restaurantname" value={restaurantName} onChangeText={setRestaurantName} keyboardType='default' />
        {errorMsg?<Text>{errorMsg}</Text>:null}
        <TouchableOpacity style={styles.smallbutton} onPress={handleRegisterRestaurantName}>
          <Text style={styles.buttonText}>Weiter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHowFoodupWorks}><Text style={styles.info}>Wie funktioniert foodup?</Text></TouchableOpacity>
        
      </View>
      </TouchableWithoutFeedback>
    )
  }
  const RenderRestaurantRegisterAdress = () =>{
    const [errorMsg, setErrorMsg] = useState(null)
    const [street, setStreet] = useState(registerRestaurantStreet)
    const [zip, setZip] = useState(registerRestaurantZip)
    const [city, setCity] = useState(registerRestaurantCity)
    const handleRegisterRestaurantAdress = () =>{
      if(street&&zip&&city){
        setRegisterRestaurantStreet(street)
        setRegisterRestaurantZip(zip)
        setRegisterRestaurantCity(city)
        navigation.navigate("RestaurantRegisterPhoneAndEmail")
      }else{
        setErrorMsg("Bitte gib eine gültige Adresse ein.")
      }
      
    }
    return(
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Teile uns die Adresse Deines Restaurants mit.</Text>
        <TextInput style={styles.input} placeholder="Straße und Hausnummer" value={street} onChangeText={setStreet} keyboardType='default' />
        <TextInput style={styles.input} placeholder="Postleitzahl" value={zip} onChangeText={setZip} keyboardType='default' />
        <TextInput style={styles.input} placeholder="Stadt" value={city} onChangeText={setCity} keyboardType='default' />
        {errorMsg?<Text>{errorMsg}</Text>:null}
        <TouchableOpacity style={styles.smallbutton} onPress={handleRegisterRestaurantAdress}>
          <Text style={styles.buttonText}>Weiter</Text>
        </TouchableOpacity>       
      </View>
      </TouchableWithoutFeedback>
    )
  }
  const RenderHowFoodUpWorks = () =>{
    return(
      <View style={styles.container}>
        <Text style={styles.title}>So funktioniert foodup!</Text>        
      </View>
    )
  }


  const RenderRestaurantRegisterPhoneAndEmail = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [phone, setPhone] = useState(registerRestaurantTelephone);
    const [email, setEmail] = useState(registerRestaurantEmail);
    const [website, setWebsite] = useState(registerRestaurantWebsite);
    const handleRegisterRestaurantPhoneAndEmail = () => {
      if (phone&&email) {
        const phoneRegex = Regex("telephone", phone);
        const emailRegex = Regex("email", email);
        if(!phoneRegex&&!emailRegex){
          setRegisterRestaurantTelephone(phone);
          setRegisterRestaurantEmail(email);
          if(website){
            const websiteRegex = Regex("website", website)
            if(!websiteRegex){
              setRegisterRestaurantWebsite(website)
              navigation.navigate("RestaurantRegisterUser")
            }else{
              setErrorMsg("Bitte gib eine korrekte Internetadresse ein. (optional)");
            }
          }else{
            navigation.navigate("RestaurantRegisterUser")
          }
          
          
          
        }
        else{
          setErrorMsg("Bitte gib eine korrekte Telefonnummer und Emailadresse ein. (Pflichtfeld)");
        }
       
        
      } else {
        setErrorMsg("Bitte gib Deine Geschäftsinformationen ein.");
      }

      
    };
      
  
    return(
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Teile uns die Kontaktinformationen für Kunden mit.</Text>
        <TextInput style={styles.input} autoCapitalize="none" placeholder="Geschäftliche Telefonnummer mit Vorwahl" value={phone} onChangeText={setPhone} keyboardType='default' />
        <TextInput style={styles.input} autoCapitalize="none" placeholder="Geschäftliche Emailadresse" value={email} onChangeText={setEmail} keyboardType='default' />
        <TextInput style={styles.input} autoCapitalize="none" placeholder="Geschäftliche Webseite (optional)" value={website} onChangeText={setWebsite} keyboardType='default' />
        {errorMsg?<Text style={styles.info}>{errorMsg}</Text>:null}
        <TouchableOpacity style={styles.smallbutton} onPress={handleRegisterRestaurantPhoneAndEmail}>
          <Text style={styles.buttonText}>Weiter</Text>
        </TouchableOpacity>       
      </View>
      </TouchableWithoutFeedback>
    )
  }
  const RenderRestaurantRegisterTags = () =>{
    const [errorMsg, setErrorMsg] = useState(null)
    const [tagsInfo, setTagsInfo] = useState("Gib mindestens 2 Stichworte ein die zu Deinem Restaurant passen.")
    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState(registerRestaurantTags)
    useEffect(() => {
      if(tags.length<10)
      {if (tagInput.includes(',') || tagInput.includes(' ')) {
        const newTags = tagInput.split(/[, ]+/).filter(tag => tag.trim() !== '');
        setTags(prevTags => [...prevTags, ...newTags]);
        setTagInput('');
      }}
      else{
        setTagsInfo("Die maximale Anzahl an Tags ist erreicht.")
      }
    }, [tagInput]);

    const handleRegisterRestaurantTags = () =>{
      if(tags.length>1){
        console.log(tags)
        setRegisterRestaurantTags(tags)
        navigation.navigate("RestaurantRegisterAdress")
      }
      else{
        setErrorMsg("Bitte gib mindestens 2 Stichworte zu Deinem Restaurant ein.")
      }
      
    }
    const deleteTag = (index) =>{
      setTags(prevTags => prevTags.filter((_, i) => i !== index));
    }
    return(
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Erzähl uns Geschichten von Deinen Gerichten.</Text>
        
        <Text style={[styles.info, {paddingBottom: 20, width: '70%'}]}>{tagsInfo}</Text>
        <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => deleteTag(index)}>
        <View style={styles.tagContainer}><Text style={styles.tagFont}>{tag}</Text></View>
        </TouchableOpacity>
        ))}
        </View>
        <TextInput style={styles.input} autoCapitalize="none" placeholder="Burger, Nudel, Pizza, Asiatisch" value={tagInput} onChangeText={setTagInput} keyboardType='default' />
        {errorMsg?<Text style={styles.info}>{errorMsg}</Text>:null}
        <TouchableOpacity style={styles.smallbutton} onPress={handleRegisterRestaurantTags}>
          <Text style={styles.buttonText}>Weiter</Text>
        </TouchableOpacity>       
      </View>
      </TouchableWithoutFeedback>
    )
  }

  const RenderRestaurantRegisterUser = () =>{
    const [errorMsg, setErrorMsg] = useState(null)
    const [firstname, setFirstname] = useState(registerRestaurantFirstName)
    const [lastname, setLastname] = useState(registerRestaurantLastName)
    const handleRegisterRestaurantUser = () =>{
      if(firstname&&lastname){
        setRegisterRestaurantFirstName(firstname)
        setRegisterRestaurantLastName(lastname)
        navigation.navigate("RestaurantRegistered")
      }else{
        setErrorMsg("Bitte gib Deinen Vor- und Nachnamen ein.")
      }
      
    }
    return(
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Erzähl uns wer Du bist.</Text>
        <TextInput style={styles.input} placeholder="Vorname" value={firstname} onChangeText={setFirstname} keyboardType='default' />
        <TextInput style={styles.input} placeholder="Nachname" value={lastname} onChangeText={setLastname} keyboardType='default' />
        {errorMsg?<Text style={styles.info}>{errorMsg}</Text>:null}
        <TouchableOpacity style={styles.smallbutton} onPress={handleRegisterRestaurantUser}>
          <Text style={styles.buttonText}>Registrierung abschließen</Text>
        </TouchableOpacity>       
      </View>
      </TouchableWithoutFeedback>
    )
  }
  const RenderRestaurantRegistered = () =>{
    const handleRestaurantRegistered = async () =>{
        const input = {
          registerRestaurantName,
          registerRestaurantTelephone,
          registerRestaurantEmail,
          registerRestaurantWebsite,
          registerRestaurantStreet,
          registerRestaurantZip,
          registerRestaurantCity,
          registerRestaurantTags,
          registerRestaurantFirstName,
          registerRestaurantLastName,
        };
    
        try {
          const response = await createRestaurant(input);
          console.log('New restaurant created:', response);
          // Handle success or redirect to a new page
        } catch (error) {
          console.log('Error creating restaurant:', error);
          // Handle error
        }
      
      navigation.navigate("LoginChoice")
    }
 
    return(
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Danke für Deine Registrierung.</Text>
        <Text style={styles.info}>Wir melden uns bei Dir nachdem wir Deine Anfrage geprüft haben</Text>
        <TouchableOpacity style={styles.smallbutton} onPress={handleRestaurantRegistered}>
          <Text style={styles.buttonText}>Zurück zu Home</Text>
        </TouchableOpacity>       
      </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={{flex:1}}>
      <Stack.Navigator>
        <Stack.Screen name="LoginChoice" component={RenderLoginChoice} options={{headerShown: false}}/>
        <Stack.Screen name="PhoneLogin" component={RenderPhoneLogin} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="EmailLogin" component={RenderEmailLogin} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="ActivationScreen" component={RenderActivationCode} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="ChooseUsername" component={RenderUsernameInput} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="RestaurantRegisterName" component={RenderRestaurantRegisterName} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="RestaurantRegisterTags" component={RenderRestaurantRegisterTags} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="RestaurantRegisterAdress" component={RenderRestaurantRegisterAdress} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="HowFoodupWorks" component={RenderHowFoodUpWorks} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="RestaurantRegisterPhoneAndEmail" component={RenderRestaurantRegisterPhoneAndEmail} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="RestaurantRegisterUser" component={RenderRestaurantRegisterUser} options={{header: () => <CustomHeader arrowShown={true} logoShown={false} />}}/>
        <Stack.Screen name="RestaurantRegistered" component={RenderRestaurantRegistered} options={{
          gestureEnabled: false,
          header: () => <CustomHeader arrowShown={false} logoShown={false} />}}/>

      </Stack.Navigator>
    </View>
        
    
  );
};

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
  info: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center'
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
  bigbutton: {
    width: '50%',
    height: 120,
    backgroundColor: '#142A6B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
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
  },
  registerRestaurantContainer:{
    marginTop: 50,
  },
  tagContainer:{
    borderWidth:1, 
    padding: 5, 
    marginLeft: 5, 
    marginRight: 5,
    marginBottom: 15,
    borderColor: '#332E33',

   
  },
  tagFont: {
    fontSize: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default LoginForm;
