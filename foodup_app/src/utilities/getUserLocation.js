import * as Location from 'expo-location';

export default getUserLocation = async () => {
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