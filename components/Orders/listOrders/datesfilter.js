import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-elements';

import DatePicker from 'react-native-date-ranges';
import moment from 'moment';

export default class DatesFilter extends Component {
  customButton = onConfirm => (
    <Button
      onPress={onConfirm}
      buttonStyle={{backgroundColor: '#ff4747'}}
      title="    Close    "
    />
  );
  render() {
    return (
      <View
        style={{justifyContent: 'center', padding: 10, alignItems: 'center'}}>
        <DatePicker
          onConfirm={e => this.props.setDatesFilters([e.startDate, e.endDate])}
          customButton={this.customButton}
          markText="Select a range. 30 last days by default."
          customStyles={{
            placeholderText: {fontSize: 15, color: 'white'}, // placeHolder style
            headerStyle: {backgroundColor: '#ff4747'}, // title container style
            headerMarkTitle: {color: 'white'}, // title mark style
            headerDateTitle: {}, // title Date style
            contentInput: {}, //content text container style
            contentText: {color: 'white', fontSize: 15}, //after selected text Style
          }} // optional
          centerAlign // optional text will align center or not
          allowFontScaling={false} // optional
          placeholder={
            <>
              <Text style={{color: 'white', fontSize: 15}}>
                {this.props.filters.dates.length > 0
                  ? moment(this.props.filters.dates[0]).format('LL') +
                    ' -> ' +
                    moment(this.props.filters.dates[1]).format('LL')
                  : '    Select a range.'}
              </Text>
            </>
          }
          mode={'range'}
          style={{
            borderRadius: 5,
            backgroundColor: '#ff4747',
            maxWidth: 400,
            borderWidth: 0,
          }}
        />
      </View>
    );
  }
}
