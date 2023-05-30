import { BACKEND_URL } from '../../config';
import axios from 'axios';

export default async function UpdateRestaurant(updates, restaurantid) {
   
  try {
    if(!restaurantid){
      //usually the restaurant id would be passed within updates
      // but when image is updated, formdata is passed without restaurantid
      const response = await axios.patch(BACKEND_URL+'/restaurant/'+updates.id, updates);
    return response.data
    }
    if(restaurantid){
      //usually the restaurant id would be passed within updates
      // but when image is updated, formdata is passed without restaurantid
      //console.log(updates, restaurantid)
      const response = await axios.patch(BACKEND_URL+'/restaurant/'+restaurantid, updates);
    return response.data
    }
    
  } catch (error) {
    console.error(error);
  }
}