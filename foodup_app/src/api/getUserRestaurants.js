import axios from "axios";
import { BACKEND_URL } from "../../config";
export default getUserRestaurants = async (userinfo) => {
    try {
        const requestAllRestaurants = await axios.get(
          BACKEND_URL + "/restaurant/search?userid=" + userinfo.id
        );
        
        return requestAllRestaurants.data
      } catch (error) {
        console.log(error);
      }
}