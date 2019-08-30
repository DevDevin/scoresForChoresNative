import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  completionRequestsFetch,
  requestAccept,
  requestReject
} from "../../actions/ParentActions";
import { Button, CardSection } from "../common";

class RewardRequestListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onRowPress(activeUser) {
    // actions.something
  }

  onAccept(cid, choreName, day, child, description, pointsValue) {
    console.log("uid: ", this.props.completionRequest.uid);
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

  onReject(cid, choreName, day, child, description, pointsValue) {
    this.props.requestReject(
      cid,
      choreName,
      day,
      child,
      description,
      pointsValue
    );
  }

  render() {
    const choreName = this.props.completionRequest.choreName;
    const day = this.props.completionRequest.day;
    const cid = this.props.completionRequest.cid;
    const { description, pointsValue } = this.props.completionRequest;
    const child = this.props.completionRequest.child;
    const uid = this.props.completionRequest.uid;

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
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
                  onPress={this.onReject.bind(
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
                  <Text style={styles.textStyle}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    backgroundColor: "#d67d72",
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
)(RewardRequestListItem);
