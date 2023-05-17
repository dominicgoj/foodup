import axios from "axios";
import { BACKEND_URL } from "../../config";
export default handleUserThereAPIRequest = async ({ input, datatype }) => {
    try {
      const htmlinput = input.replace("+", "%2B");
      const response = await axios.get(
        `${BACKEND_URL}/user/search?${datatype}=${htmlinput}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };