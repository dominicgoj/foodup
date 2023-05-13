import axios from "axios";
import { BACKEND_URL } from "../../config";
const getUserPosts = async (id) =>{
    try {
      
    const response = await axios.get(BACKEND_URL+'/post/?userid_posted='+id);
    return response.data  
    
    } catch (error) {
      
    console.error(error);
    }
  };  

  export default getUserPosts;