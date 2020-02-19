import _ from "lodash";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { View, FlatList, ScrollView, Animated, Text } from "react-native";
import { usersFetch, loadingUsersEnd } from "../../actions/AuthActions";
import { FloatingAction } from "react-native-floating-action";
import EditDeleteUserListItem from "../parent/EditDeleteUserListItem";
import Spinner from "react-native-loading-spinner-overlay";
import { CardSection, Input, Button } from "../common";

class AddDeleteUser extends Component {
  state = {
    slideUp: new Animated.Value(0),
    SlideInLeft: new Animated.Value(0)
  };
  componentWillMount() {
    this.props.usersFetch();
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
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  };

  componentDidMount() {
    this._start();
    this.props.loadingUsersEnd();
  }

  onButtonPress() {
    // may have to call an action that then redirects to the user create component
    Actions.userCreate();
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          // textStyle={styles.spinnerTextStyle}
          textStyle={{ color: "#FFF" }}
          overlayColor="skyblue"
        />
      );
    }

    return <View></View>;
  }

  render() {
    let { slideUp, SlideInLeft } = this.state;
    const users = this.props.users;

    // i may want to set the loading in the login action as well. Thats how its being done in other projects.

    return (
      <View style={{ flex: 1, backgroundColor: "grey" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "steelblue",
            flex: 0.1,
            elevation: 10
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
              Add or Delete Users
            </Text>
          </Animated.View>
        </View>
        {this.renderSpinner()}
        <View style={{ flex: 0.85, backgroundColor: "grey" }}>
          <ScrollView>
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
                data={users}
                renderItem={({ item }) => (
                  <EditDeleteUserListItem user={item} />
                )}
              />
            </Animated.View>
          </ScrollView>
        </View>
        <FloatingAction
          color="#4280b3"
          style={{ justifyContent: "flex-end" }}
          // actions={actions}
          // onPressMain={this.onButtonPress.bind(this)}
          onPressMain={() => {
            Actions.userCreate();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });
  return { users, loading: state.loading.loading };
};

export default connect(mapStateToProps, { usersFetch, loadingUsersEnd })(
  AddDeleteUser
);
