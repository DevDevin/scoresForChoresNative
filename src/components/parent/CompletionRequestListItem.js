import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  completionRequestsFetch,
  requestAccept,
  requestReject
} from "../../actions/ParentActions";
import { Button, CardSection } from "../common";

class CompletionRequestListItem extends Component {
  onRowPress(activeUser) {
    // actions.something
  }

  onAccept(cid, choreName, day, child, description, pointsValue) {
    this.props.requestAccept(
      cid,
      choreName,
      day,
      child,
      description,
      pointsValue
    );
  }

  onReject(cid, choreName, day, child, description, pointsValue) {
    this.props.requestReject(
      cid,
      choreName,
      day,
      child,
      description,
      pointsValue
    );
  }

  render() {
    console.log("completionRequest: ", this.props.completionRequest);
    const choreName = this.props.completionRequest.choreName;
    const day = this.props.completionRequest.day;
    const cid = this.props.completionRequest.cid;
    const { description, pointsValue } = this.props.completionRequest;
    console.log("cid: ", this.props.completionRequest.cid);

    const child = this.props.completionRequest.child;

    return (
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>
            {choreName} : {day} : {child}
          </Text>
          <View>
            <Button
              onPress={this.onAccept.bind(
                this,
                cid,
                choreName,
                day,
                child,
                description,
                pointsValue
              )}
            >
              Accept
            </Button>
            <Button
              onPress={this.onReject.bind(
                this,
                cid,
                choreName,
                day,
                child,
                description,
                pointsValue
              )}
            >
              Reject
            </Button>
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
  { completionRequestsFetch, requestAccept, requestReject }
)(CompletionRequestListItem);
