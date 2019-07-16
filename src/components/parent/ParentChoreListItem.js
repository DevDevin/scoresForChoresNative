import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { choresFetch } from "../../actions/ParentActions";
import { Button, CardSection } from "../common";

class ParentChoreListItem extends Component {
  onRowPress(activeUser) {
    // actions.something
  }

  render() {
    const choreName = this.props.chore.choreName;
    const day = this.props.chore.day;

    const childName = this.props.chore.child;
    console.log(this.props.activeUser.status);

    return (
      <TouchableWithoutFeedback
        value={this.props.chore.choreName}
        onPress={this.onRowPress.bind(this, this.props.chore)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {choreName} : {day} : {childName}
            </Text>
            <Button>Edit</Button>
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

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(
  mapStateToProps,
  { choresFetch }
)(ParentChoreListItem);
