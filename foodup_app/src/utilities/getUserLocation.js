import * as Location from 'expo-location';

export default getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return "no-location-service"
    }

    try {
        let { coords } = await Location.getCurrentPositionAsync({});
        return coords;
    } catch (error) {
        console.log('Error fetching location:', error);
    }
};