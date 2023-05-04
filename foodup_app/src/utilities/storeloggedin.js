import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing user login information
const storeUserLoginInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem('userLoginInfo', JSON.stringify(userInfo));
    console.log('User login information stored successfully!');
  } catch (error) {
    console.log('Error storing user login information:', error);
  }
};

export default storeUserLoginInfo;