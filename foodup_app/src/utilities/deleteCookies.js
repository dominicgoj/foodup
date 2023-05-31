import AsyncStorage from '@react-native-async-storage/async-storage';

export default deleteCookies = async () => {
  try {
    await AsyncStorage.removeItem('cookies');
    console.log('Cookies deleted successfully!');
  } catch (error) {
    console.log('Error deleting cookies:', error);
  }
  };
