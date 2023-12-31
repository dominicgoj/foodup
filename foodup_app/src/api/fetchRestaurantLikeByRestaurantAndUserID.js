import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function fetchRestaurantLikeByRestaurantAndUserID (userinfo, restaurant){
        try {
            const response = await axios.get(BACKEND_URL + "/restaurant/like/retrieve?userid="+userinfo.id+"&restaurantid=" + restaurant.id);
            return response.data;
        } catch (error) {
            console.log('An error occurred in fetchRestaurantLikeRestaurantID. Line 24:28.', error);
        }
    
};
