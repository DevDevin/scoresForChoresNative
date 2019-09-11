import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class ChildSideMenu extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity>
          <View>
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>New User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChildSideMenu;
