import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import { choresFetch } from "../actions/ParentActions";
import { Button } from "../components/common";

class ChoreListItem extends Component {
  onRowPress(activeUser) {
    // actions.something
  }

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;

    let CompletionRequestButtons;
    let childName = "";
    console.log(this.props.activeUser.status);

    if (this.props.activeUser.status === "child") {
      CompletionRequestButtons = <Button>Complete</Button>;
    } else if (this.props.activeUser.status === "parent") {
      childName = this.props.chore.child;
      CompletionRequestButtons = (
        <View>
          <Button>Accept</Button>
          <Button>Reject</Button>
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback
        value={this.props.chore.choreName}
        onPress={this.onRowPress.bind(this, this.props.chore)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {choreName} : {day} : {childName}
            </Text>
            {CompletionRequestButtons}
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
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
  { choresFetch }
)(ChoreListItem);
