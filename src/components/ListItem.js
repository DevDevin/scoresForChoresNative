import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import { usersFetch, setActiveUser } from "../actions/AuthActions";

class ListItem extends Component {
  onRowPress(activeUser) {
    // redirect to parent or child depending on the user status
    this.props.setActiveUser(activeUser.uid);

    if (activeUser.status === "parent") {
      Actions.parent();
    } else {
      Actions.child();
    }
  }

  render() {
    const { name } = this.props.user;

    return (
      <TouchableWithoutFeedback
        value={this.props.user.name}
        onPress={this.onRowPress.bind(this, this.props.user)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{name}</Text>
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
  { usersFetch, setActiveUser }
)(ListItem);
