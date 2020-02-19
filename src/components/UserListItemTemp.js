import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import ActionButton from "react-native-action-button";
import { usersFetch, setActiveUser } from "../actions/AuthActions";

class UserListItem extends Component {
  onRowPress(activeUser) {
    // redirect to parent or child depending on the user status
    this.props.setActiveUser(activeUser);

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
      <View>
        <TouchableWithoutFeedback
          value={this.props.user.name}
          onPress={this.onRowPress.bind(this, this.props.user)}
        >
          <View style={styles.childStyle}>
            <View style={styles.cardSectionStyle}>
              <Image source={require("../Images/genericUser.png")} />
              <Text style={styles.titleStyle}>{name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 36
            // backgroundColor: "grey"
          }}
        >
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24
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
    backgroundColor: "powderblue",
    width: Dimensions.get("window").width
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default connect(null, { usersFetch, setActiveUser })(UserListItem);
