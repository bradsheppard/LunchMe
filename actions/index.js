//@ts-check
import fetch from 'cross-fetch';

import AppConstants from '../constants/app_constants';

export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';
export const CLEAR_RESTAURANT = 'CLEAR_RESTAURANT';
export const SELECT_RESTAURANT = 'SELECT_RESTAURANT';

const MAX_PAGES = 3;


export function selectRestaurant() {
    return (dispatch, getState) => {
        const restaurants = getState().restaurants;
        dispatch(selectRandomRestaurant(restaurants));
    }
}

export function clearRestaurant() {
    return {
        type: CLEAR_RESTAURANT
    }
}

export function getRestaurants(latitude, longitude) {
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

            await dispatch(receiveRestaurants(results));
            await dispatch(selectRestaurant());
        })();

    };
}

function receiveRestaurants(restaurants) {
    return {
        type: RECEIVE_RESTAURANTS,
        restaurants: restaurants
    }
}

function selectRandomRestaurant(restaurants) {
    return {
        type: SELECT_RESTAURANT,
        restaurants
    }
}
