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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class LoginForm extends Component {
  state = {
    modalVisible: false,
    resetEmail: "",
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
    loc(this);
    this.props.loadingUsersEnd();
    this.props.error = "";
    this._start();
  }

  componentWillUnmount() {
    rol();
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
            this.setState({ modalVisible: false });
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
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
        "Failed Login",
        "Incorrect Username or password",
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
        <View style={{}}>
          <View
            style={{
              height: wp("15%"),
              backgroundColor: "powderblue",
              alignItems: "center",
              justifyContent: "center",
              elevation: 3
            }}
          >
            <Text style={{ fontSize: wp("6%") }}>Enter Login Credentials</Text>
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
            <View style={styles.buttonSectionStyle}>
              <Button onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.textStyle}>Login</Text>
              </Button>
            </View>
            <View style={styles.buttonSectionStyle}>
              <Button
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}
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
                <Text style={{ fontSize: wp("6%") }}>
                  Enter your email address
                </Text>
              </View>
              <View>
                <View style={styles.cardSectionStyle}>
                  <Input
                    label="Email"
                    placeholder="email"
                    onChangeText={this.resetPasswordEmailChange.bind(this)}
                    value={this.state.resetEmail}
                  />
                </View>

                <View style={styles.buttonSectionStyle}>
                  <Button
                    onPress={() => {
                      this.setState({ emailSent: true });
                      this.resetEmailSend(resetEmail);
                    }}
                  >
                    Send Email
                  </Button>
                </View>

                <View style={styles.buttonSectionStyle}>
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
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  ContainerStyle: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,

    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#EFEFF4"
  },
  cardSectionStyle: {
    padding: wp("3%"),
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "black",
    position: "relative",
    elevation: 5
  },
  buttonSectionStyle: {
    borderBottomWidth: 1,
    padding: wp("4%"),
    backgroundColor: "#fff",
    borderColor: "#ddd",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },

  textStyle: {
    alignSelf: "center",
    fontWeight: "600",
    color: "steelblue"
  },
  buttonStyle: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff"
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
