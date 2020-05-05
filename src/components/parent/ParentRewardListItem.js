import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modal";
import { rewardFetch } from "../../actions/ParentActions";
import { rewardRequestSend } from "../../actions/ChildActions";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  rewardRequestsFetch,
  rewardRequestAccept,
  rewardRequestReject,
  rejectionReasonChange
} from "../../actions/ParentActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ParentRewardListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount() {
    loc(this);
  }

  componentWillUnmount() {
    rol();
  }

  onEditPress() {
    // edit the chore
    this.setState({ isModalVisible: !this.state.isModalVisible });
    Actions.rewardEdit({ reward: this.props.reward });
  }

  onButtonPress(activeUserName, uid, pointsValue, rid, rewardName) {
    // submit a completion
    this.props.rewardRequestSend(
      activeUserName,
      uid,
      pointsValue,
      rid,
      rewardName
    );
  }

  render() {
    const rewardName = this.props.reward.rewardName;
    const pointsValue = this.props.reward.pointsValue;
    const rid = this.props.reward.rid;
    const uid = this.props.activeUser.uid;
    const activeUserName = this.props.activeUser.name;

    return (
      // maybe i want to remove the flex on this...
      <View style={{ flex: 1 }}>
        <View style={{ width: wp("50%") }}>
          <TouchableWithoutFeedback
            value={this.props.reward.rewardName}
            onPress={this.toggleModal}
          >
            <View style={styles.childStyle}>
              <View style={styles.choreStyle}>
                <Text style={styles.choreNameStyle}>
                  {rewardName}Pareent Reward List Item
                </Text>
                <Text style={styles.choreInfoStyle}>{pointsValue}</Text>
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
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
                    title="Reward Name do"
                    detail={rewardName}
                  />

                  <Cell
                    cellStyle="RightDetail"
                    title="Reward Value"
                    detail={pointsValue}
                  />
                </Section>
              </TableView>
            </ScrollView>
            <Text
              style={{
                alignSelf: "center",
                // fontSize: wp("2%"),
                textDecorationLine: "underline",
                fontWeight: "bold"
              }}
            >
              Details
            </Text>
            <Text style={styles.modalTextStyle}>Reward Name: {rewardName}</Text>
            <Text style={styles.modalTextStyle}>
              Reward Value: {pointsValue}
            </Text>
            {/* <Text style={styles.modalTextStyle}>Day: {day}</Text>
            <Text style={styles.modalTextStyle}>
              Description: {description}
            </Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
                // paddingTop: 10
              }}
            >
              <TouchableOpacity
                onPress={this.onEditPress.bind(this)}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </TouchableOpacity>
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
    // flex: 1,
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
    fontSize: wp("4%"),
    paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  choreStyle: {
    // flex: 1,
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
  stage: {
    backgroundColor: "#EFEFF4"
    // paddingTop: 20
    // paddingBottom: 20
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

export default connect(mapStateToProps, { rewardFetch, rewardRequestSend })(
  ParentRewardListItem
);
