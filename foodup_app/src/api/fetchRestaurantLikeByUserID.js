import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function fetchRestaurantLikeByUserID (userinfo){
    try {
        const response = await axios.get(BACKEND_URL + "/restaurant/like/retrieve?userid=" + userinfo.id);
        return response.data;
    } catch (error) {
        console.log('An error occurred in fetchRestaurantLikeUserID. Line 24:28.', error);
    }

};
