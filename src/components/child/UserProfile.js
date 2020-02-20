import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated
} from "react-native";
import UserEdit from "../UserEdit";

export default class UserProfile extends Component {
  render() {
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
          <Text style={{ fontSize: 24 }}>User Profile </Text>
        </View>
        <UserEdit />
      </View>
    );
  }
}
