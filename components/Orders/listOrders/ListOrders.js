import React, {Component} from 'react';

import {View, Text} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements';

import PropTypes from 'prop-types';
import logError from '../../Settings/logError';
import get_orders from '../../../requests/get_orders';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Filters from './filters';
import moment from 'moment';

export default class ListOrders extends Component {
  static navigationOptions = {
    headerTitle: 'Orders History',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      commandes: null,
      filters: {
        status: [],
        dates: [
          moment()
            .subtract(30, 'days')
            .format('YYYYMMDD'),
          moment()
            .add(1, 'day')
            .format('YYYYMMDD'),
        ],
      },
    };
    this.setStatusFilters = this.setStatusFilters.bind(this);
    this.setDatesFilters = this.setDatesFilters.bind(this);
    this.resetDates = this.resetDates.bind(this);
    this.resetStatus = this.resetStatus.bind(this);
  }

  setStatusFilters(status) {
    this.setState(
      {
        isLoading: true,
        commandes: null,
        filters: {...this.state.filters, status},
      },
      () => {
        this.getCommandes(this.state.filters.status, this.state.filters.dates);
      },
    );
  }
  setDatesFilters(dates) {
    this.setState(
      {
        isLoading: true,
        commandes: null,
        filters: {
          ...this.state.filters,
          dates: [
            moment(dates[0]).format('YYYYMMDD'),
            moment(dates[1]).format('YYYYMMDD'),
          ],
        },
      },
      () => {
        this.getCommandes(this.state.filters.status, this.state.filters.dates);
      },
    );
  }

  resetDates() {
    this.setState(
      {
        isLoading: true,
        commandes: null,
        filters: {...this.state.filters, dates: []},
      },
      () => {
        this.getCommandes(this.state.filters.status, this.state.filters.dates);
      },
    );
  }

  resetStatus() {
    this.setState(
      {
        isLoading: true,
        commandes: null,
        filters: {...this.state.filters, status: []},
      },
      () => {
        this.getCommandes(this.state.filters.status, this.state.filters.dates);
      },
    );
  }

  getCommandes(status, dates) {
    get_orders(status, dates)
      .then(res => {
        this.setState({commandes: res, isLoading: false});
      })
      .catch(err => {
        logError(err);
        console.log(err);
        this.setState({isLoading: false});
      });
  }

  componentDidMount() {
    this.getCommandes(this.state.filters.status, this.state.filters.dates);
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render() {
    return (
      <ScrollView>
        <Filters
          filters={this.state.filters}
          setStatusFilters={this.setStatusFilters}
          setDatesFilters={this.setDatesFilters}
          resetDates={this.resetDates}
          resetStatus={this.resetStatus}
        />
        {this.state.isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <ActivityIndicator size='large' color='#FF4747' />
          </View>
        ) : !this.state.commandes ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Unable to get orders. Please check your connection.</Text>
          </View>
        ) : this.state.commandes.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No orders yet.</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={this.state.commandes}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => (
              <ListItem
                leftElement={
                  <FontAwesome5Icon
                    size={30}
                    color='#D5D3D3'
                    name='chevron-right'></FontAwesome5Icon>
                }
                onPress={() =>
                  this.props.navigation.navigate('ViewOrder', {
                    Code_Commande: item.id,
                    save: false,
                  })
                }
                titleStyle={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: '#ff4747',
                }}
                key={item.id}
                subtitle={
                  <View>
                    <Text style={{textAlign: 'right'}}>
                      {item.MontantAcompte + ' LYD'}
                    </Text>
                    <Text style={{textAlign: 'right'}}>
                      {item.RaisonSociale}
                    </Text>
                    <Text style={{textAlign: 'right'}}>
                      {item.DateCreation.toString()}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'right',
                        fontWeight: 'bold',
                        color:
                          item.status === 'pending'
                            ? '#ffb84d'
                            : item.status === 'rejected'
                            ? 'red'
                            : '#76f576',
                      }}>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </Text>
                  </View>
                }
                title={'Order #' + item.id}
              />
            )}
          />
        )}
      </ScrollView>
    );
  }
}

ListOrders.propTypes = {
  navigation: PropTypes.any,
};
