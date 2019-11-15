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
            placeholder="Reward Name"
            value={this.props.rewardName}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "rewardName", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Point Value"
            placeholder="Points the reward is worth"
            value={this.props.pointsValue}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "pointsValue", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Description"
            placeholder="Description of Reward"
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

export default connect(mapStateToProps, { rewardUpdate })(RewardForm);
