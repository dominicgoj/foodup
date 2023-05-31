import axios from "axios";
import { BACKEND_URL } from "../../../config";

const getPostsByHex = async (notificationList) => {
  const hexIdentifiers = notificationList.map(obj => obj.hex_identifier);
  
  try {
    const data = {
      hex_identifiers: hexIdentifiers
    };
    
    const response = await axios.post(`${BACKEND_URL}/post/hexlinked/`, data);
    return response.data;
  } catch (error) {
    console.log("Cannot get Posts for Restaurant owner: ", error);
    return null;
  }
};

export default getPostsByHex;
