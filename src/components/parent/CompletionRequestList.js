import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, Picker } from "react-native";
import { completionRequestsFetch } from "../../actions/ParentActions";
import CompletionRequestListItem from "./CompletionRequestListItem";
import { View } from "react-native";
import { usersFetch, loadingUsersEnd } from "../../actions/AuthActions";

class CompletionRequestList extends Component {
  state = {
    child: "All"
  };

  componentWillMount() {
    this.props.completionRequestsFetch();
    this.props.usersFetch();
  }

  componentDidMount() {
    this.props.loadingUsersEnd();
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
    console.log("this.props.loading: ", this.props.loading);
    const completionRequests = this.props.completionRequests;
    const users = this.props.users;
    const children = _.filter(users, function(item) {
      return item.status === "child";
    });
    const child = this.state.child;

    let filteredRequests;
    // need to find a way to pass this.state.choreStatus into this function
    if (child === "All") {
      console.log("inside if: ", child);
      filteredRequests = completionRequests;
    } else {
      filteredRequests = _.filter(completionRequests, function(item) {
        console.log("inside else: ", child);
        return item.child === child;
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
            <CompletionRequestListItem completionRequest={item} />
          )}
        />
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
