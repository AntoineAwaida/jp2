import React, {PureComponent} from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import _ from 'lodash';

export default class ArticleItem extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pending: false,
      color: new Animated.Value(0),
    };
  }

  edit(item, e) {
    this.setState({pending: true});
    this.props.addItem(item, e);
  }

  cycleAnimation() {
    Animated.sequence([
      Animated.timing(this.state.color, {
        easing: Easing.linear(),
        toValue: 300,
        duration: 300,
        delay: 600,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.color, {
        easing: Easing.linear(),
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.cycleAnimation();
    });
  }
  componentDidMount() {
    this.cycleAnimation();
    this.props.ee.on('articleAdded', () => {
      this.setState({pending: false});
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.pending ||
      _.find(this.props.articles, this.props.item) !==
        _.find(nextProps.articles, nextProps.item)
    );
  }
  render() {
    const color = this.state.color.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.2],
    });

    const {item, articles} = this.props;
    const {pending} = this.state;
    const found = _.find(articles, item);
    return (
      <Animated.View
        style={[
          styles.articleContainer,
          {
            opacity: pending ? color : 1,
            backgroundColor: found ? '#FF4747' : '#D5D3D3',
          },
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            {found && (
              <TouchableOpacity
                disabled={pending}
                onPress={() => this.props.removeItem(item)}>
                <FontAwesome5Icon
                  name="times"
                  size={20}
                  color="white"></FontAwesome5Icon>
              </TouchableOpacity>
            )}
          </View>
          <View style={{flex: 0.6, justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                // fontFamily: 'Roboto-Thin',
              }}>
              {item.Designation && item.Designation.slice(0, 36)}
            </Text>
            <Text style={styles.textArticle}>
              {item.Code_Article && item.Code_Article.slice(-4)}
            </Text>
          </View>
          <View
            style={{
              flex: 0.3,

              justifyContent: 'center',
            }}>
            <TextInput
              editable={!pending}
              defaultValue={found && found.quantity.toString()}
              onEndEditing={e => this.edit(item, e)}
              style={[
                {
                  borderBottomColor: 'white',
                  borderBottomWidth: 3,
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginHorizontal: 20,
                },
                styles.textArticle,
              ]}
              keyboardType="decimal-pad"
              returnKeyType="done"
              maxLength={4}></TextInput>
          </View>
        </View>

        {item.nomenclature && (
          <View
            style={{
              height: 15,
              width: 15,
              backgroundColor: '#00b5ad',
              position: 'absolute',
              left: -3,
              top: -3,
              borderRadius: 50,
            }}></View>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  articleContainer: {
    padding: 10,

    flex: 1,
    opacity: 1,
    justifyContent: 'center',
    backgroundColor: '#D5D3D3',
    margin: 10,
    marginHorizontal: 0,
    borderRadius: 10,
  },

  textArticle: {
    color: 'white',
    textAlign: 'center',
    // fontFamily: 'Roboto-Thin',
  },
});
