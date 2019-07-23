import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import { usersFetch, setActiveUser } from "../actions/AuthActions";

class UserListItem extends Component {
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

    var width = Dimensions.get("window").width; //full width
    var height = Dimensions.get("window").height; //full height

    return (
      <TouchableWithoutFeedback
        value={this.props.user.name}
        onPress={this.onRowPress.bind(this, this.props.user)}
      >
        <View style={styles.childStyle}>
          <View style={styles.cardSectionStyle}>
            <Text style={styles.titleStyle}>{name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  childStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: Dimensions.get("window").width
  },
  cardSectionStyle: {
    // borderBottomWidth: 1
    // padding: 5,
    // backgroundColor: "#fff",
    // justifyContent: "flex-start",
    // flexDirection: "row",
    // borderColor: "#ddd"
    // position: "relative"
  }
};

export default connect(
  null,
  { usersFetch, setActiveUser }
)(UserListItem);
