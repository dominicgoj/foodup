import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

// Function to retrieve device data and create a new login data instance
export default createLoginData = async (userId) => {
  let location;
  let deviceModel;
  let netInfo;
  try {
    
    
      const locationPromise = new Promise((resolve, reject) => {
        Location.getCurrentPositionAsync({})
          .then(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          })
          .catch(error => {
            reject(error);
          });
      });
    
    try{
      location = await locationPromise;
    }catch(error){
      location = {"latitude": 0, "longitude": 0}
    }
   
    const deviceModel = Device.modelName;
    const netInfo = await Network.getNetworkStateAsync();

    

    const loginData = {
        userid: userId,
        model: deviceModel,
        latitude: location.latitude,
        longitude: location.longitude,
        is_connected: netInfo.isConnected,
        connection_type: netInfo.type,
      };

    // Send the loginData object to the server for saving
    const response = await axios.post(BACKEND_URL + '/logindata/create', loginData);

    // Handle the response as needed
    if (response.status === 201) {
      console.log('Login data created successfully');
    } else {
      console.error('Failed to create login data');
    }
  } catch (error) {
    console.log('Error creating login data:', error);
  }
};
