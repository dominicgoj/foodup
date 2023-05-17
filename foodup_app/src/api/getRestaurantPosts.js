import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function getRestaurantPosts(id, active){
    try{
        if(active.active){
            request = await axios.get(BACKEND_URL+"/post?restaurant_id="+id+"&active="+active.active)
        }
        else{
            request = await axios.get(BACKEND_URL+"/post?restaurant_id="+id)
        }
        
        return request.data
    }catch(error){
        console.log(error)
    }
}

