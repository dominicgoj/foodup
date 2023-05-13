import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function getRestaurantPosts(id){
    try{
        request = await axios.get(BACKEND_URL+"/post?restaurant_id="+id)
        return request.data
    }catch(error){
        console.log(error)
    }
}