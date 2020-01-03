import React, {Component} from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, Button} from 'react-native-elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PropTypes from 'prop-types';

class SelectedCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
    };
  }

  componentDidMount() {
    this.props.emitter.on('searchingArticles', () => {
      this.setState({searching: true});
    });
    this.props.emitter.on('articlesSearched', () => {
      this.setState({searching: false});
    });
  }

  render() {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            backgroundColor: '#D5D3D3',
            borderRadius: 20,
            flexDirection: 'row',
            flex: 1,
          }}>
          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5
                name="user"
                style={style.textColor}
                size={15}
                solid
              />
              <Text
                h5
                style={[{marginLeft: 5, fontWeight: 'bold'}, style.textColor]}>
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
              <Text style={[{marginLeft: 5, fontSize: 12}, style.textColor]}>
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
              <Text style={[{marginLeft: 5, fontSize: 12}, style.textColor]}>
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
              <FontAwesome5
                name="times-circle"
                solid
                color="#ff4747"
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{flex: 0.4, justifyContent: 'center', alignItems: 'flex-end'}}>
          <Button
            onPress={() => {
              this.props.emitter.emit('resetCriteria');
            }}
            icon={
              <FontAwesome5
                name="sync-alt"
                solid
                color="white"
                size={12}></FontAwesome5>
            }
            title="   Reset filters"
            buttonStyle={{
              backgroundColor: '#d5d3d3',
              borderRadius: 20,
              padding: 5,
              marginBottom: 3,
            }}></Button>
          <Button
            disabled={this.state.searching}
            loading={this.state.searching}
            onPress={() => {
              this.props.emitter.emit('searchArticles');
            }}
            icon={
              <FontAwesome5
                name="search"
                solid
                color="white"
                size={12}></FontAwesome5>
            }
            title="       Search     "
            buttonStyle={{
              backgroundColor: '#ff4747',
              borderRadius: 20,
              padding: 5,
              marginTop: 3,
            }}></Button>
        </View> */}
      </View>
    );
  }
}

const style = StyleSheet.create({
  textColor: {
    color: 'white',
  },
});

SelectedCustomer.propTypes = {
  cancelCustomer: PropTypes.func,
  customer: PropTypes.object,
};

export default SelectedCustomer;
