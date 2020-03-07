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
  ToastAndroid
} from "react-native";
import { loadingUsersEnd, userUpdate } from "../../actions/AuthActions";

class ChildHome extends Component {
  state = {
    slideUp: new Animated.Value(0),
    SlideInLeft: new Animated.Value(0)
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
    ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
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
    console.log("component will mount");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const { name } = this.props.activeUser;

    console.log("rendering child home");
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            flex: 0.3,
            elevation: 5
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX: slideUp.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }
              ]
            }}
          >
            <Text style={{ fontSize: 24 }}>Hello {name}</Text>
          </Animated.View>
        </View>

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
              <Text style={{ fontSize: 22 }}>Chore List</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.onRewardManager.bind(this)}>
          <View style={styles.rewardStoreStyle}>
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

        <TouchableWithoutFeedback onPress={this.onUserProfile.bind(this)}>
          <View style={styles.rewardStoreStyle}>
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
          </View>
        </TouchableWithoutFeedback>
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
