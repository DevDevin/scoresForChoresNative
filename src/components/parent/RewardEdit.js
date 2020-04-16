import _ from "lodash";
import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
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
    _.each(this.props.reward, (value, prop) => {
      this.props.rewardUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { rewardName, description, pointsValue, rid } = this.props;
    this.props.rewardSave({
      rewardName,
      description,
      rid,
      pointsValue
    });
    Actions.parentRewardList();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fff"
        }}
      >
        <View
          style={{
            height: 60,
            backgroundColor: "powderblue",
            alignItems: "center",
            justifyContent: "center",
            elevation: 3
          }}
        >
          <Text style={{ fontSize: 22 }}>Edit Reward</Text>
        </View>

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
      </View>
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
