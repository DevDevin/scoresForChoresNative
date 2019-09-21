import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { FlatList, View, Picker } from "react-native";
import { rewardRequestsFetch } from "../../actions/ParentActions";
import RewardRequestListItem from "./RewardRequestListItem";
import { usersFetch } from "../../actions/AuthActions";

class RewardRequestList extends Component {
  state = {
    child: "All"
  };

  componentWillMount() {
    this.props.rewardRequestsFetch();
    this.props.usersFetch();
  }

  onButtonPress() {
    console.log("addUserPress");
    Actions.userCreate();
  }

  render() {
    console.log("inside render");
    const rewardRequests = this.props.rewardRequests;
    const users = this.props.users;
    const children = _.filter(users, function(item) {
      return item.status === "child";
    });

    child = this.state.child;

    let filteredRequests;
    if (child === "All") {
      console.log("inside if: ", child);
      filteredRequests = rewardRequests;
    } else {
      filteredRequests = _.filter(rewardRequests, function(item) {
        console.log("inside else: ", child);
        return item.childName === child;
      });
    }

    return (
      <View>
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

        <FlatList
          data={filteredRequests}
          renderItem={({ item }) => (
            <RewardRequestListItem rewardRequest={item} />
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

  return { rewardRequests: rewardRequests, users: users };
};

export default connect(
  mapStateToProps,
  { rewardRequestsFetch, usersFetch }
)(RewardRequestList);
