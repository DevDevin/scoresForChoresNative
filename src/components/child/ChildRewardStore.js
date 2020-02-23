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
  TouchableOpacity,
  Alert,
  BackHandler
} from "react-native";
import { rewardRequestsFetch } from "../../actions/ParentActions";
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
    stateRefresh: true,
    pointsValue: "",
    rewardName: "",
    description: ""
  };

  ///// back button example ////////
  componentDidMount() {
    // this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.childRewardManager();
    return true;
  }

  ////////////////////////////////////////

  toggleModal = (pointsValue, rewardName, description) => {
    this.setState({
      pointsValue: pointsValue,
      rewardName: rewardName,
      description: description
    });

    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onButtonPress(
    activeUserName,
    pointsValue,
    rid,
    rewardName,
    currentPoints,
    uid,
    rewardDescription
  ) {
    // submit a completion
    // the uid being passed in is nothing. If i can fix this it will fix most other things.
    const activeUserObject = this.props.activeUser;

    Alert.alert(
      "Logout",
      "Are you sure you want to request this reward?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.rewardRequestSend2(
              activeUserName,
              pointsValue,
              rid,
              rewardName,
              activeUserObject,
              currentPoints,
              uid,
              rewardDescription
            );
            // this.props.setActiveUser(activeUserObject);
          }
        }
      ],
      { cancelable: false }
    );
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

  componentDidMount() {
    this._start();
  }

  componentWillMount() {
    this.props.usersFetch();
    this.props.rewardsFetch();
    this.props.rewardRequestsFetch();
  }

  renderRequestButton(
    activeUserName,
    pointsValue,
    rid,
    rewardName,
    currentPoints,
    uid,
    rewardDescription
  ) {
    if (currentPoints >= pointsValue) {
      return (
        <TouchableOpacity
          onPress={this.onButtonPress.bind(
            this,
            activeUserName,
            pointsValue,
            rid,
            rewardName,
            currentPoints,
            uid,
            rewardDescription
          )}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Request</Text>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }

  render() {
    const activeUserName = this.props.activeUser.name;
    const users = this.props.users;
    // const activeUserObject = this.props.activeUser;
    const uid = this.props.activeUser.uid;

    let { slideUp, SlideInLeft } = this.state;
    const rewards = this.props.rewards;
    const activeUser = this.props.activeUser;

    const earnedPoints = this.props.activeUser.earnedPoints;

    const currentUser = _.filter(users, function(item) {
      return item.name === activeUserName;
    });

    const currentPoints = currentUser[0].earnedPoints;
    const uid2 = currentUser[0].uid;
    // this.setState({ currentPoints: currentPoints });

    const rewardRequests = this.props.rewardRequestSend;
    //map through the reward requests and compare with the rewards. If the reward Request exists with the current child then
    // have a undo button available.
    _.map(rewardRequests, item => {});

    return (
      <View style={{ backgroundColor: "grey", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            elevation: 5
          }}
        >
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
            <Text
              style={{
                fontSize: 24,
                color: "white",
                padding: 7
              }}
            >
              Points Earned: {currentPoints}
            </Text>
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
            <TouchableOpacity
              onPress={() => {
                Actions.rewardRequests();
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Cochin",
                  color: "black",
                  padding: 7
                }}
              >
                Reward Requests
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

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
                      onPress={this.toggleModal.bind(
                        this,
                        item.pointsValue,
                        item.rewardName,
                        item.description
                      )}
                    >
                      <View style={styles.childStyle}>
                        <View style={styles.choreStyle}>
                          <Text style={styles.choreNameStyle}>
                            {item.rewardName}
                          </Text>
                          <Text style={styles.choreInfoStyle}>
                            {item.pointsValue}
                          </Text>

                          {this.renderRequestButton(
                            activeUserName,
                            item.pointsValue,
                            item.rid,
                            item.rewardName,
                            currentPoints,
                            uid,
                            item.description
                          )}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                )}
              />
            </Animated.View>
          </View>
        </ScrollView>
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
              Reward Name: {this.state.rewardName}
            </Text>
            <Text style={styles.modalTextStyle}>
              Reward Value: {this.state.pointsValue}
            </Text>
            <Text style={styles.modalTextStyle}>
              Reward Description: {this.state.description}
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

  //then I can filter this chores object by the child name before I pass it into the chore update function

  const rewardRequests = _.map(state.rewardRequests, (val, rid) => {
    return { ...val, rid };
  });
  return {
    rewards: rewards,
    activeUser: state.auth.activeUser,
    users: state.users,
    rewardRequests: rewardRequests
  };
};

export default connect(mapStateToProps, {
  rewardsFetch,
  rewardRequestSend2,
  usersFetch,
  setActiveUser,
  rewardRequestsFetch
})(ChildRewardStore);
