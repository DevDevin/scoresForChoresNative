import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ActivityIndicator,
  Animated,
  BackHandler,
  ToastAndroid
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { loadingUsersEnd, loadingUsersStart } from "../../actions/AuthActions";

class ParentHome extends Component {
  state = {
    slideUp: new Animated.Value(-100),
    SlideInLeft: new Animated.Value(-100)
  };

  _start = () => {
    return Animated.parallel([
      Animated.timing(this.state.slideUp, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.SlideInLeft, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true
      })
    ]).start();
  };

  onChoreListPress() {
    Actions.choreManager();
  }

  onChoreListPress2() {
    Actions.manageUsers();
  }

  onRewardListPress() {
    Actions.rewardManager();
  }

  onCompletionRequestPress() {
    Actions.completionRequestList();
  }

  onRewardRequestPress() {
    Actions.rewardRequestList();
  }

  componentDidMount() {
    console.log("component did mount parent home");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this.props.loadingUsersEnd();
    this._start();
  }

  ///// back button example ////////

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    ToastAndroid.show(
      "Cannot go back from here. Must log out.",
      ToastAndroid.LONG
    );
    return true;
  }

  ////////////////////////////////////////

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
    return <Text style={{ fontSize: 22 }}>Chore List</Text>;
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const { name } = this.props.activeUser;

    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "grey" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.6,
            elevation: 5
          }}
        >
          <Text
            style={{
              fontSize: 24
            }}
          >
            Hello {name}
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
          <TouchableWithoutFeedback onPress={this.onChoreListPress.bind(this)}>
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
                <Text style={{ fontSize: 22 }}>Chore Manager</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: SlideInLeft.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0]
                })
              }
            ]
          }}
        >
          <TouchableWithoutFeedback onPress={this.onRewardListPress.bind(this)}>
            <View style={styles.rewardListStyle}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Image source={require("../../Images/rewardList.png")} />
                <Text style={{ fontSize: 22 }}>Reward Manager</Text>
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
          <TouchableWithoutFeedback onPress={this.onChoreListPress2.bind(this)}>
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
                <Text style={{ fontSize: 22 }}>User Manager</Text>
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

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    loading: state.loading.loading
  };
};

export default connect(mapStateToProps, { loadingUsersEnd, loadingUsersStart })(
  ParentHome
);
