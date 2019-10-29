import React, {Component} from 'react';

import {View, Text, Alert} from 'react-native';

import PropTypes from 'prop-types';
import {ListItem} from 'react-native-elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ActivityIndicator} from 'react-native-paper';
import BasketModal from '../../modals/BasketModal';
import {FlatList} from 'react-native-gesture-handler';

export default class ArticlesList extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Your order',
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      articles: null,
      isBasketModalVisible: false,
      article: null,
    };
  }

  componentDidMount() {
    this.setState({articles: this.props.navigation.state.params.articles});
  }

  toggleBasketModal(article) {
    if (article) {
      let new_articles = this.state.articles.map(a => {
        return a.Code_Article === article.Code_Article ? article : a;
      });
      this.setState(
        {
          isBasketModalVisible: !this.state.isBasketModalVisible,
          articles: new_articles,
        },
        () => {
          this.props.navigation.state.params.ee.emit(
            'editArticles',
            this.state.articles,
          );
        },
      );
    } else {
      this.setState({
        isBasketModalVisible: !this.state.isBasketModalVisible,
      });
    }
  }

  editArticle(article) {
    this.props.navigation.state.params.ee.emit('selectArticle', article);
    this.setState({article: article, isBasketModalVisible: true});
  }

  deleteArticle(article) {
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
            let articles = this.state.articles.filter(
              (item, j) => article !== item,
            );

            this.setState({articles: articles}, () => {
              this.props.navigation.state.params.ee.emit(
                'editArticles',
                articles,
              );
            });
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    const {articles} = this.state;

    return articles ? (
      <>
        <BasketModal
          article={this.state.article}
          isVisible={this.state.isBasketModalVisible}
          ee={this.props.navigation.state.params.ee}
          toggleBasketModal={e => this.toggleBasketModal(e)}
        />

        <View>
          {articles.length === 0 ? (
            <Text>Select articles in the list.</Text>
          ) : (
            <View>
              <FlatList
                keyExtractor={item => item.Code_Article}
                data={articles}
                renderItem={({item}) => (
                  <ListItem
                    key={item.Code_Article}
                    title={item.Designation}
                    subtitle={
                      'Quantity: ' +
                      item.quantity +
                      '\nPrice: ' +
                      Math.round(item.price * 100) / 100
                    }
                    subtitleStyle={{fontWeight: 'bold'}}
                    rightIcon={
                      <View>
                        <FontAwesome5
                          name="pencil-alt"
                          size={25}
                          color="blue"
                          onPress={() => {
                            this.editArticle(item);
                          }}
                        />
                        <FontAwesome5
                          name="times"
                          size={30}
                          color="red"
                          onPress={() => {
                            this.deleteArticle(item);
                          }}
                        />
                      </View>
                    }
                  />
                )}
              />
            </View>
          )}
        </View>
      </>
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#FF4747" />
      </View>
    );
  }
}

ArticlesList.propTypes = {
  navigation: PropTypes.any,
};
