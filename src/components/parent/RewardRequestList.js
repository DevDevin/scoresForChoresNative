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
  Animated
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
    this._start();
  }

  componentWillMount() {
    this.props.rewardRequestsFetch();
    this.props.usersFetch();
  }

  onButtonPress() {
    Actions.userCreate();
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const rewardRequests = this.props.rewardRequests;
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
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "skyblue",
            flex: 0.15
          }}
        >
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
            <Text
              style={{
                fontSize: 24
              }}
            >
              Reward Requests
            </Text>
          </Animated.View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Picker
            selectedValue={this.state.child}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ child: itemValue })
            }
          >
            <Picker.Item label="All" value="All" />
            {children.map(function(child) {
              return <Picker.Item label={child.name} value={child.name} />;
            })}
          </Picker>
        </View>
        <View style={{ flex: 0.85, backgroundColor: "grey" }}>
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

export default connect(
  mapStateToProps,
  { rewardRequestsFetch, usersFetch }
)(RewardRequestList);
