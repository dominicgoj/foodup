import createAccount from "../api/createAccount";
import storeUserLoginInfo from "./storeloggedin";
export default handleLogin = async (getLoginUsername, getLoginPhoneNumber,
  getLoginEmail, onLoginSuccess, getLoginAccountThere, getLoginAccountCredentials, setAccountCredentials) => {
    datasetToCreate = {
      telephone: getLoginPhoneNumber(),
      email: getLoginEmail(),
      username: getLoginUsername(),
    };
    // Implement the logic to verify the entered verification code
    // and authenticate the user
    if (!getLoginAccountThere()) {
      const createdDataSet = await createAccount({ datasetToCreate, setAccountCredentials });
      await storeUserLoginInfo(createdDataSet); //this should provide the information to be stored on the device
      onLoginSuccess();
    } else if (getLoginAccountThere()) {
      storeUserLoginInfo(getLoginAccountCredentials()[0]); //this should provide the information to be stored on the device
      onLoginSuccess();
    }

    return;
  };