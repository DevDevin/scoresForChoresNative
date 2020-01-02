import _ from "lodash";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import { userUpdate, userSave, userDelete } from "../actions/AuthActions";
import { Card, CardSection, Button, Confirm } from "./common";
import { Actions } from "react-native-router-flux";

class UserEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    oldName = this.props.name;
    console.log("oldName: ", oldName);
    console.log("this.props.rid: UserEdit.js: ", this.props.rid);
    _.each(this.props.reward, (value, prop) => {
      this.props.userUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const {
      name,
      email,
      earnedPoints,
      uid,
      password1,
      password2,
      status
    } = this.props;

    const newName = this.props.name;
    console.log("oldName: ", oldName);
    console.log("newName: ", newName);

    console.log("earnedPoints inside userEdit onButtonPress", earnedPoints);
    console.log("name: ", name, " email: ", email, " earnedPoints: ");
    this.props.userSave({
      oldName,
      newName,
      email,
      password1,
      status,
      uid,
      earnedPoints
    });
    Actions.childHome();
  }

  render() {
    let oldName;
    return (
      <Card>
        <ScrollView>
          <UserForm />

          <View style={{ flexDirection: "column" }}>
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
              <Button onPress={this.onButtonPress.bind(this)}>
                Save Changes
              </Button>
            </View>

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
              <Button
                onPress={() => {
                  Actions.parentRewardList();
                }}
              >
                Cancel
              </Button>
            </View>
          </View>
        </ScrollView>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const {
    name,
    email,
    password1,
    password2,
    uid,
    status,
    earnedPoints
  } = state.userForm;

  return { name, email, password1, password2, uid, status, earnedPoints };
};

export default connect(mapStateToProps, {
  userUpdate,
  userSave,
  userDelete
})(UserEdit);
