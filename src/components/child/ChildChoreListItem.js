import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import {
  childChoresFetch,
  completionRequestSend
} from "../../actions/ChildActions";
import { Actions } from "react-native-router-flux";

class ChildChoreListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onEditPress() {
    // edit the chore
    this.setState({ isModalVisible: !this.state.isModalVisible });
    Actions.choreEdit({ chore: this.props.chore });
  }

  onButtonPress(choreName, day, description, pointsValue, cid, child, uid) {
    // submit a completion
    Alert.alert(
      "Logout",
      "Are you sure you want to submit this chore?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.completionRequestSend(
              choreName,
              day,
              description,
              pointsValue,
              cid,
              child,
              uid
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;
    const rejectionReason = this.props.chore.rejectionReason;
    const status = this.props.chore.status;
    const { description, pointsValue, cid, child } = this.props.chore;
    const uid = this.props.activeUser.uid;

    let submitOption;

    if (status === "In-Progress" || status === "Rework") {
      submitOption = (
        <TouchableOpacity
          onPress={this.onButtonPress.bind(
            this,
            choreName,
            day,
            description,
            pointsValue,
            cid,
            child,
            uid
          )}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      );
    } else if (status === "Submitted") {
      submitOption = <Text>Submitted</Text>;
    } else {
      submitOption = <Text>Complete</Text>;
    }

    let rejectionReasonView;
    if (rejectionReason != "") {
      rejectionReasonView = (
        <Text style={styles.modalTextStyle}>
          Rejection Reason: {rejectionReason}
        </Text>
      );
    } else {
      rejectionReasonView = <View></View>;
    }

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View style={styles.childStyle}>
            <View style={styles.choreStyle}>
              <Text style={styles.choreNameStyle}>{choreName}</Text>
              <Text style={styles.choreInfoStyle}>{day}</Text>
              <Text style={styles.choreInfoStyle}>{status}</Text>
              {submitOption}
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
            <Text
              style={{
                alignSelf: "center",
                fontSize: 28,
                textDecorationLine: "underline",
                fontWeight: "bold"
              }}
            >
              Details
            </Text>
            <Text style={styles.modalTextStyle}>Chore Name: {choreName}</Text>
            {rejectionReasonView}
            <Text style={styles.modalTextStyle}>Day: {day}</Text>
            <Text style={styles.modalTextStyle}>Status: {status}</Text>

            <Text style={styles.modalTextStyle}>
              Description: {description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10
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
    backgroundColor: "powderblue"
    // width: Dimensions.get("window").width
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

export default connect(
  mapStateToProps,
  { childChoresFetch, completionRequestSend }
)(ChildChoreListItem);
