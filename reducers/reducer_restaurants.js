import { CLEAR_RESTAURANT, RECEIVE_RESTAURANTS } from '../actions';

export default function(state = null, { restaurants, type}) {
    switch(type) {
        case RECEIVE_RESTAURANTS:
            const restaurantCount = restaurants.length;
            const index = getRandomInt(0, restaurantCount - 1);
            return restaurants[index];
        case CLEAR_RESTAURANT:
            return null;
        default:
            return state;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}