import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

// Retrieving user login information
const getUserLoginInfo = async () => {

  try {
    const userInfoString = await AsyncStorage.getItem('userLoginInfo');
    if (userInfoString !== null) {
      const userInfo = JSON.parse(userInfoString);
      try {
        const response = await axios.get(BACKEND_URL + "/user/" + userInfo.id);
        const { data } = response;
        console.log('User login information retrieved successfully:', data);
        return data;
        // Do something with the retrieved user info, e.g., auto-login
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("User not found")
          // Handle the case when the user is not found in the database
        } else {
          console.log('Server or connection error:', error);
          // Handle other server or connection errors
        }
      }
    } else {
      console.log('User login information not found on the device');
      // Handle the case when the user is not logged in (item not found on the device)
    }
  } catch (error) {
    console.log('Error retrieving user login information:', error);
    // Handle the error when retrieving user login information
  }
};

export default getUserLoginInfo;
