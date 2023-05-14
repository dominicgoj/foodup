import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default async function UpdateRestaurant(updates) {
  try {
    
    const response = await axios.patch(BACKEND_URL+'/restaurant/'+updates.id, updates);
    
  } catch (error) {
    console.error(error);
  }
}