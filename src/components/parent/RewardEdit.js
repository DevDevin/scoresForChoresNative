import _ from "lodash";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import RewardForm from "./RewardForm";
import {
  rewardUpdate,
  rewardSave,
  rewardDelete
} from "../../actions/ParentActions";
import { Card, CardSection, Button, Confirm } from "../common";
import { Actions } from "react-native-router-flux";

class RewardEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    console.log("this.props.rid: rewardEdit.js: ", this.props.rid);
    _.each(this.props.reward, (value, prop) => {
      this.props.rewardUpdate({ prop, value });
    });
  }

  onButtonPress() {
    console.log("this.props.reward: ", this.props.rewardName);
    console.log("this.props.cid: in chore edit", this.props);
    console.log("this.props: ", this.props);
    const { rewardName, description, pointsValue, rid } = this.props;
    this.props.rewardSave({
      rewardName,
      description,
      rid,
      pointsValue
    });
    Actions.parentRewardList();
  }

  // onAccept() {
  //   console.log("this.props.chore: ", this.props.chore);
  //   const { rid } = this.props;
  //   this.props.choreDelete({ rid });
  // }

  // onDecline() {
  //   this.setState({ showModal: false });
  // }

  render() {
    return (
      <Card>
        <ScrollView>
          <RewardForm />

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
  const { rewardName, pointsValue, description, rid } = state.rewardForm;

  return { rewardName, pointsValue, description, rid };
};

export default connect(mapStateToProps, {
  rewardUpdate,
  rewardSave,
  rewardDelete
})(RewardEdit);
