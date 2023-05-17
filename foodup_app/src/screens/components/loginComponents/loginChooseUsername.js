import React, {useState} from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { LoginFormStyle } from "../../../styles/loginFormStyles";
import handleLogin from "../../../utilities/handleLogin";
import dismissKeyboard from "../../../functions/dismissKeyboard";
export default RenderLoginChooseUsername = (
    {setLoginUsername, setLoginFinalisedBoolTrue}
) => {
    const [localChosenUsername, setLocalChosenUsername] = useState("");
    const FinaliseLogin = () =>{
        setLoginUsername(localChosenUsername)
        setLoginFinalisedBoolTrue()
    }
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={"usernameChoice"} style={LoginFormStyle.container}>
          <Text style={LoginFormStyle.title}>Such dir einen Namen aus</Text>

          <TextInput
            style={LoginFormStyle.input}
            placeholder="XXXXX"
            value={localChosenUsername}
            onChangeText={setLocalChosenUsername}
            keyboardType="default"
          />
          <TouchableOpacity
            style={LoginFormStyle.smallbutton}
            onPress={FinaliseLogin}
          >
            <Text style={LoginFormStyle.buttonText}>Los gehts</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
}