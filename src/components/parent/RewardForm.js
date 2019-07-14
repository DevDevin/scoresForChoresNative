import React, { Component } from "react";
import { View, Picker } from "react-native";
import { connect } from "react-redux";
import { rewardUpdate } from "../../actions/ParentActions";
import { CardSection, Input } from "../common/index";

class RewardForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Reward Name"
            placeholder="reward name"
            value={this.props.rewardName}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "rewardName", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Points Value"
            placeholder="Number of points the reward is worth"
            value={this.props.pointsValue}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "pointsValue", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Reward Description"
            placeholder="Briefly Describe what this reward is."
            value={this.props.description}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "description", value: value })
            }
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { rewardName, description, pointsValue } = state.rewardForm;

  return {
    rewardName: rewardName,
    description: description,
    pointsValue: pointsValue
  };
};

export default connect(
  mapStateToProps,
  { rewardUpdate }
)(RewardForm);
