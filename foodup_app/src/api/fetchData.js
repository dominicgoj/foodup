import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default function FetchData({input}) {
  async function fetchData () {
    
    try {
      const response = await axios.get(BACKEND_URL+input);
      console.log(response.data)
      
    } catch (error) {
      console.error(error);
    }
    
  };

  
}