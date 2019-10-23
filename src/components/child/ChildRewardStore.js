import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, View, Text, ScrollView } from "react-native";
import { rewardsFetch } from "../../actions/ChildActions";
import RewardListItem from "./ChildRewardListItem";

class ChildRewardStore extends Component {
  componentWillMount() {
    this.props.rewardsFetch();
  }

  render() {
    const rewards = this.props.rewards;
    const earnedPoints = this.props.activeUser.earnedPoints;

    return (
      <View>
        <Text style={{ fontSize: 24 }}>Points Earned: {earnedPoints} </Text>
        {/* I may want to move this over to the list item component so that the value refreshes */}
        <ScrollView>
          <View>
            <FlatList
              data={rewards}
              renderItem={({ item }) => <RewardListItem reward={item} />}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const rewards = _.map(state.rewards, (val, rid) => {
    return { ...val, rid };
  });
  return { rewards: rewards, activeUser: state.auth.activeUser };
};

export default connect(
  mapStateToProps,
  { rewardsFetch }
)(ChildRewardStore);
