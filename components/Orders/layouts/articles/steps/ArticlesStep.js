import React, {Component} from 'react';
import CriteriaModal from '../../../modals/Criterias/CriteriaModal';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class ArticlesStep extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      hasResults: false,
    };
    this.setLoading = this.setLoading.bind(this);
    this.hasResults = this.hasResults.bind(this);
  }

  previousStep() {
    this.props.step > 0 && this.setLoading(true);
    this.props.previousStep();
  }

  hasNoCriteriaSelected(criterias) {
    if (this.props.step === 0) {
      if (criterias['famille'].length === 0) return true;
    }
    if (this.props.step === 1) {
      if (criterias['sous_famille'].length === 0) return true;
    }
    if (this.props.step === 2) {
      if (criterias['gamme'].length === 0) return true;
    }
    if (this.props.step === 3) {
      if (criterias['qualite'].length === 0) return true;
    }
    return false;
  }

  setLoading(status) {
    this.setState({isLoading: status});
  }
  hasResults(status) {
    this.setState({hasResults: status});
  }

  nextStep() {
    this.setLoading(true);
    this.props.setStep(this.props.step + 1);
  }
  render() {
    const {step} = this.props;
    return (
      <>
        <View style={{flex: 0.8}}>
          <CriteriaModal
            setLoading={this.setLoading}
            hasResults={this.hasResults}
            criteria={this.props.criterias}
            criteriaSelected={
              step === 0
                ? 'famille'
                : step === 1
                ? 'sous_famille'
                : step === 2
                ? 'gamme'
                : 'qualite'
            }
            ee={this.props.ee}></CriteriaModal>
        </View>

        <View
          style={{
            flex: 0.1,

            flexDirection: 'row',
            marginRight: 10,
          }}>
          <View style={{flex: 0.5, alignItems: 'center'}}>
            <Button
              disabled={this.state.isLoading}
              mode="contained"
              style={{
                borderColor: this.state.isLoading ? '#D5D3D3' : '#FF4747',
                borderWidth: 2,
                borderRadius: 15,
              }}
              color={this.state.isLoading ? '#D5D3D3' : '#FF4747'}
              onPress={() => this.previousStep()}>
              <FontAwesome5
                name="undo"
                color={this.state.isLoading ? '#D5D3D3' : 'white'}
                size={15}
              />
              {'  '}
              Back
            </Button>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Button
              disabled={
                this.state.isLoading ||
                !this.state.hasResults ||
                this.hasNoCriteriaSelected(this.props.criterias)
              }
              mode="outlined"
              style={{
                borderColor:
                  this.state.isLoading ||
                  !this.state.hasResults ||
                  this.hasNoCriteriaSelected(this.props.criterias)
                    ? '#D5D3D3'
                    : '#FF4747',
                borderWidth: 2,
                borderRadius: 15,
              }}
              color={
                this.state.isLoading ||
                !this.state.hasResults ||
                this.hasNoCriteriaSelected(this.props.criterias)
                  ? '#D5D3D3'
                  : '#FF4747'
              }
              onPress={() => this.nextStep()}>
              <FontAwesome5
                name="chevron-right"
                color={
                  this.state.isLoading ||
                  !this.state.hasResults ||
                  this.hasNoCriteriaSelected(this.props.criterias)
                    ? '#D5D3D3'
                    : '#FF4747'
                }
                size={15}
              />
              {'  '}
              Next step
            </Button>
          </View>
        </View>
      </>
    );
  }
}
