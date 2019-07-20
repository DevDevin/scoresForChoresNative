import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  childChoresFetch,
  completionRequestSend
} from "../../actions/ChildActions";
import { Button, CardSection } from "../common";

class ChildChoreListItem extends Component {
  onButtonPress(choreName, day, description, pointsValue, cid, child) {
    // submit a completion request
    this.props.completionRequestSend(
      choreName,
      child,
      day,
      description,
      pointsValue,
      cid
    );
  }

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;
    const status = this.props.chore.status;
    const { description, pointsValue, cid, child } = this.props.chore;

    let submitOption;

    if (status === "In-Progress" || status === "Rework") {
      submitOption = (
        <Button
          onPress={this.onButtonPress.bind(
            this,
            choreName,
            day,
            description,
            pointsValue,
            cid,
            child
          )}
        >
          Submit
        </Button>
      );
    } else if (status === "Submitted") {
      submitOption = <Text>Submitted</Text>;
    } else {
      submitOption = <Text>Complete</Text>;
    }

    return (
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>
            {choreName} : {day}
          </Text>
          {/* <Button
            onPress={this.onButtonPress.bind(
              this,
              this.props.chore.choreName,
              this.props.chore.day
            )}
          >
            Complete
          </Button> */}
          {submitOption}
        </CardSection>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  { childChoresFetch, completionRequestSend }
)(ChildChoreListItem);
