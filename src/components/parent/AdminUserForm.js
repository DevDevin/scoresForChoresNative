import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { connect } from "react-redux";
import { userUpdate } from "../../actions/AuthActions";
import { CardSection, Input } from "../common";

class AdminUserForm extends Component {
  state = {
    passwordMismatch: false
  };
  componentDidMount() {
    // reset props when opening form
    this.props.userUpdate({ prop: "name", value: "" });
    this.props.userUpdate({ prop: "email", value: 0 });
    this.props.userUpdate({ prop: "password1", value: "" });
    this.props.userUpdate({ prop: "password2", value: "" });
  }

  render() {
    console.log("props.emptyName: ", this.props.emptyName);
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

    let emptyEmailMessage;
    console.log("this.props.emptyEmail: ", this.props.emptyEmail);
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
            borderBottomWidth: 1,
            padding: 5,
            backgroundColor: "#fff",
            borderColor: "#ddd",
            alignItems: "center",
            padding: 10,
            backgroundColor: "steelblue",
            elevation: 5
          }}
        >
          <Text style={{ fontSize: 20 }}>Create Admin User</Text>
        </View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => {
              this.props.userUpdate({ prop: "emptyName", value: false });
              this.props.userUpdate({ prop: "name", value });
            }}
          />
        </CardSection>
        {emptyNameMessage}

        <CardSection>
          <Input
            label="Email"
            placeholder="johndoe@gmail.com"
            value={this.props.email}
            onChangeText={value => {
              this.props.userUpdate({ prop: "emptyEmail", value: false });
              this.props.userUpdate({ prop: "email", value });
            }}
          />
        </CardSection>
        {emptyEmailMessage}

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={this.props.password1}
            onChangeText={value => {
              this.props.userUpdate({ prop: "passwordMismatch", value: false });
              this.props.userUpdate({ prop: "password1", value });
            }}
          />
        </CardSection>
        {passwordMismatchMessage}

        <CardSection>
          <Input
            secureTextEntry
            label="Confirm"
            placeholder="Confirm Password"
            value={this.props.password2}
            onChangeText={value => {
              this.props.userUpdate({ prop: "password2", value });
            }}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    name,
    password1,
    status,
    email,
    password2,
    emptyName,
    passwordMismatch,
    emptyEmail
  } = state.userForm;

  return {
    name,
    password1,
    status,
    email,
    password2,
    emptyName,
    passwordMismatch,
    emptyEmail
  };
};

export default connect(mapStateToProps, { userUpdate })(AdminUserForm);
