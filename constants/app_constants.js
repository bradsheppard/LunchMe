//@ts-check
import Constants from 'expo-constants';

export default {
    googleApiKey: Constants.manifest.extra.googleMapsApiKey,
    googlePhotoUri: 'https://maps.googleapis.com/maps/api/place/photo',
    googleNearbySearchUri: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
}
