import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import {
  childChoresFetch,
  completionRequestSend,
  undoCompletionRequest
} from "../../actions/ChildActions";
import { Cell, Section, TableView } from "react-native-tableview-simple";

class ChildChoreListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  undoRequest(choreName, day, description, pointsValue, cid, child, uid) {
    // undo completion request
    this.props.undoCompletionRequest(
      cid,
      choreName,
      day,
      child,
      description,
      pointsValue
    );
  }

  onButtonPress(choreName, day, description, pointsValue, cid, child, uid) {
    // submit a completion
    Alert.alert(
      "Delete Chore",
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
      submitOption = (
        <TouchableOpacity
          onPress={this.undoRequest.bind(
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
          <Text style={styles.textStyle}>Undo</Text>
        </TouchableOpacity>
      );
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
            <View
              style={{
                flex: 0.4,
                backgroundColor: "powderblue",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image source={require("../../Images/choreList.png")} />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "skyblue",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.choreNameStyle}>{choreName}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", paddingTop: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.choreInfoStyle}>({day})</Text>
                  <Text style={styles.choreInfoStyle}>{status}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 7
                  }}
                >
                  {submitOption}
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={
              {
                //  backgroundColor: "#EFEFF4",
                // justifyContent: "center"
              }
            }
          >
            <ScrollView contentContainerStyle={styles.stage}>
              <TableView>
                <Section header="" footer="">
                  <Cell cellStyle="Basic" title="Details" />
                  <Cell
                    cellStyle="RightDetail"
                    title="Chore Name"
                    detail={choreName}
                  />
                  <Cell
                    cellStyle="Subtitle"
                    title="Description"
                    detail={description}
                  />
                  <Cell
                    cellStyle="RightDetail"
                    title="Completion Status"
                    detail={status}
                  />
                  <Cell
                    cellStyle="RightDetail"
                    title="Day Assigned"
                    detail={day}
                  />
                  <Cell
                    cellStyle="Subtitle"
                    title="Rejection Reason"
                    detail={rejectionReason}
                  />
                </Section>
              </TableView>
            </ScrollView>

            <View
              style={{
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20
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
    flexDirection: "row",
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
    // width: 200,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 16,
    marginRight: 16
    // paddingBottom: 5
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  stage: {
    // backgroundColor: "#EFEFF4"
    // paddingTop: 20
    // paddingBottom: 20
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, {
  childChoresFetch,
  completionRequestSend,
  undoCompletionRequest
})(ChildChoreListItem);
