import React, {useState} from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { LoginFormStyle } from "../../../styles/loginFormStyles";
import handleLogin from "../../../utilities/handleLogin";
import dismissKeyboard from "../../../functions/dismissKeyboard";
import { useNavigation } from "@react-navigation/native";
export default RenderLoginChooseUsername = (
    {setLoginUsername}
) => {
    const [localChosenUsername, setLocalChosenUsername] = useState("");
    const navigation = useNavigation()
    const FinaliseLogin = () =>{
        setLoginUsername(localChosenUsername)
        navigation.navigate("LoginSelectProfileImg")
    }
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View key={"usernameChoice"} style={LoginFormStyle.container}>
          <Text style={LoginFormStyle.title}>Du bist neu! Such dir einen Namen aus</Text>

          <TextInput
            style={LoginFormStyle.input}
            placeholder="Dein Username"
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