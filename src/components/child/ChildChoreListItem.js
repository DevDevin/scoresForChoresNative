import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  BackHandler
} from "react-native";
import Modal from "react-native-modal";
import {
  childChoresFetch,
  completionRequestSend,
  undoCompletionRequest
} from "../../actions/ChildActions";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { Actions } from "react-native-router-flux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ChildChoreListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount() {
    loc(this);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    rol(this);
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.childHome();
    return true;
  }

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

  onButtonPress(
    choreName,
    day,
    description,
    pointsValue,
    cid,
    child,
    uid,
    isRecurring
  ) {
    console.log("isRecurring: ", isRecurring);
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
              uid,
              isRecurring
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
    const isRecurring = this.props.chore.isRecurring;
    console.log("this.props.chore: ", this.props.chore);
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
            uid,
            isRecurring
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
      <View style={{ flex: 1, width: wp("95%"), alignSelf: "center" }}>
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
              <View style={{ flex: 1, flexDirection: "row", paddingTop: 7 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 7
                  }}
                >
                  <Text style={styles.choreInfoStyle}>({day})</Text>
                  <Text style={styles.choreInfoStyle}>{status}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
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
                    title="Points Value"
                    detail={pointsValue}
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
                justifyContent: "center",
                alignItems: "center"
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
    fontSize: wp("6%"),
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
    backgroundColor: "powderblue"
  },
  choreInfoStyle: {
    fontSize: wp("5%"),
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
  buttonStyle: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: wp("2%"),
    marginRight: wp("2%"),
    alignSelf: "stretch"
  },
  textStyle: {
    alignSelf: "center",
    fontSize: wp("4%"),
    fontWeight: "600",
    paddingTop: wp("2.5%"),
    paddingBottom: wp("2.5%")
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
