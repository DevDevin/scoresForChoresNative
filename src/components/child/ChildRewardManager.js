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
  ScrollView
} from "react-native";
import { loadingUsersEnd, userUpdate } from "../../actions/AuthActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ChildRewardManager extends Component {
  componentDidMount() {
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

      // this.props.loadingUsersEnd();
      // this._start();
    }
  }

  onRewardRequests() {
    Actions.rewardRequests();
  }

  onRewardStore() {
    Actions.childRewardStore();
  }

  onUserProfile() {
    Actions.userProfile();
  }

  ///// back button example ////////
  componentDidMount() {
    // this._start();
    loc(this);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    rol();
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.childHome();
    return true;
  }

  ////////////////////////////////////////

  render() {
    const { name } = this.props.activeUser;

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
                height: hp("43%"),
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
              <TouchableWithoutFeedback onPress={this.onRewardStore.bind(this)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}
                >
                  <Image source={require("../../Images/rewardList.png")} />
                  <Text style={{ fontSize: 22 }}>Reward Store</Text>
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
                height: hp("43%"),
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
                  <Text style={{ fontSize: 22 }}>Reward Requests</Text>
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

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, { loadingUsersEnd, userUpdate })(
  ChildRewardManager
);
