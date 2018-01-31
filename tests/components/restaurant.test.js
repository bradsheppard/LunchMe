import React from 'react';
import Restaurant from '../../components/restaurant';
import renderer from "react-test-renderer";
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore();

describe('Restaurant', () => {
    describe('renders without crashing', () => {

        it('no restaurants', () => {
            const store = mockStore();
            const rendered = renderer.create(<Restaurant store={store} />).toJSON();
            expect(rendered).toMatchSnapshot();
        });

        it('single restaurant, no photo', () => {
            const store = mockStore(
                {
                    restaurant: {
                        'name': 'Test Restaurant',
                        'vicinity': '123 Fake Street'
                    }
                }
            );
            const rendered = renderer.create(<Restaurant store={store} />).toJSON();
            expect(rendered).toMatchSnapshot();
        });

        it('single restaurant, photo', () => {
            const store = mockStore(
                {
                    restaurant: {
                        'name': 'Test Restaurant',
                        'vicinity': '123 Fake Street',
                        'photos': [
                            {
                                'photo_reference': '123.jpg'
                            }
                        ]
                    }
                }
            );
            const rendered = renderer.create(<Restaurant store={store} />).toJSON();
            expect(rendered).toMatchSnapshot();
        });

    });
});