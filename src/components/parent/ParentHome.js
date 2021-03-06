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
  ToastAndroid,
  ScrollView
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { loadingUsersEnd, loadingUsersStart } from "../../actions/AuthActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ParentHome extends Component {
  state = {
    slideUp: new Animated.Value(-100),
    SlideInLeft: new Animated.Value(-100)
  };

  _start = () => {
    return Animated.parallel([
      Animated.timing(this.state.slideUp, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.SlideInLeft, {
        toValue: 1,
        duration: 3000,
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
    loc(this);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this.props.loadingUsersEnd();
    this._start();
  }

  ///// back button example ////////

  componentWillUnmount() {
    rol();
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
    return <Text style={{ fontSize: wp("6%") }}>Chore List</Text>;
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const { name } = this.props.activeUser;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#EFEFF4",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              elevation: 5
            }}
          >
            <View
              style={{
                width: wp("95%"),
                height: hp("7%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                flex: 1
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Text style={{ fontSize: wp("6%") }}>Hello {name}</Text>
              </View>
            </View>
          </View>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
              marginTop: wp("2%"),
              marginBottom: wp("3%")
            }}
          >
            <View
              style={{
                width: wp("90%"),
                height: hp("25%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                flex: 1,
                backgroundColor: "steelblue"
              }}
            >
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
                <TouchableWithoutFeedback
                  onPress={this.onChoreListPress.bind(this)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <Image source={require("../../Images/choreList.png")} />
                    <Text style={{ fontSize: wp("6%") }}>Chore Manager</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          </View>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // flex: 0.6,
              elevation: 5,
              marginBottom: wp("3%")
            }}
          >
            <View
              style={{
                // height: 100,
                width: wp("90%"),
                height: hp("25%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                // fontSize: 30,
                flex: 1,
                backgroundColor: "powderblue"
              }}
            >
              <Animated.View
                style={{
                  flex: 1,
                  transform: [
                    {
                      translateX: SlideInLeft.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0]
                      })
                    }
                  ]
                }}
              >
                <TouchableWithoutFeedback
                  onPress={this.onRewardListPress.bind(this)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <Image source={require("../../Images/rewardList.png")} />
                    <Text style={{ fontSize: wp("6%") }}>Reward Manager</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          </View>

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // flex: 0.6,
              elevation: 5
            }}
          >
            <View
              style={{
                // height: 100,
                width: wp("90%"),
                height: hp("25%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                // fontSize: 30,
                flex: 1,
                backgroundColor: "skyblue",
                // paddingTop: 10,
                // paddingBottom: 10,
                // justifyContent: "center"
                marginBottom: wp("3%")
              }}
            >
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
                <TouchableWithoutFeedback
                  onPress={this.onChoreListPress2.bind(this)}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <Image source={require("../../Images/genericUser.png")} />
                    <Text style={{ fontSize: wp("6%") }}>User Manager</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    loading: state.loading.loading
  };
};

export default connect(mapStateToProps, { loadingUsersEnd, loadingUsersStart })(
  ParentHome
);
