import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function FetchRestaurants(input, searchVariable) {
  
    if (input&&searchVariable) {
      try {
        const requestAllRestaurants = await axios.get(BACKEND_URL + "/restaurant/search?"+searchVariable+"="+input);
        return requestAllRestaurants.data;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const requestAllRestaurants = await axios.get(BACKEND_URL + "/restaurant/");
        return requestAllRestaurants.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
  