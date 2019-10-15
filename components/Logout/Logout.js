import React, {Component} from 'react';

import {View, TouchableOpacity} from 'react-native';

import {Button} from 'react-native-paper';

import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import logError from '../Settings/logError';
import BottomMessage from '../Layout/Alert/bottomMessage';
import {EventEmitter} from 'events';

class Logout extends Component {
  constructor(props, context) {
    super(props, context);
    this._emitter = new EventEmitter();

    this.state = {
      error: false,
      message: null,
    };
  }

  async _logout() {
    AsyncStorage.removeItem('user').then(() =>
      this.props.navigation.navigate('Login'),
    );
  }

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this._logout()}>
            <Button color="red" mode="contained" onPress={() => this._logout()}>
              Logout
            </Button>
          </TouchableOpacity>
        </View>
        <BottomMessage
          msg={this.state.message}
          error={this.state.error}
          emitter={this._emitter}
        />
      </>
    );
  }
}

Logout.propTypes = {
  navigation: PropTypes.any,
};

export default Logout;
