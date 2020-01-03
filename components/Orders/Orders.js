import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
  Animated,
  Button,
  ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';

import {SafeAreaView} from 'react-navigation';

import {Text, Badge} from 'react-native-elements';

import _ from 'lodash';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import CustomerModal from './modals/CustomerModal';
import BasketModal from './modals/BasketModal';
import Checkout from './layouts/Checkout';
import Customers from './customers/Customers';

import SelectedCustomer from './customers/SelectedCustomer';

import logError from '../Settings/logError';

import withBadge from './withBadge';
import Geolocation from 'react-native-geolocation-service';
import Dimmer from './modals/Dimmer';
import BottomMessage from '../Layout/Alert/bottomMessage';
import ArticlesSteps from './layouts/articles/steps/ArticlesSteps';
import ArticlesPick from './layouts/articles/pick/ArticlesPick';

const EventEmitter = require('events');

export const OrderContext = React.createContext({criteriaSelected: []});

class Orders extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    let BadgedIcon;
    params.articles &&
      (BadgedIcon = withBadge(params.articles.length)(FontAwesome5));
    return {
      headerLeft: params.articles && params.articles.length > 0 && (
        <BadgedIcon
          style={{marginLeft: 10}}
          color="#FF4747"
          name="shopping-cart"
          size={30}
          onPress={() =>
            navigation.navigate('ArticlesList', {
              articles: params.articles,
              ee: params.ee,
            })
          }
        />
      ),
      headerRight: (
        <FontAwesome5
          style={{marginRight: 20}}
          color="#FF4747"
          name="history"
          size={30}
          onPress={() => navigation.navigate('ListOrders')}
        />
      ),
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isCustomerModalVisible: false,
      isBasketModalVisible: false,
      showDimmer: false,
      customer: null,
      article: null,
      GPS: null,

      articles: [],
      articlesPickOpacity: new Animated.Value(0),
      step: 0,
      criteria: {
        famille: [],
        sous_famille: [],
        gamme: [],
        qualite: [],
      },
    };

    this.ee = new EventEmitter();
    this.ee.setMaxListeners(0);

    this.toggleCustomerModal.bind(this);
    this.toggleBasketModal.bind(this);

    this.clearOffer.bind(this);
    this.cancelCustomer = this.cancelCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.setStep = this.setStep.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.previousStep = this.previousStep.bind(this);
  }

  clearOffer() {
    this.setState(
      {customer: null, articles: [], article: null, step: 0},
      () => {
        const {articles} = this.state;
        this.props.navigation.setParams({articles});
      },
    );
  }

  // listenKeyboard() {
  //   this.keyboardDidShowlistener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       this.ee.emit('keyboardUp');
  //     },
  //   );

  //   this.keyboardDidHidelistener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       this.ee.emit('keyboardDown');
  //     },
  //   );
  // }

  listenEvents() {
    this.ee.on('clearOffer', () => this.clearOffer());

    this.ee.on('clearSelection', () => {
      this.setState({
        criteria: {
          famille: [],
          sous_famille: [],
          gamme: [],
          qualite: [],
        },
        articles: [],
      });
    });

    this.ee.on('showDimmer', () => this.setState({showDimmer: true}));

    this.ee.on('dismissDimmer', () => this.setState({showDimmer: false}));

    this.ee.on('resetCriteria', () => {
      this.setState({
        criteria: {
          famille: [],
          sous_famille: [],
          gamme: [],
          qualite: [],
        },
        articles: [],
      });
    });

    this.ee.on('criteriaSelected', criteria => {
      this.setState({
        criteria: {...this.state.criteria, [criteria.type]: criteria.content},
      });
    });

    this.ee.on('editArticles', articles => {
      this.setState({articles: articles, article: null}, () => {
        const {articles} = this.state;
        this.props.navigation.setParams({articles});
      });
    });

    this.ee.addListener('customerSelected', () => {
      this.setState({articlesPickOpacity: new Animated.Value(0)}, () => {
        Animated.timing(this.state.articlesPickOpacity, {
          toValue: 1,
          duration: 1000,
        }).start();
      });
    });
  }

  componentWillUnmount() {
    // this.keyboardDidShowlistener.remove();
    // this.keyboardDidHidelistener.remove();
  }

  getCoordinates(high) {
    Geolocation.getCurrentPosition(
      res => {
        const coordinates = {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
          speed: res.coords.speed,
          heading: res.coords.heading,
        };
        this.setState({GPS: coordinates});
      },
      err => {
        if (high === false) {
          logError(err.message);
        } else {
          this.getCoordinates(false);
        }
      },
      {enableHighAccuracy: high, timeout: 5000},
    );
  }

  componentDidMount() {
    // this.listenKeyboard();
    this.listenEvents();

    const {articles} = this.state;
    const ee = this.ee;
    this.props.navigation.setParams({articles, ee});

    this.getCoordinates(true);
  }

  removeArticle(article) {
    this.setState(
      {
        articles: this.state.articles.filter(
          e => e.Code_Article !== article.Code_Article,
        ),
      },
      () => {
        const {articles} = this.state;
        this.props.navigation.setParams({articles});
      },
    );
  }

  addArticle(article) {
    this.state.articles.find(e => e.Code_Article === article.Code_Article)
      ? //modif quantité si l'article est déjà dans la liste
        this.setState(
          {
            articles: this.state.articles.map(a => {
              return a.Code_Article === article.Code_Article ? article : a;
            }),
          },
          () => {
            const {articles} = this.state;
            this.props.navigation.setParams({articles});
            this.ee.emit('articleAdded');
          },
        )
      : this.setState(
          {
            articles: [...this.state.articles, article],
          },
          () => {
            const {articles} = this.state;
            this.props.navigation.setParams({articles});
            this.ee.emit('articleAdded');
          },
        );
  }

  toggleBasketModal(article) {
    article
      ? this.setState(
          {
            isBasketModalVisible: !this.state.isBasketModalVisible,
            articles: [...this.state.articles, article],
          },
          () => {
            const {articles} = this.state;
            this.props.navigation.setParams({articles});
          },
        )
      : this.setState(
          {
            isBasketModalVisible: !this.state.isBasketModalVisible,
          },
          () => {
            const {articles} = this.state;
            this.props.navigation.setParams({articles});
          },
        );
  }

  setStep(step) {
    this.setState({step});
  }

  previousStep() {
    this.state.step > 0 && this.setState({step: this.state.step - 1});
  }

  selectCustomer(customer) {
    this.setState({customer: customer});
  }

  toggleCustomerModal(customer) {
    this.setState({
      isCustomerModalVisible: !this.state.isCustomerModalVisible,
      customer: customer ? customer : null,
    });
  }

  cancelCustomer() {
    Alert.alert(
      'Delete customer selection?',
      'Are you sure you want to cancel your customer selection?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            this.setState(
              {
                customer: null,
                articles: [],
                step: 0,
                criteria: {
                  famille: [],
                  sous_famille: [],
                  gamme: [],
                  qualite: [],
                },
              },
              () => {
                this.props.navigation.setParams({
                  articles: this.state.articles,
                });
              },
            ),
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    console.warn(this.state.criteria);
    return (
      <>
        <View style={{flex: 1, backgroundColor: 'rgba(213, 211, 211, .2)'}}>
          <SafeAreaView style={style.contain}>
            <BasketModal
              article={this.state.article}
              isVisible={this.state.isBasketModalVisible}
              ee={this.ee}
              toggleBasketModal={e => this.toggleBasketModal(e)}
            />

            <Dimmer
              isVisible={this.state.showDimmer}
              msg={'Saving order, please wait...'}
            />

            {!this.state.customer ? (
              <View style={style.selectCustomercontainer}>
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Badge
                    containerStyle={{margin: 5, padding: 5}}
                    badgeStyle={{
                      margin: 5,
                      padding: 15,
                      backgroundColor: '#ff4747',
                    }}
                    value={
                      <Text style={{color: 'white', fontSize: 15}}>
                        Select a customer.
                      </Text>
                    }></Badge>
                </View>

                <View
                  style={{
                    flex: 1,

                    flexDirection: 'row',
                  }}>
                  <Customers
                    emitter={this.ee}
                    selectCustomer={this.selectCustomer}
                  />
                </View>
              </View>
            ) : (
              <Animated.View
                style={{
                  flex: 1,
                  opacity: this.state.articlesPickOpacity,
                }}>
                <View style={style.customerContainer}>
                  <SelectedCustomer
                    emitter={this.ee}
                    customer={this.state.customer}
                    cancelCustomer={this.cancelCustomer}
                  />
                </View>
                <View style={style.shoppingCardContainer}>
                  <OrderContext.Provider
                    value={{criteriaSelected: this.state.criteria}}>
                    {this.state.step < 4 ? (
                      <>
                        <ArticlesSteps
                          previousStep={this.previousStep}
                          setStep={this.setStep}
                          step={this.state.step}
                          criterias={this.state.criteria}
                          articles={this.state.articles}
                          ee={this.ee}></ArticlesSteps>
                      </>
                    ) : (
                      <View style={{flex: 1}}>
                        <ArticlesPick
                          previousStep={this.previousStep}
                          removeArticle={this.removeArticle}
                          addArticle={this.addArticle}
                          ee={this.ee}
                          criterias={this.state.criteria}
                          articles={this.state.articles}></ArticlesPick>
                      </View>
                    )}
                  </OrderContext.Provider>
                </View>
                {this.state.step === 4 && (
                  <View style={{flex: 0.1}}>
                    <Checkout
                      emitter={this.ee}
                      clearOffer={() => this.clearOffer()}
                      articles={this.state.articles}
                      navigation={this.props.navigation}
                      customer={this.state.customer}
                      GPS={this.state.GPS}
                    />
                  </View>
                )}
              </Animated.View>
            )}
          </SafeAreaView>
        </View>

        <BottomMessage
          style={{bottom: 0, position: 'absolute'}}
          emitter={this.ee}
        />
      </>
    );
  }
}

Orders.propTypes = {
  navigation: PropTypes.any,
};

const style = StyleSheet.create({
  contain: {
    flex: 1,
  },
  customerContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 10,
  },

  shoppingCardContainer: {
    flexGrow: 0.9,
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 10,
    marginBottom: 0,
  },

  selectCustomercontainer: {
    flex: 0.9,
  },
});

export default Orders;
