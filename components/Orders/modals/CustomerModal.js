import React, { Component } from "react";
import Modal from "react-native-modal";

import { View, Text } from "react-native";
import { SearchBar, ListItem, Button } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

import PropTypes from "prop-types";
import { DB } from "../../../database/database";
import { ActivityIndicator } from "react-native-paper";
import logError from "../../Settings/logError";

class CustomerModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      matchingCustomers: [],
      isLoading: false,
      search: null
    };
  }

  getCustomers(text) {
    this.setState({ isLoading: true, search: text }, () => {
      DB.getDatabase()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM CLIENT WHERE RaisonSociale LIKE '%${text}%'`,
              [],
              (tx, results) => {
                let data = [];
                for (let i = 0; i < results.rows.length; i++) {
                  data.push(results.rows.item(i));
                }
                this.setState({ matchingCustomers: data, isLoading: false });
              }
            );
          });
        })
        .catch(err => {
          logError(err);
        });
    });
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <View
          style={{
            flex: 0.7,
            backgroundColor: "white",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
          }}
        >
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            Search for a customer
          </Text>
          <SearchBar
            lightTheme
            round
            placeholder="Search..."
            onChangeText={text => this.getCustomers(text)}
            value={this.state.search}
            showLoading={this.state.isLoading}
          />

          <View style={{ flex: 0.9, justifyContent: "center" }}>
            {this.state.isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <FlatList
                keyExtractor={item => item.Code_Client}
                data={this.state.matchingCustomers}
                renderItem={({ item }) => (
                  <ListItem
                    onPress={() => {
                      this.props.toggleCustomerModal(item);
                    }}
                    key={item.Code_Client}
                    title={item.RaisonSociale}
                  />
                )}
              />
            )}
          </View>
        </View>

        <Button
          title="Close"
          onPress={() => this.props.toggleCustomerModal()}
        />
      </Modal>
    );
  }
}

CustomerModal.propTypes = {
  isVisible: PropTypes.bool,
  toggleCustomerModal: PropTypes.func
};

export default CustomerModal;
