import { getUserLocation } from "../utilities/locationUtils";
import { getDistance } from "../utilities/locationUtils";

const fetchRestaurantData = async () => {
    MAX_RESTAURANT_DISTANCE = 1200;
    const userLocation = await getUserLocation();
    const restaurants = await getDistance(userLocation.longitude, userLocation.latitude);
    const filteredRestaurants = restaurants.filter((restaurant) => restaurant.distance <= MAX_RESTAURANT_DISTANCE);
    return filteredRestaurants
    
  };

  export default fetchRestaurantData;