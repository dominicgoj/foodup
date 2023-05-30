import axios from "axios";
import { BACKEND_URL } from "../../config";


export default async function UpdateUserToInactive(userdata) {
    try {
        const request = await axios.get(BACKEND_URL+"/user/"+userdata.id)
    }catch(error){
    }
    try{
      const updated_userdata = {
        ...userdata,
        active: false,
        email: '',
        telephone: '',
      };
      const response = await axios.patch(BACKEND_URL+'/user/'+userdata.id, updated_userdata);
      return response
    } catch (error) {
      console.error(error);
    }
  }