import _ from "lodash";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import {
  userUpdate,
  userSave,
  userDelete,
  choreUpdate2
} from "../actions/AuthActions";
import { childChoresFetch } from "../actions/ChildActions";
import { Card, CardSection, Button, Confirm } from "./common";
import { Actions } from "react-native-router-flux";

class UserEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    oldName = this.props.name;

    this.props.childChoresFetch(oldName);

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
      status,
      chores
    } = this.props;

    console.log("chores object: ", chores);
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

    /// testing
    // filter the chores prop by the old name
    // then pass in the filtered chores prop to the choreUpdate2() funtction
    console.log("chores right before the choreUpdate2 call");
    this.props.choreUpdate2(oldName, newName, { chores });

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
  const chores = _.map(state.chores, (val, cid) => {
    return { ...val, cid };
  });

  // i think I need to call the choresFetch action in componentWillMount before state.chores can be used.
  console.log("chores in mapStateToProps: ", chores);
  //then I can filter this chores object by the child name before I pass it into the chore update function

  const {
    name,
    email,
    password1,
    password2,
    uid,
    status,
    earnedPoints
  } = state.userForm;

  return {
    name,
    email,
    password1,
    password2,
    uid,
    status,
    earnedPoints,
    chores: chores
  };
};

export default connect(mapStateToProps, {
  userUpdate,
  userSave,
  userDelete,
  choreUpdate2,
  childChoresFetch
})(UserEdit);
