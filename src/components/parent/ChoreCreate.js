import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { choreCreate } from "../../actions/ParentActions";
import ChoreForm from "./ChoreForm";
import { ScrollView } from "react-native";

class ChoreCreate extends Component {
  componentDidMount() {}
  onButtonPress() {
    const {
      choreName,
      description,
      day,
      child,
      pointsValue,
      isDaily,
      isRecurring
    } = this.props;

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

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Card>
          <ChoreForm {...this.props} />
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  scrollView: {
    backgroundColor: "pink"
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

export default connect(
  mapStateToProps,
  {
    choreCreate
  }
)(ChoreCreate);
