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
import Modal from "react-native-modal";
import { CardSection } from "./common";
import { rewardFetch } from "../actions/ParentActions";
import { Button } from "../components/common";

class RewardListItem extends Component {
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

  onRowPress(activeUser) {
    // actions.something
  }

  render() {
    const rewardName = this.props.reward.rewardName;
    const pointsValue = this.props.reward.pointsValue;

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          value={this.props.reward.rewardName}
          onPress={this.toggleModal}
        >
          <View style={styles.childStyle}>
            <View style={styles.choreStyle}>
              <Text style={styles.choreNameStyle}>{rewardName}</Text>
              <Text style={styles.choreInfoStyle}>{pointsValue}</Text>
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
  { rewardFetch }
)(RewardListItem);
