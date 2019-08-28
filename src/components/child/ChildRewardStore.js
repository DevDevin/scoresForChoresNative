import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView, View, Text } from "react-native";
import { rewardsFetch } from "../../actions/ChildActions";
import RewardListItem from "./ChildRewardListItem";

class ChildRewardStore extends Component {
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
    const earnedPoints = this.props.activeUser.earnedPoints;

    return (
      <View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d67d72"
          }}
        >
          <Text style={{ fontSize: 24 }}>Points Earned: {earnedPoints} </Text>
        </View>

        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const rewards = _.map(state.rewards, (val, cid) => {
    return { ...val, cid };
  });
  return { rewards: rewards, activeUser: state.auth.activeUser };
};

export default connect(
  mapStateToProps,
  { rewardsFetch }
)(ChildRewardStore);
