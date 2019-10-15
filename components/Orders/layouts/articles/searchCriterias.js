import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Picker} from 'react-native';
import {Divider} from 'react-native-elements';
import CriteriaModal from '../../modals/CriteriaModal';

export default class SearchCriterias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySelect: false,
    };
  }

  selectCriteria(criteria) {
    this.state.displaySelect === criteria
      ? this.setState({displaySelect: false})
      : this.setState({displaySelect: criteria});
  }

  cancelCriteria(criteria) {
    this.props.ee.emit('criteriaSelected', {
      type: criteria,
      content: [],
    });
  }

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'white',
            borderBottomWidth: 2,
            borderBottomColor: '#D5D3D3',

            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: !this.state.displaySelect ? 10 : 0,
            borderBottomLeftRadius: !this.state.displaySelect ? 10 : 0,
          }}>
          <View
            style={{
              backgroundColor:
                this.state.displaySelect === 'famille' ? '#ff4747' : 'white',
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderRightColor:
                this.state.displaySelect === 'famille' ? 'white' : '#D5D3D3',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: !this.state.displaySelect ? 10 : 0,
              padding: 5,
            }}>
            <TouchableOpacity
              onLongPress={() => {
                this.state.displaySelect !== 'famille' &&
                  this.cancelCriteria('famille');
              }}
              onPress={() => {
                this.selectCriteria('famille');
              }}>
              <Text
                style={{
                  color:
                    this.state.displaySelect === 'famille' ? 'white' : 'grey',
                }}>
                Family{' '}
                {this.props.criterias.famille.length > 0 &&
                  '(' + this.props.criterias.famille.length + ')'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor:
                this.state.displaySelect === 'sous_famille'
                  ? '#ff4747'
                  : 'white',
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderRightColor:
                this.state.displaySelect === 'sous_famille'
                  ? 'white'
                  : '#D5D3D3',
            }}>
            <TouchableOpacity
              onLongPress={() => {
                this.state.displaySelect !== 'sous_famille' &&
                  this.cancelCriteria('sous_famille');
              }}
              onPress={() => {
                this.selectCriteria('sous_famille');
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color:
                    this.state.displaySelect === 'sous_famille'
                      ? 'white'
                      : 'grey',
                }}>
                Sub-family{' '}
                {this.props.criterias.sous_famille.length > 0 &&
                  '(' + this.props.criterias.sous_famille.length + ')'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor:
                this.state.displaySelect === 'gamme' ? '#ff4747' : 'white',
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderRightColor:
                this.state.displaySelect === 'gamme' ? 'white' : '#D5D3D3',
              padding: 5,
            }}>
            <TouchableOpacity
              onLongPress={() => {
                this.state.displaySelect !== 'gamme' &&
                  this.cancelCriteria('gamme');
              }}
              onPress={() => {
                this.selectCriteria('gamme');
              }}>
              <Text
                style={{
                  color:
                    this.state.displaySelect === 'gamme' ? 'white' : 'grey',
                }}>
                Gamme{' '}
                {this.props.criterias.gamme.length > 0 &&
                  '(' + this.props.criterias.gamme.length + ')'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor:
                this.state.displaySelect === 'qualite' ? '#ff4747' : 'white',
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomRightRadius: !this.state.displaySelect ? 10 : 0,
              borderTopRightRadius: 10,
              padding: 5,
            }}>
            <TouchableOpacity
              onLongPress={() => {
                this.state.displaySelect !== 'qualite' &&
                  this.cancelCriteria('qualite');
              }}
              onPress={() => {
                this.selectCriteria('qualite');
              }}>
              <Text
                style={{
                  color:
                    this.state.displaySelect === 'qualite' ? 'white' : 'grey',
                }}>
                Quality{' '}
                {this.props.criterias.qualite.length > 0 &&
                  '(' + this.props.criterias.qualite.length + ')'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.displaySelect && (
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: 'white',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 150,
              flex: 1,
            }}>
            <CriteriaModal
              criteria={this.props.criterias}
              criteriaSelected={this.state.displaySelect}
              ee={this.props.ee}></CriteriaModal>
          </View>
        )}
      </View>
    );
  }
}
