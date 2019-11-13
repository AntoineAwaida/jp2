import React, {Component} from 'react';

import {View} from 'react-native';

import {Text, ListItem, Button} from 'react-native-elements';

import PropTypes from 'prop-types';

import {ActivityIndicator} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FlatList} from 'react-native-gesture-handler';
import logError from '../../Settings/logError';

import BottomMessage from '../../Layout/Alert/bottomMessage';

import {EventEmitter} from 'events';

import get_order from '../../../requests/get_order';

import {NavigationEvents} from 'react-navigation';
import moment from 'moment';

export default class ViewOrder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      commande: null,
      composition: null,
      isLoading: true,
      message: null,
      error: false,
    };
    this._emitter = new EventEmitter();
  }

  getOrder(order) {
    get_order(order)
      .then(res => {
        this.setState({commande: res[0], composition: res, isLoading: false});
      })
      .catch(err => {
        logError(err);

        this.setState({isLoading: false, error: true}, () => {
          this._emitter.emit('trigger-message', {
            error: true,
            message: err.message,
          });
        });
      });
  }

  async componentDidMount() {
    this.getOrder(this.props.navigation.state.params.Code_Commande);
    this.props.navigation.state.params.save &&
      this._emitter.emit('trigger-message', {
        error: false,
        message: 'Order successfully created!',
      });
  }

  render() {
    return (
      <>
        <View style={{flex: 1}}>
          <NavigationEvents
            onWillFocus={() => {
              this.props.navigation.state.params.save &&
                this.props.navigation.state.params.emitter.emit('clearOffer');
            }}
          />
          {this.state.isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#ff4747" />
            </View>
          ) : this.state.error ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Error while retrieving your order. Please retry.</Text>
            </View>
          ) : (
            <>
              <View style={{flex: 1}}>
                <View
                  style={{flex: 1, borderTopColor: 'grey', borderTopWidth: 4}}>
                  <View>
                    <Text style={{textAlign: 'center', color: '#ff4747'}} h3>
                      {'Order #' + this.state.commande.id}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}
                      h5>
                      <Text style={{color: 'black'}}>Status: </Text>{' '}
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color:
                            this.state.commande.status === 'pending'
                              ? 'orange'
                              : this.state.commande.status === 'accepted'
                              ? '#76f576'
                              : 'red',
                        }}>
                        {this.state.commande.status}
                      </Text>
                    </Text>
                    {(this.state.commande.status === 'pending' ||
                      this.state.commande.status === 'rejected') && (
                      <Button
                        buttonStyle={{
                          paddingHorizontal: 10,
                          paddingVertical: 0,
                          marginTop: 10,
                          marginHorizontal: 10,
                          backgroundColor:
                            this.state.commande.status === 'pending'
                              ? 'orange'
                              : 'red',
                        }}
                        titleStyle={{color: 'white', fontSize: 12}}
                        title={
                          this.state.commande.status === 'pending'
                            ? 'This order is in pending. It has to be approved by a supervisor yet.'
                            : 'This order has been rejected.'
                        }></Button>
                    )}
                  </View>
                  <View style={{flexDirection: 'row', margin: 10}}>
                    <FontAwesome5
                      solid
                      style={{
                        textAlignVertical: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      name="clock"
                    />
                    <Text style={{fontSize: 17}}>
                      Created at :{' '}
                      {moment(this.state.commande.DateCreation).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 10,
                    }}>
                    <FontAwesome5
                      solid
                      style={{
                        textAlignVertical: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      name="user"
                    />
                    <Text style={{fontSize: 17}}>
                      Client: {this.state.commande.RaisonSociale}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 20,
                    }}>
                    <FontAwesome5
                      solid
                      style={{
                        textAlignVertical: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                      name="globe"
                    />
                    <Text style={{fontSize: 17}}>
                      GPS:{' '}
                      {'N: ' +
                        this.state.commande.ZoneN4 +
                        ' / E: ' +
                        this.state.commande.ZoneN5}
                    </Text>
                  </View>
                  <View style={{flex: 0.8}}>
                    <FlatList
                      keyExtractor={item => item.Code_Article.toString()}
                      data={this.state.composition}
                      sty
                      renderItem={({item}) => (
                        <ListItem
                          rightElement={
                            item.statusArticle === 'deleted' ? (
                              <Text
                                style={{color: 'white', fontWeight: 'bold'}}>
                                DELETED
                              </Text>
                            ) : (
                              <View>
                                <Text
                                  style={{
                                    color:
                                      item.QuantiteInitiale != item.Quantite &&
                                      'white',
                                  }}>
                                  {Math.round(
                                    item.Quantite * item.PrixUnitaire * 100,
                                  ) / 100}{' '}
                                  LYD
                                </Text>

                                {item.Quantite != item.QuantiteInitiale && (
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 11,
                                      fontWeight: 'bold',
                                    }}>
                                    Modified
                                  </Text>
                                )}
                              </View>
                            )
                          }
                          key={item.Code_Article}
                          title={item.Designation}
                          titleStyle={{
                            color:
                              item.statusArticle === 'deleted' ||
                              item.Quantite != item.QuantiteInitiale
                                ? 'white'
                                : 'black',
                          }}
                          containerStyle={{
                            backgroundColor:
                              item.statusArticle === 'deleted'
                                ? 'rgba(255, 71, 71, .3)'
                                : item.QuantiteInitiale != item.Quantite
                                ? '#ffb84d'
                                : '#f5f5f5',
                          }}
                          subtitle={
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color:
                                    (item.statusArticle === 'deleted' ||
                                      item.QuantiteInitiale != item.Quantite) &&
                                    'white',
                                }}>
                                Quantity:{' '}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color:
                                    (item.statusArticle === 'deleted' ||
                                      item.Quantite != item.QuantiteInitiale) &&
                                    'white',
                                  textDecorationLine:
                                    item.Quantite != item.QuantiteInitiale
                                      ? 'line-through'
                                      : 'none',
                                }}>
                                {item.Quantite != item.QuantiteInitiale
                                  ? item.QuantiteInitiale
                                  : item.Quantite}
                              </Text>
                              {item.Quantite != item.QuantiteInitiale && (
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                  }}>
                                  {' ' + item.Quantite}
                                </Text>
                              )}
                            </View>
                          }
                        />
                      )}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text h4>Total amount : </Text>

                    <Text h4>
                      {' ' +
                        Math.round(this.state.commande.MontantAcompte * 100) /
                          100 +
                        ' LYD'}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
        <BottomMessage emitter={this._emitter} />
      </>
    );
  }
}

ViewOrder.propTypes = {
  navigation: PropTypes.any,
};
