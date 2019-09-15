import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { FlatList } from "react-native";
import { choresFetch } from "../../actions/ParentActions";
import ParentChoreListItem from "./ParentChoreListItem";
import { View, Text } from "react-native";
import ActionButton from "react-native-action-button";

class ParentChoreList extends Component {
  componentWillMount() {
    this.props.choresFetch();
  }

  onButtonPress() {
    console.log("addUserPress");
    Actions.choreCreate();
  }

  render() {
    const chores = this.props.chores;

    return (
      <View>
        <Text>Chore Manager</Text>
        <View>
          <FlatList
            data={chores}
            renderItem={({ item }) => <ParentChoreListItem chore={item} />}
          />
        </View>
        <View>
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
      </View>
      // where there are not users the view is not tall enough to be able to click on the floating button. I can add an view below that is always tall enough to include room for the button and is always at the bottom
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
