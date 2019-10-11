import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, TouchableOpacity } from "react-native";
import { logoutAuth } from "../../actions/AuthActions";

class ChildSideMenu extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            Actions.parentHome();
          }}
        >
          <View>
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.chooseUser();
          }}
        >
          <View>
            <Text>Change User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.choreReset();
          }}
        >
          <View>
            <Text>Reset Chores</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.passwordReset();
          }}
        >
          <View>
            <Text>Reset Passwords</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logoutAuth();
          }}
        >
          <View>
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChildSideMenu;
