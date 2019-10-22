import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {DB} from '../../../database/database';
import {ActivityIndicator} from 'react-native-paper';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements';

import PropTypes from 'prop-types';
import logError from '../../Settings/logError';
import get_orders from '../../../requests/get_orders';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class ListOrders extends Component {
  static navigationOptions = {
    headerTitle: 'Orders History',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      commandes: null,
    };
  }

  getCommandes() {
    get_orders()
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
    this.getCommandes();
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
    console.log(this.state.commandes);
    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#FF4747" />
      </View>
    ) : this.state.commandes.length === 0 ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No orders yet.</Text>
      </View>
    ) : (
      <ScrollView>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={this.state.commandes.reverse()}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => (
            <ListItem
              leftElement={
                <FontAwesome5Icon
                  size={30}
                  color="#D5D3D3"
                  name="chevron-right"></FontAwesome5Icon>
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
                    {item.MontantAcompte + ' $'}
                  </Text>
                  <Text style={{textAlign: 'right'}}>{item.RaisonSociale}</Text>
                  <Text style={{textAlign: 'right'}}>
                    {item.DateCreation.toString()}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: item.status === 'pending' ? 'orange' : 'green',
                    }}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              }
              title={'Order #' + item.id}
            />
          )}
        />
      </ScrollView>
    );
  }
}

ListOrders.propTypes = {
  navigation: PropTypes.any,
};
