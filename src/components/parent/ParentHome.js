import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { loadingUsersEnd, loadingUsersStart } from "../../actions/AuthActions";

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

  onRewardRequestPress() {
    Actions.rewardRequestList();
  }

  componentDidMount() {
    this.props.loadingUsersEnd();
  }

  renderSmallSpinner() {
    if (this.state.smallSpinner) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return <Text style={{ fontSize: 22 }}>Chore List</Text>;
  }

  render() {
    const { name } = this.props.activeUser;
    console.log("this.props.loading", this.props.loading);

    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "grey" }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 0.5 }}
        >
          <Text
            style={{
              fontSize: 24
            }}
          >
            Hello {name}
          </Text>
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
        <TouchableWithoutFeedback onPress={this.onRewardListPress.bind(this)}>
          <View style={styles.rewardListStyle}>
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
        <TouchableWithoutFeedback
          onPress={this.onCompletionRequestPress.bind(this)}
        >
          <View style={styles.completionRequestsStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/completionRequest.png")} />
              <Text style={{ fontSize: 22 }}>Completion Requests</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.onRewardRequestPress.bind(this)}
        >
          <View style={styles.completionRequestsStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/completionRequest.png")} />
              <Text style={{ fontSize: 22 }}>Reward Requests</Text>
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
    backgroundColor: "powderblue"
  },
  rewardListStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    backgroundColor: "skyblue"
  },
  completionRequestsStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    backgroundColor: "steelblue"
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    loading: state.loading.loading
  };
};

export default connect(
  mapStateToProps,
  { loadingUsersEnd, loadingUsersStart }
)(ParentHome);
