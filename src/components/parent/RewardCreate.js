import React, { Component } from "react";
import _ from "lodash";
import { Alert, View } from "react-native";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { rewardCreate, rewardsFetch } from "../../actions/ParentActions";
import RewardForm from "./RewardForm";

class RewardCreate extends Component {
  state = {
    allowSubmit: true
  };

  componentDidMount() {
    this.props.rewardsFetch();
  }
  onButtonPress() {
    const { rewardName, description, pointsValue } = this.props;
    let duplicate = false;
    const rewards = this.props.rewards;
    _.map(rewards, function(item) {
      if (rewardName === item.rewardName) {
        duplicate = true;
      }
    });

    // description  Check
    let rewardNameRequired;
    if (rewardName === "") {
      console.log("inside of reward check");

      this.state.allowSubmit = false;
      rewardNameRequired = "-Reward Name";
    } else {
      rewardNameRequired = "";
    }

    // child  Check
    let descriptionRequired;
    if (description === "") {
      console.log("inside of description check");

      this.state.allowSubmit = false;
      console.log("allowSubmit in description check: ", this.state.allowSubmit);
      descriptionRequired = "-Description";
    } else {
      descriptionRequired = "";
    }

    // child  Check
    let pointsValueRequired;
    if (pointsValue === "") {
      console.log("inside of child check");

      this.state.allowSubmit = false;
      console.log("allowSubmit in child check: ", this.state.allowSubmit);
      pointsValueRequired = "-Points Value";
    } else {
      pointsValueRequired = "";
    }

    console.log("allowSubmit before alert check: ", this.state.allowSubmit);
    if (this.state.allowSubmit === false) {
      Alert.alert(
        "Missing Required Fields: ",
        `${descriptionRequired}
          ${rewardNameRequired} 
          ${pointsValueRequired}`,
        [
          {
            text: "OK",
            onPress: () => {
              this.setState({ allowSubmit: true });
              console.log("this.state.allowSubmit ", this.state.allowSubmit);
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      if (duplicate == false) {
        this.props.rewardCreate({
          rewardName: rewardName,
          pointsValue: pointsValue,
          description: description
        });
      } else {
        Alert.alert(
          "This Reward Already Exists",
          "Try adding a new reward",
          [
            {
              text: "Okay",
              // onPress: () => console.log("Okay Pressed"),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "grey"
        }}
      >
        <Card>
          <RewardForm {...this.props} />
          <View
            style={{
              borderBottomWidth: 1,
              padding: 5,
              backgroundColor: "#fff",
              justifyContent: "flex-start",
              borderColor: "#ddd",
              position: "relative"
            }}
          >
            <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { rewardName, description, pointsValue } = state.rewardForm;

  return {
    rewardName: rewardName,
    description: description,
    pointsValue: pointsValue,
    rewards: state.rewards
  };
};

export default connect(mapStateToProps, {
  rewardCreate,
  rewardsFetch
})(RewardCreate);
