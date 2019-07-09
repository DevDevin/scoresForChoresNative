import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { choreCreate } from "../../actions/ParentActions";
import ChoreForm from "./ChoreForm";

class UserCreate extends Component {
  componentDidMount() {}
  onButtonPress() {
    const { name, phone, password1, status, email } = this.props;

    this.props.userCreate({ name, phone, password1, status, email });
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
  const { name, phone, password1, status, email } = state.userForm;

  return { name, phone, password1, status, email };
};

export default connect(
  mapStateToProps,
  {
    choreCreate
  }
)(UserCreate);
