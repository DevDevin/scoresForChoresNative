import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, CardSection } from "./common";
import ActionButton from "react-native-action-button";

class StartupPage extends Component {
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
          backgroundColor: "#d67d72"
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log("notes tapped!")}
            />
            <ActionButton.Item
              buttonColor="#3498db"
              title="Notifications"
              onPress={() => {}}
            />
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="All Tasks"
              onPress={() => {}}
            />
          </ActionButton>
        </View>
        <View
          style={{
            height: 100,
            backgroundColor: "powderblue",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.titleStyle}>Scores 4 Chores</Text>
          <Text style={{ fontSize: 18 }}>Sign in or create new account</Text>
        </View>

        <View
          style={{
            height: 100,
            backgroundColor: "skyblue",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.onLoginPress.bind(this)}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 100,
            backgroundColor: "steelblue",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.onSignUpPress.bind(this)}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  },
  titleStyle: {
    fontSize: 28
  }
};

export default StartupPage;
