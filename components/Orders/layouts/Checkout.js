import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-elements';

import {Button, ActivityIndicator} from 'react-native-paper';

import {View, Alert, StyleSheet, Animated} from 'react-native';

import PropTypes from 'prop-types';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-community/async-storage';
import getPrice from './getPrice';
import logError from '../../Settings/logError';
import save_order from '../../../requests/save_order';

function Checkout(props) {
  const [price, setPrice] = useState(0);
  const [calculating, setCalculating] = useState(false);

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

      await AsyncStorage.removeItem('articles');

      props.navigation.navigate('ViewOrder', {
        Code_Commande: result,
        save: true,
        emitter: props.emitter,
      });
    } catch (e) {
      console.log(e);
      props.emitter.emit('trigger-message', {
        error: true,
        message: 'Unable to save order.',
      });
      logError(e);
    } finally {
      props.emitter.emit('dismissDimmer');
    }
  }

  props.emitter.addListener('addingArticle', () => setCalculating(true));
  props.emitter.addListener('articleAdded', () => setCalculating(false));

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
          disabled={calculating}
          mode="outlined"
          style={{
            borderColor: calculating ? '#D5D3D3' : '#FF4747',
            borderWidth: 2,
          }}
          color="#FF4747"
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
          <FontAwesome5
            name="shopping-cart"
            color={calculating ? '#D5D3D3' : '#FF4747'}
            size={15}
          />{' '}
          Checkout
        </Button>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 0.6,
          marginRight: 10,
        }}>
        {calculating ? (
          <ActivityIndicator color="#FF4747" />
        ) : (
          <Text style={{color: '#FF4747'}} h3>
            {'  ' + price + ' LYD'}
          </Text>
        )}
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
