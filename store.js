import { createStore, applyMiddleware, combineReducers } from 'redux';
import restaurantReducer from './reducers/reducer_restaurants';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    restaurant: restaurantReducer
});

// This connects the reducer to the store
export default function configureStore() {
    return createStore(rootReducer, applyMiddleware(thunk));
}