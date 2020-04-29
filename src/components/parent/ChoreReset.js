import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { View, Alert, BackHandler } from "react-native";
import { choreReset, choresFetch } from "../../actions/ParentActions";
import { Button } from "../common";
import { Actions } from "react-native-router-flux";
import { Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ChoreReset extends Component {
  componentWillMount() {
    this.props.choresFetch();
  }

  ///// back button example ////////
  componentDidMount() {
    // this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.choreManager();
    return true;
  }

  ////////////////////////////////////////

  backToHome() {
    Actions.choreManager();
  }
  onPress = filteredChores => {
    /////
    Alert.alert(
      "Confirm Reset",
      "This will reset the status of your recurring chores and delete non-recurring chores.",
      [
        {
          text: "Confirm",
          onPress: () => {
            this.props.choreReset(filteredChores);
          },
          style: "cancel"
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const chores = this.props.chores;

    const filteredChores = _.filter(chores, function(item) {
      return (item.recuring = true);
    });

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#EFEFF4"
        }}
      >
        <View style={{ elevation: 15 }}>
          <View
            style={{
              padding: wp("5%"),
              // paddingTop: 25,
              backgroundColor: "skyblue",
              justifyContent: "flex-start",
              position: "relative"
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "black",
                fontSize: wp("5%"),
                fontWeight: "600"
                // paddingTop: 5,
                // paddingBottom: 5
              }}
            >
              Reset Non-Recurring Chores
            </Text>
          </View>
          <View
            style={{
              padding: wp("2%"),
              paddingTop: wp("5%"),
              backgroundColor: "#fff",
              justifyContent: "flex-start",
              position: "relative"
            }}
          >
            <Button onPress={this.onPress.bind(this, filteredChores)}>
              Reset Chores
            </Button>
          </View>
          <View
            style={{
              padding: wp("2%"),
              paddingBottom: wp("5%"),
              backgroundColor: "#fff",
              justifyContent: "flex-start",
              position: "relative"
            }}
          >
            <Button onPress={this.backToHome.bind(this)}>Cancel</Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    chores: state.chores
  };
};

export default connect(mapStateToProps, { choreReset, choresFetch })(
  ChoreReset
);
