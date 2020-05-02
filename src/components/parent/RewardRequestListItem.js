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
  TextInput,
  Image,
  ScrollView
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class RewardRequestListItem extends Component {
  state = {
    isModalVisible: false,
    rejectionReason: ""
  };

  componentDidMount() {
    loc(this);
  }

  componentWillUnmount() {
    rol();
  }

  componentWillMount() {
    this.props.rewardRequestsFetch();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onRowPress(activeUser) {
    // actions.something
  }

  onAccept(childName, uid, pointsValue, rid, rewardName, rewardDescription) {
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
            this.props.rewardRequestAccept(
              childName,
              uid,
              pointsValue,
              rid,
              rewardName,
              rewardDescription
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  onReject(
    childName,
    uid,
    pointsValue,
    rid,
    rewardName,
    rejectionReason,
    rewardDescription
  ) {
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
              rejectionReason,
              rewardDescription
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
    const rewardDescription = this.props.rewardRequest.rewardDescription;
    const uid = this.props.rewardRequest.uid;
    const rid = this.props.rewardRequest.rid;
    const rewardName = this.props.rewardRequest.rewardName;
    const rejectionReason = this.state.rejectionReason;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: wp("95%") }}>
          <View style={styles.childStyle}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "powderblue"
                }}
              >
                <Image source={require("../../Images/completionRequest.png")} />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "skyblue"
                }}
              >
                <Text style={styles.choreNameStyle}>{rewardName}</Text>

                <Text
                  style={{
                    fontSize: wp("4.5%"),
                    // paddingLeft: 15,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: wp("1%")
                  }}
                >
                  {childName}
                </Text>

                <View
                  style={{
                    // flex: 1,
                    flexDirection: "row",
                    // justifyContent: "center",
                    // alignItems: "center",
                    paddingBottom: wp("2%")
                  }}
                >
                  <TouchableOpacity
                    onPress={this.onAccept.bind(
                      this,
                      childName,
                      uid,
                      pointsValue,
                      rid,
                      rewardName,
                      rewardDescription
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
          </View>
        </View>
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
            <View style={{ marginTop: wp("5%") }}>
              <View style={styles.containerStyle}>
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
                // padding: 5,
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
                  rejectionReason,
                  rewardDescription
                )}
              >
                Submit
              </Button>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                // padding: 5,
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
  choreNameStyle: {
    fontSize: wp("6%"),
    // paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
    // paddingBottom: 5
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
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: wp("2%"),
    backgroundColor: "powderblue"
  },
  buttonStyle: {
    width: wp("25%"),
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: wp("1%"),
    marginRight: wp("1%")
  },
  textStyle: {
    alignSelf: "center",
    fontSize: wp("4%"),
    fontWeight: "600",
    paddingTop: wp("2%"),
    paddingBottom: wp("2%")
  },
  inputStyle: {
    color: "#000",
    // paddingRight: 5,
    // paddingLeft: 5,
    fontSize: wp("5%"),
    lineHeight: wp("5%"),
    flex: 2
  },
  containerStyle: {
    borderBottomWidth: 1,
    // padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    alignItems: "center"
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
