import { BACKEND_URL } from "../../config";
import axios from "axios";
import maxrestaurantdistance from '../data/maxrestaurantdistance'

export default getRestaurantByTags = async (tags, user_longitude, user_latitude) => {
    try {
     
        if(user_longitude===undefined&&user_latitude===undefined){
            user_latitude = ""
            user_longitude = ""
            
        }
        let tagstring = "";
        if (Array.isArray(tags)) {
            tagstring = tags.join("%20");
        } else {
            tagstring = tags;
        }        
        const searchstring = `?search=${tagstring}&user_longitude=${user_longitude}&user_latitude=${user_latitude}`;
        const request = await axios.get(`${BACKEND_URL}/restaurant/search/tags${searchstring}`);
        if(user_latitude&&user_longitude){
            const filteredRestaurantsByMaxDistance = request.data.filter((restaurant) => restaurant.distance <= maxrestaurantdistance.MAX_RESTAURANT_DISTANCE);
            return filteredRestaurantsByMaxDistance
    
        }
        else{
            return request.data
        }
      
    } catch (error) {
      console.log(error);
    }
  };