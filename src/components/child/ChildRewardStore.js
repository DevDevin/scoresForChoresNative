import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  FlatList,
  View,
  Text,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { rewardsFetch } from "../../actions/ChildActions";
import { usersFetch, setActiveUser } from "../../actions/AuthActions";
import { rewardRequestSend2 } from "../../actions/ChildActions";
import Modal from "react-native-modal";

class ChildRewardStore extends Component {
  state = {
    child: "All",
    slideUp: new Animated.Value(0),
    SlideInLeft: new Animated.Value(0),
    currentPoints: 0,
    isModalVisible: false,
    stateRefresh: true
  };
  // maybe i could do the user instead... or i just need to try to set activeUser again.
  toggleModal = () => {
    console.log("inisde of toggle modal");
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onButtonPress(activeUserName, uid, pointsValue, rid, rewardName) {
    // submit a completion
    // the uid being passed in is nothing. If i can fix this it will fix most other things.
    const activeUserObject = this.props.activeUser;
    this.props.rewardRequestSend2(
      activeUserName,
      uid,
      pointsValue,
      rid,
      rewardName,
      activeUserObject
    );
    this.props.setActiveUser(activeUserObject);
  }

  // animation
  _start = () => {
    return Animated.parallel([
      Animated.timing(this.state.slideUp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.SlideInLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  };

  onEditPress() {
    // edit the chore
    this.setState({ isModalVisible: !this.state.isModalVisible });
    Actions.choreEdit({ chore: this.props.chore });
  }

  componentDidMount() {
    console.log("childRewardStore did mount");
    this._start();
  }

  componentWillMount() {
    this.props.usersFetch();
    this.props.rewardsFetch();
  }

  render() {
    const activeUserName = this.props.activeUser.name;
    const users = this.props.users;
    console.log("users: ", users);
    // const activeUserObject = this.props.activeUser;
    const uid = this.props.activeUser.uid;
    let { slideUp, SlideInLeft } = this.state;
    const rewards = this.props.rewards;
    const activeUser = this.props.activeUser;
    console.log("rewards: ", this.props.rewards);
    const earnedPoints = this.props.activeUser.earnedPoints;
    console.log("earnedPoints1 ", earnedPoints);

    const currentUser = _.filter(users, function(item) {
      return item.name === activeUserName;
    });

    console.log("currentUser **: ", currentUser);
    const currentPoints = currentUser[0].earnedPoints;
    console.log("currentPoints: ", currentPoints);
    // this.setState({ currentPoints: currentPoints });

    return (
      <View style={{ backgroundColor: "grey", flex: 1 }}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: slideUp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0]
                })
              }
            ]
          }}
        >
          <Text style={{ fontSize: 24 }}>Reward Store </Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {
                translateX: slideUp.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-600, 0]
                })
              }
            ]
          }}
        >
          <Text style={{ fontSize: 24 }}>Points Earned: {currentPoints}</Text>
        </Animated.View>

        {/* I may want to move this over to the list item component so that the value refreshes */}
        <ScrollView>
          <View>
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: slideUp.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0]
                    })
                  }
                ]
              }}
            >
              <FlatList
                data={rewards}
                renderItem={({ item }) => (
                  <View>
                    <TouchableWithoutFeedback
                      value={item.rewardName}
                      onPress={this.toggleModal}
                    >
                      <View style={styles.childStyle}>
                        <View style={styles.choreStyle}>
                          <Text style={styles.choreNameStyle}>
                            {item.rewardName}
                          </Text>
                          <Text style={styles.choreInfoStyle}>
                            {item.pointsValue}
                          </Text>
                          <TouchableOpacity
                            onPress={this.onButtonPress.bind(
                              this,
                              activeUserName,
                              item.uid,
                              item.pointsValue,
                              item.rid,
                              item.rewardName
                            )}
                            style={styles.buttonStyle}
                          >
                            <Text style={styles.textStyle}>Submit</Text>
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
                        <Text style={styles.modalTextStyle}>
                          Reward Name: {item.rewardName}
                        </Text>
                        <Text style={styles.modalTextStyle}>
                          Reward Value: {item.pointsValue}
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
                )}
              />
            </Animated.View>
          </View>
        </ScrollView>
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
  const rewards = _.map(state.rewards, (val, rid) => {
    return { ...val, rid };
  });
  return {
    rewards: rewards,
    activeUser: state.auth.activeUser,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { rewardsFetch, rewardRequestSend2, usersFetch, setActiveUser }
)(ChildRewardStore);
