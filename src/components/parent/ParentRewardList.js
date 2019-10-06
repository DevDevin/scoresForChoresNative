import _ from "lodash";
import React, { Component } from "react";
import ActionButton from "react-native-action-button";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { ListView, FlatList, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { rewardsFetch } from "../../actions/ParentActions";
import RewardListItem from "../child/ChildRewardListItem";
import { loadingUsersEnd } from "../../actions/AuthActions";

class ParentRewardList extends Component {
  componentWillMount() {
    this.props.rewardsFetch();
  }

  componentDidMount() {
    loadingUsersEnd();
  }
  onButtonPress() {
    Actions.rewardCreate();
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

    const rewards = this.props.rewards;
    console.log("rewards: ", rewards);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={rewards}
          renderItem={({ item }) => <RewardListItem reward={item} />}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 36
            // backgroundColor: "grey"
          }}
        >
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.onButtonPress.bind(this)}
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

export default connect(
  mapStateToProps,
  { rewardsFetch, loadingUsersEnd }
)(ParentRewardList);
