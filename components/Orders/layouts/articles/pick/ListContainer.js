import React, {Component} from 'react';

import {Button as ButtonMaterial} from 'react-native-paper';
import {View} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';
import {Button} from 'react-native-elements';
import List from './List';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class ListContainer extends Component {
  render() {
    return !this.props.isLoading ? (
      this.props.failure ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            flex: 1,
          }}>
          <ButtonMaterial
            mode="outlined"
            mode="outlined"
            style={{
              borderColor: '#FF4747',
              borderWidth: 2,
              borderRadius: 15,
            }}
            color="#FF4747"
            onPress={() => this.props.getArticles()}>
            <FontAwesome5Icon name="redo" color="#FF4747" size={15} />
            {'  '}
            Press to retry
          </ButtonMaterial>
        </View>
      ) : this.props.availableArticles.length > 0 ? (
        <View style={{flex: 1}}>
          {/* {this.state.availableArticles.length >= 100 && (
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Button
                        buttonStyle={{
                          paddingHorizontal: 10,
                          paddingVertical: 0,
                          marginTop: 10,
                          marginHorizontal: 10,
                          backgroundColor: 'red',
                        }}
                        titleStyle={{color: 'white', fontSize: 12}}
                        title="More than 100 results. Please refine your search."></Button>
                    </View>
                  )} */}

          <List {...this.props}></List>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Button
            buttonStyle={{
              paddingHorizontal: 10,
              paddingVertical: 0,
              margin: 10,
              marginTop: 40,
              backgroundColor: '#D5D3D3',
            }}
            titleStyle={{color: 'white', fontSize: 12}}
            title={this.props.resultmsg}></Button>
        </View>
      )
    ) : (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          flex: 1,
        }}>
        <ActivityIndicator size="large" color="#FF4747" />
      </View>
    );
  }
}
