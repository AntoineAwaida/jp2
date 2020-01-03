import Indicator from 'react-native-step-indicator';

import React, {Component} from 'react';

const labels = ['Family', 'Sub-family', 'Sub-sub', 'Sub-Sub-Sub'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#FF4747',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#FF4747',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#FF4747',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#FF4747',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#FF4747',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#FF4747',
};

export default class StepIndicator extends Component {
  render() {
    return (
      <Indicator
        stepCount={4}
        customStyles={customStyles}
        currentPosition={this.props.step}
        labels={labels}
      />
    );
  }
}
