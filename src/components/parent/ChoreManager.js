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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ChoreManager extends Component {
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

  onChoreList() {
    Actions.parentChoreList();
  }

  onResetChores() {
    Actions.choreReset();
  }

  onCompletionRequests() {
    Actions.completionRequestList();
  }

  ///// back button example ////////
  componentDidMount() {
    loc(this);
    this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    rol();
    console.log("componentWillUnmount in ChoreManager");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    console.log("handleBackButton in ChoreManager");
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.parentHome();
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
    return <Text style={{ fontSize: 22 }}>Chore Manager</Text>;
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
          justifyContent: "center"
          // margin: 5
        }}
      >
        <ScrollView>
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
                width: wp("92%"),
                height: hp("10%"),
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
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Text style={{ fontSize: 22 }}>Chore Manager</Text>
              </View>
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
                backgroundColor: "steelblue",
                paddingTop: 10,
                paddingBottom: 10,
                margin: 3
                // justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback onPress={this.onChoreList.bind(this)}>
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
                backgroundColor: "steelblue",
                paddingTop: 10,
                paddingBottom: 10
                // margin: 1
                // justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback
                onPress={this.onCompletionRequests.bind(this)}
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
                  <Text style={{ fontSize: 22 }}>Completion Requests</Text>
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
                backgroundColor: "steelblue",
                paddingTop: 10,
                paddingBottom: 10
                // margin: 1
                // justifyContent: "center"
              }}
            >
              <TouchableWithoutFeedback onPress={this.onResetChores.bind(this)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}
                >
                  <Image source={require("../../Images/reset.png")} />
                  <Text style={{ fontSize: 22 }}>Reset Chores</Text>
                </View>
              </TouchableWithoutFeedback>
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

export default connect(null, {})(ChoreManager);
