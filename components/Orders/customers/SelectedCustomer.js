import React, {Component} from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Text} from 'react-native-elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PropTypes from 'prop-types';

class SelectedCustomer extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="user" style={style.textColor} size={30} solid />
            <Text h4 style={[{marginLeft: 5}, style.textColor]}>
              {this.props.customer.RaisonSociale}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5 style={style.textColor} name="phone" />
            <Text style={[{marginLeft: 5}, style.textColor]}>
              {this.props.customer.Telephone1}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5 style={style.textColor} name="truck-moving" />
            <Text style={[{marginLeft: 5}, style.textColor]}>
              {this.props.customer.AdrFacturation1}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this.props.cancelCustomer()}>
            <FontAwesome5 name="times-circle" solid color="red" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  textColor: {
    color: 'gray',
  },
});

SelectedCustomer.propTypes = {
  cancelCustomer: PropTypes.func,
  customer: PropTypes.object,
};

export default SelectedCustomer;
