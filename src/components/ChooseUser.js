import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView, Text, View, FlatList, ListIt } from "react-native";
import { usersFetch } from "../actions/AuthActions";
import UserListItem from "./UserListItem";

class ChooseUser extends Component {
  componentWillMount() {
    this.props.usersFetch();
    console.log("this.props.users: ", this.props.users);
  }

  render() {
    const users = this.props.users;
    console.log("users: ", users);

    return (
      <View>
        <Text>Hello</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => <UserListItem user={item} />}
        />
      </View>
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
