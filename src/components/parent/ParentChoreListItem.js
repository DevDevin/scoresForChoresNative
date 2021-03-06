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
import { Actions } from "react-native-router-flux";
import {
  choresFetch,
  choreDelete,
  choreUpdate
} from "../../actions/ParentActions";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ParentChoreListItem extends Component {
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
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

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
    const status = this.props.chore.status;

    const childName = this.props.chore.child;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: wp("95%") }}>
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
                <Text style={styles.generalStyle}>{choreName} </Text>
                {/* child name and button view */}
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: wp("4%")
                      }}
                    >
                      ({day}){" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: wp("4%")
                      }}
                    >
                      {childName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      onPress={this.onButtonPress.bind(this, cid)}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.textStyle}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* child name and button view */}
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
                    title="Chore Name"
                    detail={choreName}
                  />
                  <Cell
                    cellStyle="Subtitle"
                    title="Chore Description"
                    detail={description}
                  />
                  <Cell
                    cellStyle="RightDetail"
                    title="Points Value"
                    detail={this.props.chore.pointsValue}
                  />
                  <Cell
                    cellStyle="RightDetail"
                    title="Child Assigned To"
                    detail={childName}
                  />
                  <Cell
                    cellStyle="RightDetail"
                    title="Status"
                    detail={status}
                  />
                  <Cell
                    cellStyle="RightDetail"
                    title="Day Assigned"
                    detail={day}
                  />
                </Section>
              </TableView>
            </ScrollView>

            <View
              style={{
                // flexDirection: "row",
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
  generalStyle: {
    fontSize: wp("6%"),
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
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: wp("2%"),
    backgroundColor: "powderblue"
    // width: Dimensions.get("window").width
  },
  buttonStyle: {
    // width: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 14,
    marginRight: 14,
    marginTop: wp("2%"),
    marginBottom: wp("2%"),
    alignSelf: "stretch"
  },
  textStyle: {
    alignSelf: "center",
    fontSize: wp("4%"),
    fontWeight: "600",
    paddingTop: wp("2%"),
    paddingBottom: wp("2%")
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
