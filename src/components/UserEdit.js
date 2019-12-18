import _ from "lodash";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import { userUpdate, userSave, userDelete } from "../actions/AuthActions";
import { Card, CardSection, Button, Confirm } from "../common";
import { Actions } from "react-native-router-flux";

class UserEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    console.log("this.props.rid: UserEdit.js: ", this.props.rid);
    _.each(this.props.reward, (value, prop) => {
      this.props.userUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { rewardName, description, pointsValue, rid } = this.props;
    this.props.userSave({
      rewardName,
      description,
      rid,
      pointsValue
    });
    Actions.parentRewardList();
  }

  render() {
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
  const { rewardName, pointsValue, description, rid } = state.userForm;

  return { rewardName, pointsValue, description, rid };
};

export default connect(mapStateToProps, {
  userUpdate,
  userSave,
  userDelete
})(UserEdit);
