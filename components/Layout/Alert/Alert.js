import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import PropTypes from "prop-types";

class Alert extends Component {
  render() {
    const style = this.makeStyles();
    return (
      <View style={style.alert}>
        <Text style={style.alerttext}>{this.props.msg}</Text>
      </View>
    );
  }

  makeStyles() {
    return StyleSheet.create({
      alert: {
        flex: this.props.size ? this.props.size : 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: this.props.backgroundColor
      },
      alerttext: {
        //fontFamily: "montserrat-bold",
        color: this.props.color
      }
    });
  }
}

Alert.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  size: PropTypes.number,
  msg: PropTypes.string
};

export default Alert;
