import _ from "lodash";
import React, { Component } from "react";
import ActionButton from "react-native-action-button";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { ListView, FlatList, View, ScrollView } from "react-native";
import { FloatingAction } from "react-native-floating-action";
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
        <ScrollView>
          <View>
            <FlatList
              data={rewards}
              renderItem={({ item }) => <RewardListItem reward={item} />}
            />
            <FloatingAction onPressMain={this.onButtonPress.bind(this)} />
          </View>
        </ScrollView>
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
