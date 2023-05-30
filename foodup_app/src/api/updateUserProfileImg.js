import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default updateUserProfileImage = async (userinfo, selectedImage) => {
  try {
    const formData = new FormData();
    if (selectedImage) {
      formData.append('profile_img', {
        uri: selectedImage,
        name: 'profile.jpg', // Adjust the filename if needed
      });
    } else {
      
      // Append the default image value to reset the profile_img field
      formData.append('profile_img', 'reset');
    }
    // Rest of your code...
  
  
      const response = await axios.patch(BACKEND_URL+"/user/update/"+userinfo.id, formData);
      return response.data;
    
    } catch (error) {
      // Handle error
      console.error(error);
      throw error;
    }
  };