import React, {Component} from 'react';
import Modal from 'react-native-modal';

import {Button as ButtonMaterial} from 'react-native-paper';
import {View, FlatList, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import get_family from '../../../../requests/criterias/get_family';
import get_sousfamille from '../../../../requests/criterias/get_sousfamille';
import get_gamme from '../../../../requests/criterias/get_gamme';
import get_qualite from '../../../../requests/criterias/get_qualite';
import logError from '../../../Settings/logError';
import CriteriaItem from './CriteriaItem';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SelectAllItem from './SelectAllItem';
import {ListItem} from 'react-native-elements';

export default class CriteriaModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: null,
      isLoading: true,
      criteriaSelected: this.props.criteria[this.props.criteriaSelected],
    };

    this.selectCriteria = this.selectCriteria.bind(this);
    this.selectAllCriterias = this.selectAllCriterias.bind(this);
  }

  getData() {
    this.setState({
      isLoading: true,
      failure: false,
      criteriaSelected: this.props.criteria[this.props.criteriaSelected],
    });
    let get;
    this.props.hasResults(false);
    this.props.setLoading(true);

    this.props.criteriaSelected === 'famille'
      ? (get = get_family)
      : this.props.criteriaSelected === 'sous_famille'
      ? (get = get_sousfamille)
      : this.props.criteriaSelected === 'gamme'
      ? (get = get_gamme)
      : this.props.criteriaSelected === 'qualite'
      ? (get = get_qualite)
      : null;

    get &&
      get(this.props.criteria)
        .then(res => {
          this.setState({criteria: res, isLoading: false}, () => {
            this.props.setLoading(false);
            res.length > 0 && this.props.hasResults(true);
          });
        })
        .catch(e => {
          this.props.setLoading(false);
          this.props.hasResults(false);
          this.setState({isLoading: false, failure: true});
          this.props.ee.emit('trigger-message', {
            error: true,
            message: e.message,
          });
          logError(e);
        });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    prevProps.criteriaSelected != this.props.criteriaSelected && this.getData();
  }

  selectCriteria(criteria) {
    this.state.criteriaSelected.some(c => c.Code === criteria.Code)
      ? this.setState(
          {
            criteriaSelected: this.state.criteriaSelected.filter(e => {
              return e.Code !== criteria.Code;
            }),
          },
          () => {
            this.criteriaSelected();
          },
        )
      : this.setState(
          {
            criteriaSelected: [...this.state.criteriaSelected, criteria],
          },
          () => {
            this.criteriaSelected();
          },
        );
  }

  selectAllCriterias() {
    this.state.criteriaSelected.length === this.state.criteria.length
      ? this.setState(
          {
            criteriaSelected: [],
          },
          () => {
            this.criteriaSelected();
          },
        )
      : this.setState(
          {
            criteriaSelected: this.state.criteria,
          },
          () => {
            this.criteriaSelected();
          },
        );
  }

  criteriaSelected() {
    this.props.ee.emit('criteriaSelected', {
      type: this.props.criteriaSelected,
      content: this.state.criteriaSelected,
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color="#FF4747"></ActivityIndicator>
        ) : this.state.failure ? (
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
              onPress={() => this.getData()}>
              <FontAwesome5Icon name="redo" color="#FF4747" size={15} />
              {'  '}
              Press to retry
            </ButtonMaterial>
          </View>
        ) : this.state.criteria.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            <Text>No results matching this criteria.</Text>
          </View>
        ) : (
          <View style={{flex: 1, justifyContent: 'center', padding: 5}}>
            <SelectAllItem
              criteriaSelected={this.state.criteriaSelected}
              criteria={this.state.criteria}
              selectCriteria={this.selectAllCriterias}></SelectAllItem>
            <FlatList
              contentContainerStyle={{
                display: 'flex',
                justifyContent: 'center',
              }}
              data={this.state.criteria}
              keyExtractor={item => item.Code}
              renderItem={({item}) => (
                <CriteriaItem
                  selectCriteria={this.selectCriteria}
                  criteriaSelected={this.state.criteriaSelected}
                  item={item}></CriteriaItem>
              )}
            />
          </View>
        )}
      </View>
    );
  }
}
