import _ from "lodash";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import {
  userUpdate,
  userSave,
  userDelete,
  choreUpdate2,
  rewardRequestUpdate,
  rewardsEarnedUpdate
} from "../actions/AuthActions";
import {
  childChoresFetch,
  childRewardRequestsFetch,
  childRewardsEarnedFetch
} from "../actions/ChildActions";
import { Card, CardSection, Button, Confirm } from "./common";
import { Actions } from "react-native-router-flux";

class UserEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    oldName = this.props.name;

    this.props.childChoresFetch(oldName);

    // get all of the rewardRequests
    this.props.childRewardRequestsFetch(oldName);

    // get all of the earned rewards for that child
    this.props.childRewardsEarnedFetch(oldName);

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
      chores,
      rewardRequests,
      rewardsEarned
    } = this.props;

    //filter out rewards for just current user

    const newName = this.props.name;

    this.props.userSave({
      oldName,
      newName,
      email,
      password1,
      status,
      uid,
      earnedPoints
      // earnedPoints
    });

    // update the chores info
    this.props.choreUpdate2(newName, { chores });
    // update the rewardRequests info
    this.props.rewardRequestUpdate(newName, { rewardRequests });

    //update the rewardsEarned info
    this.props.rewardsEarnedUpdate(newName, { rewardsEarned });

    if (this.props.activeUser.status != "child") {
      Actions.parentHome();
    } else {
      Actions.childHome();
    }
  }

  onCancelPress() {
    if (this.props.activeUser.status != "child") {
      Actions.addDeleteUsers();
    } else {
      Actions.childHome();
    }
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
              <Button onPress={this.onCancelPress.bind(this)}>Cancel</Button>
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

  const rewardRequests = _.map(state.rewardRequests, (val, rid) => {
    return { ...val, rid };
  });

  const rewardsEarned = _.map(state.earnedRewards, (val, rid) => {
    return { ...val, rid };
  });

  // i think I need to call the choresFetch action in componentWillMount before state.chores can be used.
  //then I can filter this chores object by the child name before I pass it into the chore update function

  const {
    name,
    email,
    password1,
    password2,
    uid,
    status,
    earnedPoints
    // adminUserAction
  } = state.userForm;

  const activeUser = state.auth.activeUser;

  return {
    name,
    email,
    password1,
    password2,
    uid,
    status,
    earnedPoints,
    chores: chores,
    // adminUserAction,
    rewardRequests: rewardRequests,
    rewardsEarned: rewardsEarned,
    activeUser: activeUser
  };
};

export default connect(mapStateToProps, {
  userUpdate,
  userSave,
  userDelete,
  choreUpdate2,
  rewardRequestUpdate,
  childChoresFetch,
  childRewardRequestsFetch,
  childRewardsEarnedFetch,
  rewardsEarnedUpdate
})(UserEdit);
