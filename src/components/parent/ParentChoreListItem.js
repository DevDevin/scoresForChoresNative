import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import {
  choresFetch,
  choreDelete,
  choreUpdate
} from "../../actions/ParentActions";

class ParentChoreListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onEditPress() {
    // edit the chore
    this.props.choreUpdate({
      prop: "choreName",
      value: this.props.chore.choreName
    });
    this.props.choreUpdate({
      prop: "description",
      value: this.props.chore.description
    });
    this.props.choreUpdate({
      prop: "pointsValue",
      value: this.props.chore.pointsValue
    });
    this.props.choreUpdate({
      prop: "cid",
      value: this.props.chore.cid
    });
    this.props.choreUpdate({
      prop: "status",
      value: this.props.chore.status
    });
    console.log("this.props.chore.status: ", this.props.chore.status);
    this.setState({ isModalVisible: !this.state.isModalVisible });
    Actions.choreEdit({ chore: this.props.chore });
  }

  onButtonPress(cid) {
    Alert.alert(
      "Delete Chore",
      "Are you sure you want to delete this chore?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            ////
            this.props.choreDelete(cid);
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;
    const description = this.props.chore.description;
    const cid = this.props.chore.cid;

    const childName = this.props.chore.child;

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View style={styles.childStyle}>
            <View
              style={{
                backgroundColor: "powderblue",
                flex: 0.6,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image source={require("../../Images/choreList.png")} />
            </View>
            <View
              style={{
                backgroundColor: "skyblue",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.generalStyle}>
                {choreName} <Text style={styles.choreInfoStyle}>({day}) </Text>
              </Text>
              <Text style={styles.choreInfoStyle}>{childName}</Text>
              <TouchableOpacity
                onPress={this.onButtonPress.bind(this, cid)}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
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
            <Text style={styles.modalTextStyle}>Child Name: {childName}</Text>
            <Text style={styles.modalTextStyle}>Chore Name: {choreName}</Text>
            <Text style={styles.modalTextStyle}>Day: {day}</Text>
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
  generalStyle: {
    fontSize: 26,
    paddingLeft: 5,
    // flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
  },
  childStyle: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
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

export default connect(mapStateToProps, {
  choresFetch,
  choreDelete,
  choreUpdate
})(ParentChoreListItem);
