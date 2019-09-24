import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, TouchableOpacity } from "react-native";

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
            Actions.choreCreate();
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
