import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { childChoresFetch } from "../../actions/ChildActions";
import ChildChoreListItem from "./ChildChoreListItem";
import { Text, View } from "react-native";

class ChildChoreList extends Component {
  componentWillMount() {
    this.props.childChoresFetch(this.props.activeUser.name);

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ childChores }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(childChores);
  }

  renderRow(childChore) {
    return <ChildChoreListItem chore={childChore} />;
  }

  render() {
    const chores = this.props.childChores;
    console.log("chores: ", chores);

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

  const childChores = _.map(state.chores, (val, cid) => {
    console.log("val: ", val.child);
    return { ...val, cid };
  });

  return { childChores: childChores, activeUser: state.auth.activeUser };
};
export default connect(
  mapStateToProps,
  { childChoresFetch }
)(ChildChoreList);
