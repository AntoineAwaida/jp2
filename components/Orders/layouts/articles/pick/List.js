import React, {Component} from 'react';
import {
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import _ from 'lodash';
import get_price from '../../../../../requests/get_price';
import ArticleItem from './ArticleItem';
import logError from '../../../../Settings/logError';

export default class List extends Component {
  constructor(props, context) {
    super(props, context);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
  }
  async addArticle(article, e) {
    try {
      this.props.ee.emit('addingArticle');
      const quantity = parseFloat(e.nativeEvent.text.replace(/,/, '.'));
      if (!isNaN(quantity)) {
        const price = await get_price(article, quantity);
        parseFloat(e) != 0
          ? this.props.addArticle({
              ...article,
              quantity,
              price,
            })
          : this.props.removeArticle(article);
      } else {
        this.props.ee.emit('articleAdded');
      }
    } catch (error) {
      logError(error);

      this.props.ee.emit('articleAdded');

      this.setState(
        {
          message:
            'Unable to reach database. Please press Cancel and try again.',
        },
        () => {
          setTimeout(() => {
            this.setState({message: null});
          }, 2000);
        },
      );
      //afficher erreur
    }
  }

  removeArticle(item) {
    Alert.alert(
      'Delete this article?',
      'Are you sure you want to remove this article?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.removeArticle(item);
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <FlatList
        nestedScrollEnabled={true}
        contentContainerStyle={{
          overflow: 'hidden',
          borderRadius: 12,
        }}
        data={this.props.availableArticles}
        keyExtractor={item => item.Code_Article}
        renderItem={({item}) => (
          // <ListItem
          //   // containerStyle={{backgroundColor: 'red', margin: 10}}
          //   title={item.Designation}>
          /* <View
          style={[
            styles.article,
            {
              opacity: _.find(this.props.articles, item)
                ? 0.3
                : 1,
             
            },
          ]}> */
          <ArticleItem
            addItem={this.addArticle}
            removeItem={this.removeArticle}
            item={item}
            {...this.props}></ArticleItem>
        )}
      />
    );
  }
}
