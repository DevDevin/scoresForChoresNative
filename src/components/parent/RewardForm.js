import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import { rewardUpdate } from "../../actions/ParentActions";
import { CardSection, Input } from "../common/index";

class RewardForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Text style={styles.labelStyle}>New Reward</Text>
        </CardSection>

        <CardSection>
          <Input
            label="Reward Name"
            placeholder="Reward Name"
            value={this.props.rewardName}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "rewardName", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Point Value"
            placeholder="Points the reward is worth"
            value={this.props.pointsValue}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "pointsValue", value: value })
            }
          />
        </CardSection>

        <View style={styles.containerStyle}>
          <Text style={styles.labelStyle}> Description </Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            placeholder="A brief description..."
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.description}
            onChangeText={value =>
              this.props.rewardUpdate({ prop: "description", value: value })
            }
            s
          />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    alignItems: "center"
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
};

const mapStateToProps = state => {
  const { rewardName, description, pointsValue } = state.rewardForm;

  return {
    rewardName: rewardName,
    description: description,
    pointsValue: pointsValue
  };
};

export default connect(mapStateToProps, { rewardUpdate })(RewardForm);
