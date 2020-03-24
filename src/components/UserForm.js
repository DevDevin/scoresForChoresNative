import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { userUpdate } from "../actions/AuthActions";
import { CardSection, Input } from "./common";
import RadioForm from "react-native-simple-radio-button";

class UserForm extends Component {
  render() {
    let emptyNameMessage;
    if (this.props.emptyName === true) {
      emptyNameMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>Name is Required</Text>
        </View>
      );
    } else {
      emptyNameMessage = <View></View>;
    }

    let userExistsMessage;
    if (this.props.userExists === true) {
      userExistsMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            That name is already chosen. Pick another one please
          </Text>
        </View>
      );
    } else {
      userExistsMessage = <View></View>;
    }

    let emptyEmailMessage;
    if (this.props.emptyEmail === true) {
      emptyEmailMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Email is Required
          </Text>
        </View>
      );
    } else {
      emptyEmailMessage = <View></View>;
    }
    let passwordMismatchMessage;
    if (this.props.passwordMismatch === true) {
      passwordMismatchMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Passwords must match
          </Text>
        </View>
      );
    } else {
      passwordMismatchMessage = <View></View>;
    }

    return (
      <View>
        <View
          style={{
            height: 60,
            backgroundColor: "powderblue",
            alignItems: "center",
            justifyContent: "center",
            elevation: 3
          }}
        >
          <Text style={{ fontSize: 22 }}>Add New User</Text>
        </View>
        <CardSection>
          <Text style={styles.labelStyle}>Name</Text>
          <TextInput
            placeholder="Jane"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.name}
            onChangeText={value => {
              this.props.userUpdate({ prop: "userExists", value: false });
              this.props.userUpdate({ prop: "emptyName", value: false });
              this.props.userUpdate({ prop: "name", value });
            }}
          />
        </CardSection>
        {emptyNameMessage}
        {userExistsMessage}

        <CardSection>
          <Text style={styles.labelStyle}>Email</Text>
          <TextInput
            placeholder="example@example.com"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.email}
            onChangeText={value => {
              this.props.userUpdate({ prop: "emptyEmail", value: false });
              this.props.userUpdate({ prop: "email", value });
            }}
          />
        </CardSection>
        {emptyEmailMessage}

        <CardSection>
          <Text style={styles.labelStyle}>Password</Text>
          <TextInput
            secureTextEntry
            placeholder="enter password here"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.password1}
            onChangeText={value => {
              this.props.userUpdate({ prop: "passwordMismatch", value: false });
              this.props.userUpdate({ prop: "password1", value });
            }}
          />
        </CardSection>
        {passwordMismatchMessage}

        <CardSection>
          <Text style={styles.labelStyle}>Confirm</Text>
          <TextInput
            secureTextEntry
            placeholder="confirm password here"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.password2}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password2", value })
            }
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    alignSelf: "center"
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  }
};
const mapStateToProps = state => {
  const {
    name,
    password1,
    password2,
    status,
    email,
    emptyEmail,
    emptyName,
    passwordMismatch,
    userExists
  } = state.userForm;

  return {
    name,
    password1,
    password2,
    status,
    email,
    emptyEmail,
    emptyName,
    passwordMismatch,
    userExists
  };
};

export default connect(mapStateToProps, { userUpdate })(UserForm);
