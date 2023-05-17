import React, {useState} from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { sendActivation } from "../../../api/sendActivation";
import { LoginFormStyle } from "../../../styles/loginFormStyles";
import dismissKeyboard from "../../../functions/dismissKeyboard";
import Regex from "../regex";
import userThere from "../../../api/userThere";
import { useNavigation } from "@react-navigation/native";

export default RenderLoginPhoneChoice = ({
    getLoginPhoneNumber, 
    setLoginPhoneNumber, 
    getLoginActivationDevice, 
    setLoginActivationDevice, 
    getLoginAccountThere,
    getLoginAccountCredentials,
    setAccountThere,
    setAccountCredentials}) => {
    const [localPhoneNumber, setLocalPhoneNumber] = useState("");
    const [phoneValidationMessage, setPhoneValidationMessage] = useState()
    const navigation = useNavigation()
    const handlePhoneValidation = async () => {
      const type = "telephone";
      const response = Regex(type, localPhoneNumber);
      if (response) {
        setPhoneValidationMessage("Die Telefonnummer ist inkorrekt.");
        return;
      }
      const loginCredentials = await userThere({
        input: localPhoneNumber,
        datatype: type,
      });
      const sendingActivationKey = await sendActivation("phone", localPhoneNumber);
      setAccountThereFalseIfLoginCredNotFound(loginCredentials);
      setPhoneValidationMessage("");
      setLoginActivationDevice({ type: "phone", input: localPhoneNumber });
      setLoginPhoneNumber(localPhoneNumber);
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
          <Text style={LoginFormStyle.title}>Einloggen mit deiner Telefonnummer</Text>

          <TextInput
            style={LoginFormStyle.input}
            placeholder="+43 XXX XXXX XXX"
            value={localPhoneNumber}
            onChangeText={setLocalPhoneNumber}
            keyboardType="phone-pad"
          />
          {phoneValidationMessage ? (
            <Text style={LoginFormStyle.warning}>{phoneValidationMessage}</Text>
          ) : null}

          <TouchableOpacity
            style={LoginFormStyle.smallbutton}
            onPress={handlePhoneValidation}
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