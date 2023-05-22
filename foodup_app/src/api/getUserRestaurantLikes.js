import axios from "axios";
import { BACKEND_URL } from "../../config";

export default getUserRestaurantLikes = async (userinfo) => {
    try{    
        const request = await axios.get(BACKEND_URL+"/restaurant/like/search", userinfo.id)
        return request.data
    }catch(error){
        console.log(error)
    }
}