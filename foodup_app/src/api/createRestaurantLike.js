import axios from "axios";
import { BACKEND_URL } from "../../config";
import uuid from 'react-uuid';
export default createUpdateRestaurantLike = async (userinfo, restaurant) => {
  const randomHexUUID = uuid();
    try {
        const userid = userinfo.id
        const restaurantid = restaurant.id

      response = await axios.post(BACKEND_URL+"/restaurant/like/update", {"userid": userid, "restaurantid": restaurantid});

    } catch (error) {
      console.log('An error occurred.', error);
    }
  };