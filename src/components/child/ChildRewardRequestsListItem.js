import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import { rewardRequestsFetch } from "../../actions/ParentActions";
import {
  rewardRequestSend2,
  deleteRewardRequest
} from "../../actions/ChildActions";

class ChildRewardRequestsListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onRowPress(activeUser) {
    // actions.something
  }

  onButtonPress(activeUserName, uid, pointsValue, rid, rewardName) {
    // submit a completion

    Alert.alert(
      "Logout",
      "Are you sure you want to request this reward?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.rewardRequestSend2(
              activeUserName,
              uid,
              pointsValue,
              rid,
              rewardName
            );
            // this.props.setActiveUser(activeUserObject);
          }
        }
      ],
      { cancelable: false }
    );
  }

  // delete reward request with reward rewquest id passed in.
  onDeleteRewardRequest(rid) {
    Alert.alert(
      "Logout",
      "Are you sure you want to delete this reward rewquest?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.deleteRewardRequest(rid);

            // this.props.setActiveUser(activeUserObject);
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const activeUserName = this.props.activeUser.name;
    const childName = this.props.rewardRequest.childName;
    const pointsValue = this.props.rewardRequest.pointsValue;
    const uid = this.props.rewardRequest.uid;
    const rid = this.props.rewardRequest.rid;
    const rewardName = this.props.rewardRequest.rewardName;
    const rejectionReason = this.props.rewardRequest.rejectionReason;
    const rewardStatus = this.props.rewardRequest.status;
    console.log("rewardRequests prop: ", this.props.rewardRequest);

    let reSubmitButton;

    let rejectionReasonView;
    if (rejectionReason != "") {
      rejectionReasonView = (
        <View>
          <Text>Rejection Reason: {rejectionReason} </Text>
        </View>
      );
    } else {
      rejectionReasonView = <View></View>;
    }

    if (rewardStatus === "Rejected") {
      reSubmitButton = (
        <View>
          <TouchableOpacity
            onPress={this.onButtonPress.bind(
              this,
              activeUserName,
              uid,
              pointsValue,
              rid,
              rewardName
            )}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>Resubmit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onDeleteRewardRequest.bind(this, rid)}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>Remove</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (rewardStatus === "Submitted") {
      reSubmitButton = (
        <TouchableOpacity
          onPress={this.onDeleteRewardRequest.bind(this, rid)}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Undo Submit</Text>
        </TouchableOpacity>
      );
    } else {
      reSubmitButton = <View></View>;
    }

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View style={styles.childStyle}>
            <View style={styles.choreStyle}>
              <Text style={styles.choreNameStyle}>{rewardName}</Text>
              <Text style={styles.choreInfoStyle}>{pointsValue}</Text>
              <Text style={styles.choreInfoStyle}>{rewardStatus}</Text>
              {reSubmitButton}

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              ></View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              backgroundColor: "powderblue",
              justifyContent: "center"
            }}
          >
            {rejectionReasonView}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10
              }}
            >
              <TouchableOpacity
                onPress={this.toggleModal}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  choreNameStyle: {
    fontSize: 26,
    paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
  },
  childStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "powderblue",
    width: Dimensions.get("window").width
  },
  choreInfoStyle: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  choreStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "skyblue",
    alignItems: "center",
    borderColor: "#ddd"
  },
  modalTextStyle: {
    fontSize: 24,
    paddingLeft: 5
  },
  buttonStyle: {
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, {
  rewardRequestsFetch,
  rewardRequestSend2,
  deleteRewardRequest
})(ChildRewardRequestsListItem);
