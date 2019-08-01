import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, CardSection } from "./common";

class StartupPage extends Component {
  onLoginPress() {
    Actions.login();
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
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.textStyle}>Sign In</Text>
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
