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
    loc(this);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    rol();
  }

  handleBackButton() {
    Actions.childHome();
    return true;
  }

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
        }}
      >
        <ScrollView>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
              marginBottom: wp("10%"),
              marginTop: wp("10%")
            }}
          >
            <View
              style={{
                width: wp("90%"),
                height: hp("35%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                flex: 1,
                backgroundColor: "steelblue"
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
                  <Text style={{ fontSize: wp("6%") }}>Reward Store</Text>
                </View>
              </TouchableWithoutFeedback>
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
                height: hp("35%"),
                borderRadius: 4,
                borderWidth: 2,
                borderColor: "#d6d7da",
                flex: 1,
                backgroundColor: "skyblue",
                marginBottom: wp("7%")
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

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, { loadingUsersEnd, userUpdate })(
  ChildRewardManager
);
