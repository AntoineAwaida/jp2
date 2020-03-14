import React, {PureComponent} from 'react';

import {Text, Button, ListItem, CheckBox} from 'react-native-elements';

export default class CriteriaItem extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.criteriaSelected.some(i => i.Code === this.props.item.Code) !=
      nextProps.criteriaSelected.some(i => i.Code === nextProps.item.Code)
    );
  }
  render() {
    const {item, criteriaSelected} = this.props;
    const checked = criteriaSelected.some(i => i.Code === item.Code);

    return (
      <ListItem
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        containerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#D5D3D3',
          backgroundColor: checked ? '#FF4747' : 'white',
        }}
        titleStyle={{
          flex: 1,

          alignItems: 'center',
          justifyContent: 'center',

          textAlign: 'center',
        }}
        rightTitle={
          <CheckBox
            checkedColor="white"
            onPress={() => this.props.selectCriteria(item)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked}
          />
        }
        title={
          <Text style={{color: checked ? 'white' : 'grey'}}>
            {item.Libelle}
          </Text>
        }
        key={item.Code}
      />
    );
  }
}
