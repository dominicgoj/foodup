import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default FetchData = async(input) => {
    try {
      const response = await axios.get(BACKEND_URL+input);
      return response.data
      
    } catch (error) {
      console.error(error);
    }
    
  };

  
