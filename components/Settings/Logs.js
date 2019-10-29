import React, {Component} from 'react';

import {View, Text, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {ScrollView, FlatList} from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import PropTypes from 'prop-types';

class Logs extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      headerTitle: 'Logs',
      headerRight: (
        <FontAwesome5
          style={{marginRight: 20}}
          color="#FF4747"
          name="paper-plane"
          solid
          size={30}
          onPress={() =>
            Linking.openURL(
              'mailto:support@example.com?subject=SendMail&body=' +
                JSON.stringify(params.logs),
            )
          }
          title="support@example.com"
        />
      ),
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      logs: null,
    };
  }

  async componentDidMount() {
    const errors = await AsyncStorage.getItem('logs');
    this.setState(
      {logs: JSON.parse(errors).reverse(), isLoading: false},
      () => {
        this.props.navigation.setParams({logs: this.state.logs});
      },
    );
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
    ) : !this.state.logs ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No errors yet!</Text>
      </View>
    ) : (
      <ScrollView>
        <FlatList
          keyExtractor={item => item.date}
          data={this.state.logs}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => (
            <ListItem
              titleStyle={{fontWeight: 'bold', color: '#FF4747'}}
              key={item.date}
              subtitle={
                <View>
                  <Text>{item.error}</Text>
                </View>
              }
              title={item.date}
            />
          )}
        />
      </ScrollView>
    );
  }
}

Logs.propTypes = {
  navigation: PropTypes.any,
};

export default Logs;
