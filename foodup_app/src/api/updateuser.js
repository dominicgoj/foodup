import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default async function UpdateUser(userdata, updates) {
  try {
    
    const updated_userdata = {
      username: updates.change_username,
      telephone: updates.change_phone,
      email: updates.change_email,
    };
    const response = await axios.patch(BACKEND_URL+'/user/update/'+userdata.id, updated_userdata);
    return response
  } catch (error) {
    console.error(error);
  }
}