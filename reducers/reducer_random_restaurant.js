import { SELECT_RESTAURANT } from "../actions";

export default function(state = null, { restaurants, type}) {
    switch(type) {
        case SELECT_RESTAURANT:
            const index = getRandomInt(0, restaurants.length - 1);
            return restaurants[index];
        default:
            return state;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
