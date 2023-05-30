import { BACKEND_URL } from "../../config";
import axios from "axios";
import uuid from 'react-uuid';

export default CreatePostLike = async (userinfo, post) => {
  const randomHexUUID = uuid();
    try {
        const likeData = {
          hex_identifier: randomHexUUID,
          userid: userinfo.id,
          restaurantid: post.post.restaurant_id,
          commentid: post.post.id,
          userid_got_like: post.post.userid_posted
          // Add other data fields if needed
        };
        const request = await axios.post(`${BACKEND_URL}/like/create/`, likeData);
        const notification_to_sender = {
          'hex_identifier': randomHexUUID,
          'userid': userinfo.id
        }
        await axios.post(`${BACKEND_URL}/notification/create/`, notification_to_sender);

        const notification_to_receiver = {
          'hex_identifier': randomHexUUID,
          'userid': post.post.userid_posted
        }
        await axios.post(`${BACKEND_URL}/notification/create/`, notification_to_receiver);
        return request.data
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      }
}