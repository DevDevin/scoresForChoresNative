import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "./common/index";
import { userCreate } from "../actions/AuthActions";
import UserForm from "./UserForm";

class UserCreate extends Component {
  componentDidMount() {
    console.log("user", this.props.phone);
  }
  onButtonPress() {
    const { name, phone, password1, status } = this.props;

    this.props.userCreate({ name, phone, password1, status });
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
  const { name, phone, password1 } = state.userForm;

  return { name, phone, password1 };
};

export default connect(
  mapStateToProps,
  {
    // employeeUpdate,
    userCreate
  }
)(UserCreate);
