import { getUserLocation } from "../utilities/locationUtils";
import { getDistance } from "../utilities/locationUtils";
import { useContext } from "react";

const fetchRestaurantData = async () => {
    MAX_RESTAURANT_DISTANCE = 10200;
    const userLocation = await getUserLocation();
    const restaurants = await getDistance(userLocation.longitude, userLocation.latitude);
    const filteredRestaurants = restaurants.filter((restaurant) => restaurant.distance <= MAX_RESTAURANT_DISTANCE);
    return filteredRestaurants
  };

  export default fetchRestaurantData;