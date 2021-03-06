import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
  BackHandler
} from "react-native";
import { logoutAuth } from "../../actions/AuthActions";

class ChildSideMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.handleBackButton
            );
            Actions.parentHome();
          }}
        >
          <View style={styles.choreListStyle}>
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
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
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
          <View style={styles.rewardStoreStyle}>
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
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            // logoutAuth();
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
          <View style={styles.logoutStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/signOut.png")} />
              <Text style={{ fontSize: 16 }}>Logout</Text>
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
  },
  logoutStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "steelblue"
  }
};

export default ChildSideMenu;
