import axios from "axios";
import { BACKEND_URL } from "../../config";

const getUserLikes = async (id) =>{
    try {
      
    const response = await axios.get(BACKEND_URL+'/like/?userid='+id);
    return response.data 
    
    } catch (error) {
      
    console.error(error);
    }
  };  

  export default getUserLikes;