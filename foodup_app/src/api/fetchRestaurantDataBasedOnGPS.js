import { BACKEND_URL } from "../../config";
import axios from "axios";

const fetchRestaurantDataBasedOnGPS = async (latitudeDelta, longitudeDelta, regionLatitude, regionLongitude) => {
  try {
    const response = await axios.get(BACKEND_URL + "/restaurant/fetch/gpsupdate", {
      params: {
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
        regionLatitude : regionLatitude,
        regionLongitude: regionLongitude
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchRestaurantDataBasedOnGPS;
