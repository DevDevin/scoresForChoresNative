import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  FlatList,
  View,
  Picker,
  ScrollView,
  Text,
  Animated,
  Dimensions,
  BackHandler
} from "react-native";
import { rewardRequestsFetch } from "../../actions/ParentActions";
import RewardRequestListItem from "./RewardRequestListItem";
import { usersFetch } from "../../actions/AuthActions";

class RewardRequestList extends Component {
  state = {
    child: "All",
    slideUp: new Animated.Value(0),
    SlideInLeft: new Animated.Value(0)
  };

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
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this._start();
  }

  ///// back button example ////////
  // componentDidMount() {
  //   this._start();
  //   BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  // }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.rewardManager();
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  ////////////////////////////////////////

  componentWillMount() {
    this.props.rewardRequestsFetch();
    this.props.usersFetch();
  }

  onButtonPress() {
    Actions.userCreate();
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const rewardRequestsPre = this.props.rewardRequests;
    const rewardRequests = _.filter(rewardRequestsPre, function(item) {
      return item.status === "Submitted";
    });
    const users = this.props.users;
    const children = _.filter(users, function(item) {
      return item.status === "child";
    });

    child = this.state.child;

    let filteredRequests;
    if (child === "All") {
      filteredRequests = rewardRequests;
    } else {
      filteredRequests = _.filter(rewardRequests, function(item) {
        return item.childName === child;
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>
              Sort by Child:
            </Text>
          </View>

          <Picker
            selectedValue={this.state.child}
            style={{
              flex: 1,
              width: Dimensions.get("window").width / 2
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ child: itemValue })
            }
          >
            <Picker.Item label="All Children:" value="All" />
            {children.map(function(child, i) {
              return (
                <Picker.Item label={child.name} key={i} value={child.name} />
              );
            })}
          </Picker>
        </View>
        <View style={{ flex: 0.9, backgroundColor: "#EFEFF4" }}>
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
                  data={filteredRequests}
                  renderItem={({ item }) => (
                    <RewardRequestListItem rewardRequest={item} />
                  )}
                />
              </Animated.View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const rewardRequests = _.map(state.rewardRequests, (val, rid) => {
    return { ...val, rid };
  });

  ///bring in users
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });

  return { rewardRequests: rewardRequests, users: users };
};

export default connect(mapStateToProps, { rewardRequestsFetch, usersFetch })(
  RewardRequestList
);
