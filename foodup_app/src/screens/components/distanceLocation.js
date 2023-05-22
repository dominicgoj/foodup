import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import * as Location from 'expo-location';
import { ActivityIndicator, View, Text } from "react-native";
import { MapStyles } from "../../styles/mapstyles";
import { Colors } from "../../styles/colors";
import AuthContext from "../../utilities/authcontext";

const DistanceLocation = (result) => {
    const [distanceKM, setDistanceKM] = useState(null)
    const [distanceM, setDistanceM] = useState(null)
    const [gpsAvailable, setGPSAvailable] = useState(false)
    const { globalUserLocation } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserLocation = async () => {
            if(result.restaurant.latitude_gps!=""&&result.restaurant.longitude_gps!=""&&typeof globalUserLocation != "string")
            {
                const distanceM = await getDistance(globalUserLocation.latitude, globalUserLocation.longitude, result.restaurant.latitude_gps, result.restaurant.longitude_gps, 'm')
                const distanceKM = await getDistance(globalUserLocation.latitude, globalUserLocation.longitude, result.restaurant.latitude_gps, result.restaurant.longitude_gps, 'km')
                setDistanceKM(Math.round(distanceKM))
                setDistanceM(Math.round(distanceM))
                setGPSAvailable(true)
            }
            else{
                const distanceM = "0"
                const distanceKM = "0"
                setGPSAvailable(false)
            }

            
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
            {gpsAvailable?(
                distanceKM<1?
                    (<Text style={MapStyles.distance}>{distanceM}m</Text>):(<Text style={MapStyles.distance}>{distanceKM} km</Text>)
            ):(<Text style={MapStyles.distance}>Keine Standortdaten verfügbar</Text>)}
            
        </View>
    )

};

export default DistanceLocation;
