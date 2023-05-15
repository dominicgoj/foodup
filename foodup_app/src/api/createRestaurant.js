import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function createRestaurant(dataset, userinfo) {
  if(userinfo){
    const restaurant = {
      restaurant_name: dataset().registerRestaurantName,
      telephone: dataset().registerRestaurantTelephone,
      email: dataset().registerRestaurantEmail,
      website: dataset().registerRestaurantWebsite,
      street: dataset().registerRestaurantStreet,
      zip: dataset().registerRestaurantZip,
      city: dataset().registerRestaurantCity,
      tags: dataset().registerRestaurantTags,
      userid: userinfo.id
    };
    const restaurantResponse = await axios.post(BACKEND_URL + "/restaurant/create/", restaurant);
    return restaurantResponse.data;
  }
  else if(!userinfo){
    try {
      const user = {
        username: dataset.registerRestaurantFirstName,
        telephone: dataset.registerRestaurantTelephone,
        email: dataset.registerRestaurantEmail,
        user_firstname: dataset.registerRestaurantFirstName,
        user_lastname: dataset.registerRestaurantLastName
      };
  
      const existingUserResponse = await axios.get(BACKEND_URL + "/user/search", { params: { telephone: user.telephone, email: user.email } });
      if (existingUserResponse.data.length > 0) {
        const userId = existingUserResponse.data[0].id;
  
        const restaurant = {
          restaurant_name: dataset.registerRestaurantName,
          telephone: dataset.registerRestaurantTelephone,
          email: dataset.registerRestaurantEmail,
          website: dataset.registerRestaurantWebsite,
          street: dataset.registerRestaurantStreet,
          zip: dataset.registerRestaurantZip,
          city: dataset.registerRestaurantCity,
          tags: dataset.registerRestaurantTags,
          userid: userId
        };
  
  
        const restaurantResponse = await axios.post(BACKEND_URL + "/restaurant/create/", restaurant);
  
        return restaurantResponse.data;
      } else {
  
        const userResponse = await axios.post(BACKEND_URL + "/user/create/", user);
        const userId = userResponse.data.id;
  
        const restaurant = {
          restaurant_name: dataset.registerRestaurantName,
          telephone: dataset.registerRestaurantTelephone,
          email: dataset.registerRestaurantEmail,
          website: dataset.registerRestaurantWebsite,
          street: dataset.registerRestaurantStreet,
          zip: dataset.registerRestaurantZip,
          city: dataset.registerRestaurantCity,
          tags: dataset.registerRestaurantTags,
          userid: userId
        };
  
        const restaurantResponse = await axios.post(BACKEND_URL + "/restaurant/create/", restaurant);
  
        return restaurantResponse.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
 
}
