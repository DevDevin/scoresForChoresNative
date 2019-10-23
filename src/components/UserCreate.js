import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Alert } from "react-native";
import { Card, CardSection, Button } from "./common/index";
import { userCreate, usersFetch } from "../actions/AuthActions";
import UserForm from "./UserForm";

class UserCreate extends Component {
  state = {
    duplicateUser: false
  };

  componentDidMount() {
    this.props.usersFetch();
  }
  onButtonPress() {
    const { name, phone, password1, status, email } = this.props;

    let duplicate = false;

    const users = this.props.users;
    _.map(users, function(item) {
      if (name === item.name) {
        duplicate = true;
      }
    });

    if (duplicate === false) {
      this.props.userCreate({ name, phone, password1, status, email });
    } else {
      Alert.alert(
        "Username Already Exists",
        "Please choose another username",
        [
          {
            text: "Okay",
            // onPress: () => console.log("Okay Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    const users = this.props.users;

    return (
      <Card>
        <UserForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, status, email } = state.userForm;

  return { name, phone, password1, status, email, users: state.users };
};

export default connect(
  mapStateToProps,
  {
    // employeeUpdate,
    userCreate,
    usersFetch
  }
)(UserCreate);
