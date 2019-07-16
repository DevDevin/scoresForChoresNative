import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  childChoresFetch,
  completionRequestCreate
} from "../../actions/ChildActions";
import { Button, CardSection } from "../common";

class ChildChoreListItem extends Component {
  onButtonPress(choreName, day) {
    // submit a completion request
    completionRequestCreate({
      choreName: choreName,
      child: this.props.activeUser.name,
      day: day
    });
  }

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;

    return (
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>
            {choreName} : {day}
          </Text>
          {/* <Button onPress={this.onCompletePress.bind(this)}>Complete</Button> */}
          <Button
            onPress={this.onButtonPress.bind(
              this,
              this.props.chore.choreName,
              this.props.chore.day
            )}
          >
            Complete
          </Button>
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
  { childChoresFetch, completionRequestCreate }
)(ChildChoreListItem);
