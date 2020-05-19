import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
  BackHandler,
  ToastAndroid,
  ScrollView
} from "react-native";
import { loadingUsersEnd, userUpdate } from "../../actions/AuthActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ChildHome extends Component {
  state = {
    slideUp: new Animated.Value(-100),
    SlideInLeft: new Animated.Value(-100)
  };

  // animation
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

  componentDidMount() {
    loc(this);
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    const {
      name,
      email,
      password,
      status,
      uid,
      earnedPoints
    } = this.props.activeUser;

    if (status != "parent") {
      this.props.userUpdate({ prop: "name", value: name });
      this.props.userUpdate({ prop: "email", value: email });
      this.props.userUpdate({ prop: "password1", value: password });
      this.props.userUpdate({ prop: "password2", value: password });
      this.props.userUpdate({ prop: "status", value: "child" });
      this.props.userUpdate({ prop: "earnedPoints", value: earnedPoints });

      this.props.loadingUsersEnd();
      this._start();
    }
  }

  handleBackButton() {
    //// ^^^^ this is not getting called when I go back to it.
    ToastAndroid.show("Cannot go back. Must Log out.", ToastAndroid.SHORT);
    return true;
  }

  onChoreListPress() {
    Actions.childChoreList();
  }

  onRewardManager() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    Actions.childRewardManager();
  }

  onUserProfile() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    Actions.userProfile();
  }

  componentWillMount() {
    rol();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
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
              elevation: 5,
              margin: wp("2%")
            }}
          >
            <View
              style={{
                width: wp("95%"),
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
              margin: wp("2%")
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
                    <Text style={{ fontSize: wp("6%") }}>Chore List</Text>
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
              elevation: 5,
              marginBottom: wp("2%")
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
                backgroundColor: "skyblue"
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
                  onPress={this.onRewardManager.bind(this)}
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
              elevation: 5
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
                backgroundColor: "powderblue"
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
                  onPress={this.onUserProfile.bind(this)}
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
                    <Text style={{ fontSize: wp("6%") }}>User Profile</Text>
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
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, { loadingUsersEnd, userUpdate })(
  ChildHome
);
