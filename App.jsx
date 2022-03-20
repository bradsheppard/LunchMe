//@ts-check

import React, { Component } from 'react';
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';

import Main from './components/main';
import Restaurant from './components/restaurant';

import configureStore from './store.js'
const store = configureStore();

const Stack = createStackNavigator();

const theme = {
    Button: {
        raised: true
    }
}

class App extends Component {
    render() {
        return(
            <NavigationContainer>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <Stack.Navigator>
                            <Stack.Screen name="Main" component={Main} />
                            <Stack.Screen name="Restaurant" component={Restaurant} />
                        </Stack.Navigator>
                    </ThemeProvider>
                </Provider>
            </NavigationContainer>
        )
    }
}

AppRegistry.registerComponent('App', () => App);

export default App;
