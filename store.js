//@ts-check
import { createStore, applyMiddleware, combineReducers } from 'redux';
import restaurantsReducer from './reducers/reducer_restaurants';
import randomRestaurantReducer from './reducers/reducer_random_restaurant';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    restaurant: randomRestaurantReducer
});

// This connects the reducer to the store
export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(thunk));
}
