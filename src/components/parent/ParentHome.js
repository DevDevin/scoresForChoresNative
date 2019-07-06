import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { CardSection, Card } from "../common/index";
import { setActiveUser } from "../../actions/AuthActions";

class ParentHome extends Component {
  onChoreListPress() {
    Actions.parentChoreList();
  }

  onRewardListPress() {
    Actions.parentRewardList();
  }

  onCompletionRequestPress() {
    Actions.completionRequests();
  }

  render() {
    const { name } = this.props.activeUser;

    return (
      <Card>
        <Text>Hello {name}</Text>
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
      </Card>
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
    paddingLeft: 15
  }
};

const mapStateToProps = state => {
  console.log("activeUserData: ", state.auth.activeUser.name);
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  { setActiveUser }
)(ParentHome);
