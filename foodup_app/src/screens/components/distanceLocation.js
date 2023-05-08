import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import * as Location from 'expo-location';
import { View, Text } from "react-native";
import { MapStyles } from "../../styles/mapstyles";
const DistanceLocation = (result) => {
    const [userLocation, setUserLocation] = useState(null);
    const [distanceKM, setDistanceKM] = useState(null)
    const [distanceM, setDistanceM] = useState(null)

    const getUserLocation = async () => {
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

    useEffect(() => {
        const fetchUserLocation = async () => {
            const location = await getUserLocation();
            const distanceM = await getDistance(location.latitude, location.longitude, result.restaurant.latitude_gps, result.restaurant.longitude_gps, 'm')
            const distanceKM = await getDistance(location.latitude, location.longitude, result.restaurant.latitude_gps, result.restaurant.longitude_gps, 'km')

            setUserLocation(location);
            setDistanceKM(Math.round(distanceKM))
            setDistanceM(Math.round(distanceM))
        };
        fetchUserLocation();
        
    }, []);

   

    const getDistance = async (lat1, lon1, lat2, lon2, unit) =>  {
        const R = unit === 'km' ? 6371 : 6371000; // Radius of the Earth in kilometers or meters
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
    
        return distance;
      }
    
      function toRad(value) {
        return (value * Math.PI) / 180; // Convert degrees to radians
      }
    
    return(
        <View>
            {distanceKM<1?
            (<Text style={MapStyles.distance}>{distanceM} m</Text>):(<Text style={MapStyles.distance}>{distanceKM} km</Text>)}
        </View>
    )

};

export default DistanceLocation;
