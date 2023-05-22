import axios from "axios";
import { BACKEND_URL } from "../../config";

export default getUserName = async (userid) => {
    try{
        
        const request = await axios.get(BACKEND_URL+"/user/show/"+userid)
        return request.data

    }catch(error){
        console.log(error)
    }
}