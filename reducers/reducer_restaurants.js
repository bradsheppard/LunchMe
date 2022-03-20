//@ts-check
import { CLEAR_RESTAURANT, RECEIVE_RESTAURANTS } from '../actions';

export default function(state = null, { restaurants, type}) {
    switch(type) {
        case RECEIVE_RESTAURANTS:
            return restaurants;
        case CLEAR_RESTAURANT:
            return null;
        default:
            return state;
    }
}

