import React, {Component} from 'react';
import {CheckBox, ListItem, Text} from 'react-native-elements';

export default class SelectAllItem extends Component {
  render() {
    const {criteriaSelected, criteria} = this.props;

    const allSelected = criteriaSelected.length === criteria.length;
    return (
      <ListItem
        contentContainerStyle={{
          flex: 1,
        }}
        containerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          paddingLeft: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#D5D3D3',
          //   backgroundColor: checked ? '#FF4747' : 'white',
        }}
        // titleStyle={{
        //   flex: 1,

        //   alignItems: 'center',
        //   justifyContent: 'center',

        //   textAlign: 'center',
        // }}
        rightTitle={
          <CheckBox
            checkedColor="red"
            onPress={() => this.props.selectCriteria()}
            checkedIcon="square"
            uncheckedIcon="square-o"
            checked={allSelected}
          />
        }
        title={
          <Text style={{color: 'grey', fontSize: 15}}>
            {allSelected ? 'Unselect all' : 'Select all'}
          </Text>
        }
        // key={item.Code}
      />
    );
  }
}
