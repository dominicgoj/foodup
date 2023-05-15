import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import dismissKeyboard from "../../../functions/dismissKeyboard";
  import { CreateRestaurantStyles } from "../../../styles/createRestaurantStyles";

  export default RenderRestaurantRegisterTags = ({getRestaurantTags, setRestaurantTags}) => {
    navigation = useNavigation()
    const [errorMsg, setErrorMsg] = useState(null);
    const [tagsInfo, setTagsInfo] = useState(
      "Gib mindestens 2 Stichworte ein die zu Deinem Restaurant passen."
    );
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState(getRestaurantTags);
    useEffect(() => {
      if (tags.length < 10) {
        if (tagInput.includes(",") || tagInput.includes(" ")) {
          const newTags = tagInput
            .split(/[, ]+/)
            .filter((tag) => tag.trim() !== "");
          setTags((prevTags) => [...prevTags, ...newTags]);
          setTagInput("");
        }
      } else {
        setTagsInfo("Die maximale Anzahl an Tags ist erreicht.");
      }
    }, [tagInput]);

    const handleRegisterRestaurantTags = () => {
      if (tags.length > 1) {
        console.log(tags);
        setRestaurantTags(tags);
        navigation.navigate("UserRegisterRestaurantAddress");
      } else {
        setErrorMsg(
          "Bitte gib mindestens 2 Stichworte zu Deinem Restaurant ein."
        );
      }
    };
    const deleteTag = (index) => {
      setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={CreateRestaurantStyles.container}>
          <Text style={CreateRestaurantStyles.title}>
            Erzähl uns Geschichten von Deinen Gerichten.
          </Text>

          <Text style={[CreateRestaurantStyles.info, { paddingBottom: 20, width: "70%" }]}>
            {tagsInfo}
          </Text>
          <View style={CreateRestaurantStyles.tagRow}>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} onPress={() => deleteTag(index)}>
                <View style={CreateRestaurantStyles.tagContainer}>
                  <Text style={CreateRestaurantStyles.tagFont}>{tag}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={CreateRestaurantStyles.input}
            autoCapitalize="words"
            placeholder="Burger, Nudel, Pizza, Asiatisch"
            value={tagInput}
            onChangeText={setTagInput}
            keyboardType="default"
          />
          {errorMsg ? <Text style={CreateRestaurantStyles.info}>{errorMsg}</Text> : null}
          <TouchableOpacity
            style={CreateRestaurantStyles.smallbutton}
            onPress={handleRegisterRestaurantTags}
          >
            <Text style={CreateRestaurantStyles.buttonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };
