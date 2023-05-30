import { BACKEND_URL } from "../../config";
import axios from "axios";

export default deletePostLike = async (userinfo, post) => {
    try {
        const response = await axios.delete(`${BACKEND_URL}/like/delete/`, {
          params: {
            userid: userinfo.id,
            restaurantid: post.post.restaurant_id,
            commentid: post.post.id,
          },
        });
        const likeInstance = response.data.like_instance;
        return likeInstance;
        // Handle success (e.g., update state, show notification)
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      }
}