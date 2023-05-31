import { BACKEND_URL } from "../../../config";
import axios from "axios";

export default getPostLike = async (likedData) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/like/`, {
          params: {
            userid: likedData.userid,
            restaurantid: likedData.restaurantid,
            commentid: likedData.commentid,
          },
        });
        return(response.data.length > 0);
      } catch (error) {
      }
}