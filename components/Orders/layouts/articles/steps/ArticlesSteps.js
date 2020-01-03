import React, {Component} from 'react';
import ArticlesStep from './ArticlesStep';
import {View, Text} from 'react-native';
import StepIndicator from './StepIndicator';

export default class ArticlesSteps extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1, borderRadius: 10}}>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <StepIndicator step={this.props.step}></StepIndicator>
        </View>
        <ArticlesStep {...this.props}></ArticlesStep>
      </View>
    );
  }
}
