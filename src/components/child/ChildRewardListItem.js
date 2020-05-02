import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modal";
import {
  rewardsFetch,
  rewardRequestsFetch,
  rewardDelete,
  rewardUpdate
} from "../../actions/ParentActions";
import { rewardRequestSend } from "../../actions/ChildActions";
import { setActiveUser, updateActiveUser } from "../../actions/AuthActions";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class RewardListItem extends Component {
  state = {
    isModalVisible: false
  };

  componentDidMount() {
    loc(this);
    // this.props.rewardsFetch();
    this.props.rewardRequestsFetch();
  }

  componentWillUnmount() {
    rol();
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  toggleModal = () => {
    this.props.rewardUpdate({
      prop: "rewardName",
      value: this.props.reward.rewardName
    });

    this.props.rewardUpdate({
      prop: "pointsValue",
      value: this.props.reward.pointsValue
    });

    this.props.rewardUpdate({
      prop: "description",
      value: this.props.reward.description
    });

    this.props.rewardUpdate({
      prop: "rid",
      value: this.props.reward.cid
    });

    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onEditPress() {
    // edit the chore
    this.setState({ isModalVisible: !this.state.isModalVisible });
    Actions.rewardEdit({ reward: this.props.reward });
  }

  onButtonPress(rid) {
    // submit a completion

    this.props.rewardDelete(rid);
  }

  render() {
    const rewardName = this.props.reward.rewardName;
    const pointsValue = this.props.reward.pointsValue;
    const rid = this.props.reward.cid;
    const uid = this.props.activeUser.uid;
    const activeUserName = this.props.activeUser.name;
    const rewardRequests = this.props.rewardRequests;
    const description = this.props.reward.description;

    //map through the reward requests and compare with the rewards. If the reward Request exists with the current child then
    // have a undo button available.
    _.map(rewardRequests, item => {});

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ width: wp("95%") }}>
          <TouchableWithoutFeedback
            value={this.props.reward.rewardName}
            onPress={this.toggleModal}
          >
            <View style={styles.childStyle}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "powderblue"
                  }}
                >
                  <Image source={require("../../Images/rewardList.png")} />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "skyblue",
                    paddingBottom: wp("2%")
                  }}
                >
                  <Text style={styles.choreNameStyle}>
                    {rewardName} (
                    <Text style={styles.choreInfoStyle}>{pointsValue}</Text>)
                  </Text>
                  <TouchableOpacity
                    onPress={this.onButtonPress.bind(this, rid)}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.textStyle}>Delete</Text>
                  </TouchableOpacity>
                </View>
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
                    title="Reward Name"
                    detail={rewardName}
                  />
                  <Cell
                    cellStyle="Subtitle"
                    title="Reward Description"
                    detail={description}
                  />

                  <Cell
                    cellStyle="RightDetail"
                    title="Reward Value"
                    detail={pointsValue}
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
  stage: {
    backgroundColor: "#EFEFF4"
    // paddingTop: 20
    // paddingBottom: 20
  },
  choreNameStyle: {
    fontSize: wp("6%"),
    // paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
    // paddingBottom: 5
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
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: wp("2%"),
    backgroundColor: "powderblue"
    // width: Dimensions.get("window").width
  },
  choreInfoStyle: {
    fontSize: wp("5%"),
    // paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: wp("5%"),
    marginRight: wp("5%"),
    alignSelf: "stretch",
    marginTop: wp("2%"),
    marginBottom: wp("3%")
  },
  textStyle: {
    alignSelf: "center",
    fontSize: wp("4%"),
    fontWeight: "600",
    paddingTop: wp("3%"),
    paddingBottom: wp("3%")
  }
};

const mapStateToProps = state => {
  const rewardRequests = _.map(state.rewardRequests, (val, rid) => {
    return { ...val, rid };
  });

  return {
    activeUser: state.auth.activeUser,
    rewardRequests: rewardRequests
  };
};

export default connect(mapStateToProps, {
  rewardsFetch,
  rewardRequestSend,
  setActiveUser,
  updateActiveUser,
  rewardRequestsFetch,
  rewardDelete,
  rewardUpdate
})(RewardListItem);
