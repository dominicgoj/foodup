import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function createRestaurant(dataset, userinfo) {
  const formData = new FormData();
  
  // Add form data fields
  formData.append('city', dataset().registerRestaurantCity);
  formData.append('email', dataset().registerRestaurantEmail);
  formData.append('title_image', {
    uri: dataset().registerRestaurantImage.uri,
    type: dataset().registerRestaurantImage.type,
    name: 'title_image.jpg',
  });
  // Compress and add title_image_preview (code to compress the image is not provided here)
  formData.append('title_image_preview', {
    uri: dataset().registerRestaurantImage.uri,
    type: dataset().registerRestaurantImage.type,
    name: 'title_image_preview.jpg',
  });
  // Loop through restaurant images and add them to formData
 
  formData.append('restaurant_name', dataset().registerRestaurantName);
  formData.append('street', dataset().registerRestaurantStreet);
  formData.append('tags', JSON.stringify(dataset().registerRestaurantTags));
  formData.append('telephone', dataset().registerRestaurantTelephone);
  formData.append('website', dataset().registerRestaurantWebsite);
  formData.append('zip', dataset().registerRestaurantZip);
  formData.append('description', dataset().registerRestaurantDescription);
  
  if (userinfo) {
    formData.append("userid", userinfo.id);
    try {
      const restaurantResponse = await axios.post(
        BACKEND_URL + "/restaurant/create/2",
        formData
      );
      return restaurantResponse.data;
    } catch (error) {
      console.log(error);
    }
  } else if (!userinfo) {
    try {
      const user = {
        username: dataset().registerRestaurantFirstName,
        telephone: dataset().registerRestaurantTelephone,
        email: dataset().registerRestaurantEmail,
        user_firstname: dataset().registerRestaurantFirstName,
        user_lastname: dataset().registerRestaurantLastName,
      };
      const existingUserResponse = await axios.get(
        BACKEND_URL + "/user/search",
        { params: { telephone: user.telephone, email: user.email } }
      );
      if (existingUserResponse.data.length > 0) {
        const userId = existingUserResponse.data[0].id;
        formData.append("userid", userId);
        try {
          const restaurantResponse = await axios.post(
            BACKEND_URL + "/restaurant/create/2",
            formData
          );
          return restaurantResponse.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        const userResponse = await axios.post(
          BACKEND_URL + "/user/create/",
          user
        );
        const userId = userResponse.data.id;
        formData.append("userid", userId);
        try {
          const restaurantResponse = await axios.post(
            BACKEND_URL + "/restaurant/create/2",
            formData
          );
          return restaurantResponse.data;
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

