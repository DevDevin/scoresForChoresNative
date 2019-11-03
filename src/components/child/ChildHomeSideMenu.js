import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { logoutAuth } from "../../actions/AuthActions";

class ChildHomeSideMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#999897"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to change users?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      Actions.userList();
                    }
                  }
                ],
                { cancelable: false }
              );
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
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 12 }}>Change User</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "skyblue"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to sign out?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      logoutAuth();
                    }
                  }
                ],
                { cancelable: false }
              );
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
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 12 }}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChildHomeSideMenu;
