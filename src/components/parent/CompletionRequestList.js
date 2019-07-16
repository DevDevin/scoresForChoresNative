import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { completionRequestsFetch } from "../../actions/ParentActions";
import CompletionRequestListItem from "./CompletionRequestListItem";
import { Text, View } from "react-native";

class CompletionRequestList extends Component {
  componentWillMount() {
    this.props.completionRequestsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ completionRequests }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(completionRequests);
  }

  renderRow(completionRequest) {
    return <CompletionRequestListItem completionRequest={completionRequest} />;
  }

  render() {
    const completionRequests = this.props.completionRequests;

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
  const completionRequests = _.map(state.completionRequests, (val, cid) => {
    return { ...val, cid };
  });
  return { completionRequests: completionRequests };
};

export default connect(
  mapStateToProps,
  { completionRequestsFetch }
)(CompletionRequestList);
