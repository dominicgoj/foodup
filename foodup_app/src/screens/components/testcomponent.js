import React from "react"
import { Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import RestaurantRegisterAddPhoto from "./registerRestaurantsStackScreens/restaurantRegisterAddPhoto"
import RestaurantRegisterSelectPhoto from "./registerRestaurantsStackScreens/restaurantRegisterSelectPhoto"
import axios from "axios"
import { BACKEND_URL } from "../../../config"
export default TestComponent = () =>{

  const formData = new FormData();    
  const generateDummyData = () => {
        // Generate random values for each attribute
        const registerRestaurantName = "Dummy Restaurant";
        const registerRestaurantTelephone = "+4367762781271";
        const registerRestaurantEmail = "dummy@example.com";
        const registerRestaurantWebsite = "www.dummyrestaurant.com";
        const registerRestaurantStreet = "123 Dummy Street";
        const registerRestaurantZip = "12345";
        const registerRestaurantCity = "Dummy City";
        const registerRestaurantImage = require("../../../assets/img/food.jpg");
      
        // Return an object with the generated values
        return {
          registerRestaurantName,
          registerRestaurantTelephone,
          registerRestaurantEmail,
          registerRestaurantWebsite,
          registerRestaurantStreet,
          registerRestaurantZip,
          registerRestaurantCity,
          registerRestaurantImage,
        };
      }
      
      // Use the generateDummyData function to fill the formData attributes
      formData.append("restaurant_name", generateDummyData().registerRestaurantName);
      formData.append("telephone", generateDummyData().registerRestaurantTelephone);
      formData.append("email", generateDummyData().registerRestaurantEmail);
      formData.append("website", generateDummyData().registerRestaurantWebsite);
      formData.append("street", generateDummyData().registerRestaurantStreet);
      formData.append("zip", generateDummyData().registerRestaurantZip);
      formData.append("city", generateDummyData().registerRestaurantCity);
      formData.append("image_url", {
      uri: generateDummyData().registerRestaurantImage,
      type: "image/jpeg", // Set the correct MIME type for the image file
      name: "photo.jpg", // Set a desired filename for the image
      });
      formData.append("userid", "43");
      console.log(formData)
      const createResto = async() => {
        try {
            const restaurantResponse = await axios.post(
              BACKEND_URL + "/restaurant/create/",
              formData
            );
            return restaurantResponse.data;
          } catch (error) {
            console.log(error);
          }
      }

      createResto()
      
      
    return(
        <View></View>
    )
}
