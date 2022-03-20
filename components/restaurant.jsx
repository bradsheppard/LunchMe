//@ts-check
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import AppConstants from '../constants/app_constants';
import * as Location from 'expo-location';
import { getRestaurants, selectRestaurant } from '../actions/index';

class Restaurant extends Component {
    render() {
        if(!this.props.restaurant) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        else if(this.props.restaurant.photos)
            return (
                <ImageBackground
                    style={styles.container}
                    source={{uri: `${AppConstants.googlePhotoUri}?key=${AppConstants.googleApiKey}&photoreference=${this.props.restaurant.photos[0].photo_reference}&maxheight=10000`}}>
                    {this.renderRestaurantDetails()}
                </ImageBackground>
        );

        return (
            <View
                style={styles.container}>
                {this.renderRestaurantDetails()}
            </View>
        )
    }

    renderRestaurantDetails() {
        return (
            <View style={styles.restaurantView}>
                <Text style={styles.restaurantTitle}>{this.props.restaurant.name}</Text>
                <Text style={styles.restaurantText}>{this.props.restaurant.vicinity}</Text>
                <Text style={styles.restaurantText}>Rating: {this.props.restaurant.rating} / 5 ({this.props.restaurant.user_ratings_total} ratings)</Text>
                <Button
                    title='BACK'
                    onPress={() => this.props.navigation.goBack(null)} />
            </View>
        );
    }

    async componentDidMount() {
        if (!this.props.restaurant) {     
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                console.log('No location permission');
                return;
            }
           
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low
            });

            const lat = location.coords.latitude;
            const long = location.coords.longitude;

            this.props.getRestaurants(lat, long);
        }
        else {
            this.props.selectRestaurant();
        }
    }
}


function mapDispatchToProps(dispatch, { navigation }) {
    return {
        getRestaurants: (latitude, longitude) => {
            dispatch(getRestaurants(latitude, longitude));
        },
        selectRestaurant: () => {
            dispatch(selectRestaurant());
        }
    };
}

function mapStateToProps({ restaurant }) {
    return {
        restaurant
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    restaurantView: {
        height: '25%',
        backgroundColor: 'rgba(52, 52, 52, 0.75)',
        padding: 20
    },
    restaurantText: {
        color: 'white'
    },
    restaurantTitle: {
        color: 'white',
        marginBottom: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
