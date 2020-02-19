import React, { Component } from "react";
import _ from "lodash";
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { usersFetch, passwordReset } from "../../actions/AuthActions";
import { CardSection, Input, Button } from "../common";

class ResetPassword extends Component {
  state = {
    user: "nothing",
    password1: "",
    password2: "",
    passwordMismatch: false,
    userNothing: false,
    pickerLabel: ""
  };

  renderMismatch() {
    if (this.state.passwordMismatch) {
      return (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Passwords Do Not Match
          </Text>
        </View>
      );
    }
    return <View></View>;
  }

  renderUserNothing() {
    if (this.state.userNothing) {
      return (
        <View>
          <Text style={{ color: "white", size: 32 }}>User not selected.</Text>
        </View>
      );
    }
    return <View></View>;
  }

  renderPickerLabel() {
    if (this.state.user === "nothing") {
      return <Text style={{ fontSize: 22 }}>Choose a user</Text>;
    } else {
      return <Text style={{ fontSize: 22 }}>{this.state.pickerLabel}</Text>;
    }
  }

  render() {
    const users = this.props.users;
    const user = this.state.user;

    return (
      <View style={styles.ContainerStyle}>
        <View
          style={{
            height: 60,
            backgroundColor: "steelblue",
            alignItems: "center",
            justifyContent: "center"
            // elevation: 5
          }}
        >
          <Text style={{ fontSize: 22 }} t>
            Reset Password
          </Text>
        </View>
        {this.renderUserNothing()}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 60,
              backgroundColor: "powderblue",
              alignItems: "center",
              justifyContent: "center",
              elevation: 5,
              width: Dimensions.get("window").width / 2
            }}
          >
            {this.renderPickerLabel()}
          </View>
          <View
            style={{
              height: 60,
              backgroundColor: "powderblue",
              alignItems: "center",
              justifyContent: "center",
              elevation: 5,
              width: Dimensions.get("window").width / 2
            }}
          >
            <Picker
              selectedValue={this.state.user}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  user: itemValue.uid,
                  userNothing: false,
                  pickerLabel: itemValue.name
                });
              }}
            >
              <Picker.Item label="Users" value="nothing" key="null" />

              {users.map(function(user) {
                return (
                  <Picker.Item label={user.name} value={user} key={user.uid} />
                );
              })}
            </Picker>
          </View>
        </View>

        <View
          style={{
            height: 60,
            backgroundColor: "steelblue",
            alignItems: "center",
            justifyContent: "center"
            // elevation: 3
          }}
        >
          <Input
            secureTextEntry
            label="password"
            placeholder="password"
            value={this.state.passwordReset}
            onChangeText={value => this.setState({ password1: value })}
          />
        </View>

        <View
          style={{
            height: 60,
            backgroundColor: "steelblue",
            alignItems: "center",
            justifyContent: "center"
            // elevation: 3
          }}
        >
          <Input
            secureTextEntry
            label="passwordConfirm"
            placeholder="confirm password"
            value={this.state.password2}
            onChangeText={value => this.setState({ password2: value })}
          />
        </View>

        {this.renderMismatch()}
        <View
          style={{
            borderBottomWidth: 1,
            padding: 10,
            backgroundColor: "steelblue",
            justifyContent: "flex-start",
            borderColor: "#ddd",
            position: "relative"
          }}
        >
          <Button
            onPress={() => {
              if (
                this.state.password1 === this.state.password2 &&
                this.state.user != "nothing"
              ) {
                Alert.alert(
                  `Reset ${this.state.pickerLabel}'s Password`,
                  `Are you sure you want to reset ${this.state.pickerLabel}'s password?`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel"
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.passwordReset(user, this.state.password1);
                      }
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                if (this.state.password1 != this.state.password2) {
                  this.setState({ passwordMismatch: true });
                }
                if (this.state.user === "nothing") {
                  this.setState({ userNothing: true });
                }
              }
            }}
          >
            Reset Password
          </Button>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            padding: 10,
            backgroundColor: "steelblue",
            justifyContent: "flex-start",
            borderColor: "#ddd",
            position: "relative"
          }}
        >
          <Button
            onPress={() => {
              Actions.parentHome();
            }}
          >
            Back to Home
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  ContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  cardSectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "steelblue",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "black",
    position: "relative",
    elevation: 5
  },
  buttonSectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "steelblue",
    // flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
    color: "steelblue"
  },
  buttonStyle: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  }
};

const mapStateToProps = state => {
  ///bring in users
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });

  return { users: users };
};

export default connect(mapStateToProps, { usersFetch, passwordReset })(
  ResetPassword
);
