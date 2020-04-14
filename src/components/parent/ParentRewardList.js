import _ from "lodash";
import React, { Component } from "react";
import ActionButton from "react-native-action-button";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  ListView,
  FlatList,
  View,
  ScrollView,
  Text,
  Animated,
  BackHandler
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Spinner from "react-native-loading-spinner-overlay";
import { rewardsFetch } from "../../actions/ParentActions";
import RewardListItem from "../child/ChildRewardListItem";
import { loadingUsersEnd } from "../../actions/AuthActions";

class ParentRewardList extends Component {
  state = {
    fadeValue: new Animated.Value(0),
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
      }),
      Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 1000
      })
    ]).start();
  };

  componentWillMount() {
    this.props.rewardsFetch();
  }

  componentDidMount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    loadingUsersEnd();
    this._start();
  }
  onButtonPress() {
    Actions.rewardCreate();
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

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const rewards = this.props.rewards;

    return (
      <View style={{ flex: 1 }}>
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
                  data={rewards}
                  renderItem={({ item }) => <RewardListItem reward={item} />}
                />
              </Animated.View>
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

const mapStateToProps = state => {
  const rewards = _.map(state.rewards, (val, cid) => {
    return { ...val, cid };
  });
  return { rewards: rewards, loading: state.loading.loading };
};

export default connect(mapStateToProps, { rewardsFetch, loadingUsersEnd })(
  ParentRewardList
);
