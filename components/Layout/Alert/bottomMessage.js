import React, { Component } from "react";

import { Animated } from "react-native";

import PropTypes from "prop-types";
import Alert from "./Alert";

class BottomMessage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bottomPosition: new Animated.Value(-100)
    };
  }

  componentDidMount() {
    this.props.emitter.addListener("trigger-message", () => {
      Animated.sequence([
        Animated.delay(300),
        Animated.spring(this.state.bottomPosition, {
          toValue: 0,
          speed: 3,
          bounciness: 5
        }),
        Animated.delay(600),
        Animated.spring(this.state.bottomPosition, {
          toValue: -100,
          speed: 1,
          bounciness: 6
        })
      ]).start();
    });
  }

  render() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 10,
          width: "100%",
          height: 60,
          bottom: this.state.bottomPosition
        }}
      >
        <Alert
          color={"white"}
          backgroundColor={this.props.error ? "red" : "green"}
          msg={this.props.msg}
        />
      </Animated.View>
    );
  }
}

BottomMessage.propTypes = {
  error: PropTypes.bool,
  msg: PropTypes.string,
  emitter: PropTypes.any
};

export default BottomMessage;
