import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { FlatList, View, ScrollView, Text, BackHandler } from "react-native";
import { rewardRequestsFetch } from "../../actions/ParentActions";
import ChildRewardRequestsListItem from "./ChildRewardRequestsListItem";
import { usersFetch } from "../../actions/AuthActions";

class ChildRewardRequestList extends Component {
  state = {
    rewardStatus: "All"
  };

  componentWillMount() {
    this.props.rewardRequestsFetch();
    this.props.usersFetch();
  }

  componentWillUnmount() {
    Actions.childHome();
  }

  ///// back button example ////////
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    Actions.childRewardManager();
    return true;
  }

  onButtonPress() {
    Actions.userCreate();
  }

  toggleChores = e => {
    this.setState({ rewardStatus: e });
  };

  render() {
    var radio_props = [
      { label: "All", value: "All" },
      { label: "Earned", value: "Accepted" },
      { label: "Rejected", value: "Rejected" },
      { label: "Submitted", value: "Submitted" }
    ];

    const rewardStatus = this.state.rewardStatus;
    const { name } = this.props.activeUser;
    const rewardRequests = this.props.rewardRequests;

    let filteredRewardRequests;

    filteredRewardRequests = _.filter(rewardRequests, function(item) {
      return item.childName === name;
    });

    if (rewardStatus != "All") {
      filteredRewardRequests = _.filter(filteredRewardRequests, function(item) {
        return item.status === rewardStatus;
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10
          }}
        >
          <RadioForm
            radio_props={radio_props}
            formHorizontal={true}
            initial={0}
            labelHorizontal={false}
            onPress={e => {
              this.toggleChores(e);
            }}
          />
        </View>
        <View style={{ flex: 0.98, backgroundColor: "#EFEFF4" }}>
          <ScrollView>
            <View>
              <FlatList
                data={filteredRewardRequests}
                renderItem={({ item }) => (
                  <ChildRewardRequestsListItem Item rewardRequest={item} />
                )}
              />
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

  return {
    rewardRequests: rewardRequests,
    users: users,
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, { rewardRequestsFetch, usersFetch })(
  ChildRewardRequestList
);
