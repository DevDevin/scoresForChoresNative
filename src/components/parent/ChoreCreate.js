import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button, Text } from "../common/index";
import { choreCreate, choreUpdate } from "../../actions/ParentActions";
import ChoreForm from "./ChoreForm";
import { ScrollView, Alert, View } from "react-native";
import { Actions } from "react-native-router-flux";

class ChoreCreate extends Component {
  state = {
    allowSubmit: true
  };

  componentDidMount() {
    this.props.choreUpdate({ prop: "emptyChoreName", value: false });
    this.props.choreUpdate({ prop: "emptyDescription", value: false });
    this.props.choreUpdate({ prop: "emptyDay", value: false });
    this.props.choreUpdate({ prop: "emptyChild", value: false });
    this.props.choreUpdate({ prop: "emptyPointsValue", value: 0 });
  }

  onButtonPress() {
    // set the status prop
    this.props.choreUpdate({ prop: "status", value: "In-Progress" });

    this.state.allowSubmit = true;
    const {
      choreName,
      description,
      day,
      child,
      pointsValue,
      isDaily,
      isRecurring
    } = this.props;

    if (choreName === "") {
      this.props.choreUpdate({ prop: "emptyChoreName", value: true });
      this.state.allowSubmit = false;
    }

    if (description === "") {
      this.state.allowSubmit = false;
      this.props.choreUpdate({ prop: "emptyDescription", value: true });
    }

    if (day === "") {
      this.state.allowSubmit = false;
      this.props.choreUpdate({ prop: "emptyDay", value: true });
    }

    if (child === "") {
      this.state.allowSubmit = false;
      this.props.choreUpdate({ prop: "emptyChild", value: true });
    }

    if (pointsValue === "") {
      this.state.allowSubmit = false;
      this.props.choreUpdate({ prop: "emptyPointsValue", value: true });
    }

    if (this.state.allowSubmit) {
      this.props.choreCreate({
        choreName: choreName,
        description: description,
        day: day,
        child: child,
        pointsValue: pointsValue,
        isDaily: isDaily,
        isRecurring: isRecurring
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <ChoreForm {...this.props} />
        <View
          style={{
            borderBottomWidth: 1,
            padding: 10,
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            borderColor: "#ddd",
            position: "relative"
          }}
        >
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            padding: 10,
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
      </ScrollView>
    );
  }
}

const styles = {
  scrollView: {
    backgroundColor: "pink",
    alignSelf: "stretch"
  }
};

const mapStateToProps = state => {
  const {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring
  } = state.choreForm;

  return {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring
  };
};

export default connect(mapStateToProps, {
  choreCreate,
  choreUpdate
})(ChoreCreate);
