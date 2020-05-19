import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  BackHandler,
  Alert,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { Button } from "./common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class StartupPage extends Component {
  componentDidMount() {
    loc(this);

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
    rol();

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
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.h1}>Scores 4 Chores</Text>
          <Text style={styles.h2}>
            Mangage family jobs in a fun and rewarding way.
          </Text>
        </View>
        <View style={styles.middleContainer}>
          <Image
            source={require("../Images/choresLogo.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.buttonSectionStyle}>
            <Button onPress={this.onLoginPress.bind(this)}>
              <Text>Login</Text>
            </Button>
          </View>

          <View style={styles.buttonSectionStyle}>
            <Button onPress={this.onSignUpPress.bind(this)}>
              <Text>Create Account</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#EFEFF4",
    alignItems: "center",
    width: "100%"
  },
  h1: {
    color: "black",
    fontSize: 40
  },
  buttonSectionStyle: {
    elevation: 5,
    margin: wp("2%")
  },
  h2: {
    color: "black",
    fontSize: 20,
    marginTop: 8,
    textAlign: "center",
    marginLeft: wp("5%"),
    marginRight: wp("5%")
  },
  image: {
    width: hp("35%"),
    height: hp("35%"),
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: "skyblue",
    borderRadius: 5,
    padding: 8,
    margin: 8
  },
  topContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "steelblue",
    width: "100%"
  },
  middleContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "steelblue",
    width: "100%"
  },
  bottomContainer: {
    justifyContent: "flex-end",
    width: "100%",
    // margin: 20,
    padding: 10,
    backgroundColor: "steelblue"
  }
});

// const styles = {
//   buttonStyle: {
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#007aff"
//   },
//   titleStyle: {
//     fontSize: wp("8%")
//   },
//   ContainerStyle: {
//     borderWidth: 1,
//     borderRadius: 2,

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 9,
//     elevation: 10
//   }
// };

export default StartupPage;
