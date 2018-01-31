import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { clearRestaurant } from '../actions';
import { Button } from 'react-native-elements';
import StyleConstants from '../constants/style_constants';
import AppConstants from '../constants/app_constants';

class Restaurant extends Component {
    render() {
        if(!this.props.restaurant)
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
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
                <Text style={styles.restaurantText}>Name: {this.props.restaurant.name}</Text>
                <Text style={styles.restaurantText}>Location: {this.props.restaurant.vicinity}</Text>
                <Button
                    title='BACK'
                    backgroundColor={StyleConstants.buttonColor}
                    onPress={this.goBack.bind(this)} />
            </View>
        );
    }

    goBack() {
        this.props.navigation.goBack(null);
        this.props.clearRestaurant();
    }
}

function mapStateToProps({ restaurant }) {
    return {
        restaurant
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearRestaurant: () => {
            dispatch(clearRestaurant());
        }
    }
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);