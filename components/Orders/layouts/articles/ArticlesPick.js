import React, {Component} from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DB} from '../../../../database/database';
import {ScrollView} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import _ from 'lodash';
import {ActivityIndicator} from 'react-native-paper';
import {SearchBar, Button} from 'react-native-elements';
import logError from '../../../Settings/logError';
import get_articles from '../../../../requests/get_articles';
import BottomMessage from '../../../Layout/Alert/bottomMessage';

import SearchCriterias from './searchCriterias';

export default class ArticlesPick extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      availableArticles: [], //articles disponibles, càd présents dans ArticleDepot notamment.
      searchedArticles: [],
      search: '',
      message: null,
      resultmsg:
        'No criteria selected, or search input entered. Please select criteria or enter code or designation of article, then press Search button above.',
    };
    this.selectArticle.bind(this);
  }

  selectArticle(article) {
    this.props.ee.emit('selectArticle', article);
    this.props.toggleBasketModal();
  }

  // searchArticle(text) {
  //   if (text.length > 0) {
  //     this.setState({search: text});
  //     const searchedArticles = _.filter(this.state.availableArticles, function(
  //       o,
  //     ) {
  //       return (
  //         o.Designation.toLowerCase().includes(text.toLowerCase()) ||
  //         o.Code_Article.includes(text)
  //       );
  //     });

  //     this.setState({searchedArticles: searchedArticles});
  //   } else {
  //     this.setState({
  //       searchedArticles: this.state.availableArticles,
  //       search: text,
  //     });
  //   }
  // }

  componentDidMount() {
    this.props.ee.on('searchArticles', () => {
      this.getArticles();
    });
  }

  async getArticles() {
    this.props.criterias.famille.length > 0 ||
    this.props.criterias.sous_famille.length > 0 ||
    this.props.criterias.gamme.length > 0 ||
    this.props.criterias.qualite.length > 0 ||
    this.state.search.length > 0
      ? this.setState({isLoading: true}, () => {
          this.props.ee.emit('searchingArticles');
          get_articles(this.props.criterias, this.state.search)
            .then(articles => {
              let data = [];
              for (let i = 0; i < articles.length; i++) {
                let article = articles[i];
                if (i % 2 == 0) {
                  article.color = '#D5D3D3';
                } else {
                  article.color = '#FF4747';
                }
                data.push(article);
              }

              this.setState(
                {
                  availableArticles: data,
                  isLoading: false,
                  resultmsg:
                    this.props.criterias.famille.length > 0 ||
                    this.props.criterias.sous_famille.length > 0 ||
                    this.props.criterias.gamme.length > 0 ||
                    this.props.criterias.qualite.length > 0 ||
                    this.state.search.length > 0
                      ? 'No criteria selected, or search input entered. Please select criteria or enter code or designation of article, then press Search button above.'
                      : 'No results found.',
                },
                () => {
                  this.props.ee.emit('articlesSearched');
                },
              );
            })
            .catch(err => {
              console.log(err);
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
        })
      : this.setState({availableArticles: []});
  }

  render() {
    return (
      <>
        <View>
          <View>
            <View style={{flex: 1}}>
              <SearchBar
                inputStyle={{padding: 0}}
                inputContainerStyle={{
                  backgroundColor: 'white',
                  borderRadius: 15,
                  marginHorizontal: 5,
                }}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderBottomColor: 'transparent',
                  borderTopColor: 'transparent',
                }}
                placeholder="Code or designation of article"
                onChangeText={text => this.setState({search: text})}
                value={this.state.search}
              />

              <SearchCriterias
                toggleCriteriaModal={this.props.toggleCriteriaModal}
                criterias={this.props.criterias}
                ee={this.props.ee}
              />

              <View style={styles.list}>
                {!this.state.isLoading ? (
                  this.state.availableArticles.length > 0 ? (
                    this.state.availableArticles.map((article, index) => (
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
                              _.find(this.props.articles, article)
                                ? true
                                : false
                            }
                            onPress={() => this.selectArticle(article)}>
                            <Text style={styles.textArticle}>
                              {article.Designation &&
                                article.Designation.slice(0, 36)}
                            </Text>
                            <Text style={styles.textArticle}>
                              {article.Code_Article &&
                                article.Code_Article.slice(-4)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Button
                        buttonStyle={{
                          paddingHorizontal: 10,
                          paddingVertical: 0,
                          margin: 10,
                          marginTop: 40,
                          backgroundColor: '#D5D3D3',
                        }}
                        titleStyle={{color: 'white', fontSize: 12}}
                        title={this.state.resultmsg}></Button>
                    </View>
                  )
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                      marginTop: 20,
                    }}>
                    <ActivityIndicator size="large" color="#FF4747" />
                  </View>
                )}
              </View>
            </View>
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
    justifyContent: 'center',
    marginTop: 10,
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
