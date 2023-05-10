import axios from "axios";
import { BACKEND_URL } from "../../config";

export async function sendActivation(type, input){
    try{
        validEmailRequest = await axios.post(BACKEND_URL+"/activation/send/", { [type]: input });
        
        return validEmailRequest.data
            }catch(error){
                console.log(error)
            }
        }
       
