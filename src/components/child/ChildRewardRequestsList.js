import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { FlatList, View, Picker } from "react-native";
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

  onButtonPress() {
    console.log("addUserPress");
    Actions.userCreate();
  }

  toggleChores = e => {
    //////////
    console.log("e.value: ", e);
    this.setState({ rewardStatus: e });
  };

  render() {
    var radio_props = [
      { label: "All", value: "All" },
      { label: "Accepted", value: "Accepted" },
      { label: "Rejected", value: "Rejected" },
      { label: "Spent", value: "Spent" },
      { label: "Submitted", value: "Submitted" }
    ];

    const rewardStatus = this.state.rewardStatus;
    const { name } = this.props.activeUser;
    console.log("activeUser: ", name);
    const rewardRequests = this.props.rewardRequests;

    let filteredRewardRequests;

    filteredRewardRequests = _.filter(rewardRequests, function(item) {
      console.log("inside else: ", name);
      return item.childName === name;
    });

    if (rewardStatus != "All") {
      filteredRewardRequests = _.filter(filteredRewardRequests, function(item) {
        console.log("inside filteredByStatus: ", rewardStatus);
        console.log("item.status: ", item.status);
        return item.status === rewardStatus;
      });
    }

    return (
      <View>
        <RadioForm
          radio_props={radio_props}
          formHorizontal={true}
          initial={0}
          labelHorizontal={false}
          onPress={e => {
            this.toggleChores(e);
          }}
        />
        <FlatList
          data={filteredRewardRequests}
          renderItem={({ item }) => (
            <ChildRewardRequestsListItem Item rewardRequest={item} />
          )}
        />
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

export default connect(
  mapStateToProps,
  { rewardRequestsFetch, usersFetch }
)(ChildRewardRequestList);
