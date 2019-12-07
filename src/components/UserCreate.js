import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Alert, View, Text } from "react-native";
import { Card, CardSection, Button } from "./common/index";
import { userCreate, usersFetch, userUpdate } from "../actions/AuthActions";
import UserForm from "./UserForm";

class UserCreate extends Component {
  state = {
    duplicateUser: false,
    allowSubmit: true,
    passwordMismatch: false
  };

  componentDidMount() {
    this.props.usersFetch();
    this.props.userUpdate({ prop: "emptyName", value: false });
    this.props.userUpdate({ prop: "passwordMismatch", value: false });
    this.props.userUpdate({ prop: "emptyPhone", value: false });
    this.props.userUpdate({ prop: "emptyEmail", value: false });
    this.props.userUpdate({ prop: "email", value: "" });
    this.props.userUpdate({ prop: "userExists", value: false });
  }
  onButtonPress() {
    this.state.allowSubmit = true;
    const { name, password1, password2, status, email } = this.props;
    console.log("this.props: ", this.props);

    if (name === "") {
      this.props.userUpdate({ prop: "emptyName", value: true });
      this.state.allowSubmit = false;
    }
    console.log("password1: ", password1, " password2: ", password2);
    if (this.props.password1 != this.props.password2) {
      this.props.userUpdate({ prop: "passwordMismatch", value: true });
      this.state.allowSubmit = false;
    }

    if (email === "") {
      this.state.allowSubmit = false;
      this.props.userUpdate({ prop: "emptyEmail", value: true });
    }

    let duplicate = false;

    const users = this.props.users;
    let duplicateUser = false;
    _.map(users, function(item) {
      if (name === item.name) {
        duplicateUser = true;
      }
    });

    if (duplicateUser) {
      this.props.userUpdate({ prop: "userExists", value: true });
      this.state.allowSubmit = false;
    }

    if (this.state.allowSubmit) {
      this.props.userCreate({ name, password1, status, email });
    }
  }

  renderMismatch() {
    if (this.state.passwordMismatch === true) {
      return (
        <View>
          <Text style={{ color: "red", fontSize: 20 }}>
            **Passwords Do Not Match**
          </Text>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  render() {
    const users = this.props.users;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "grey"
        }}
      >
        <Card>
          <UserForm {...this.props} />
          <View
            style={{
              borderBottomWidth: 1,
              padding: 5,
              backgroundColor: "#fff",
              justifyContent: "flex-start",
              borderColor: "#ddd",
              position: "relative"
            }}
          >
            <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
            {this.renderMismatch()}
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, password2, status, email } = state.userForm;

  return {
    name,
    phone,
    password1,
    password2,
    status,
    email,
    users: state.users
  };
};

export default connect(mapStateToProps, {
  // employeeUpdate,
  userCreate,
  usersFetch,
  userUpdate
})(UserCreate);
