import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { FlatList, Picker } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { choresFetch } from "../../actions/ParentActions";
import ParentChoreListItem from "./ParentChoreListItem";
import { View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import { usersFetch } from "../../actions/AuthActions";

class ParentChoreList extends Component {
  state = {
    child: "All",
    language: ""
  };
  componentWillMount() {
    this.props.choresFetch();
    this.props.usersFetch();
  }

  onButtonPress() {
    console.log("addUserPress");
    Actions.choreCreate();
  }

  // const childArray = chores.

  render() {
    const chores = this.props.chores;
    console.log("chores.childName: ", chores.name);
    const users = this.props.users;
    console.log("users: ", users);

    // const pickerItem = _.map(users, function(item) {
    //   console.log("item: ", item.name);
    //   return item.name;
    // });

    var pickerItem = users.map(function(user) {
      return { value: user.name };
    });
    console.log("pickerItem: ", pickerItem);
    const child = this.state.child;
    console.log("child: ", child);

    let filteredChores;
    // need to find a way to pass this.state.choreStatus into this function
    if (child === "All") {
      console.log("inside if: ", child);
      filteredChores = chores;
    } else {
      filteredChores = _.filter(chores, function(item) {
        console.log("inside else: ", child);
        return item.child === child;
      });
    }

    return (
      <View>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ child: itemValue })
          }
        >
          {users.map(function(user) {
            return <Picker.Item label={user.name} value={user.name} />;
          })}
        </Picker>
        {/* /*react native material dropdown */}
        {/* <Dropdown label="Child" data={pickerItem} /> */}

        <Text>Chore Manager</Text>
        <View>
          <FlatList
            data={filteredChores}
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

  ///bring in users
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });

  return { chores: chores, users: users };
};

export default connect(
  mapStateToProps,
  { choresFetch, usersFetch }
)(ParentChoreList);
