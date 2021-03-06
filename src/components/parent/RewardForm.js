import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import { rewardUpdate } from "../../actions/ParentActions";
import { CardSection, Input, NumberInput } from "../common/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class RewardForm extends Component {
  componentDidMount() {
    // reset props when opening form
    this.props.rewardUpdate({ prop: "rid", value: this.props.rid });
    this.props.rewardUpdate({ prop: "pointsValue", value: 0 });
    this.props.rewardUpdate({ prop: "description", value: "" });
    this.props.rewardUpdate({ prop: "rewardName", value: "" });
  }
  render() {
    let emptyRewardNameMessage;
    if (this.props.emptyRewardName === true) {
      emptyRewardNameMessage = (
        <View>
          <Text style={{ color: "white", fontSize: wp("6%") }}>
            Reward Name is Required
          </Text>
        </View>
      );
    } else {
      emptyRewardNameMessage = <View></View>;
    }

    let emptyPointsValueMessage;
    if (this.props.emptyPointsValue === true) {
      emptyPointsValueMessage = (
        <View>
          <Text style={{ color: "white", fontSize: wp("6%") }}>
            Points Value is Required
          </Text>
        </View>
      );
    } else {
      emptyPointsValueMessage = <View></View>;
    }

    let emptyDescriptionMessage;
    if (this.props.emptyDescription === true) {
      emptyDescriptionMessage = (
        <View>
          <Text style={{ color: "white", fontSize: wp("6%") }}>
            Description is Required
          </Text>
        </View>
      );
    } else {
      emptyDescriptionMessage = <View></View>;
    }

    let rewardExistsMessage;
    if (this.props.rewardExists === true) {
      rewardExistsMessage = (
        <View>
          <Text style={{ color: "white", fontSize: wp("6%") }}>
            This Reward Already Exists
          </Text>
        </View>
      );
    } else {
      rewardExistsMessage = <View></View>;
    }

    return (
      <View>
        <CardSection>
          <Input
            label="Reward Name"
            placeholder="Reward Name"
            value={this.props.rewardName}
            onChangeText={value => {
              this.props.rewardUpdate({
                prop: "emptyRewardName",
                value: false
              });
              this.props.rewardUpdate({ prop: "rewardExists", value: false });
              this.props.rewardUpdate({ prop: "rewardName", value: value });
            }}
          />
        </CardSection>
        {emptyRewardNameMessage}
        {rewardExistsMessage}

        <CardSection>
          <NumberInput
            label="Point Value"
            placeholder="Points the reward is worth"
            value={this.props.pointsValue}
            onChangeText={value => {
              this.props.rewardUpdate({
                prop: "emptyPointsValue",
                value: false
              });
              this.props.rewardUpdate({ prop: "pointsValue", value: value });
            }}
          />
        </CardSection>
        {emptyPointsValueMessage}

        <View style={styles.containerStyle}>
          <Text style={styles.labelStyle}> Description </Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            placeholder="A brief description..."
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.description}
            onChangeText={value => {
              this.props.rewardUpdate({
                prop: "emptyDescription",
                value: false
              });
              this.props.rewardUpdate({ prop: "description", value: value });
            }}
          />
        </View>
        {emptyDescriptionMessage}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: wp("1%"),
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    alignItems: "center"
  },
  labelStyle: {
    fontSize: wp("4%"),
    paddingLeft: wp("4%"),
    flex: 1
  },
  inputStyle: {
    color: "#000",
    // paddingRight: 5,
    // paddingLeft: 5,
    fontSize: wp("4%"),
    // lineHeight: 23,
    flex: 2
  }
};

const mapStateToProps = state => {
  const {
    rewardName,
    description,
    pointsValue,
    emptyRewardName,
    emptyPointsValue,
    emptyDescription,
    rewardExists,
    rid
  } = state.rewardForm;

  return {
    rewardName: rewardName,
    description: description,
    pointsValue: pointsValue,
    emptyRewardName: emptyRewardName,
    emptyPointsValue: emptyPointsValue,
    emptyDescription: emptyDescription,
    rewardExists: rewardExists,
    rid: rid
  };
};

export default connect(mapStateToProps, { rewardUpdate })(RewardForm);
