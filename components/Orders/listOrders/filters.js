import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import StatusFilter from './statusfilter';
import DatesFilter from './datesfilter';

export default class Filters extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toggle: null,
    };
  }

  render() {
    return (
      <View style={{borderBottomWidth: 2, borderColor: '#b5bdb5'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onLongPress={() => this.props.resetStatus()}
            onPress={() =>
              this.setState({
                toggle: this.state.toggle === 'status' ? null : 'status',
              })
            }
            style={{
              flex: 1,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                this.state.toggle === 'status' ? '#ff4747' : '#d5d3d3',
              borderRightWidth: 1,
              borderRightColor: 'white',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onLongPress={() => this.props.resetDates()}
            onPress={() =>
              this.setState({
                toggle: this.state.toggle === 'dates' ? null : 'dates',
              })
            }
            style={{
              flex: 1,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                this.state.toggle === 'dates' ? '#ff4747' : '#d5d3d3',
              borderLeftWidth: 1,
              borderLeftColor: 'white',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Dates</Text>
          </TouchableOpacity>
        </View>
        {this.state.toggle === 'status' ? (
          <StatusFilter {...this.props} />
        ) : this.state.toggle === 'dates' ? (
          <DatesFilter {...this.props}></DatesFilter>
        ) : null}
      </View>
    );
  }
}
