import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Button, Text, Input} from 'react-native-elements';

import {View, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import _ from 'lodash';
import get_price from '../../../requests/get_price';
import logError from '../../Settings/logError';

function isNormalInteger(str) {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str;
}

class BasketModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      search: null,
      errorQuantity: false,
      quantity: 1,
      article: null,
      message: null,
    };
    this.boundSelectArticle = e => this.selectArticle(e);
  }

  selectArticle(article) {
    this.setState({article: article});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article != this.props.article) {
      this.props.article &&
        (this.props.article.quantity
          ? this.setState({quantity: this.props.article.quantity})
          : this.setState({quantity: 1}));
    }
  }

  componentDidMount() {
    this.props.ee.on('selectArticle', this.boundSelectArticle);
  }

  componentWillUnmount() {
    let boundSelectArticle = this.boundSelectArticle;
    this.props.ee.removeListener('selectArticle', boundSelectArticle);
  }

  handleQuantity = e => {
    if (!isNaN(e)) {
      if (e != '0') {
        this.setState({quantity: e, errorQuantity: false});
      } else {
        this.setState({quantity: 0, errorQuantity: false});
      }
    } else {
      this.setState({quantity: '', errorQuantity: true});
    }
  };

  async chooseArticle() {
    this.setState({message: null});
    try {
      const price = await get_price(this.state.article, this.state.quantity);
      const article = {
        ...this.state.article,
        quantity: this.state.quantity,
        price: price,
      };
      this.setState({quantity: 1}, () => {
        this.props.toggleBasketModal(article);
      });
    } catch (e) {
      logError(e);

      this.setState(
        {
          message:
            'Unable to reach database. Please press Cancel and try again.',
        },
        () => {
          setTimeout(() => {
            this.setState({message: null});
          }, 2000);
        },
      );
      //afficher erreur
    }
  }

  incQuantity() {
    if (this.state.quantity || this.state.quantity == 0) {
      this.setState({quantity: parseFloat(this.state.quantity) + 1});
    }
  }

  decQuantity() {
    if (this.state.quantity || this.state.quantity == 0) {
      this.setState({quantity: parseFloat(this.state.quantity) - 1});
    }
  }

  closeModal() {
    this.setState({quantity: 1}, () => this.props.toggleBasketModal());
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <View
          style={{
            flex: 0.7,
            backgroundColor: 'white',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}>
          <View>
            <Text h3 style={{textAlign: 'center', color: 'black'}}>
              Add an article
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'Roboto-Thin',
              }}>
              {this.state.article && this.state.article.Designation}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              flex: 0.4,
            }}>
            <TouchableOpacity
              onPress={() => this.incQuantity()}
              style={{marginRight: 20}}>
              <View>
                <FontAwesome5
                  onPress={() => this.incQuantity()}
                  color="#FF4747"
                  size={30}
                  name="plus"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.decQuantity()}
              style={{marginLeft: 20}}>
              <FontAwesome5
                onPress={() => this.decQuantity()}
                color="grey"
                size={30}
                name="minus"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.6,
              marginTop: 20,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}} />
            <View style={{flex: 2}}>
              <Input
                value={
                  !isNaN(this.state.quantity) && String(this.state.quantity)
                }
                keyboardType="numeric"
                placeholder="quantity..."
                onChangeText={e => this.handleQuantity(e)}
                errorMessage={
                  this.state.errorQuantity
                    ? 'Please enter a numerical value, different from 0.'
                    : null
                }
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 20,
                }}>
                <Text style={{color: 'red'}}>{this.state.message}</Text>
              </View>
            </View>
            <View style={{flex: 1}} />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Button
              title="Cancel"
              buttonStyle={{backgroundColor: 'grey', borderRadius: 0}}
              onPress={() => this.closeModal()}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              disabled={
                this.state.errorQuantity || !this.state.quantity ? true : false
              }
              buttonStyle={{backgroundColor: '#FF4747', borderRadius: 0}}
              title="OK"
              onPress={() => this.chooseArticle()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

BasketModal.propTypes = {
  isVisible: PropTypes.bool,
  toggleBasketModal: PropTypes.func,
  article: PropTypes.any,
  ee: PropTypes.any,
};

export default BasketModal;
