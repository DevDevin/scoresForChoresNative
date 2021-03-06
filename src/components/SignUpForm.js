import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import {
  emailChanged,
  passwordChanged,
  createAccount,
  password2Changed
} from "../actions/AuthActions";
import { Card, CardSection, Spinner, Input, Button } from "./common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class LoginForm extends Component {
  state = {
    isModalVisible: false,
    passwordMismatch: false
  };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.setState({ passwordMismatch: false });
  }

  onPassword2Change(text) {
    this.props.password2Changed(text);
    this.setState({ passwordMismatch: false });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    // Actions.adminUserCreate();
  };

  onButtonPress() {
    const { email, password, password2, modalFlag } = this.props;

    if (password === password2) {
      this.props.createAccount({ email, password, password2 });
      // this.setState({ isModalVisible: true });
    } else {
      this.setState({ passwordMismatch: true });
    }
    // this needs to be asynchronus because it's hitting set state before the state data actually changes
  }

  renderPasswordMessage() {
    if (this.state.passwordMismatch === true) {
      return (
        <View>
          <Text style={{ color: "black", fontSize: wp("5%") }}>
            Passwords Do Not Match
          </Text>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>Create Account</Text>
      </Button>
    );
  }

  rendorError() {
    return (
      <View style={{ backgroundColor: "#EFEFF4" }}>
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.ContainerStyle}>
        <View>
          <View
            style={{
              height: wp("20%"),
              backgroundColor: "powderblue",
              alignItems: "center",
              justifyContent: "center",
              elevation: 4
            }}
          >
            <Text style={{ fontSize: wp("6%") }}>
              Enter Account Credentials
            </Text>
          </View>
          <View style={styles.cardSectionStyle}>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </View>
          <View style={styles.cardSectionStyle}>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </View>
          <View style={styles.cardSectionStyle}>
            <Input
              secureTextEntry
              label="Password"
              placeholder="Confirm Password"
              onChangeText={this.onPassword2Change.bind(this)}
              value={this.props.password2}
            />
          </View>
          {this.renderPasswordMessage()}
          <View style={styles.buttonSectionStyle}>{this.renderButton()}</View>
          {this.rendorError()}
          <Modal isVisible={this.state.isModalVisible}>
            <View
              style={{
                backgroundColor: "#fff",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: wp("6%"),
                  fontWeight: "bold"
                }}
              >
                Account Created.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: wp("8%")
                }}
              >
                <TouchableOpacity
                  onPress={this.toggleModal}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.textStyle}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: wp("6%"),
    alignSelf: "center",
    color: "black"
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
    elevation: 1,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10,
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#EFEFF4"
  },
  cardSectionStyle: {
    borderBottomWidth: 1,
    padding: wp("3%"),
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    elevation: 3
  },
  buttonSectionStyle: {
    borderBottomWidth: 1,
    padding: wp("4%"),
    backgroundColor: "#fff",
    // flexDirection: "row",
    borderColor: "#ddd",
    // position: "relative",
    // justifyContent: "center",
    alignItems: "center",
    elevation: 3
  },
  // textStyle: {
  //   alignSelf: "center",
  //   color: "#007aff",
  //   fontSize: 16,
  //   fontWeight: "600",
  //   paddingTop: 10,
  //   paddingBottom: 10
  // },
  textStyle: {
    alignSelf: "center",
    // fontSize: 16,
    fontWeight: "600",
    // paddingTop: 10,
    // paddingBottom: 10,
    color: "steelblue"
  },
  buttonStyle: {
    // width: 200,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff"
    // marginLeft: 5,
    // marginRight: 5
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    password2: state.auth.password2,
    error: state.auth.error,
    loading: state.auth.loading,
    modalFlag: state.auth.modalFlag
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  createAccount,
  password2Changed
})(LoginForm);
