import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, BackHandler, Alert } from "react-native";
import { Button, Card } from "../components/common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class StartupPage extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert(
        "Confirm exit",
        "Do you want to quit the app?"[
          ({ text: "CANCEL", style: "cancel" },
          { text: "OK", onPress: () => BackHandler.exitApp() })
        ]
      );
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => {});
  }
  onLoginPress() {
    Actions.login();
  }

  onSignUpPress() {
    Actions.signUp();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#EFEFF4"
        }}
      >
        <View style={styles.ContainerStyle}>
          <View
            style={{
              height: wp("25%"),
              backgroundColor: "powderblue",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.titleStyle}>Scores 4 Chores</Text>
            <Text style={{ fontSize: wp("6%") }}>
              Sign in or create new account
            </Text>
          </View>

          <View
            style={{
              height: wp("25%"),
              backgroundColor: "steelblue",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              onPress={this.onLoginPress.bind(this)}
              // style={styles.buttonStyle}
            >
              Login
            </Button>
          </View>
          <View
            style={{
              height: wp("25%"),
              backgroundColor: "steelblue",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              onPress={this.onSignUpPress.bind(this)}
              // style={styles.buttonStyle}
            >
              Create Account
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    // width: 200,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff"
    // marginLeft: 5,
    // marginRight: 5
  },
  titleStyle: {
    fontSize: wp("8%")
  },
  ContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    // borderColor: "charcoal",
    // borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
    elevation: 10
    // marginLeft: 10,
    // marginRight: 10,
    // marginTop: 10
  }
};

export default StartupPage;
