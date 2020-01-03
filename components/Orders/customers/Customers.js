import React, {Component} from 'react';

import {View, FlatList} from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';

import PropTypes from 'prop-types';

import {ActivityIndicator} from 'react-native-paper';

import logError from '../../Settings/logError';

import get_clients from '../../../requests/get_clients';

class Customers extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      matchingCustomers: [],
      isLoading: false,
      search: null,
    };
    this.tiemout = 0;
  }

  selectCustomer(customer) {
    this.props.emitter.emit('customerSelected');
    this.props.selectCustomer(customer);
  }

  getCustomers(text) {
    this.setState({search: text});
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (text.length > 1) {
        const searchtext = text.replace(/'/g, '&quot;');
        this.setState({isLoading: true}, () => {
          get_clients(searchtext)
            .then(result => {
              this.setState({matchingCustomers: result, isLoading: false});
            })
            .catch(err => {
              this.setState({isLoading: false});
              this.props.emitter.emit('trigger-message', {
                error: true,
                message: err.message,
              });

              logError(err);
            });
        });
      } else {
        this.setState({matchingCustomers: []});
      }
    }, 400);
  }

  render() {
    return (
      <>
        <View style={{flex: 1}}>
          <SearchBar
            inputContainerStyle={{backgroundColor: 'white', borderRadius: 15}}
            containerStyle={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
            }}
            placeholder="Search..."
            onChangeText={text => this.getCustomers(text)}
            value={this.state.search}
            showLoading={this.state.isLoading}
          />

          <View style={{justifyContent: 'center'}}>
            {this.state.isLoading ? (
              <ActivityIndicator size="large" color="#FF4747" />
            ) : (
              <FlatList
                keyExtractor={item => item.Code_Client}
                data={this.state.matchingCustomers}
                renderItem={({item, index}) => (
                  <ListItem
                    containerStyle={{
                      borderTopLeftRadius: index === 0 ? 10 : 0,
                      borderTopRightRadius: index === 0 ? 10 : 0,
                      borderBottomLeftRadius:
                        index === this.state.matchingCustomers.length - 1
                          ? 10
                          : 0,
                      borderBottomRightRadius:
                        index === this.state.matchingCustomers.length - 1
                          ? 10
                          : 0,
                      backgroundColor: 'white',
                      marginHorizontal: 10,
                    }}
                    titleStyle={{textAlign: 'center', color: '#FF4747'}}
                    subtitleStyle={{textAlign: 'center'}}
                    subtitle={
                      item.solde !== null
                        ? 'Balance : ' + item.solde + ' LYD'
                        : ''
                    }
                    key={item.Code_Client}
                    title={item.RaisonSociale}
                    onPress={() => this.selectCustomer(item)}
                  />
                )}
              />
            )}
          </View>
        </View>
      </>
    );
  }
}

Customers.propTypes = {
  selectCustomer: PropTypes.any,
  emitter: PropTypes.any,
};

export default Customers;
