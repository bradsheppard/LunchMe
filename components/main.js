import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import StyleConstants from '../constants/style_constants';

import { getRestaurant } from '../actions';

class Main extends Component {
    render() {
        return (
            <ImageBackground style={styles.container} source={{uri: 'https://static.pexels.com/photos/541216/pexels-photo-541216.jpeg'}}>
                <View style={styles.rowFlex}>
                    <Button
                        large
                        title='LUNCH ME!'
                        backgroundColor={StyleConstants.buttonColor}
                        onPress={this.getRestaurantFromLocation.bind(this)} />
                </View>
             </ImageBackground>
        );
    }

    getRestaurantFromLocation() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const lat = coords.latitude;
            const long = coords.longitude;
            this.props.getRandomRestaurant(lat, long);
        });
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        getRandomRestaurant: (latitude, longitude) => {
            dispatch(getRestaurant(latitude, longitude));
            navigation.navigate("Restaurant");
        }
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    rowFlex: {
        flexDirection: 'row'
    }
});

export default connect(null, mapDispatchToProps)(Main);
