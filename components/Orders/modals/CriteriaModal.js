import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, Button, ListItem, CheckBox} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import get_family from '../../../requests/criterias/get_family';
import get_sousfamille from '../../../requests/criterias/get_sousfamille';
import get_gamme from '../../../requests/criterias/get_gamme';
import get_qualite from '../../../requests/criterias/get_qualite';
import logError from '../../Settings/logError';

export default class CriteriaModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: null,
      isLoading: true,
      criteriaSelected: this.props.criteria[this.props.criteriaSelected],
    };
  }

  getData() {
    this.setState({
      isLoading: true,
      criteriaSelected: this.props.criteria[this.props.criteriaSelected],
    });
    let get;

    console.log(this.props.criteriaSelected);

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
      get()
        .then(res => {
          this.setState({criteria: res, isLoading: false});
        })
        .catch(e => {
          logError(e);
          console.log(e);
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
        ) : (
          <View style={{flex: 1, justifyContent: 'center', padding: 5}}>
            <FlatList
              nestedScrollEnabled={true}
              contentContainerStyle={{
                display: 'flex',
                justifyContent: 'center',
              }}
              data={this.state.criteria}
              keyExtractor={item => item.Code}
              renderItem={({item}) => (
                <ListItem
                  containerStyle={{
                    padding: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D5D3D3',
                    backgroundColor: this.state.criteriaSelected.some(
                      i => i.Code === item.Code,
                    )
                      ? '#FF4747'
                      : 'white',
                  }}
                  titleStyle={{
                    flex: 1,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: this.state.criteriaSelected.some(
                      i => i.Code === item.Code,
                    )
                      ? 'white'
                      : 'grey',
                  }}
                  rightTitle={
                    <CheckBox
                      checkedColor="white"
                      onPress={() => this.selectCriteria(item)}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={this.state.criteriaSelected.some(
                        i => i.Code === item.Code,
                      )}
                    />
                  }
                  title={item.Libelle}
                  key={item.Code}
                />
              )}
            />
          </View>
        )}
      </View>
    );
  }
}
