import React, { Component } from "react";
import _ from "lodash";
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { usersFetch, passwordReset } from "../../actions/AuthActions";
import { CardSection, Input, Button } from "../common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

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
          <Text style={{ color: "grey", fontSize: wp("6%") }}>
            Passwords Do Not Match
          </Text>
        </View>
      );
    }
    return <View></View>;
  }

  ///// back button example ////////
  componentDidMount() {
    // this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.manageUsers();
    return true;
  }

  ////////////////////////////////////////

  renderUserNothing() {
    if (this.state.userNothing) {
      return (
        <View>
          <Text style={{ color: "black", fontSize: wp("5%") }}>
            User not selected.
          </Text>
        </View>
      );
    }
    return <View></View>;
  }

  renderPickerLabel() {
    if (this.state.user === "nothing") {
      return <Text style={{ fontSize: wp("4%") }}>Select User</Text>;
    } else {
      return (
        <Text style={{ fontSize: wp("6%") }}>{this.state.pickerLabel}</Text>
      );
    }
  }

  render() {
    const users = this.props.users;
    const user = this.state.user;

    return (
      <View style={styles.ContainerStyle}>
        <View
          style={{
            height: wp("15%"),
            backgroundColor: "powderblue",
            alignItems: "center",
            justifyContent: "center",
            elevation: 3
          }}
        >
          <Text style={{ fontSize: wp("6%") }}>Reset Password</Text>
        </View>
        {this.renderUserNothing()}
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: wp("15%"),
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              // elevation: 5,
              width: Dimensions.get("window").width / 2
            }}
          >
            {this.renderPickerLabel()}
          </View>
          <View
            style={{
              height: wp("15%"),
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              // elevation: 5,
              width: hp("28%")
            }}
          >
            <Picker
              selectedValue={this.state.user}
              style={{ width: hp("20%") }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  user: itemValue.uid,
                  userNothing: false,
                  pickerLabel: itemValue.name
                });
              }}
            >
              <Picker.Item label="Users" value="nothing" key="null" />

              {users.map(function(user, i) {
                return (
                  <Picker.Item
                    label={user.name}
                    key={i}
                    value={user}
                    key={user.uid}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        <View
          style={{
            height: wp("15%"),
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
            // elevation: 3
          }}
        >
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.passwordReset}
            onChangeText={value => this.setState({ password1: value })}
          />
        </View>

        <View
          style={{
            height: wp("15%"),
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
            // elevation: 3
          }}
        >
          <Input
            secureTextEntry
            label="Confirm"
            placeholder="confirm password"
            value={this.state.password2}
            onChangeText={value => this.setState({ password2: value })}
          />
        </View>

        {this.renderMismatch()}
        <View
          style={{
            borderBottomWidth: 1,
            padding: wp("3%"),
            backgroundColor: "#fff",
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
            padding: wp("3%"),
            backgroundColor: "#fff",
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
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10,
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#EFEFF4"
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
