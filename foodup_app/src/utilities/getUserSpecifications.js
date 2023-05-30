import axios from "axios";
import { BACKEND_URL } from "../../config";

const getUserSpecifications = async (userinfo) => {
  try {
    const userid = userinfo.id
    const response = await axios.get(BACKEND_URL+'/logindata?userid='+userinfo.id);
    return(response.data)
  } catch (error) {
    console.error('Error fetching login data:', error);
  }
};

export default getUserSpecifications;