/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {PermissionsAndroid, View, Text, Platform} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Navigation from './components/Navigation/Navigation';
import {ActivityIndicator} from 'react-native-paper';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      granted: null,
    };
  }

  async createTables() {
    const createdtables = await AsyncStorage.getItem('createdtables');

    if (!createdtables) {
      try {
        // await create();
        AsyncStorage.setItem('createdtables', 'created');
      } catch (e) {
        logError(e);
      }
    }
  }

  async componentDidMount() {
    await this.requestLocationPermission();
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Please allow the app to access to your location.',
          message: 'This app needs your location in order to work properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({granted: 'granted'});
      } else {
        this.setState({granted: 'no'});
      }
    } catch (err) {
      logError(err.message);
    }
  }

  render() {
    return Platform.OS === 'android' ? (
      this.state.granted ? (
        this.state.granted === 'granted' ? (
          <Navigation />
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>
              You must grant access to your location to the application!
            </Text>
          </View>
        )
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="#FF4747" />
        </View>
      )
    ) : (
      <Navigation></Navigation>
    );
  }
}
