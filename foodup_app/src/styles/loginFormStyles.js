import { StyleSheet } from "react-native/";
export const LoginFormStyle = StyleSheet.create({

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
        smallbuttonInactive: {
          padding: 30,
          height: 80,
          backgroundColor: "#AEB6BD",
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
      
})