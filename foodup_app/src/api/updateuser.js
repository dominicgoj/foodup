import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default async function UpdateUser(userdata, updates) {
  try {
    const updated_userdata = {
      ...userdata,
      username: updates.change_username || userdata.username,
      telephone: updates.change_phone || userdata.telephone,
      email: updates.change_email || userdata.email,
    };
    const response = await axios.patch(BACKEND_URL+'/user/'+userdata.id, updated_userdata);
    return response
  } catch (error) {
    console.error(error);
  }
}