import axios from "axios";
import { BACKEND_URL } from "../../config";

export default createUpdateRestaurantLike = async (userinfo, restaurant) => {
    try {
        const userid = userinfo.id
        const restaurantid = restaurant.id

      const response = await axios.post(BACKEND_URL+"/restaurant/like/update", {"userid": userid, "restaurantid": restaurantid});
        console.log(response.data)
    } catch (error) {
      console.log('An error occurred.', error);
    }
  };