import getUserLocation from "../utilities/getUserLocation";
import { getDistance } from "../utilities/locationUtils";
import FetchRestaurants from './fetchRestaurants.js'
import maxrestaurantdistance from '../data/maxrestaurantdistance'

const fetchRestaurantData = async () => {
    MAX_RESTAURANT_DISTANCE = maxrestaurantdistance.MAX_RESTAURANT_DISTANCE;
    const userLocation = await getUserLocation();
    if(typeof userLocation != "string"){
      const restaurants = await getDistance(userLocation.longitude, userLocation.latitude);
      const filteredRestaurants = restaurants.filter((restaurant) => restaurant.distance <= MAX_RESTAURANT_DISTANCE);
      return filteredRestaurants
    }
    else{
      const restaurants = FetchRestaurants()
      return restaurants
    }
  };

  export default fetchRestaurantData;