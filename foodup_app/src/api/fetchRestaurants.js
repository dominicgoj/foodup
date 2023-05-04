import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function FetchRestaurants(input) {
    if (input) {
      // Perform some action for the input case
    } else {
      try {
        const requestAllRestaurants = await axios.get(BACKEND_URL + "/restaurant/");
        return requestAllRestaurants.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
  