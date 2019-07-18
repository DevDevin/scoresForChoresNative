import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { choreCreate } from "../../actions/ParentActions";
import ChoreForm from "./ChoreForm";

class ChoreCreate extends Component {
  componentDidMount() {}
  onButtonPress() {
    const { choreName, description, day, child, pointsValue } = this.props;

    this.props.choreCreate({
      choreName: choreName,
      description: description,
      day: day,
      child: child,
      pointsValue: pointsValue
    });
  }

  render() {
    return (
      <Card>
        <ChoreForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { choreName, description, day, child, pointsValue } = state.choreForm;

  return { choreName, description, day, child, pointsValue };
};

export default connect(
  mapStateToProps,
  {
    choreCreate
  }
)(ChoreCreate);
