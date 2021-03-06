import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { connect } from "react-redux";
import { userUpdate } from "../../actions/AuthActions";
import { CardSection, Input } from "../common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

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
    let emptyNameMessage;
    if (this.props.emptyName === true) {
      emptyNameMessage = (
        <View>
          <Text style={{ color: "grey", fontSize: wp("6%") }}>
            Name is Required
          </Text>
        </View>
      );
    } else {
      emptyNameMessage = <View></View>;
    }

    let emptyEmailMessage;
    if (this.props.emptyEmail === true) {
      emptyEmailMessage = (
        <View>
          <Text style={{ color: "grey", fontSize: wp("6%") }}>
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
          <Text style={{ color: "grey", fontSize: wp("6%") }}>
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
            height: wp("15%"),
            backgroundColor: "powderblue",
            alignItems: "center",
            justifyContent: "center",
            elevation: 4
          }}
        >
          <Text style={{ fontSize: wp("6%") }}>Create Admin User</Text>
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
