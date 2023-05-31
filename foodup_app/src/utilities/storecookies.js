import AsyncStorage from '@react-native-async-storage/async-storage';
// Storing cookies for user
export default storeCookies = async (data) => {
  try {
    await AsyncStorage.setItem('cookies', JSON.stringify(data));
    console.log('Cookies set successfully!');
  } catch (error) {
    console.log('Error setting cookies:', error);
  }
    }
    
  


