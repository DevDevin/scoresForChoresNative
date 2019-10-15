import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, View, ScrollView } from "react-native";
import { earnedRewardsFetch } from "../../actions/ChildActions";
import EarnedRewardsListItem from "./EarnedRewardsListItem";

class EarnedRewardsList extends Component {
  componentWillMount() {
    this.props.earnedRewardsFetch(this.props.activeUser.name);
  }

  render() {
    const earnedRewards = this.props.earnedRewards;

    return (
      <View>
        <ScrollView>
          <View>
            <FlatList
              data={earnedRewards}
              renderItem={({ item }) => (
                <EarnedRewardsListItem earnedReward={item} />
              )}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const earnedRewards = _.map(state.earnedRewards, (val, rid) => {
    return { ...val, rid };
  });
  return { earnedRewards: earnedRewards, activeUser: state.auth.activeUser };
};

export default connect(
  mapStateToProps,
  { earnedRewardsFetch }
)(EarnedRewardsList);
