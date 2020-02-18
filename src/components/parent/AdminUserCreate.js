import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { userCreate, userUpdate } from "../../actions/AuthActions";
import AdminUserForm from "./AdminUserForm";
import { View, Text } from "react-native";

class AdminUserCreate extends Component {
  state = {
    allowSubmit: true
  };
  componentDidMount() {
    this.props.userUpdate({ prop: "emptyName", value: false });
    this.props.userUpdate({ prop: "passwordMismatch", value: false });
    // this.props.userUpdate({ prop: "emptyPhone", value: false });
    this.props.userUpdate({ prop: "emptyEmail", value: false });
    this.props.userUpdate({ prop: "email", value: "" });
  }

  onButtonPress() {
    this.state.allowSubmit = true;
    const { name, password1, email, password2 } = this.props;
    let passwordMismatch = false;
    let emptyName = false;
    // let emptyPhone = false;
    let emptyEmail = false;

    if (name === "") {
      this.props.userUpdate({ prop: "emptyName", value: true });
      this.state.allowSubmit = false;
    }
    console.log("password1: ", password1, " password2: ", password2);
    if (this.props.password1 != this.props.password2) {
      this.props.userUpdate({ prop: "passwordMismatch", value: true });
      this.state.allowSubmit = false;
    }
    // if (phone === "") {
    //   this.props.userUpdate({ prop: "emptyPhone", value: true });
    //   this.state.allowSubmit = false;
    // }
    if (email === "") {
      this.state.allowSubmit = false;
      this.props.userUpdate({ prop: "emptyEmail", value: true });
    }

    //if all of those are false then create user
    console.log(emptyName, emptyEmail, passwordMismatch);
    if (this.state.allowSubmit) {
      this.props.userCreate({
        name,
        // phone,
        password1,
        status: "parent",
        email
      });
      Actions.chooseUser();
    }
  }

  render() {
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
          <AdminUserForm {...this.props} />
          <View
            style={{
              borderBottomWidth: 1,
              padding: 5,
              backgroundColor: "steelblue",
              justifyContent: "flex-start",
              borderColor: "#ddd",
              position: "relative",
              elevation: 5
            }}
          >
            <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, password1, status, email, password2 } = state.userForm;

  return { name, password1, status, email, password2 };
};

export default connect(mapStateToProps, {
  userCreate,
  userUpdate
})(AdminUserCreate);
