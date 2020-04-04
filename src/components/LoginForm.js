import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert,
  Animated,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";
import {
  emailChanged,
  passwordChanged,
  loginUser,
  loadingUsersEnd,
  loadingUsersStart,
  forgotPassword,
  turnOffAuthError
} from "../actions/AuthActions";
import { Input, CardSection, Button } from "./common";

class LoginForm extends Component {
  state = {
    modalVisible: false,
    resetEmail: "test@test.co",
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
    Alert.alert(
      "Email Sent",
      "Check your inbox for a link to reset your password.",
      [
        {
          text: "Back to Login",
          onPress: () => {
            // Actions.login();
            this.setState({ modalVisible: false });
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
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
        <View
          style={
            {
              // paddingLeft: 8,
              // paddingRight: 8
            }
          }
        >
          <View
            style={{
              height: 60,
              backgroundColor: "powderblue",
              alignItems: "center",
              justifyContent: "center",
              elevation: 3
            }}
          >
            <Text style={{ fontSize: 22 }}>Enter Login Credentials</Text>
          </View>
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
              <Button
                onPress={this.onButtonPress.bind(this)}
                // style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Login</Text>
              </Button>
            </View>
            <View style={styles.buttonSectionStyle}>
              <Button
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}
                // style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Forgot Password</Text>
              </Button>
            </View>
          </Animated.View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "grey"
              }}
            >
              <View
                style={{
                  // height: 60,
                  backgroundColor: "powderblue",
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 3
                }}
              >
                <Text style={{ fontSize: 22 }}>Enter your email address</Text>
              </View>
              <View>
                <View
                  style={{
                    // borderBottomWidth: 1,
                    padding: 5,
                    // backgroundColor: "steelblue",
                    justifyContent: "flex-start",
                    // borderColor: "#ddd",
                    position: "relative",
                    flexDirection: "row"
                  }}
                >
                  <View style={styles.containerStyle}>
                    <Text style={styles.labelStyle}>Email Address</Text>

                    <TextInput
                      autoCorrect={false}
                      style={styles.inputStyle}
                      placeholder="Email"
                      value={this.state.resetEmail}
                      onChangeText={this.resetPasswordEmailChange.bind(this)}
                    />
                  </View>
                </View>

                <View
                  style={{
                    // borderBottomWidth: 1,
                    // padding: 5,
                    backgroundColor: "#fff",
                    justifyContent: "flex-start",
                    // borderColor: "#ddd",
                    position: "relative"
                  }}
                >
                  <Button
                    onPress={() => {
                      this.setState({ emailSent: true });
                      this.resetEmailSend(resetEmail);
                    }}
                  >
                    Send Email
                  </Button>
                </View>

                <View
                  style={{
                    // borderBottomWidth: 1,
                    // padding: 5,
                    backgroundColor: "#fff",
                    justifyContent: "flex-start",
                    // borderColor: "#ddd",
                    position: "relative"
                  }}
                >
                  <Button
                    onPress={() => {
                      this.setState({ modalVisible: false });
                    }}
                  >
                    Cancel
                  </Button>
                </View>
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
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
    // borderColor: "powderblue"
  },
  ContainerStyle: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: "#ddd",
    // borderBottomWidth: 0,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: 10,
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#EFEFF4"
  },
  cardSectionStyle: {
    // borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "black",
    position: "relative",
    elevation: 5
  },
  buttonSectionStyle: {
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    // flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
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
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.loading.loading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  loadingUsersEnd,
  loadingUsersStart,
  forgotPassword,
  turnOffAuthError
})(LoginForm);
