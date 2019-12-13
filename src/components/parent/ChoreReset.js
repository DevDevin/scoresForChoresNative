import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import { choreReset, choresFetch } from "../../actions/ParentActions";
import { Button } from "../common";
import { Actions } from "react-native-router-flux";

class ChoreReset extends Component {
  componentWillMount() {
    this.props.choresFetch();
  }

  backToHome() {
    Actions.parent();
  }
  onPress = filteredChores => {
    /////
    Alert.alert(
      "Confirm Reset",
      "This will reset the status of your recurring chores and delete non-recurring chores.",
      [
        {
          text: "Confirm",
          onPress: () => {
            this.props.choreReset(filteredChores);
          },
          style: "cancel"
        },
        {
          text: "Cancel",
          onPress: () => Actions.parent(),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const chores = this.props.chores;

    const filteredChores = _.filter(chores, function(item) {
      return (item.recuring = true);
    });

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "grey"
        }}
      >
        <View style={{ elevation: 15 }}>
          <View
            style={{
              padding: 15,
              paddingTop: 25,
              backgroundColor: "steelblue",
              justifyContent: "flex-start",
              position: "relative"
            }}
          >
            <Button onPress={this.onPress.bind(this, filteredChores)}>
              Reset Chores
            </Button>
          </View>
          <View
            style={{
              padding: 15,
              paddingBottom: 25,
              backgroundColor: "steelblue",
              justifyContent: "flex-start",
              position: "relative"
            }}
          >
            <Button onPress={this.backToHome.bind(this)}>Back to Home</Button>
          </View>
        </View>
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

export default connect(mapStateToProps, { choreReset, choresFetch })(
  ChoreReset
);
