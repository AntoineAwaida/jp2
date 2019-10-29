import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {Button, ActivityIndicator} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {EventEmitter} from 'events';
import BottomMessage from '../Layout/Alert/bottomMessage';

import PropTypes from 'prop-types';

import AsyncStorage from '@react-native-community/async-storage';
import logError from '../Settings/logError';

import get_user from '../../requests/get_user';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: null,
      password: null,
      isLoading: false,
      isRetrievingUser: true,
    };
    this._emitter = new EventEmitter();
    this._emitter.setMaxListeners(0);
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('user');

    user
      ? this.props.navigation.navigate(
          JSON.parse(user).Code_Groupe === 'ADMIN' ||
            JSON.parse(user).name === 'Admin'
            ? 'MainAdmin'
            : 'Main',
        )
      : this.setState({isRetrievingUser: false});
  }

  changeUsername(e) {
    this.setState({username: e, error: false});
  }
  changePassword(e) {
    this.setState({password: e, error: false});
  }

  async _fillAsyncStorage(data) {
    await AsyncStorage.setItem('user', JSON.stringify(data));
  }

  async _login() {
    this.setState({isLoading: true}, () => {
      this.state.username !== 'Admin'
        ? get_user(this.state.username)
            .then(res => {
              res.length > 0
                ? this._fillAsyncStorage(res[0]).then(() => {
                    this.setState({isLoading: false}, () => {
                      this.props.navigation.navigate('Main');
                    });
                  })
                : (function() {
                    throw Error('Wrong username.');
                  })();
            })
            .catch(err => {
              logError(err);
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  this._emitter.emit('trigger-message', {
                    error: true,
                    message: err.message,
                  });
                },
              );
            })
        : this.state.password === 'ecbxv'
        ? this._fillAsyncStorage({
            name: 'Admin',
            Code_Utilisateur: 'Admin',
          }).then(() => {
            this.setState({isLoading: false}, () => {
              this.props.navigation.navigate('MainAdmin');
            });
          })
        : this.setState(
            {
              isLoading: false,
            },
            () => {
              this._emitter.emit('trigger-message', {
                error: true,
                message: 'Wrong username or password!',
              });
            },
          );
    });
  }

  render() {
    return this.state.isRetrievingUser ? (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="#FF4747" />
      </View>
    ) : (
      <>
        <View style={style.container}>
          <View style={style.form}>
            <Input
              onChangeText={e => this.changeUsername(e)}
              placeholder="Name"
              name="Name"
              clearTextOnFocus={true}
              inputContainerStyle={style.dividerStyle}
              textContentType="username"
              placeholderTextColor="#eaeaea"
              selectionColor="grey"
              inputStyle={{color: 'white', marginLeft: 15}}
              leftIcon={
                <Icon type="font-awesome" name="user" size={20} color="white" />
              }
            />
            <Input
              onChangeText={e => this.changePassword(e)}
              shake={true}
              name="password"
              placeholder="Password"
              clearTextOnFocus={true}
              inputContainerStyle={style.dividerStyle}
              inputStyle={{color: 'white', marginLeft: 10}}
              placeholderTextColor="#eaeaea"
              secureTextEntry={true}
              textContentType="password"
              leftIcon={<FontAwesome5 name="key" size={20} color="white" />}
            />
          </View>
          <View style={style.login}>
            <TouchableOpacity
              style={{backgroundColor: 'white', borderRadius: 5}}>
              <Button
                color="#FF4747"
                loading={this.state.isLoading}
                onPress={() => this._login()}
                mode="outlined">
                Login
              </Button>
            </TouchableOpacity>
          </View>
        </View>
        <BottomMessage emitter={this._emitter} />
      </>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.any,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 30,
    backgroundColor: '#FF4747',
    paddingTop: 80,
  },
  dividerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 3,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  form: {
    flex: 0.7,
  },
  login: {
    flex: 0.3,
  },
});

export default Login;
