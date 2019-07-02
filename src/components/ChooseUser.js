import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Card, CardSection, Input, Button, Spinner } from "./common";

class ChooseUser extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Text>Choose User</Text>
        </CardSection>
      </Card>
    );
  }
}

export default ChooseUser;
