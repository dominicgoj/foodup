import axios from "axios";
import { BACKEND_URL } from "../../config";

export default updateUserNotification = async (userinfo, hex_identifiers) => {
    try {
        const response = await axios.post(BACKEND_URL+"/notification/update/", {
          userid: userinfo.id,
          hex_identifiers: hex_identifiers,
        });
  
        return response.data // Handle the response as needed
  
      } catch (error) {
        console.error(error);
      }
    
}