import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Card } from "../common/index";

class ParentHome extends Component {
  onChoreListPress() {
    Actions.parentChoreList();
  }

  onRewardListPress() {
    Actions.parentRewardList();
  }

  onCompletionRequestPress() {
    Actions.completionRequestList();
  }

  render() {
    const { name } = this.props.activeUser;

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ flex: 0.5 }}>Hello {name}</Text>
        <TouchableWithoutFeedback onPress={this.onChoreListPress.bind(this)}>
          <View style={styles.viewStyle}>
            <Text>Chore List</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onRewardListPress.bind(this)}>
          <View style={styles.viewStyle}>
            <Text>Reward List</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.onCompletionRequestPress.bind(this)}
        >
          <View style={styles.viewStyle}>
            <Text>Completion Requests</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  {}
)(ParentHome);
