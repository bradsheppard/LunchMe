//@ts-check
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

class Main extends Component {

    render() {
        const { navigation } = this.props;

        return (
            <ImageBackground style={styles.container} source={{uri: 'https://static.pexels.com/photos/541216/pexels-photo-541216.jpeg'}}>
                <View style={styles.rowFlex}>
                    <Button
                        title='LUNCH ME!'
                        buttonStyle={{
                            height: 50
                        }}
                        onPress={() => navigation.navigate('Restaurant')} />
                </View>
             </ImageBackground>
        );
    }
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

export default Main;
