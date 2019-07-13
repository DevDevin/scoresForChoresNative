import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import { choresFetch } from "../actions/ParentActions";

class ChoreListItem extends Component {
  onRowPress(activeUser) {
    // actions.something
  }

  render() {
    const child = this.props.chore.child;

    return (
      <TouchableWithoutFeedback
        value={this.props.chore.child}
        onPress={this.onRowPress.bind(this, this.props.chore)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{child}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default connect(
  null,
  { choresFetch }
)(ChoreListItem);
