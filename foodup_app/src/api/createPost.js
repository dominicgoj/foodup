import axios from "axios";
import { BACKEND_URL } from "../../config";
import uuid from 'react-uuid';

export default createPost = async (formData, restaurantid) => {
    const randomHexUUID = uuid();
    try {
        formData.append('hex_identifier', randomHexUUID);
        const response = await axios.post(BACKEND_URL + '/post/create/', formData);
        const target_restaurant = await axios.get(BACKEND_URL+"/restaurant/id/"+restaurantid);
        const notification_to_receiver = {
            'hex_identifier': randomHexUUID,
            'userid': target_restaurant.data.userid
        }
        const notification = await axios.post(`${BACKEND_URL}/notification/create/`, notification_to_receiver);
        return {"post_response": response.data, "notification_response": notification.data}

        
      } catch (error) {
        console.error('Error sending post request:', error);
      }
}