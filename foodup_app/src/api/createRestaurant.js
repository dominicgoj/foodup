import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function createRestaurant(input) {
  try {
    const user = {
      username: input.registerRestaurantFirstName,
      telephone: input.registerRestaurantTelephone,
      email: input.registerRestaurantEmail,
      user_firstname: input.registerRestaurantFirstName,
      user_lastname: input.registerRestaurantLastName
    };

    const existingUserResponse = await axios.get(BACKEND_URL + "/user/search", { params: { telephone: user.telephone, email: user.email } });
    if (existingUserResponse.data.length > 0) {
      const userId = existingUserResponse.data[0].id;

      const restaurant = {
        restaurant_name: input.registerRestaurantName,
        telephone: input.registerRestaurantTelephone,
        email: input.registerRestaurantEmail,
        website: input.registerRestaurantWebsite,
        street: input.registerRestaurantStreet,
        zip: input.registerRestaurantZip,
        city: input.registerRestaurantCity,
        tags: input.registerRestaurantTags,
        userid: userId
      };


      const restaurantResponse = await axios.post(BACKEND_URL + "/restaurant/create/", restaurant);

      return restaurantResponse.data;
    } else {

      const userResponse = await axios.post(BACKEND_URL + "/user/create/", user);
      const userId = userResponse.data.id;

      const restaurant = {
        restaurant_name: input.registerRestaurantName,
        telephone: input.registerRestaurantTelephone,
        email: input.registerRestaurantEmail,
        website: input.registerRestaurantWebsite,
        street: input.registerRestaurantStreet,
        zip: input.registerRestaurantZip,
        city: input.registerRestaurantCity,
        tags: input.registerRestaurantTags,
        userid: userId
      };

      const restaurantResponse = await axios.post(BACKEND_URL + "/restaurant/create/", restaurant);

      return restaurantResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
}
