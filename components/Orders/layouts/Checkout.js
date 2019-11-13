import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-elements';

import {Button} from 'react-native-paper';

import {View, Alert, StyleSheet, Animated} from 'react-native';

import PropTypes from 'prop-types';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-community/async-storage';
import getPrice from './getPrice';
import logError from '../../Settings/logError';
import save_order from '../../../requests/save_order';

function Checkout(props) {
  const [price, setPrice] = useState(0);

  const [bottomPosition, setbottomPosition] = useState(new Animated.Value(0));

  async function saveOrder() {
    props.emitter.emit('showDimmer');
    try {
      const result = await save_order(
        props.GPS,
        props.customer.Code_Client,
        price,
        props.articles,
      );

      props.navigation.navigate('ViewOrder', {
        Code_Commande: result,
        save: true,
        emitter: props.emitter,
      });
    } catch (e) {
      props.emitter.emit('trigger-message', {error: true, message: e.message});
      logError(e);
      console.log(e);
    } finally {
      props.emitter.emit('dismissDimmer');
    }
  }

  props.emitter.addListener('keyboardUp', () => {
    Animated.timing(bottomPosition, {
      toValue: -50,
      duration: 300,
    }).start();
  });

  props.emitter.addListener('keyboardDown', () => {
    Animated.timing(bottomPosition, {
      toValue: 0,
      duration: 300,
    }).start();
  });

  useEffect(() => {
    const total_price = getPrice(props.articles);

    setPrice(total_price);
  });

  return (
    <Animated.View style={[styles.Container, {bottom: bottomPosition}]}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 5,
        }}>
        <Button
          mode='outlined'
          style={{borderColor: '#FF4747', borderWidth: 2}}
          color='#FF4747'
          onPress={() => {
            props.customer && props.articles.length > 0
              ? Alert.alert(
                  'Confirm your order?',
                  '',

                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        saveOrder();
                      },
                    },
                  ],
                )
              : Alert.alert(
                  'Please select a client and at least an article in your basket.',
                );
          }}>
          <FontAwesome5 name='shopping-cart' color='#FF4747' size={15} />{' '}
          Checkout
        </Button>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0.6,
          marginLeft: 10,
        }}>
        <Text style={{color: '#FF4747'}} h3>
          {'  ' + price + ' LYD'}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  checkoutButton: {
    marginRight: 4,
    borderWidth: 2,
    borderColor: '#FF4747',
    backgroundColor: 'white',
  },
});

Checkout.propTypes = {
  articles: PropTypes.array,
  navigation: PropTypes.any,
  customer: PropTypes.any,
  clearOffer: PropTypes.func,
  emitter: PropTypes.any,
  GPS: PropTypes.object,
};

export default Checkout;
