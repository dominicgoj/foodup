import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import RenderLoginDeviceChoice from "./loginComponents/loginDeviceChoice";
import RenderLoginPhoneChoice from "./loginComponents/loginPhoneChoice";
import RenderLoginEmailChoice from "./loginComponents/loginEmailChoice";
import RenderLoginActivationCodeScreen from "./loginComponents/loginActivationCodeScreen";
import RenderLoginChooseUsername from "./loginComponents/loginChooseUsername";
import RenderRestaurantRegisterName from "./registerRestaurantsStackScreens/restaurantRegisterName";
import RenderRestaurantRegisterTags from "./registerRestaurantsStackScreens/restaurantRegisterTags";
import RenderRestaurantRegisterAddress from "./registerRestaurantsStackScreens/restaurantRegisterAddress";
import RenderRestaurantRegisterPhoneEmail from "./registerRestaurantsStackScreens/restaurantRegisterPhoneEmail";
import RenderRestaurantRegisterFirstLastName from "./registerRestaurantsStackScreens/restaurantRegisterFirstLastName";
import RenderRestaurantRegisterFinal from "./registerRestaurantsStackScreens/restaurantRegisterFinal";
import LoginHelper from "./loginComponents/loginHelper";
import RestaurantRegisterHelpers from "./registerRestaurantsStackScreens/restaurantRegisterHelpers";
import CostumHeader from "./costumheader";
import handleLogin from "../../utilities/handleLogin";
import RestaurantRegisterAddPhoto from "./registerRestaurantsStackScreens/restaurantRegisterAddPhoto";
import RestaurantRegisterSelectPhoto from "./registerRestaurantsStackScreens/restaurantRegisterSelectPhoto";
const LoginForm = (props) => {
  const { onLoginSuccess } = props;
  const Stack = createStackNavigator();
  const {
    getLoginPhoneNumber,
    setLoginPhoneNumber,
    getLoginEmail,
    setLoginEmail,
    getLoginActivationDevice,
    setLoginActivationDevice,
    getLoginAccountThere,
    getLoginAccountCredentials,
    setAccountThere,
    setAccountCredentials,
    getLoginUsername,
    setLoginUsername,
    resetLoginStates,
    getAllStates,
  } = LoginHelper();
  const {
    getRestaurantName,
    getRestaurantTelephone,
    getRestaurantEmail,
    getRestaurantWebsite,
    getRestaurantStreet,
    getRestaurantZip,
    getRestaurantCity,
    getRestaurantTags,
    getRestaurantFirstName,
    getRestaurantLastName,
    setRestaurantName,
    setRestaurantTelephone,
    setRestaurantEmail,
    setRestaurantWebsite,
    setRestaurantStreet,
    setRestaurantZip,
    setRestaurantCity,
    setRestaurantTags,
    setRestaurantFirstName,
    setRestaurantLastName,
    
    getRestaurantImage,
    setRestaurantImage,
    getRestaurantImages,
    setRestaurantImages,
    resetRegisterRestaurant,
    getRestaurantDataset,
    

  } = RestaurantRegisterHelpers();

  const [loginFinalisedBool, setLoginFinalisedBool] = useState(false);
  const [restaurantRegistered, setRestaurantRegistered] = useState(false);
  const setLoginFinalisedBoolTrue = () => {
    setLoginFinalisedBool(true);
  };

  useEffect(() => {
    if (loginFinalisedBool) {
      handleLogin(
        getLoginUsername,
        getLoginPhoneNumber,
        getLoginEmail,
        onLoginSuccess,
        getLoginAccountThere,
        getLoginAccountCredentials,
        setAccountCredentials
      );
      //clean up code
      return setLoginFinalisedBool(false), resetLoginStates();
    }
  }, [loginFinalisedBool]);
  useEffect(() => {
    if (restaurantRegistered) {

      resetRegisterRestaurant();
    }
    return setRestaurantRegistered(false);
  }, [restaurantRegistered]);


  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginDeviceChoice" options={{ headerShown: false }}>
        {() => <RenderLoginDeviceChoice />}
      </Stack.Screen>
      <Stack.Screen
        name="LoginPhoneChoice"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderLoginPhoneChoice
            getLoginPhoneNumber={getLoginPhoneNumber}
            setLoginPhoneNumber={setLoginPhoneNumber}
            getLoginActivationDevice={getLoginActivationDevice}
            setLoginActivationDevice={setLoginActivationDevice}
            getLoginAccountThere={getLoginAccountThere}
            getLoginAccountCredentials={getLoginAccountCredentials}
            setAccountThere={setAccountThere}
            setAccountCredentials={setAccountCredentials}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="LoginEmailChoice"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderLoginEmailChoice
            getLoginEmail={getLoginEmail}
            setLoginEmail={setLoginEmail}
            getLoginActivationDevice={getLoginActivationDevice}
            setLoginActivationDevice={setLoginActivationDevice}
            getLoginAccountThere={getLoginAccountThere}
            getLoginAccountCredentials={getLoginAccountCredentials}
            setAccountThere={setAccountThere}
            setAccountCredentials={setAccountCredentials}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="LoginActivationCodeScreen"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderLoginActivationCodeScreen
            getLoginActivationDevice={getLoginActivationDevice}
            getLoginAccountThere={getLoginAccountThere}
            setLoginFinalisedBoolTrue={setLoginFinalisedBoolTrue}
            getLoginPhoneNumber={getLoginPhoneNumber}
            getLoginEmail={getLoginEmail}
            getLoginUsername={getLoginUsername}
            getLoginAccountCredentials={getLoginAccountCredentials}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="LoginChooseUsername"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderLoginChooseUsername
            setLoginUsername={setLoginUsername}
            setLoginFinalisedBoolTrue={setLoginFinalisedBoolTrue}
          />
        )}
      </Stack.Screen>
      

      <Stack.Screen
        name="RestaurantRegisterAddPhoto"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => <RestaurantRegisterAddPhoto setRestaurantImages={setRestaurantImages}/>}
      </Stack.Screen>
      <Stack.Screen
        name="RestaurantRegisterSelectPhoto"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >{()=><RestaurantRegisterSelectPhoto getRestaurantImages={getRestaurantImages} getRestaurantName={getRestaurantName} setRestaurantImage={setRestaurantImage}/>}</Stack.Screen>
      <Stack.Screen
        name="RenderRestaurantRegisterFinal"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderRestaurantRegisterFinal
            dataset={getRestaurantDataset}
            userinfo={null}
            navigateBackDestination={"LoginDeviceChoice"}
            setRestaurantRegistered={setRestaurantRegistered}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UserRegisterRestaurantName"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderRestaurantRegisterName
            getRestaurantName={getRestaurantName}
            setRestaurantName={setRestaurantName}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UserRegisterRestaurantTags"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderRestaurantRegisterTags
            getRestaurantTags={getRestaurantTags}
            setRestaurantTags={setRestaurantTags}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UserRegisterRestaurantAddress"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderRestaurantRegisterAddress
            getRestaurantStreet={getRestaurantStreet}
            setRestaurantStreet={setRestaurantStreet}
            getRestaurantZip={getRestaurantZip}
            setRestaurantZip={setRestaurantZip}
            getRestaurantCity={getRestaurantCity}
            setRestaurantCity={setRestaurantCity}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UserRegisterRestaurantPhoneEmail"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderRestaurantRegisterPhoneEmail
            getRestaurantTelephone={getRestaurantTelephone}
            setRestaurantTelephone={setRestaurantTelephone}
            getRestaurantEmail={getRestaurantEmail}
            setRestaurantEmail={setRestaurantEmail}
            getRestaurantWebsite={getRestaurantWebsite}
            setRestaurantWebsite={setRestaurantWebsite}
            userLoggedOut={true}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="RestaurantRegisterFirstLastName"
        options={{
          header: () => <CostumHeader arrowShown={true} logoShown={false} />,
        }}
      >
        {() => (
          <RenderRestaurantRegisterFirstLastName
            setRestaurantFirstName={setRestaurantFirstName}
            setRestaurantLastName={setRestaurantLastName}
            getRestaurantLastName={getRestaurantLastName}
            getRestaurantFirstName={getRestaurantFirstName}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default LoginForm;
