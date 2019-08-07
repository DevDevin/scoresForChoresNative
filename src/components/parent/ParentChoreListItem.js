import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Text, View, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import { choresFetch } from "../../actions/ParentActions";

class ParentChoreListItem extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;
    const description = this.props.chore.description;

    const childName = this.props.chore.child;
    console.log(this.props.activeUser.status);

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View>
            <View style={styles.choreStyle}>
              <Text style={styles.choreNameStyle}>{choreName}</Text>
              <Text style={styles.choreInfoStyle}>
                {day}: {childName}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: "powderblue" }}>
            <Text style={styles.modalTextStyle}>Child Name: {childName}</Text>
            <Text style={styles.modalTextStyle}>Chore Name: {choreName}</Text>
            <Text style={styles.modalTextStyle}>Day: {day}</Text>
            <Text style={styles.modalTextStyle}>
              Description: {description}
            </Text>
            <Button title="Hide modal" onPress={this.toggleModal} />
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
    fontSize: 24
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  { choresFetch }
)(ParentChoreListItem);
