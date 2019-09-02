import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { rewardRequestsFetch } from "../../actions/ParentActions";
import EarnedRewardsListItem from "./EarnedRewardsListItem";

class EarnedRewardsList extends Component {
  componentWillMount() {
    this.props.rewardRequestsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ rewardRequests }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(rewardRequests);
  }

  renderRow(rewardRequest) {
    return <EarnedRewardsListItem rewardRequest={rewardRequest} />;
  }

  render() {
    const rewardRequests = this.props.rewardRequests;

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
  const rewardRequests = _.map(state.rewardRequests, (val, rid) => {
    return { ...val, rid };
  });
  return { rewardRequests: rewardRequests };
};

export default connect(
  mapStateToProps,
  { rewardRequestsFetch }
)(EarnedRewardsList);
