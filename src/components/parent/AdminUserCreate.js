import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { userCreate } from "../../actions/AuthActions";
import AdminUserForm from "./AdminUserForm";

class AdminUserCreate extends Component {
  componentDidMount() {}
  onButtonPress() {
    const { name, phone, password1, email } = this.props;

    this.props.userCreate({ name, phone, password1, status: "parent", email });
    Actions.chooseUser();
  }

  render() {
    return (
      <Card>
        <AdminUserForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, status, email } = state.userForm;

  return { name, phone, password1, status, email };
};

export default connect(
  mapStateToProps,
  {
    // employeeUpdate,
    userCreate
  }
)(AdminUserCreate);
