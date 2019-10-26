import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
  ScrollView
} from "react-native";
import { loadingUsersEnd } from "../../actions/AuthActions";

class ChildHome extends Component {
  state = {
    slideUp: new Animated.Value(0),
    SlideInLeft: new Animated.Value(0)
  };

  // animation
  _start = () => {
    return Animated.parallel([
      Animated.timing(this.state.slideUp, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.SlideInLeft, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true
      })
    ]).start();
  };

  componentDidMount() {
    this.props.loadingUsersEnd();
    this._start();
  }

  onChoreListPress() {
    Actions.childChoreList();
  }

  onRewardStore() {
    Actions.childRewardStore();
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const { name } = this.props.activeUser;

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            flex: 0.5
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
            <Text style={{ fontSize: 24 }}>Hello {name}</Text>
          </Animated.View>
        </View>

        <TouchableWithoutFeedback onPress={this.onChoreListPress.bind(this)}>
          <View style={styles.choreListStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/choreList.png")} />
              <Text style={{ fontSize: 22 }}>Chore List</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.onRewardStore.bind(this)}>
          <View style={styles.rewardStoreStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Image source={require("../../Images/rewardList.png")} />
              <Text style={{ fontSize: 22 }}>Reward List</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  choreListStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "powderblue"
  },
  rewardStoreStyle: {
    height: 100,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    fontSize: 30,
    paddingLeft: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "skyblue"
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  { loadingUsersEnd }
)(ChildHome);
