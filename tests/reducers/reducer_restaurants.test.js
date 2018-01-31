import * as actions from '../../actions';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// New York Coordinates
const lat = 40.730610;
const long = -73.935242;

expect.extend({
    toBeType(received, argument) {
        const initialType = typeof received;
        const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
        return type === argument ? {
            message: () => `expected ${received} to be type ${argument}`,
            pass: true
        } : {
            message: () => `expected ${received} to be type ${argument}`,
            pass: false
        };
    }
});

describe('async actions', () => {
    it("gets restaurants with expected properties", async() => {
        const store = mockStore({ });

        await store.dispatch(actions.getRestaurant(lat, long));
        const restaurant = store.getActions()[0].restaurants[0];
        const length = store.getActions()[0].restaurants.length;
        expect(length).toBeGreaterThan(0);
        expect(restaurant.name).toBeType('string');
        expect(restaurant.vicinity).toBeType('string');
        expect(restaurant.photos.length).toBeGreaterThan(0);
        expect(restaurant.photos[0].photo_reference).toBeType('string');
    });
});