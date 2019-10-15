import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {DB} from '../../../database/database';
import {ActivityIndicator} from 'react-native-paper';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements';

import PropTypes from 'prop-types';
import logError from '../../Settings/logError';

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

  componentDidMount() {
    DB.getDatabase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT p.DateCreation, p.Code_Commande,p.MontantAcompte, c.RaisonSociale FROM pct_COMMANDE AS p JOIN CLIENT AS c ON p.Code_Client = c.Code_Client`,
            [],
            (tx, results) => {
              let data = [];
              for (let i = 0; i < results.rows.length; i++) {
                data.push(results.rows.item(i));
              }
              this.setState({commandes: data, isLoading: false});
            },
          );
        });
      })
      .catch(err => {
        logError(err);
      });
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
          keyExtractor={item => item.Code_Commande.toString()}
          data={this.state.commandes.reverse()}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => (
            <ListItem
              onPress={() =>
                this.props.navigation.navigate('ViewOrder', {
                  Code_Commande: item.Code_Commande,
                })
              }
              titleStyle={{fontWeight: 'bold', color: '#571db2'}}
              key={item.Code_Commande}
              subtitle={
                <View>
                  <Text>{item.MontantAcompte}</Text>
                  <Text style={{textAlign: 'right'}}>{item.RaisonSociale}</Text>
                  <Text>{item.DateCreation.toString()}</Text>
                </View>
              }
              title={'Order #' + item.Code_Commande}
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
