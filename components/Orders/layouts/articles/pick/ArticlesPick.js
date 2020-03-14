import React, {Component} from 'react';

import {View, Text, TouchableOpacity, TextInput} from 'react-native';

import PropTypes from 'prop-types';

import _ from 'lodash';
import {ActivityIndicator} from 'react-native-paper';
import {SearchBar, Button, Input, Badge} from 'react-native-elements';
import logError from '../../../../Settings/logError';
import get_articles from '../../../../../requests/get_articles';

import ListContainer from './ListContainer';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class ArticlesPick extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      availableArticles: [], //articles disponibles, càd présents dans ArticleDepot notamment.
      searchedArticles: [],
      search: '',
      message: null,
      failure: false,
      key: 0,
      index: 0,
      resultmsg:
        'No criteria selected, or search input entered. Please select criteria or enter code or designation of article, then press Search button above.',
    };
  }

  onPressRight() {
    this.setState({index: this.state.index + 1}, () => this.getArticles());
  }

  onPressLeft() {
    this.setState({index: this.state.index - 1}, () => this.getArticles());
  }

  componentDidMount() {
    this.getArticles();
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
      ? this.setState({isLoading: true, failure: false}, () => {
          this.props.ee.emit('searchingArticles');
          get_articles(
            this.props.criterias,
            this.state.search,
            parseInt(this.state.index),
          )
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
                  resultmsg: 'No results found.',
                },
                () => {
                  this.props.ee.emit('articlesSearched');
                },
              );
            })
            .catch(err => {
              this.setState({isLoading: false, failure: true}, () => {
                this.props.ee.emit('trigger-message', {
                  error: true,
                  message: 'Unable to get articles from database.',
                });
                this.props.ee.emit('articlesSearched');
              });
              logError(err);
            });
        })
      : this.setState({
          availableArticles: [],
          resultmsg:
            'No criteria selected, or search input entered. Please select criteria or enter code or designation of article, then press Search button above.',
        });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 0.2,
              margin: 10,
              marginLeft: 20,
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 0.6}}>
                <Text
                  style={{fontWeight: 'bold', color: '#FF4747', fontSize: 25}}>
                  Pick articles.
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Badge
                  onPress={() => this.props.previousStep()}
                  badgeStyle={{
                    backgroundColor: '#ff4747',
                    height: 30,
                    paddingHorizontal: 15,
                  }}
                  value={
                    <Text style={{color: 'white', fontSize: 15}}>
                      <FontAwesome5Icon name="undo"></FontAwesome5Icon> Back
                    </Text>
                  }></Badge>
              </View>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  margin: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#FF4747',
                    fontSize: 25,
                  }}>
                  {this.state.index + 1}
                </Text>
              </View>
            </View>

            <Input
              inputStyle={{padding: 0}}
              leftIcon={
                <FontAwesome5Icon name="search" color="grey"></FontAwesome5Icon>
              }
              inputContainerStyle={{
                borderBottomColor: '#D5D3D3',
              }}
              inputStyle={{color: 'grey'}}
              leftIconContainerStyle={{marginRight: 8}}
              style={{borderBottomColor: 'transparent'}}
              placeholderTextColor="grey"
              placeholder="Code or designation of article"
              onChangeText={text => this.setState({search: text})}
              onEndEditing={() => {
                this.setState({index: 0, isLoading: true}, () => {
                  this.getArticles();
                });
              }}
              value={this.state.search}
            />
          </View>

          <View style={{flex: 0.8}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  disabled={this.state.index === 0}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.onPressLeft()}>
                  <FontAwesome5Icon
                    color="#FF4747"
                    name="chevron-left"
                    style={{opacity: this.state.index === 0 ? 0.1 : 1}}
                    size={25}></FontAwesome5Icon>
                </TouchableOpacity>
              </View>
              <ListContainer
                getArticles={() => this.getArticles()}
                availableArticles={this.state.availableArticles}
                isLoading={this.state.isLoading}
                failure={this.state.failure}
                resultmsg={this.state.resultmsg}
                {...this.props}></ListContainer>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  disabled={this.state.availableArticles.length === 0}
                  //changer par < aux nombres d'articles de la page.
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.onPressRight()}>
                  <FontAwesome5Icon
                    color="#FF4747"
                    name="chevron-right"
                    style={{
                      opacity:
                        this.state.availableArticles.length === 0 ? 0.1 : 1,
                    }}
                    size={25}></FontAwesome5Icon>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

ArticlesPick.propTypes = {
  toggleBasketModal: PropTypes.func,
  ee: PropTypes.any,
  articles: PropTypes.array,
};
