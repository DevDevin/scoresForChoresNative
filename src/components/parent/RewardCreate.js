import React, { Component } from "react";
import _ from "lodash";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { rewardCreate, rewardsFetch } from "../../actions/ParentActions";
import RewardForm from "./RewardForm";

class RewardCreate extends Component {
  componentDidMount() {
    this.props.rewardsFetch();
  }
  onButtonPress() {
    const { rewardName, description, pointsValue } = this.props;
    let duplicate = false;
    const rewards = this.props.rewards;
    _.map(rewards, function(item) {
      if (rewardName === item.rewardName) {
        duplicate = true;
      }
    });

    if (duplicate == false) {
      this.props.rewardCreate({
        rewardName: rewardName,
        pointsValue: pointsValue,
        description: description
      });
    } else {
      Alert.alert(
        "This Reward Already Exists",
        "Try adding a new reward",
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

  render() {
    return (
      <Card>
        <RewardForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
      </Card>
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

export default connect(
  mapStateToProps,
  {
    rewardCreate,
    rewardsFetch
  }
)(RewardCreate);
