import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { earnedRewardsFetch } from "../../actions/ChildActions";
import EarnedRewardsListItem from "./EarnedRewardsListItem";

class EarnedRewardsList extends Component {
  componentWillMount() {
    this.props.earnedRewardsFetch(this.props.activeUser.name);

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ earnedRewards }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(earnedRewards);
  }

  renderRow(earnedReward) {
    return <EarnedRewardsListItem earnedReward={earnedReward} />;
  }

  render() {
    const earnedRewards = this.props.earnedRewards;

    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
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
