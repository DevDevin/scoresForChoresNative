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
    console.log("insided onButtonPress", this.state.duplicateUser);
    const { name, phone, password1, status, email } = this.props;

    let duplicate = false;

    const users = this.props.users;
    _.map(users, function(item) {
      console.log("child: ", item.name, "-vs-", name);
      console.log("inisde of map");
      if (name === item.name) {
        console.log("duplicate user name");
        // i don't have to do state. I can just do a normal variable
        // this.setState({ duplicateUser: true });
        duplicate = true;
      }
    });

    if (duplicate === false) {
      this.props.userCreate({ name, phone, password1, status, email });
    }
  }

  render() {
    const users = this.props.users;

    // usersFiltered.map(function(user) {
    //   console.log("child", user.name);
    // });
    //for some reason users is not getting populated.

    console.log("this.props.users: ", this.props.users);
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
