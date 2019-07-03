import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "./common/index";
import { userCreate } from "../actions/AuthActions";
import UserForm from "./UserForm";

class UserCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.userCreate({ name, phone, shift: shift || "Monday" });
  }

  render() {
    return (
      <Card>
        <UserForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  // const { name, phone, shift } = state.employeeForm;

  // return { name, phone, shift };
  return {};
};

export default connect(
  mapStateToProps,
  {
    // employeeUpdate,
    userCreate
  }
)(UserCreate);
