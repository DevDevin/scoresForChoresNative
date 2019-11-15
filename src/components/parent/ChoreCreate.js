import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardSection, Button, Text } from "../common/index";
import { choreCreate } from "../../actions/ParentActions";
import ChoreForm from "./ChoreForm";
import { ScrollView, Alert, View } from "react-native";

class ChoreCreate extends Component {
  state = {
    allowSubmit: true
  };
  onButtonPress() {
    const {
      choreName,
      description,
      day,
      child,
      pointsValue,
      isDaily,
      isRecurring
    } = this.props;

    // chore Name Check
    let choreNameRequired;
    if (choreName === "") {
      console.log("inside of chore Name check");

      this.state.allowSubmit = false;
      choreNameRequired = "-Chore Name";
    } else {
      choreNameRequired = "";
    }

    // description  Check
    let descriptionRequired;
    if (description === "") {
      console.log("inside of description check");

      this.state.allowSubmit = false;
      descriptionRequired = "-Description";
    } else {
      descriptionRequired = "";
    }

    // child  Check
    let childRequired;
    if (child === "") {
      console.log("inside of child check");

      this.state.allowSubmit = false;
      console.log("allowSubmit in child check: ", this.state.allowSubmit);
      childRequired = "-Child Name";
    } else {
      childRequired = "";
    }

    console.log("allowSubmit before alert check: ", this.state.allowSubmit);
    if (this.state.allowSubmit === false) {
      Alert.alert(
        "Missing Required Fields: ",
        `${childRequired}
         ${descriptionRequired} 
         ${choreNameRequired}`,
        [
          {
            text: "OK",
            onPress: () => {
              this.setState({ allowSubmit: true });
              console.log("this.state.allowSubmit ", this.state.allowSubmit);
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      console.log("allowSubmit: ", this.state.allowSubmit);
      this.props.choreCreate({
        choreName: choreName,
        description: description,
        day: day,
        child: child,
        pointsValue: pointsValue,
        isDaily: isDaily,
        isRecurring: isRecurring
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <ChoreForm {...this.props} />
        <View
          style={{
            borderBottomWidth: 1,
            padding: 5,
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            borderColor: "#ddd",
            position: "relative"
          }}
        >
          <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  scrollView: {
    backgroundColor: "pink",
    alignSelf: "stretch"
  }
};

const mapStateToProps = state => {
  const {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring
  } = state.choreForm;

  return {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring
  };
};

export default connect(mapStateToProps, {
  choreCreate
})(ChoreCreate);
