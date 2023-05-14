import axios from "axios";
import { BACKEND_URL } from "../../config";

const deletePost = async (id) => {
    
    try{
        request = await axios.post(BACKEND_URL+"/post/setinactive", {id: id})
        return request.data
        
    }catch(error)
    {
        console.log(error)
    }
}
export default deletePost