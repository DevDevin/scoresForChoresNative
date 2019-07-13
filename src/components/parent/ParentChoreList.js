import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { choresFetch } from "../../actions/ParentActions";
import ChoreListItem from "../ChoreListItem";
import { Text, View } from "react-native";

class ParentChoreList extends Component {
  componentWillMount() {
    this.props.choresFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ chores }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(chores);
  }

  renderRow(chore) {
    return <ChoreListItem chore={chore} />;
  }

  render() {
    const chores = this.props.chores;

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
  console.log("state.auth.activeUser.name", state.auth.activeUser.name);
  const chores = _.map(state.chores, (val, cid) => {
    return { ...val, cid };
  });
  return { chores: chores };
};

export default connect(
  mapStateToProps,
  { choresFetch }
)(ParentChoreList);
