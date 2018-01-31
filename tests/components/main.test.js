import React from 'react';
import Main from '../../components/main';
import store from '../../store';

import renderer from 'react-test-renderer';

describe('Main', () => {
    it('renders without crashing', () => {
        const reduxStore = store();
        const rendered = renderer.create(<Main store={reduxStore} />).toJSON();
        expect(rendered).toBeTruthy();
    });
});
