import { BACKEND_URL } from "../../config";
import axios from "axios";

export default CreatePostLike = async (userinfo, post) => {
    try {
        const currentDateTime = new Date().toISOString();
        const requestData = {
          userid: userinfo.id,
          restaurantid: post.post.restaurant_id,
          commentid: post.post.id,
          created_at: currentDateTime,
          userid_got_like: post.post.userid_posted
          // Add other data fields if needed
        };
        await axios.post(`${BACKEND_URL}/like/create/`, requestData);
        // Handle success (e.g., update state, show notification)
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      }
}