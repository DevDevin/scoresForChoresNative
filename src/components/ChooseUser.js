import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView, Text, View, FlatList, ListIt } from "react-native";
import { usersFetch } from "../actions/AuthActions";
import ActionButton from "react-native-action-button";
import UserListItem from "./UserListItem";

class ChooseUser extends Component {
  componentWillMount() {
    this.props.usersFetch();
  }

  onButtonPress() {
    console.log("addUserPress");
  }

  render() {
    const users = this.props.users;

    return (
      <View>
        <View>
          <FlatList
            data={users}
            renderItem={({ item }) => <UserListItem user={item} />}
          />
        </View>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={this.onButtonPress.bind(this)}
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
