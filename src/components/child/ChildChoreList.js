import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, Picker, ScrollView, Animated } from "react-native";
import { childChoresFetch } from "../../actions/ChildActions";
import ChildChoreListItem from "./ChildChoreListItem";
import { Text, View, Dimensions } from "react-native";
import { CardSection } from "../common/index";

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

  componentDidMount() {
    this._start();
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
      { value: "Monday" },
      { value: "Tuesday" },
      { value: "Wednesday" },
      { value: "Thursday" },
      { value: "Friday" },
      { value: "Saturday" },
      { value: "Sunday" },
      { value: "Monday-Wednesday-Friday" },
      { value: "Tuesday-Thursday" },
      { value: "Daily" }
    ];

    const choreStatuses = [
      { value: "All" },
      { value: "In-Progress" },
      { value: "Complete" },
      { value: "Submited" }
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
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "skyblue",
            flex: 0.1
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
              This week's chores:
            </Text>
          </Animated.View>
        </View>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "skyblue",
              borderColor: "black",
              flex: 1,
              borderRightWidth: 0.2
            }}
          >
            <Text style={styles.labelStyle}> Status </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "skyblue",
              borderColor: "black",
              flex: 1,
              borderRightWidth: 0.2
            }}
          >
            <Text style={styles.labelStyle}> Day </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
            backgroundColor: "powderblue"
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
              {choreStatuses.map(function(status) {
                return (
                  <Picker.Item label={status.value} value={status.value} />
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
              {days.map(function(day) {
                return <Picker.Item label={day.value} value={day.value} />;
              })}
            </Picker>
          </View>
        </View>
        <View style={{ flex: 0.9, backgroundColor: "grey" }}>
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
    fontSize: 18,
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
