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
  ScrollView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

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

  // componentDidMount() {
  //   loc(this);
  //   this._start();
  // }

  ///// back button example ////////
  componentDidMount() {
    loc(this);
    this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    rol();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.parentHome();
    return true;
  }

  ////////////////////////////////////////

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
    return <Text style={{ fontSize: wp("6%") }}>Reward Manager</Text>;
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    // const { name } = this.props.activeUser;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#EFEFF4",
          alignItems: "center",
          justifyContent: "center",
          marginTop: wp("1%")
        }}
      >
        <ScrollView>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // flex: 0.6,
              elevation: 5,
              marginBottom: wp("10%"),
              marginTop: wp("10%")
            }}
          >
            <View
              style={{
                // height: 100,
                width: wp("90%"),
                height: hp("35%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                // fontSize: 30,
                flex: 1,
                backgroundColor: "skyblue"
              }}
            >
              <TouchableWithoutFeedback onPress={this.onRewardList.bind(this)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}
                >
                  <Image source={require("../../Images/rewardList.png")} />
                  <Text style={{ fontSize: wp("6%") }}>Rewards List</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // flex: 0.6,
              elevation: 5,
              marginBottom: wp("7%")
            }}
          >
            <View
              style={{
                // height: 100,
                width: wp("90%"),
                height: hp("35%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                fontSize: wp("2%"),
                flex: 1,
                backgroundColor: "powderblue"
                // paddingTop: 10,
                // paddingBottom: 10
                // margin: 1
                // justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback
                onPress={this.onRewardRequests.bind(this)}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}
                >
                  <Image
                    source={require("../../Images/completionRequest.png")}
                  />
                  <Text style={{ fontSize: wp("6%") }}>Reward Requests</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {})(RewardManager);
