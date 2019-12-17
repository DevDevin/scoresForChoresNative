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
    console.log(
      "this.props.rewardName:  in RewardEdit.js",
      this.props.rewardName
    );
    _.each(this.props.reward, (value, prop) => {
      this.props.rewardUpdate({ prop, value });
    });
  }

  onButtonPress() {
    console.log("this.props.reward: ", this.props.rewardName);
    console.log("this.props.cid: in chore edit", this.props.cid);
    console.log("this.props: ", this.props);
    const { child, choreName, description, pointsValue, day, cid } = this.props;
    console.log("cid: ", cid);
    this.props.rewardSave({
      child,
      choreName,
      description,
      cid,
      pointsValue,
      day
    });
    Actions.parentRewardList();
  }

  onAccept() {
    // console.log("this.props.chore: ", this.props.chore);
    // const { cid } = this.props;
    // this.props.choreDelete({ cid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

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
  const { rewardName, pointsValue, description } = state.rewardForm;

  return { rewardName, pointsValue, description };
};

export default connect(mapStateToProps, {
  rewardUpdate,
  rewardSave,
  rewardDelete
})(RewardEdit);
