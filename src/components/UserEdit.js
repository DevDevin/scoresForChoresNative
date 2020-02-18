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
    // if(this.props.adminUserAction === nothing){
    //   console.log("adminUserAction is nothing")
    // }

    console.log(
      "this.props.name from UserEdit componentWillMount: ",
      this.props.name
    );
    oldName = this.props.name;

    this.props.childChoresFetch(oldName);

    // get all of the rewardRequests
    console.log("oldName in componentWillMount: ", oldName);
    this.props.childRewardRequestsFetch(oldName);
    console.log("this.props.rewardRequests: ", this.props.rewardRequests);

    // get all of the earned rewards for that child
    console.log("oldName before rewardsEarnedFetch: ", oldName);
    this.props.childRewardsEarnedFetch(oldName);

    console.log("oldName: ", oldName);
    console.log("this.props.rid: UserEdit.js: ", this.props.rid);
    _.each(this.props.reward, (value, prop) => {
      console.log("<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>");
      console.log("prop: ", prop, "value: ", value);
      this.props.userUpdate({ prop, value });
    });

    // this userForm name is being changed again. actually its not

    /// child home is getting called somehow

    console.log(
      "this.props.name from UserEdit componentWillMount round 2: ",
      this.props.name
    );
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

    console.log("oldName: ", oldName);
    //filter out rewards for just current user

    console.log("this.props.status: >>>>>>>>", this.props.status);

    console.log("rewardsEarned object: ", rewardsEarned);
    const newName = this.props.name;
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
      // earnedPoints
    });

    // update the chores info
    this.props.choreUpdate2(newName, { chores });
    // update the rewardRequests info
    console.log("rewardRequests in onButtonPress: ", rewardRequests);
    this.props.rewardRequestUpdate(newName, { rewardRequests });

    //update the rewardsEarned info
    this.props.rewardsEarnedUpdate(newName, { rewardsEarned });

    console.log("this.props.activeUser.name: ", this.props.activeUser);
    if (this.props.activeUser.status != "child") {
      Actions.parentHome();
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
  console.log("state.auths: ", state.auth.activeUser.status);
  const chores = _.map(state.chores, (val, cid) => {
    return { ...val, cid };
  });

  console.log("state.rewardRequests: ", state.rewardRequests);
  const rewardRequests = _.map(state.rewardRequests, (val, rid) => {
    return { ...val, rid };
  });

  const rewardsEarned = _.map(state.earnedRewards, (val, rid) => {
    return { ...val, rid };
  });

  console.log("rewardsEarned: ", rewardsEarned);
  console.log("rewardRequests: ", rewardRequests);
  console.log("chores: ", chores);
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
    // adminUserAction
  } = state.userForm;

  console.log("this is the earnedPoints: ", earnedPoints);
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
