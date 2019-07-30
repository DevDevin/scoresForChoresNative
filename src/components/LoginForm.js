import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  loginUser
} from "../actions/AuthActions";
import { Card, CardSection, Input, Button, Spinner } from "./common";

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  rendorError() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.ContainerStyle}>
        <View style={styles.titleStyle}>
          <Text style={styles.textStyle}>Scores 4 Chores</Text>
          <Text style={styles.textStyle}>
            A job Manager for Parents and children
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
        {this.rendorError()}
        <View style={styles.cardSectionStyle}>{this.renderButton()}</View>
        <View style={styles.titleStyle}>
          <Text style={styles.textStyle}>Scores 4 Chores</Text>
          <Text style={styles.textStyle}>
            A job Manager for Parents and children
          </Text>
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
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flex: 5,
    flexDirection: "column"
    // justifyContent: "center",
    // alignItems: "stretch"
  },
  cardSectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  },
  titleStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    // justifyContent: "flex-start",
    // flexDirection: "row",
    borderColor: "#ddd"
    // position: "relative"
  },
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser }
)(LoginForm);
