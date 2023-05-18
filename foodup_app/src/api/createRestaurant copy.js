import axios from "axios";
import { BACKEND_URL } from "../../config";

export default async function createRestaurant(dataset, userinfo) {
  const formData = new FormData();
  formData.append("restaurant_name", dataset().registerRestaurantName);
  formData.append("telephone", dataset().registerRestaurantTelephone);
  formData.append("email", dataset().registerRestaurantEmail);
  formData.append("website", dataset().registerRestaurantWebsite);
  formData.append("street", dataset().registerRestaurantStreet);
  formData.append("zip", dataset().registerRestaurantZip);
  formData.append("city", dataset().registerRestaurantCity);
  formData.append("tags", dataset().registerRestaurantTags);
  formData.append("image_url", {
    uri: dataset().registerRestaurantImage,
    type: "image/jpeg", // Set the correct MIME type for the image file
    name: "photo.jpg", // Set a desired filename for the image
  });
  console.log("Form Data: ", formData)

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
        console.log("User non existent, creating new with: ", user);
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
