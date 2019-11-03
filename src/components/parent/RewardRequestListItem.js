import _ from "lodash";
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
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modal";
import {
  rewardRequestsFetch,
  rewardRequestAccept,
  rewardRequestReject,
  rejectionReasonChange
} from "../../actions/ParentActions";
import { Input, Spinner } from "../common";

class RewardRequestListItem extends Component {
  state = {
    isModalVisible: false,
    rejectionReason: ""
  };

  componentWillMount() {
    this.props.rewardRequestsFetch();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onRowPress(activeUser) {
    // actions.something
  }

  onAccept(childName, uid, pointsValue, rid, rewardName) {
    Alert.alert(
      "Logout",
      "Are you sure you want to accept this reward request?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            console.log("uid: ", uid);
            this.props.rewardRequestAccept(
              childName,
              uid,
              pointsValue,
              rid,
              rewardName
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  onReject(childName, uid, pointsValue, rid, rewardName, rejectionReason) {
    Alert.alert(
      "Logout",
      "Are you sure you want to reject this reward request?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.rewardRequestReject(
              childName,
              uid,
              pointsValue,
              rid,
              rewardName,
              rejectionReason
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  onRejectionReasonChange(text) {
    // this.props.rejectionReasonChange(text);
    this.setState({ rejectionReason: text });
  }

  render() {
    const childName = this.props.rewardRequest.childName;
    const pointsValue = this.props.rewardRequest.pointsValue;
    const uid = this.props.rewardRequest.uid;
    console.log("uid original: ", uid);
    const rid = this.props.rewardRequest.rid;
    const rewardName = this.props.rewardRequest.rewardName;
    const rejectionReason = this.state.rejectionReason;

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View style={styles.childStyle}>
            <View style={styles.choreStyle}>
              <Text style={styles.choreNameStyle}>{childName}</Text>
              <Text style={styles.choreInfoStyle}>{pointsValue}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={this.onAccept.bind(
                    this,
                    childName,
                    uid,
                    pointsValue,
                    rid,
                    rewardName
                  )}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.textStyle}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.toggleModal}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.textStyle}>Reject</Text>
                </TouchableOpacity>
              </View>
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
            <Text>Enter your rejection Reason</Text>
            <TouchableOpacity
              onPress={this.onReject.bind(
                this,
                childName,
                uid,
                pointsValue,
                rid,
                rewardName,
                rejectionReason
              )}
              style={styles.buttonStyle}
            >
              <Text style={styles.textStyle}>Okay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleModal}
              style={styles.buttonStyle}
            >
              <Text style={styles.textStyle}>Cancel </Text>
            </TouchableOpacity>

            <View style={styles.cardSectionStyle}>
              <Input
                label="Rejection Reason"
                placeholder="afdafdaf"
                onChangeText={this.onRejectionReasonChange.bind(this)}
                value={this.state.rejectionReason}
              />
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
  },
  cardSectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "powderblue",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  }
};

const mapStateToProps = state => {
  const rewardRequests = _.map(state.rewardRequests, (val, rid) => {
    return { ...val, rid };
  });

  return {
    activeUser: state.auth.activeUser,
    rewardRequests: rewardRequests
  };
};

export default connect(
  mapStateToProps,
  {
    rewardRequestsFetch,
    rewardRequestAccept,
    rewardRequestReject,
    rejectionReasonChange
  }
)(RewardRequestListItem);
