import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  FlatList,
  Picker,
  ScrollView,
  Animated,
  Dimensions,
  BackHandler
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { choresFetch } from "../../actions/ParentActions";
import ParentChoreListItem from "./ParentChoreListItem";
import { View, Text } from "react-native";
import { usersFetch, loadingUsersEnd } from "../../actions/AuthActions";
import Spinner from "react-native-loading-spinner-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class ParentChoreList extends Component {
  state = {
    child: "All",
    language: "",
    day: "All",
    slideUp: new Animated.Value(0),
    SlideInLeft: new Animated.Value(0)
  };

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
  // componentDidMount() {
  //   this._start();
  //   BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  // }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.choreManager();
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  ////////////////////////////////////////

  componentWillMount() {
    this.props.choresFetch();
    this.props.usersFetch();
  }

  onButtonPress() {
    Actions.choreCreate();
  }

  componentDidMount() {
    this.props.loadingUsersEnd();
    this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  // const childArray = chores.

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          // textStyle={styles.spinnerTextStyle}
          textStyle={{ color: "#FFF" }}
          overlayColor="blue"
        />
      );
    }

    return <View></View>;
  }

  // TODO: ON COMPONENTs like the parents chores set loading to true when the choresFetch action is called and set it to
  // false when it is finished. That way I can ensure that the data is ready before the spinner stops. I can
  // still put the timeout function on there just to ensure the spinner is seen if the data happens to load really fast.

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const chores = this.props.chores;
    const users = this.props.users;

    const days = [
      { value: "Mon" },
      { value: "Tues" },
      { value: "Wed" },
      { value: "Thurs" },
      { value: "Fri" },
      { value: "Sat" },
      { value: "Sunday" },
      { value: "M-W-F" },
      { value: "T-Th" },
      { value: "Daily" }
    ];

    var pickerItem = users.map(function(user) {
      return { value: user.name };
    });
    const child = this.state.child;
    const day = this.state.day;

    let filteredChores;
    // need to find a way to pass this.state.choreStatus into this function
    if (child === "All") {
      filteredChores = chores;
    } else {
      filteredChores = _.filter(chores, function(item) {
        return item.child === child;
      });
    }

    if (day === "All") {
      filteredChores = filteredChores;
    } else {
      filteredChores = _.filter(filteredChores, function(item) {
        return item.day === day;
      });
    }

    const children = _.filter(users, function(item) {
      return item.status === "child";
    });

    return (
      <View style={{ flex: 1 }}>
        {this.renderSpinner()}

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "steelblue",
              borderColor: "black",
              flex: 1,
              borderRightWidth: 0.2
            }}
          >
            <Picker
              selectedValue={this.state.child}
              style={{ width: Dimensions.get("window").width / 3 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ child: itemValue })
              }
            >
              <Picker.Item label={"All Chores"} value={"All"} />

              {children.map(function(child, i) {
                return (
                  <Picker.Item label={child.name} key={i} value={child.name} />
                );
              })}
            </Picker>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "steelblue",
              borderColor: "black",
              flex: 1
              // borderRightWidth: 0.2,
            }}
          >
            <Picker
              selectedValue={this.state.day}
              style={{ width: Dimensions.get("window").width / 3 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ day: itemValue });
              }}
            >
              <Picker.Item label={"All Days"} value={"All"} />
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
                    renderItem={({ item }) => (
                      <ParentChoreListItem chore={item} />
                    )}
                  />
                </Animated.View>
              </View>
            </View>
          </ScrollView>
          <FloatingAction
            color="#4280b3"
            style={{ justifyContent: "flex-end" }}
            onPressMain={this.onButtonPress.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  labelStyle: {
    fontSize: wp("4%"),
    // paddingLeft: 20,
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

  ///bring in users
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });

  return { chores: chores, users: users, loading: state.loading.loading };
};

export default connect(mapStateToProps, {
  choresFetch,
  usersFetch,
  loadingUsersEnd
})(ParentChoreList);
