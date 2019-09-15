import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { completionRequestsFetch } from "../../actions/ParentActions";
import CompletionRequestListItem from "./CompletionRequestListItem";
import { View } from "react-native";

class CompletionRequestList extends Component {
  componentWillMount() {
    this.props.completionRequestsFetch();
  }

  render() {
    const completionRequests = this.props.completionRequests;

    return (
      <View>
        <FlatList
          data={completionRequests}
          renderItem={({ item }) => (
            <CompletionRequestListItem completionRequest={item} />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const completionRequests = _.map(state.completionRequests, (val, cid) => {
    return { ...val, cid };
  });
  return { completionRequests: completionRequests };
};

export default connect(
  mapStateToProps,
  { completionRequestsFetch }
)(CompletionRequestList);
