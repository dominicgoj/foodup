import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteUserLoginInfo = async () => {
    try {
      await AsyncStorage.removeItem('userLoginInfo');
      console.log('User login information deleted successfully!');
      return
    } catch (error) {
      console.log('Error deleting user login information:', error);
    }
  };
