import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function SearchRestaurants(input, searchVariable) {
  
    if (input&&searchVariable) {
      try {
        const requestAllRestaurants = await axios.get(BACKEND_URL + "/restaurant/search?"+searchVariable+"="+input);
        return requestAllRestaurants.data;
      } catch (error) {
        console.log(error);
      }
    } else {
        return
    }
  }
  