import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Card } from "../common/index";

class ChildHome extends Component {
  onChoreListPress() {
    Actions.childChoreList();
  }

  onRewardStore() {
    Actions.childRewardStore();
  }

  render() {
    const { name } = this.props.activeUser;

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text>Hello {name}</Text>
        <TouchableWithoutFeedback onPress={this.onChoreListPress.bind(this)}>
          <View style={styles.viewStyle}>
            <Text>Chore List</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onRewardStore.bind(this)}>
          <View style={styles.viewStyle}>
            <Text>Rewards Store</Text>
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
    flex: 1,
    paddingBottom: 15
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
)(ChildHome);
