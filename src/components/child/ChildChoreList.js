import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, Picker, ScrollView, Animated } from "react-native";
import { childChoresFetch } from "../../actions/ChildActions";
import ChildChoreListItem from "./ChildChoreListItem";
import { Text, View, Dimensions, BackHandler } from "react-native";
import { CardSection } from "../common/index";
import { Actions } from "react-native-router-flux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ChildChoreList extends Component {
  state = {
    choreStatus: "All",
    day: "All",
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

  ///// back button example ////////
  componentDidMount() {
    this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.childHome();
    return true;
  }

  componentWillMount() {
    this.props.childChoresFetch(this.props.activeUser.name);
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const chores = this.props.childChores;
    const choreStatus = this.state.choreStatus;
    const day = this.state.day;

    const days = [
      { value: "Mon" },
      { value: "Tues" },
      { value: "Wed" },
      { value: "Thurs" },
      { value: "Fri" },
      { value: "Sat" },
      { value: "Sun" },
      { value: "M-W-F" },
      { value: "T-Th" },
      { value: "Daily" }
    ];

    const choreStatuses = [
      { value: "In-Progress" },
      { value: "Complete" },
      { value: "Submitted" }
    ];

    let filteredChores;
    // need to find a way to pass this.state.choreStatus into this function
    if (choreStatus === "All") {
      filteredChores = chores;
    } else {
      filteredChores = _.filter(chores, function(e) {
        return e.status === choreStatus;
      });
    }

    if (day === "All") {
      filteredChores = filteredChores;
    } else {
      filteredChores = _.filter(filteredChores, function(item) {
        return item.day === day;
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5
            // backgroundColor: "powderblue"
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Picker
              selectedValue={this.state.choreStatus}
              style={{ width: Dimensions.get("window").width / 3 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ choreStatus: itemValue });
              }}
            >
              <Picker.Item label={"Any Status"} value={"All"} />
              {choreStatuses.map(function(status, i) {
                return (
                  <Picker.Item
                    label={status.value}
                    key={i}
                    value={status.value}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Picker
              selectedValue={this.state.day}
              style={{ width: Dimensions.get("window").width / 3 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ day: itemValue });
              }}
            >
              <Picker.Item label={"Any Day"} value={"All"} />
              {days.map(function(day, i) {
                return (
                  <Picker.Item label={day.value} key={i} value={day.value} />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={{ flex: 0.98, backgroundColor: "#EFEFF4" }}>
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
                  data={filteredChores}
                  renderItem={({ item }) => <ChildChoreListItem chore={item} />}
                />
              </Animated.View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  labelStyle: {
    fontSize: wp("4%"),
    paddingLeft: 20,
    // flex: 1,
    color: "black",
    paddingBottom: 5,
    paddingTop: 5
  }
};

const mapStateToProps = state => {
  const chores = _.map(state.chores, (val, cid) => {
    return { ...val, cid };
  });

  return { childChores: chores, activeUser: state.auth.activeUser };
};
export default connect(mapStateToProps, { childChoresFetch })(ChildChoreList);
