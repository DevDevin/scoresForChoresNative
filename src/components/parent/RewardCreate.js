import React, { Component } from "react";
import _ from "lodash";
import { Alert, View, Text } from "react-native";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import {
  rewardCreate,
  rewardsFetch,
  rewardUpdate
} from "../../actions/ParentActions";
import RewardForm from "./RewardForm";
import { Actions } from "react-native-router-flux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class RewardCreate extends Component {
  state = {
    allowSubmit: true
  };

  componentDidMount() {
    this.props.rewardsFetch();
    this.props.rewardUpdate({ prop: "emptyRewardName", value: false });
    this.props.rewardUpdate({ prop: "emptyPointsValue", value: false });
    this.props.rewardUpdate({ prop: "emptyDescription", value: false });
  }
  onButtonPress() {
    this.state.allowSubmit = true;
    const { rewardName, description, pointsValue } = this.props;
    const rewards = this.props.rewards;

    if (rewardName === "") {
      this.props.rewardUpdate({ prop: "emptyRewardName", value: true });
      this.state.allowSubmit = false;
    }
    if (pointsValue === "") {
      this.props.rewardUpdate({ prop: "emptyPointsValue", value: true });
      this.state.allowSubmit = false;
    }
    if (description === "") {
      this.props.rewardUpdate({ prop: "emptyDescription", value: true });
      this.state.allowSubmit = false;
    }

    let duplicateReward = false;
    _.map(rewards, function(item) {
      if (rewardName === item.rewardName) {
        // duplicate = true;
        duplicateReward = true;
      }
    });

    if (duplicateReward) {
      this.props.rewardUpdate({ prop: "rewardExists", value: true });
      this.state.allowSubmit = false;
    }

    if (this.state.allowSubmit) {
      this.props.rewardCreate({
        rewardName: rewardName,
        pointsValue: pointsValue,
        description: description
      });
    }
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
          <Text style={{ fontSize: wp("6%") }}>Add New Reward</Text>
        </View>

        <RewardForm {...this.props} />
        <View
          style={{
            borderBottomWidth: 1,
            padding: wp("2%"),
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            borderColor: "#ddd",
            position: "relative"
          }}
        >
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            padding: wp("2%"),
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
    );
  }
}

const mapStateToProps = state => {
  const { rewardName, description, pointsValue } = state.rewardForm;

  return {
    rewardName: rewardName,
    description: description,
    pointsValue: pointsValue,
    rewards: state.rewards
  };
};

export default connect(mapStateToProps, {
  rewardCreate,
  rewardsFetch,
  rewardUpdate
})(RewardCreate);
