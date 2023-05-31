import AsyncStorage from '@react-native-async-storage/async-storage';
import storeCookies from './storecookies';
import cookieTemplate from './cookieTemplate';
export default getCookies = async () => {
    try {
        const cookies = await AsyncStorage.getItem('cookies');
        if (cookies) {
          return JSON.parse(cookies);
        } else if(!cookies) {
            await storeCookies(cookieTemplate);
            console.log('No cookies found. Cookies created successfully!');
            return cookieTemplate
        }
      } catch (error) {
        console.log('Error getting cookies:', error);
        return null;
      }
  };
  