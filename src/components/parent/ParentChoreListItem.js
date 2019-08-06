import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { choresFetch } from "../../actions/ParentActions";
import { Button, CardSection } from "../common";

class ParentChoreListItem extends Component {
  onEditPress() {
    // edit the chore
    Actions.choreEdit({ chore: this.props.chore });
  }

  onRowPress(activeUser) {
    // Actions.choreEdit({ chore: this.props.chore });
  }

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;

    const childName = this.props.chore.child;
    console.log(this.props.activeUser.status);

    return (
      <View>
        <TouchableWithoutFeedback
          value={this.props.chore.choreName}
          onPress={this.onRowPress.bind(this, this.props.chore)}
        >
          <View>
            <View style={styles.choreStyle}>
              <Text style={styles.choreNameStyle}>{choreName}</Text>
              <Text style={styles.choreInfoStyle}>
                {day}: {childName}
              </Text>

              {/* <Button
                style={{ width: 20 }}
                onPress={this.onEditPress.bind(this)}
              >
                Edit
              </Button> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  choreNameStyle: {
    fontSize: 26,
    paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
  },
  choreInfoStyle: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  choreStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#d67d72",
    alignItems: "center",
    borderColor: "#ddd"
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  { choresFetch }
)(ParentChoreListItem);
