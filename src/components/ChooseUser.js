import _ from "lodash";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { View, FlatList } from "react-native";
import { usersFetch } from "../actions/AuthActions";
import ActionButton from "react-native-action-button";
import UserListItem from "./UserListItem";

class ChooseUser extends Component {
  componentWillMount() {
    this.props.usersFetch();
  }

  onButtonPress() {
    console.log("addUserPress");
    Actions.userCreate();
  }

  render() {
    const users = this.props.users;

    return (
      <View style={{ flex: 1 }}>
        <View>
          <FlatList
            data={users}
            renderItem={({ item }) => <UserListItem user={item} />}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 36
            // backgroundColor: "grey"
          }}
        >
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
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
