import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  Alert
} from "react-native";
import {
  completionRequestsFetch,
  requestAccept,
  requestReject
} from "../../actions/ParentActions";
import { CardSection, Input, Button } from "../common/index";

class CompletionRequestListItem extends Component {
  state = {
    modalVisible: false,
    reason: ""
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  onAccept(cid, choreName, day, child, description, pointsValue) {
    Alert.alert(
      "Logout",
      "Are you sure you want to accept this chore?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.requestAccept(
              cid,
              choreName,
              day,
              child,
              description,
              pointsValue,
              this.props.completionRequest.uid
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  onReject(cid, choreName, day, child, description, pointsValue, reason) {
    Alert.alert(
      "Logout",
      "Are you sure you want to reject this chore?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.requestReject(
              cid,
              choreName,
              day,
              child,
              description,
              pointsValue,
              reason
            );
            this.setState({ modalVisible: !this.state.modalVisible });
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const choreName = this.props.completionRequest.choreName;
    const day = this.props.completionRequest.day;
    const cid = this.props.completionRequest.cid;
    const { description, pointsValue } = this.props.completionRequest;
    const child = this.props.completionRequest.child;
    const uid = this.props.completionRequest.uid;
    const completionRequest = this.props.completionRequest;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.childStyle}>
          <View style={styles.choreStyle}>
            <Text style={styles.choreNameStyle}>{choreName}</Text>
            <Text style={styles.choreInfoStyle}>{child}</Text>
            <Text style={styles.choreInfoStyle}>{day}</Text>
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
                  cid,
                  choreName,
                  day,
                  child,
                  description,
                  pointsValue
                )}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.setModalVisible}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <CardSection>
                <Input
                  label="Reason for rejection"
                  placeholder="Rejection Reason"
                  value={this.state.reason}
                  onChangeText={value => this.setState({ reason: value })}
                />
              </CardSection>
              <CardSection>
                <Button
                  onPress={this.onReject.bind(
                    this,
                    cid,
                    choreName,
                    day,
                    child,
                    description,
                    pointsValue,
                    this.state.reason
                  )}
                >
                  Submit
                </Button>
                <Button
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  Close
                </Button>
              </CardSection>
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
    backgroundColor: "powderblue",
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
  { completionRequestsFetch, requestAccept, requestReject }
)(CompletionRequestListItem);
