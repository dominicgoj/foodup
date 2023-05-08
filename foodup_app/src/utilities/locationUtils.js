import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { BACKEND_URL } from "../../config";
import axios from "axios";

export const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return status;
    }

    try {
        let { coords } = await Location.getCurrentPositionAsync({});
        return coords;
    } catch (error) {
        console.log('Error fetching location:', error);
    }
};  

export const getDistance = async (user_lon, user_lat) =>  {
    try{
        const request = await axios.get(BACKEND_URL+"/restaurant/gps/?"+"user_longitude="+user_lon+"&"+"user_latitude="+user_lat)
        return request.data
    }catch(error){
        console.log(error)
    }
}   


