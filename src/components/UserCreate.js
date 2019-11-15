import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Alert, View } from "react-native";
import { Card, CardSection, Button } from "./common/index";
import { userCreate, usersFetch } from "../actions/AuthActions";
import UserForm from "./UserForm";

class UserCreate extends Component {
  state = {
    duplicateUser: false,
    allowSubmit: true
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

    // description  Check
    let nameRequired;
    if (name === "") {
      console.log("inside of name check");

      this.state.allowSubmit = false;
      nameRequired = "-User Name";
    } else {
      nameRequired = "";
    }

    // child  Check
    let password1Required;
    if (password1 === "") {
      console.log("inside of password1 check");

      this.state.allowSubmit = false;
      console.log("allowSubmit in password1 check: ", this.state.allowSubmit);
      password1Required = "-Password";
    } else {
      password1Required = "";
    }

    console.log("allowSubmit before alert check: ", this.state.allowSubmit);
    if (this.state.allowSubmit === false) {
      Alert.alert(
        "Missing Required Fields: ",
        `${nameRequired}
          ${password1Required}`,
        [
          {
            text: "OK",
            onPress: () => {
              this.setState({ allowSubmit: true });
              console.log("this.state.allowSubmit ", this.state.allowSubmit);
            }
          }
        ],
        { cancelable: false }
      );
    } else {
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
  }

  render() {
    const users = this.props.users;

    return (
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
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, status, email } = state.userForm;

  return { name, phone, password1, status, email, users: state.users };
};

export default connect(mapStateToProps, {
  // employeeUpdate,
  userCreate,
  usersFetch
})(UserCreate);
