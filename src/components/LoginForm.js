import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import {
  emailChanged,
  passwordChanged,
  loginUser,
  loadingUsersEnd,
  loadingUsersStart,
  forgotPassword
} from "../actions/AuthActions";
import { Input } from "./common";

class LoginForm extends Component {
  state = {
    modalVisible: false,
    resetEmail: "devincbennett@gmail.com"
  };

  componentDidMount() {
    this.props.loadingUsersEnd();
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
    console.log("email sent", resetEmail);
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

  rendorError() {
    return (
      <View style={{ backgroundColor: "grey" }}>
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
      </View>
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
  render() {
    console.log("this.props.loading: ", this.props.loading);
    const resetEmail = this.state.resetEmail;
    console.log("resetEmail: ", resetEmail);
    return (
      <View style={styles.ContainerStyle}>
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
          <Text>Forgot Password</Text>
        </TouchableOpacity>

        {this.rendorError()}
        {/* Rest of the app comes ABOVE the action button component !*/}

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
    forgotPassword
  }
)(LoginForm);
