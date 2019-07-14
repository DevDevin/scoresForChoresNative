import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { rewardCreate } from "../../actions/ParentActions";
import RewardForm from "./RewardForm";

class RewardCreate extends Component {
  componentDidMount() {}
  onButtonPress() {
    const { rewardName, description, pointsValue } = this.props;

    this.props.rewardCreate({
      rewardName: rewardName,
      pointsValue: pointsValue,
      description: description
    });
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
    pointsValue: pointsValue
  };
};

export default connect(
  mapStateToProps,
  {
    rewardCreate
  }
)(RewardCreate);
