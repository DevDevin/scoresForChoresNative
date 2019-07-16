import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import { rewardFetch } from "../actions/ParentActions";
import { Button } from "../components/common";

class RewardListItem extends Component {
  onRowPress(activeUser) {
    // actions.something
  }

  render() {
    const rewardName = this.props.reward.rewardName;
    const pointsValue = this.props.reward.pointsValue;

    return (
      <TouchableWithoutFeedback
        value={this.props.reward.rewardName}
        onPress={this.onRowPress.bind(this, this.props.reward)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {rewardName} Points: {pointsValue}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  { rewardFetch }
)(RewardListItem);
