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
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;

    return (
      <TouchableWithoutFeedback
        value={this.props.chore.choreName}
        onPress={this.onRowPress.bind(this, this.props.chore)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {choreName} : {day}
            </Text>
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
