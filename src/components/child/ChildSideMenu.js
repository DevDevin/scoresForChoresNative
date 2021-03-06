import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler
} from "react-native";
import { logoutAuth } from "../../actions/AuthActions";

class ChildSideMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
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
              BackHandler.removeEventListener(
                "hardwareBackPress",
                this.handleBackButton
              );
              Actions.childHome();
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
              <Image source={require("../../Images/home.png")} />
              <Text style={{ fontSize: 16 }}>Home</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "powderblue"
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
                      BackHandler.removeEventListener(
                        "hardwareBackPress",
                        this.handleBackButton
                      );
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
              <Image source={require("../../Images/changeUser.png")} />
              <Text style={{ fontSize: 16 }}>Change User</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "steelblue"
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
                      BackHandler.removeEventListener(
                        "hardwareBackPress",
                        this.handleBackButton
                      );
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
              <Image source={require("../../Images/signOut.png")} />
              <Text style={{ fontSize: 16 }}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChildSideMenu;
