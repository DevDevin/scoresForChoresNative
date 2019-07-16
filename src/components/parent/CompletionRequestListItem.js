import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { completionRequestsFetch } from "../../actions/ParentActions";
import { Button, CardSection } from "../common";

class CompletionRequestListItem extends Component {
  onRowPress(activeUser) {
    // actions.something
  }

  render() {
    console.log("completionRequest: ", this.props.completionRequest);
    const choreName = this.props.completionRequest.choreName;
    const day = this.props.completionRequest.day;

    const childName = this.props.completionRequest.child;

    return (
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>
            {choreName} : {day} : {childName}
          </Text>
          <View>
            <Button>Accept</Button>
            <Button>Reject</Button>
          </View>
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
  { completionRequestsFetch }
)(CompletionRequestListItem);
