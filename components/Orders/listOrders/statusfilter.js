import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, CheckBox} from 'react-native-elements';

export default class StatusFilter extends Component {
  render() {
    const {filters, setStatusFilters} = this.props;
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            flex: 1,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 5,
            }}>
            <CheckBox
              onPress={() => {
                setStatusFilters(
                  filters.status.includes('pending')
                    ? filters.status.filter(e => {
                        return e !== 'pending';
                      })
                    : [...filters.status, 'pending'],
                );
              }}
              center
              containerStyle={{
                backgroundColor: filters.status.includes('pending')
                  ? '#ffb84d'
                  : '#d5d3d3',
                borderWidth: 0,
                borderRadius: 5,
              }}
              checkedColor="white"
              uncheckedColor="white"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={filters.status.includes('pending')}
              title="Pending"
              textStyle={{padding: 0, color: 'white'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,

              borderRadius: 5,
            }}>
            <CheckBox
              onPress={() => {
                setStatusFilters(
                  filters.status.includes('accepted')
                    ? filters.status.filter(e => {
                        return e !== 'accepted';
                      })
                    : [...filters.status, 'accepted'],
                );
              }}
              center
              containerStyle={{
                backgroundColor: filters.status.includes('accepted')
                  ? '#76f576'
                  : '#d5d3d3',
                borderWidth: 0,
                borderRadius: 5,
              }}
              checkedColor="white"
              uncheckedColor="white"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={filters.status.includes('accepted')}
              title="Accepted"
              textStyle={{padding: 0, color: 'white'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,

              borderRadius: 5,
            }}>
            <CheckBox
              onPress={() => {
                setStatusFilters(
                  filters.status.includes('rejected')
                    ? filters.status.filter(e => {
                        return e !== 'rejected';
                      })
                    : [...filters.status, 'rejected'],
                );
              }}
              center
              containerStyle={{
                backgroundColor: filters.status.includes('rejected')
                  ? '#ff4747'
                  : '#d5d3d3',
                borderWidth: 0,
                borderRadius: 5,
              }}
              checkedColor="white"
              uncheckedColor="white"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={filters.status.includes('rejected')}
              title="Rejected"
              textStyle={{padding: 0, color: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
