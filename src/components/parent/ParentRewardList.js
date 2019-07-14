import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { rewardsFetch } from "../../actions/ParentActions";
import RewardListItem from "../RewardListItem";
import { Text, View } from "react-native";

class ParentRewardList extends Component {
  componentWillMount() {
    this.props.rewardsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ rewards }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(rewards);
  }

  renderRow(reward) {
    return <RewardListItem reward={reward} />;
  }

  render() {
    const rewards = this.props.rewards;
    console.log("rewards: ", rewards);

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
  const rewards = _.map(state.rewards, (val, cid) => {
    return { ...val, cid };
  });
  return { rewards: rewards };
};

export default connect(
  mapStateToProps,
  { rewardsFetch }
)(ParentRewardList);
