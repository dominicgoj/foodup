import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function getRestaurantPosts(id, active) {
  try {
    if (!Array.isArray(id)) {
      if (active.active) {
        const request = await axios.get(BACKEND_URL + "/post?restaurant_id=" + id + "&active=" + active.active);
        return request.data;
      } else {
        const request = await axios.get(BACKEND_URL + "/post?restaurant_id=" + id);
        return request.data;
      }
    }

    if (Array.isArray(id)) {
      const request = await axios.get(BACKEND_URL + "/post/feed", { params: { restaurant_ids: id } });
      return request.data;
    }
  } catch (error) {
    console.log(error);
  }
}

