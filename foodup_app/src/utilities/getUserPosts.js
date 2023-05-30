import axios from "axios";
import { BACKEND_URL } from "../../config";
export default async function getUserPosts(id, active){
    try {
    if(active.active){
      response = await axios.get(BACKEND_URL+'/post/?userid_posted='+id+"&active="+active.active);
    }
    else{
      response = await axios.get(BACKEND_URL+'/post/?userid_posted='+id);
    }
    
    return response.data  
    
    } catch (error) {
      
    console.error(error);
    }
  };  
