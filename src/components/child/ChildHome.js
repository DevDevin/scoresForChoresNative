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
    console.log("componentDidMount in child home");
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

  ///// back button example ////////

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  // }

  handleBackButton() {
    console.log("handBackButton >>>>>>");
    //// ^^^^ this is not getting called when I go back to it.
    ToastAndroid.show("Cannot go back. Must Log out.", ToastAndroid.SHORT);
    return true;
  }

  ////////////////////////////////////////

  onChoreListPress() {
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
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
    console.log("component will mount");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const { name } = this.props.activeUser;

    console.log("rendering child home");
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
              // flex: 0.6,
              elevation: 5,
              margin: 5
            }}
          >
            <View
              style={{
                // height: 100,
                width: wp("95%"),
                height: hp("7%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                fontSize: 30,
                flex: 1
                // backgroundColor: "skyblue",
                // paddingTop: 3,
                // paddingBottom: 3
                // justifyContent: "center"
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
                <Text style={{ fontSize: 22 }}>Hello {name}</Text>
              </View>
            </View>
          </View>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // flex: 0.6,
              elevation: 5,
              marginBottom: 3
            }}
          >
            <View
              style={{
                // height: 100,
                width: wp("90%"),
                height: hp("30%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                fontSize: 30,
                flex: 1,
                backgroundColor: "steelblue",
                paddingTop: 10,
                paddingBottom: 10
                // justifyContent: "center"
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
                    <Text style={{ fontSize: 22 }}>Chore List</Text>
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
              marginBottom: 5
            }}
          >
            <View
              style={{
                // height: 100,
                width: wp("90%"),
                height: hp("30%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                fontSize: 30,
                flex: 1,
                backgroundColor: "skyblue",
                paddingTop: 10,
                paddingBottom: 10
                // justifyContent: "center"
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
                    <Text style={{ fontSize: 22 }}>Reward Manager</Text>
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
                height: hp("30%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                fontSize: 30,
                flex: 1,
                backgroundColor: "powderblue",
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10
                // justifyContent: "center"
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
                    <Text style={{ fontSize: 22 }}>User Profile</Text>
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

const styles = {
  choreListStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "powderblue"
  },
  rewardStoreStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "skyblue"
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, { loadingUsersEnd, userUpdate })(
  ChildHome
);
