import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert,
  Animated
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import {
  emailChanged,
  passwordChanged,
  loginUser,
  loadingUsersEnd,
  loadingUsersStart,
  forgotPassword,
  turnOffAuthError
} from "../actions/AuthActions";
import { Input } from "./common";

class LoginForm extends Component {
  state = {
    modalVisible: false,
    resetEmail: "devincbennett@gmail.com",
    emailSent: false,
    fadeValue: new Animated.Value(0)
  };

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000
    }).start();
  };

  componentDidMount() {
    this.props.loadingUsersEnd();
    this.props.error = "";
    this._start();
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    this.props.loadingUsersStart();
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  resetPasswordEmailChange(text) {
    this.setState({ resetEmail: text });
  }

  resetEmailSend(resetEmail) {
    this.props.forgotPassword(resetEmail);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <TouchableOpacity
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>
    );
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          // textStyle={styles.spinnerTextStyle}
          textStyle={{ color: "#FFF" }}
          overlayColor="blue"
        />
      );
    }

    return <View></View>;
  }

  renderEmailSentView() {
    if (this.state.emailSent) {
      return (
        <View>
          <Text>Email Sent</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <Text>Back to Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderAlert() {
    let showAlert = false;
    if (this.props.error === "true") {
      showAlert = true;
    }

    if (showAlert === true) {
      Alert.alert(
        "Incorrect Password",
        "Please Try Again",
        [
          {
            text: "Okay",
            onPress: () => {
              this.props.turnOffAuthError();
            },
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const resetEmail = this.state.resetEmail;

    return (
      <View style={styles.ContainerStyle}>
        <Animated.View
          style={{
            opacity: this.state.fadeValue
          }}
        >
          {this.renderAlert()}
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
          {/* {this.renderSpinner()} */}
          <View style={styles.buttonSectionStyle}>
            <TouchableOpacity
              onPress={this.onButtonPress.bind(this)}
              style={styles.buttonStyle}
            >
              <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Text style={{ fontSize: 20, paddingTop: 10, color: "skyblue" }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>
              <View style={styles.cardSectionStyle}>
                <Input
                  label="Email"
                  placeholder="email"
                  onChangeText={this.resetPasswordEmailChange.bind(this)}
                  value={this.state.resetEmail}
                />
              </View>

              <TouchableHighlight
                onPress={() => {
                  this.setState({ emailSent: true });
                  this.resetEmailSend(resetEmail);
                }}
              >
                <Text>Send Email</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
            {this.renderEmailSentView()}
          </View>
        </Modal>
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
    elevation: 1,
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
    backgroundColor: "powderblue",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  },
  buttonSectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "skyblue",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
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
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.loading.loading
  };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser,
    loadingUsersEnd,
    loadingUsersStart,
    forgotPassword,
    turnOffAuthError
  }
)(LoginForm);
