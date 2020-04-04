import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
  BackHandler
} from "react-native";
import UserEdit from "../UserEdit";

export default class UserProfile extends Component {
  ///// back button example ////////
  componentDidMount() {
    // this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  // }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.childHome();
    return true;
  }

  ////////////////////////////////////////

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <UserEdit />
      </View>
    );
  }
}
