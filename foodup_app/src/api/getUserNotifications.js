import axios from "axios";
import { BACKEND_URL } from "../../config";

export default getUserNotifications = async (userinfo, hex_identifier) => {
    try{
        if(userinfo){
        const request = await axios.get(BACKEND_URL+"/notification/retrieve?userid="+userinfo.id)
        return request.data
        }
        if(hex_identifier){
        const request = await axios.get(BACKEND_URL+"/notification/retrieve?hex_identifier="+hex_identifier)
        return request.data 
        }
    }
    catch(error){
        console.log(error)
    }
}