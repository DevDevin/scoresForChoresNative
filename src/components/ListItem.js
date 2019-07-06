import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";

class ListItem extends Component {
  onRowPress(name) {
    console.log("touchable works");
    console.log("name: ", name);

    // Actions.child({ user: this.props.user });
    Actions.parent({ User: this.props.user });
  }

  render() {
    const { name } = this.props.user;

    return (
      <TouchableWithoutFeedback
        value={this.props.user.name}
        onPress={this.onRowPress.bind(this, this.props.user.name)}
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

export default ListItem;
