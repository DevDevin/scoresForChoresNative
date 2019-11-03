import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { logoutAuth } from "../../actions/AuthActions";

class ParentHomeSideMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
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
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 12 }}>Reset Chores</Text>
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
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 12 }}>Password Reset</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* new user */}
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
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 12 }}>Change User</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
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
          <View style={styles.rewardStoreStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 12 }}>Logout</Text>
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

export default ParentHomeSideMenu;
