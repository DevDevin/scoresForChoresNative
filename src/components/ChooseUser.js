import _ from "lodash";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { View, FlatList, ScrollView } from "react-native";
import { usersFetch, loadingUsersEnd } from "../actions/AuthActions";
import { FloatingAction } from "react-native-floating-action";
import ActionButton from "react-native-action-button";
import UserListItem from "./UserListItem";
import Spinner from "react-native-loading-spinner-overlay";

class ChooseUser extends Component {
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
        <ScrollView>
          <View>
            <FlatList
              data={users}
              renderItem={({ item }) => <UserListItem user={item} />}
            />
            <FloatingAction
              // actions={actions}
              onPressMain={this.onButtonPress.bind(this)}
            />
          </View>
        </ScrollView>
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
