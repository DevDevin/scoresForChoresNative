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
  Image,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import { rewardRequestsFetch } from "../../actions/ParentActions";
import {
  resubmitRewardRequest,
  deleteRewardRequest,
  earnedRewardSpend
} from "../../actions/ChildActions";
import { usersFetch, setActiveUser } from "../../actions/AuthActions";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ChildRewardRequestsListItem extends Component {
  state = {
    isModalVisible: false
  };

  componentDidMount() {
    loc(this);
    this.props.usersFetch();
  }

  componentWillUnmount() {
    rol();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onRowPress(activeUser) {
    // actions.something
  }

  spendReward(rid) {
    Alert.alert(
      "Spend Reward",
      "Are you sure you want to use spend this reward?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.earnedRewardSpend(rid);
          }
        }
      ],
      { cancelable: false }
    );
  }

  onButtonPress(
    activeUserName,
    uid,
    pointsValue,
    rid,
    rewardName,
    currentPoints,
    rewardDescription
  ) {
    // resubmit a reward request
    const activeUserObject = this.props.activeUser;

    Alert.alert(
      "Request Reward:",
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
            this.props.resubmitRewardRequest(
              activeUserName,
              pointsValue,
              rid,
              rewardName,
              activeUserObject,
              currentPoints,
              uid,
              rewardDescription
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  // delete reward request with reward rewquest id passed in.
  onDeleteRewardRequest(rid) {
    Alert.alert(
      "Delete Reward",
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
    const activeUserObject = this.props.activeUser;
    const activeUserName = this.props.activeUser.name;
    const users = this.props.users;
    const currentUser = _.filter(users, function(item) {
      return item.name === activeUserName;
    });

    const currentPoints = currentUser[0].earnedPoints;
    const childName = this.props.rewardRequest.childName;
    const pointsValue = this.props.rewardRequest.pointsValue;
    const uid = this.props.rewardRequest.uid;
    const rid = this.props.rewardRequest.rid;
    const rewardName = this.props.rewardRequest.rewardName;
    const rejectionReason = this.props.rewardRequest.rejectionReason;
    const rewardStatus = this.props.rewardRequest.status;
    const rewardDescription = this.props.rewardRequest.rewardDescription;

    let reSubmitButton;

    let rejectionReasonView;
    if (rejectionReason != "") {
      rejectionReasonView = (
        <View>
          <Text style={{ fontSize: wp("6%") }}>
            <Text style={{ fontWeight: "bold" }}>Rejection Reason: </Text>
            {rejectionReason}
          </Text>
        </View>
      );
    } else {
      rejectionReasonView = <View></View>;
    }

    if (rewardStatus === "Rejected") {
      reSubmitButton = (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginRight: 5
          }}
        >
          <TouchableOpacity
            onPress={this.onButtonPress.bind(
              this,
              activeUserName,
              uid,
              pointsValue,
              rid,
              rewardName,
              currentPoints,
              rewardDescription
            )}
            style={{
              alignSelf: "stretch",
              backgroundColor: "#fff",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#007aff",
              marginLeft: wp("2%"),
              marginRight: wp("2%"),
              flex: 1
            }}
          >
            <Text style={styles.textStyle}>Resubmit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onDeleteRewardRequest.bind(this, rid)}
            style={{
              alignSelf: "stretch",
              backgroundColor: "#fff",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#007aff",
              // marginLeft: wp("2%"),
              // marginRight: wp("2%"),
              flex: 1
            }}
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
    } else if (rewardStatus === "Accepted") {
      reSubmitButton = (
        <TouchableOpacity
          onPress={this.spendReward.bind(this, rid)}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Spend</Text>
        </TouchableOpacity>
      );
    } else {
      reSubmitButton = <View></View>;
    }

    return (
      <View style={{ flex: 1, width: wp("95%"), alignSelf: "center" }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View style={styles.childStyle}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 0.5,
                  backgroundColor: "powderblue",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image source={require("../../Images/rewardList.png")} />
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "skyblue",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: wp("2%")
                }}
              >
                <Text style={styles.rewardNameStyle}>
                  {rewardName} (
                  <Text style={styles.choreInfoStyle}>{rewardStatus}</Text>)
                </Text>
                {reSubmitButton}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              backgroundColor: "#EFEFF4"
            }}
          >
            <ScrollView contentContainerStyle={styles.stage}>
              <TableView>
                <Section header="" footer="">
                  <Cell cellStyle="Basic" title="Details" />
                  <Cell
                    cellStyle="RightDetail"
                    title="Reward Name"
                    detail={rewardName}
                  />
                  <Cell
                    cellStyle="RightDetail"
                    title="Reward Value"
                    detail={pointsValue}
                  />
                  <Cell
                    cellStyle="Subtitle"
                    title="Description"
                    detail={rewardDescription}
                  />
                </Section>
              </TableView>
            </ScrollView>

            <View
              style={{
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: wp("3%")
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
  stage: {
    backgroundColor: "#EFEFF4"
    // paddingTop: 20
    // paddingBottom: 20
  },
  rewardNameStyle: {
    fontSize: wp("6%"),
    // paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    paddingBottom: wp("1%")
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
    marginTop: wp("3%"),
    backgroundColor: "steelblue"
    // width: Dimensions.get("window").width
  },
  choreInfoStyle: {
    fontSize: wp("4%"),
    // paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  choreStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "steelblue",
    alignItems: "center",
    borderColor: "#ddd"
  },
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: wp("3%"),
    marginRight: wp("3%")
    // alignItems: "center"
  },
  textStyle: {
    alignSelf: "center",
    fontSize: wp("4.5%"),
    fontWeight: "600",
    paddingTop: wp("3%"),
    paddingBottom: wp("3%")
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    users: state.users
  };
};

export default connect(mapStateToProps, {
  rewardRequestsFetch,
  resubmitRewardRequest,
  deleteRewardRequest,
  setActiveUser,
  usersFetch,
  earnedRewardSpend
})(ChildRewardRequestsListItem);
