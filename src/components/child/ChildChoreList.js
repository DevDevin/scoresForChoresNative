import _ from "lodash";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { childChoresFetch } from "../../actions/ChildActions";
import ChildChoreListItem from "./ChildChoreListItem";
import { Text, View } from "react-native";

class ChildChoreList extends Component {
  componentWillMount() {
    this.props.childChoresFetch(this.props.activeUser.name);
  }

  render() {
    const chores = this.props.childChores;
    console.log("chores: ", chores);

    return (
      <View>
        <FlatList
          data={chores}
          renderItem={({ item }) => <ChildChoreListItem chore={item} />}
        />
      </View>
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
