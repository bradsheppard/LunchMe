import React, { Component } from 'react';
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux';

import { StackNavigator } from 'react-navigation';

import Main from './components/main';
import Restaurant from './components/restaurant';

import configureStore from './store.js'
const store = configureStore();

const MainApp = StackNavigator(
    {
        Main: { screen: Main },
        Restaurant: { screen: Restaurant },
    },
    {
        navigationOptions: {
            header: null
        }
    });

class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <MainApp />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('App', () => App);

export default App;