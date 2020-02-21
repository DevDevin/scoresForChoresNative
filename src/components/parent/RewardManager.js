import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ActivityIndicator,
  Animated
} from "react-native";

class RewardManager extends Component {
  state = {
    slideUp: new Animated.Value(-100),
    SlideInLeft: new Animated.Value(-100)
  };

  _start = () => {
    return Animated.parallel([
      Animated.timing(this.state.slideUp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.SlideInLeft, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  };

  onRewardList() {
    Actions.parentRewardList();
  }

  onRewardRequests() {
    Actions.rewardRequestList();
  }

  componentDidMount() {
    this._start();
  }

  // componentWillUnmount() {
  //   Actions.parentHome();
  // }

  renderSmallSpinner() {
    if (this.state.smallSpinner) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return <Text style={{ fontSize: 22 }}>Reward Manager</Text>;
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    // const { name } = this.props.activeUser;

    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "grey" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.4,
            elevation: 5
          }}
        >
          <Text
            style={{
              fontSize: 24
            }}
          >
            Reward Manager
          </Text>
        </View>

        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: slideUp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
                })
              }
            ]
          }}
        >
          <TouchableWithoutFeedback onPress={this.onRewardList.bind(this)}>
            <View style={styles.choreListStyle}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Image source={require("../../Images/choreList.png")} />
                <Text style={{ fontSize: 22 }}>Rewards List</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: slideUp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
                })
              }
            ]
          }}
        >
          <TouchableWithoutFeedback onPress={this.onRewardRequests.bind(this)}>
            <View style={styles.choreListStyle}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Image source={require("../../Images/choreList.png")} />
                <Text style={{ fontSize: 22 }}>Reward Requests</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  choreListStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    flex: 1,
    backgroundColor: "powderblue"
  },
  rewardListStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    flex: 1,
    backgroundColor: "skyblue"
  },
  completionRequestsStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    flex: 1,
    backgroundColor: "steelblue"
  }
};

export default connect(null, {})(RewardManager);
