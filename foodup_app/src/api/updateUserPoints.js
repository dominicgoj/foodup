import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default async function UpdateUserPoints(userdata, points) {
  try {
    
    const updated_userdata = {
      banana_points: points,
    };
    const response = await axios.patch(BACKEND_URL+'/user/update/'+userdata.id, updated_userdata);
    return response
  } catch (error) {
    console.error(error);
  }
}