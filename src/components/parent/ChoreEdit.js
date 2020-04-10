import _ from "lodash";
import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import ChoreForm from "./ChoreForm";
import {
  choreUpdate,
  choreSave,
  choreDelete
} from "../../actions/ParentActions";
import { Card, CardSection, Button, Confirm } from "../common";
import { Actions } from "react-native-router-flux";

class ChoreEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.chore, (value, prop) => {
      this.props.choreUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const {
      child,
      choreName,
      description,
      pointsValue,
      day,
      cid,
      isRecurring,
      status
    } = this.props;

    this.props.choreSave({
      child,
      choreName,
      description,
      cid,
      pointsValue,
      day,
      isRecurring,
      status
    });

    Actions.parentChoreList();
  }

  onAccept() {
    const { cid } = this.props;

    this.props.choreDelete({ cid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <ScrollView>
          <ChoreForm />

          <View style={{ flexDirection: "column" }}>
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
              <Button onPress={this.onButtonPress.bind(this)}>
                Save Changes
              </Button>
            </View>

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
              <Button
                onPress={() => {
                  Actions.parentChoreList();
                }}
              >
                Cancel
              </Button>
            </View>
          </View>
        </ScrollView>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const {
    child,
    choreName,
    day,
    description,
    pointsValue,
    cid,
    isRecurring,
    status
  } = state.choreForm;

  return {
    child,
    choreName,
    day,
    description,
    pointsValue,
    cid,
    isRecurring,
    status
  };
};

export default connect(mapStateToProps, {
  choreUpdate,
  choreSave,
  choreDelete
})(ChoreEdit);
