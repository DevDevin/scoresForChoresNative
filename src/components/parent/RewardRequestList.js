import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { FlatList, View } from "react-native";
import { rewardRequestsFetch } from "../../actions/ParentActions";
import RewardRequestListItem from "./RewardRequestListItem";

class RewardRequestList extends Component {
  componentWillMount() {
    this.props.rewardRequestsFetch();
  }

  onButtonPress() {
    console.log("addUserPress");
    Actions.userCreate();
  }

  render() {
    const rewardRequests = this.props.rewardRequests;

    return (
      <View>
        <FlatList
          data={rewardRequests}
          renderItem={({ item }) => (
            <RewardRequestListItem rewardRequest={item} />
          )}
        />
      </View>
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
)(RewardRequestList);
