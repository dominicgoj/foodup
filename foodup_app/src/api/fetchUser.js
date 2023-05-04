import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default async function FetchUserData(userdata) {

        try {
          const response = await axios.get(BACKEND_URL+'/user/'+userdata.id);
          return response.data
          
        } catch (error) {
          console.error(error);
        }
        
      
    
}