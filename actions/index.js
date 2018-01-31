import fetch from 'cross-fetch';

import AppConstants from '../constants/app_constants';

export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';
export const CLEAR_RESTAURANT = 'CLEAR_RESTAURANT';

const MAX_PAGES = 3;

export function receiveRestaurants(restaurants) {
    return {
        type: RECEIVE_RESTAURANTS,
        restaurants: restaurants
    }
}

export function clearRestaurant() {
    return {
        type: CLEAR_RESTAURANT
    }
}

export function getRestaurant(latitude, longitude) {
    return dispatch => {

        return (async() => {
            let nextPageToken = ``;
            let results = [];
            let index = 1;
            do {
                const result = await fetch(`${AppConstants.googleNearbySearchUri}?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${AppConstants.googleApiKey}${nextPageToken}`);
                const json = await result.json();
                results = results.concat(json.results);
                nextPageToken = json.next_page_token ? `&pagetoken${json.next_page_token}` : null;
                index++;
            } while(nextPageToken && index < MAX_PAGES);

            dispatch(receiveRestaurants(results));
        })();

    };
}
