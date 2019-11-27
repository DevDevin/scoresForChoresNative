import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Card, CardSection, Button } from "../common/index";
import { userCreate } from "../../actions/AuthActions";
import AdminUserForm from "./AdminUserForm";
import { View } from "react-native";

class AdminUserCreate extends Component {
  componentDidMount() {}
  onButtonPress() {
    const { name, phone, password1, email } = this.props;

    this.props.userCreate({ name, phone, password1, status: "parent", email });
    Actions.chooseUser();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "grey"
        }}
      >
        <Card>
          <AdminUserForm {...this.props} />
          <View
            style={{
              borderBottomWidth: 1,
              padding: 5,
              backgroundColor: "steelblue",
              justifyContent: "flex-start",
              borderColor: "#ddd",
              position: "relative",
              elevation: 5
            }}
          >
            <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, status, email } = state.userForm;

  return { name, phone, password1, status, email };
};

export default connect(mapStateToProps, {
  // employeeUpdate,
  userCreate
})(AdminUserCreate);
