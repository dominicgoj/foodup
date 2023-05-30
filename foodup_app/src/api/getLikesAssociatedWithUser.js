import axios from "axios";
import { BACKEND_URL } from "../../config";

export default getLikesAssociatedWithCurrentUser = async (userinfo) => {
    try{
        const request = await axios.get(BACKEND_URL+"/like?userid="+userinfo.id+"&userid_got_like="+userinfo.id)
        
        return request.data
    }catch(error){
        console.log(error)
    }
}