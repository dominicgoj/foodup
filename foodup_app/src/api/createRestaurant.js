// createRestaurant.js
import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function createRestaurant(input) {
  try {
    const user = {
      username: input.registerRestaurantFirstName, // Add the necessary values from the form inputs
      telephone: input.registerRestaurantTelephone,
      email: input.registerRestaurantEmail,
      user_firstname: input.registerRestaurantFirstName,
      user_lastname: input.registerRestaurantLastName
    };

    const restaurant = {
      restaurant_name: input.registerRestaurantName,
      telephone: input.registerRestaurantTelephone,
      email: input.registerRestaurantEmail,
      website: input.registerRestaurantWebsite,
      street: input.registerRestaurantStreet,
      zip: input.registerRestaurantZip,
      city: input.registerRestaurantCity,
      tags: input.registerRestaurantTags,
      userid: null
    };

    console.log(user)
    const userResponse = await axios.post(BACKEND_URL + "/user/create/", user);
    const userId = userResponse.data.id;

    restaurant.userid = userId;
    const restaurantResponse = await axios.post(BACKEND_URL + "/restaurant/create/", restaurant);
    return restaurantResponse.data;
  } catch (error) {
    console.log(error);
  }
}

