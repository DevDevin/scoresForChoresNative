import _ from "lodash";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { View, FlatList, ActivityIndicator } from "react-native";
import { usersFetch, loadingUsersEnd } from "../actions/AuthActions";
import ActionButton from "react-native-action-button";
import UserListItem from "./UserListItem";
import Spinner from "react-native-loading-spinner-overlay";

class ChooseUser extends Component {
  state = {
    loading: true
  };
  componentWillMount() {
    this.props.usersFetch();
  }

  componentDidMount() {
    this.props.loadingUsersEnd();
  }

  onButtonPress() {
    console.log("addUserPress");
    Actions.userCreate();
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          // textStyle={styles.spinnerTextStyle}
          textStyle={{ color: "#FFF" }}
          overlayColor="skyblue"
        />
      );
    }

    return <View></View>;
  }

  render() {
    const users = this.props.users;

    console.log("this.props.loading: ", this.props.loading);

    // i may want to set the loading in the login action as well. Thats how its being done in other projects.

    return (
      <View style={{ flex: 1 }}>
        {this.renderSpinner()}
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
  return { users, loading: state.loading.loading };
};

export default connect(
  mapStateToProps,
  { usersFetch, loadingUsersEnd }
)(ChooseUser);
