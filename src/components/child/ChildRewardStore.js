import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, View, Text, ScrollView, Animated } from "react-native";
import { rewardsFetch } from "../../actions/ChildActions";
import RewardListItem from "./ChildRewardListItem";

class ChildRewardStore extends Component {
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
    this._start();
  }

  componentWillMount() {
    this.props.rewardsFetch();
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const rewards = this.props.rewards;
    const earnedPoints = this.props.activeUser.earnedPoints;

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
          <Text style={{ fontSize: 24 }}>Points Earned: {earnedPoints} </Text>
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
                renderItem={({ item }) => <RewardListItem reward={item} />}
              />
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const rewards = _.map(state.rewards, (val, rid) => {
    return { ...val, rid };
  });
  return { rewards: rewards, activeUser: state.auth.activeUser };
};

export default connect(
  mapStateToProps,
  { rewardsFetch }
)(ChildRewardStore);
