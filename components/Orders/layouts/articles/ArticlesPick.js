import React, {Component} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DB} from '../../../../database/database';
import {ScrollView} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import _ from 'lodash';
import {ActivityIndicator} from 'react-native-paper';
import {SearchBar} from 'react-native-elements';
import logError from '../../../Settings/logError';
import get_articles from '../../../../requests/get_articles';
import BottomMessage from '../../../Layout/Alert/bottomMessage';

export default class ArticlesPick extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      availableArticles: [], //articles disponibles, càd présents dans ArticleDepot notamment.
      searchedArticles: [],
      search: '',
    };
    this.selectArticle.bind(this);
  }

  selectArticle(article) {
    this.props.ee.emit('selectArticle', article);
    this.props.toggleBasketModal();
  }

  searchArticle(text) {
    if (text.length > 0) {
      this.setState({search: text});
      const searchedArticles = _.filter(this.state.availableArticles, function(
        o,
      ) {
        return (
          o.Designation.toLowerCase().includes(text.toLowerCase()) ||
          o.Code_Article.includes(text)
        );
      });

      this.setState({searchedArticles: searchedArticles});
    } else {
      this.setState({
        searchedArticles: this.state.availableArticles,
        search: text,
      });
    }
  }

  async componentDidMount() {
    get_articles()
      .then(articles => {
        console.log(articles);
        let data = [];
        for (let i = 0; i < articles.length; i++) {
          //on n'ajoute pas l'article aux résultats possibles s'il est déjà dans le panier
          let article = articles[i];
          if (i % 2 == 0) {
            article.color = '#D5D3D3';
          } else {
            article.color = '#FF4747';
          }
          data.push(article);
        }

        this.setState({availableArticles: data, isLoading: false}, () => {
          this.searchArticle('');
        });
      })
      .catch(err => {
        this.setState(
          {
            error: true,
            message: 'Unable to get articles from database.',
          },
          () => {
            this.props.ee.emit('trigger-message');
          },
        );
        logError(err);
      });
  }
  render() {
    return (
      <>
        <View>
          <View>
            {this.state.isLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <SearchBar
                  inputContainerStyle={{
                    backgroundColor: 'white',
                    borderRadius: 15,
                  }}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent',
                  }}
                  placeholder="Search an article..."
                  onChangeText={text => this.searchArticle(text)}
                  value={this.state.search}
                />
                <View style={styles.list}>
                  {this.state.searchedArticles.map((article, index) => (
                    <View style={styles.articleContainer} key={index}>
                      <View
                        style={[
                          styles.article,
                          {
                            opacity: _.find(this.props.articles, article)
                              ? 0.3
                              : 1,
                            backgroundColor: article.color,
                          },
                        ]}>
                        <TouchableOpacity
                          disabled={
                            _.find(this.props.articles, article) ? true : false
                          }
                          onPress={() => this.selectArticle(article)}>
                          <Text style={styles.textArticle}>
                            {article.Designation.slice(0, 36)}
                          </Text>
                          <Text style={styles.textArticle}>
                            {article.Code_Article.slice(-4)}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        <BottomMessage
          style={{bottom: 0, position: 'absolute'}}
          msg={this.state.message}
          error={this.state.error}
          emitter={this.props.ee}
        />
      </>
    );
  }
}

ArticlesPick.propTypes = {
  toggleBasketModal: PropTypes.func,
  ee: PropTypes.any,
  articles: PropTypes.array,
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 10,
  },
  articleContainer: {
    height: 100,
    width: 100,
    padding: 5,
  },
  article: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center',
    borderRadius: 5,
  },
  textArticle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Thin',
  },
});
