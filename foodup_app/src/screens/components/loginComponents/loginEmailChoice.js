import React, {useState} from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { sendActivation } from "../../../api/sendActivation";
import { LoginFormStyle } from "../../../styles/loginFormStyles";
import dismissKeyboard from "../../../functions/dismissKeyboard";
import Regex from "../regex";
import userThere from "../../../api/userThere";
import { useNavigation } from "@react-navigation/native";

export default RenderLoginEmailChoice = ({
    getLoginEmail, 
    setLoginEmail, 
    getLoginActivationDevice, 
    setLoginActivationDevice, 
    getLoginAccountThere,
    getLoginAccountCredentials,
    setAccountThere,
    setAccountCredentials}) => {
    const [localEmail, setLocalEmail] = useState("");
    const [emailValidationMessage,setEmailValidationMessage] = useState();
    const navigation = useNavigation()
    const handleEmailValidation = async () => {
      const type = "email";
      const response = Regex(type, localEmail);
      if (response) {
        setEmailValidationMessage(
          "Die E-Mail-Adresse ist inkorrekt. Bitte gib eine gültige E-Mail-Adresse ein."
        );
        return;
      }

      const loginCredentials = await userThere({
        input: localEmail,
        datatype: type,
      });

      const sendingActivationKey = await sendActivation("email", localEmail);
      setAccountThereFalseIfLoginCredNotFound(loginCredentials);
      setEmailValidationMessage("");
      setLoginActivationDevice({ type: "email", input: localEmail });
      setLoginEmail(localEmail);
      navigation.navigate("LoginActivationCodeScreen");

      
    };
    
    const setAccountThereFalseIfLoginCredNotFound = (data) => {
      if (data.length > 0) {
        setAccountThere(true);
        setAccountCredentials(data);
      }
    };

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={"loginChoice"} style={LoginFormStyle.container}>
          <Text style={LoginFormStyle.title}>Einloggen mit deiner Emailadresse</Text>

          <TextInput
            style={LoginFormStyle.input}
            placeholder="max.mustermann@musterfrau.at"
            value={localEmail}
            onChangeText={(text) => {
              // Convert the entered text to lowercase
              const lowercaseText = text.toLowerCase();
              setLocalEmail(lowercaseText);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailValidationMessage ? (
            <Text style={LoginFormStyle.warning}>{emailValidationMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={LoginFormStyle.smallbutton}
            onPress={() => handleEmailValidation()}
          >
            <Text style={LoginFormStyle.buttonText}>Aktivierungscode senden</Text>
          </TouchableOpacity>
          <Text style={LoginFormStyle.info}>
            Wenn du noch keinen Account hast, erstellen wir Dir automatisch
            einen.
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
}