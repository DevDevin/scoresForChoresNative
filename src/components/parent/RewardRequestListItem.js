import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput
} from "react-native";
import { Actions } from "react-native-router-flux";
// import Modal from "react-native-modal";
import {
  rewardRequestsFetch,
  rewardRequestAccept,
  rewardRequestReject,
  rejectionReasonChange
} from "../../actions/ParentActions";
import { Input, CardSection, Button } from "../common";

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
        <Modal
          visible={this.state.isModalVisible}
          animationType="slide"
          transparent={false}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "grey"
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View style={styles.containerStyle}>
                <Text style={styles.labelStyle}> Description </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={2}
                  placeholder="Rejection Reason"
                  autoCorrect={false}
                  style={styles.inputStyle}
                  value={this.state.reason}
                  onChangeText={value =>
                    this.setState({ rejectionReason: value })
                  }
                />
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                padding: 5,
                backgroundColor: "#fff",
                justifyContent: "flex-start",
                borderColor: "#ddd",
                position: "relative"
              }}
            >
              <Button
                onPress={this.onReject.bind(
                  this,
                  childName,
                  uid,
                  pointsValue,
                  rid,
                  rewardName,
                  rejectionReason
                )}
              >
                Submit
              </Button>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                padding: 5,
                backgroundColor: "#fff",
                justifyContent: "flex-start",
                borderColor: "#ddd",
                position: "relative"
              }}
            >
              <Button
                onPress={() => {
                  this.toggleModal();
                }}
              >
                Close
              </Button>
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
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    alignItems: "center"
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
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

export default connect(mapStateToProps, {
  rewardRequestsFetch,
  rewardRequestAccept,
  rewardRequestReject,
  rejectionReasonChange
})(RewardRequestListItem);
