import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { logoutAuth } from "../../actions/AuthActions";

class ChildSideMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <TouchableWithoutFeedback
          onPress={() => {
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
            Actions.choreReset();
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
              <Image source={require("../../Images/reset.png")} />
              <Text style={{ fontSize: 16 }}>Reset Chores</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            Actions.passwordReset();
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
              <Image source={require("../../Images/resetPassword.png")} />
              <Text style={{ fontSize: 16 }}>Password Reset</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            // logoutAuth();
            console.log("inside onPress logout");
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
          <View style={styles.rewardStoreStyle}>
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
  }
};

export default ChildSideMenu;
