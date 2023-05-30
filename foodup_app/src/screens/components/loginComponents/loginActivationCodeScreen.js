import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { checkActivation } from "../../../api/checkActivation";
import { LoginFormStyle } from "../../../styles/loginFormStyles";
import dismissKeyboard from "../../../functions/dismissKeyboard";
import { useNavigation } from "@react-navigation/native";
export default RenderLoginActivationCodeScreen = ({
    getLoginActivationDevice,
    getLoginAccountThere,
    getLoginUsername,
    getLoginPhoneNumber,
    getLoginEmail,
    setLoginFinalisedBoolTrue,
    getLoginAccountCredentials}) => {
    const [localVerificationCode, setLocalVerificationCode] = useState("");
    const [activationValidationMessage, setActivationValidationMessage] = useState('')
    const navigation = useNavigation()
    const handleActivation = async () => {
      try {
        const response = await checkActivation(
        getLoginActivationDevice().type,
        getLoginActivationDevice().input,
        localVerificationCode
        );
        const message = response.message;

        if (!getLoginAccountThere()) {
          navigation.navigate("LoginChooseUsername");
        } else {
          setLoginFinalisedBoolTrue()
        }
        setActivationValidationMessage("");
      } catch (error) {
        console.log(error);
        setActivationValidationMessage(
          "Der eingegebene Aktivierungscode ist inkorrekt"
        );
        // Handle the error case
      }
    };
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={"loginChoice"} style={LoginFormStyle.container}>
          <Text style={LoginFormStyle.title}>Aktivierungscode eingeben</Text>

          <TextInput
            style={[LoginFormStyle.input, { textAlign: "center" }]}
            placeholder="XXXXX"
            value={localVerificationCode}
            onChangeText={setLocalVerificationCode}
            keyboardType="numeric"
            maxLength={5}
          />
          {activationValidationMessage ? (
            <Text style={LoginFormStyle.warning}>{activationValidationMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={LoginFormStyle.smallbutton}
            onPress={handleActivation}
          >
            <Text style={LoginFormStyle.buttonText}>Los gehts</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
}