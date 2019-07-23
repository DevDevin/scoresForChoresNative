import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { usersFetch } from "../actions/AuthActions";
import UserListItem from "./UserListItem";
import { Text } from "react-native";

class ChooseUser extends Component {
  componentWillMount() {
    this.props.usersFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ users }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(users);
  }

  renderRow(user) {
    return <UserListItem user={user} />;
  }

  render() {
    return (
      <ListView
        style={{ flex: 1, flexDirection: "row" }}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });
  return { users };
};

export default connect(
  mapStateToProps,
  { usersFetch }
)(ChooseUser);
