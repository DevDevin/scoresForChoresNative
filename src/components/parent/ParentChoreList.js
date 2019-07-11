import React, { Component } from "react";
import _ from "lodash";
import { ListView } from "react-native";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import ListItem from "../common";
import { choresFetch } from "../../actions/ParentActions";

class ParentChoreList extends Component {
  componentWillMount() {
    this.props.choresFetch();
    console.log(this.props);
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
    return <ListItem chore={chore} />;
  }

  render() {
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
  const chores = _.map(state.chores, (val, uid) => {
    // return { ...val, uid };
    console.log("state.chores: ", ...val, uid);
  });
  return { chores };
};

export default connect(
  mapStateToProps,
  { choresFetch }
)(ParentChoreList);
