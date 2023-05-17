import { StyleSheet } from "react-native";
export const CreateRestaurantStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: "#4dad88",
    },
    mainScreenContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#4dad88",
      paddingBottom: 100,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    info: {
      fontSize: 14,
      marginTop: 10,
      textAlign: "center",
    },
    input: {
      width: "80%",
      height: 80,
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
    },
    bigbutton: {
      width: "50%",
      height: 120,
      backgroundColor: "#142A6B",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
    },
    smallbutton: {
      padding: 30,
      height: 80,
      backgroundColor: "#142A6B",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    warning: {
      textAlign: "center",
    },
    registerRestaurantContainer: {
      marginTop: 50,
    },
    tagContainer: {
      borderWidth: 1,
      padding: 5,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 15,
      borderColor: "#332E33",
    },
    tagFont: {
      fontSize: 16,
    },
    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
    },
    headerContainer:{
      paddingTop: 100,
    },
    imageContainer:{
      flex: 1,
      width: '100%',
    },
    addPhotoContainer: {
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center'
    },
    addPhotoIcon: {
      fontSize: 100,
      color: 'white',
      opacity: 0.3
    },
    PreviewImageContainer: {
      height: 200,
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 10,
    },
    PreviewImage: {
      height: 200,
      borderRadius: 10,
    }
  });