import React, { Component } from "react";
import { Text } from "react-native";
import { CardSection, Card } from "../common/index";

class ChildHome extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Text>Child Home</Text>
        </CardSection>
      </Card>
    );
  }
}

export default ChildHome;
