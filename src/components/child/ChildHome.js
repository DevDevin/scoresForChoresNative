import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Text, TouchableWithoutFeedback, View, Image } from "react-native";
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d67d72",
            flex: 0.5
          }}
        >
          <Text style={{ fontSize: 24 }}>Hello {name}</Text>
        </View>
        <TouchableWithoutFeedback onPress={this.onChoreListPress.bind(this)}>
          <View style={styles.choreListStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 22 }}>Chore List</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onRewardStore.bind(this)}>
          <View style={styles.rewardStoreStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/rewardList.png")} />
              <Text style={{ fontSize: 22 }}>Reward List</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  choreListStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "powderblue"
  },
  rewardStoreStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "skyblue"
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
