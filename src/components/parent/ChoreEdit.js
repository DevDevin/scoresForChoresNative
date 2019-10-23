import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import ChoreForm from "./ChoreForm";
import {
  choreUpdate,
  choreSave,
  choreDelete
} from "../../actions/ParentActions";
import { Card, CardSection, Button, Confirm } from "../common";

class ChoreEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.chore, (value, prop) => {
      this.props.choreUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { child, choreName, description, pointsValue, day } = this.props;

    this.props.choreSave({
      child,
      choreName,
      description,
      cid: this.props.chore.cid,
      pointsValue,
      day
    });
  }

  onAccept() {
    const { cid } = this.props.chore;

    this.props.choreDelete({ cid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <ChoreForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Save Changes</Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            Delete Chore
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { child, choreName, day, description, pointsValue } = state.choreForm;

  return { child, choreName, day, description, pointsValue };
};

export default connect(
  mapStateToProps,
  {
    choreUpdate,
    choreSave,
    choreDelete
  }
)(ChoreEdit);
