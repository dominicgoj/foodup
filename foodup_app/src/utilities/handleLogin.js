import createAccount from "../api/createAccount";
import storeUserLoginInfo from "./storeloggedin";


export default handleLogin = async (getLoginUsername, getLoginPhoneNumber,
  getLoginEmail, onLoginSuccess, getLoginAccountThere, getLoginAccountCredentials, setAccountCredentials, getUserProfileImage) => {
    const datasetToCreate = new FormData();
    

    datasetToCreate.append('telephone', getLoginPhoneNumber());
    datasetToCreate.append('email', getLoginEmail());
    datasetToCreate.append('username', getLoginUsername());

    if(getUserProfileImage()!="")
    {
      datasetToCreate.append('profile_img', {
        uri: getUserProfileImage(),
        type: 'image/jpeg', // Adjust the MIME type according to your requirements
        name: 'profile.jpg', // Adjust the filename if needed
      });
    }

    
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