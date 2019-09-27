import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { choreReset, choresFetch } from "../../actions/ParentActions";

class ChoreReset extends Component {
  componentWillMount() {
    this.props.choresFetch();
  }
  onPress = filteredChores => {
    /////
    this.props.choreReset(filteredChores);
  };

  render() {
    const chores = this.props.chores;
    console.log("chores: ", chores);

    const filteredChores = _.filter(chores, function(item) {
      console.log(
        "inside else: ",
        item.child,
        item.choreName,
        item.day,
        item.status
      );
      console.log("item.isRecuring: ", item.recurring);
      return (item.recuring = true);
    });
    //change it to where recurring = false

    console.log("filteredChores: ", filteredChores);

    return (
      <View>
        <Text>Chore Reset</Text>
        <Button onPress={this.onPress.bind(this, filteredChores)} title="Reset">
          <Text>RESET</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    chores: state.chores
  };
};

export default connect(
  mapStateToProps,
  { choreReset, choresFetch }
)(ChoreReset);
