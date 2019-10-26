import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, Picker, ScrollView, Animated } from "react-native";
import { completionRequestsFetch } from "../../actions/ParentActions";
import CompletionRequestListItem from "./CompletionRequestListItem";
import { View, Text } from "react-native";
import { usersFetch, loadingUsersEnd } from "../../actions/AuthActions";

class CompletionRequestList extends Component {
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

  componentWillMount() {
    this.props.completionRequestsFetch();
    this.props.usersFetch();
  }

  componentDidMount() {
    this.props.loadingUsersEnd();
    this._start();
  }

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
    const completionRequests = this.props.completionRequests;
    const users = this.props.users;
    const children = _.filter(users, function(item) {
      return item.status === "child";
    });
    const child = this.state.child;

    let filteredRequests;
    // need to find a way to pass this.state.choreStatus into this function
    if (child === "All") {
      filteredRequests = completionRequests;
    } else {
      filteredRequests = _.filter(completionRequests, function(item) {
        return item.child === child;
      });
    }

    return (
      <View style={{ backgroundColor: "grey", flex: 1 }}>
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
              Completion Requests
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
                    <CompletionRequestListItem completionRequest={item} />
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
  const completionRequests = _.map(state.completionRequests, (val, cid) => {
    return { ...val, cid };
  });

  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });
  return {
    completionRequests: completionRequests,
    users: users,
    loading: state.loading.loading
  };
};

export default connect(
  mapStateToProps,
  { completionRequestsFetch, usersFetch, loadingUsersEnd }
)(CompletionRequestList);
