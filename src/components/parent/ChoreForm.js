import React, { Component } from "react";
import _ from "lodash";
import { View, Picker, ScrollView, TextInput, Text } from "react-native";
import CheckBox from "react-native-check-box";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { connect } from "react-redux";
import { choreUpdate } from "../../actions/ParentActions";
import { usersFetch } from "../../actions/AuthActions";
import { CardSection, Input } from "../common/index";

class ChoreForm extends Component {
  // Initital State Data
  state = {
    isOther: false,
    isRecurring: false,
    child: ""
  };
  componentDidMount() {
    console.log("this.props.choreName: ", this.props.choreName);
    console.log("this.props.cid: ", this.props.cid);
    this.props.choreUpdate({ prop: "cid", value: this.props.cid });
    this.props.choreUpdate({
      prop: "isRecurring",
      value: false
    });

    // this.props.choreUpdate({ prop: "choreName", value: "" });
    // this.props.choreUpdate({ prop: "description", value: "" });
    // this.props.choreUpdate({ prop: "pointsValue", value: 0 });
    // fetch users for dropdown
    this.props.usersFetch();
  }

  onCheckBoxClicked(isRecurring) {
    this.setState({
      isRecurring: !this.state.isRecurring
    });
    this.props.choreUpdate({
      prop: "isRecurring",
      value: !this.state.isRecurring
    });
  }

  render() {
    this.props.choreUpdate({ prop: "cid", value: this.props.cid });
    var radio_props = [
      { label: "Daily", value: "Daily" },
      { label: "Monday-Wednesday-Friday", value: "Monday-Wednesday-Friday" },
      { label: "Tuesday-Thursday", value: "Tuesday-Thursday" },
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" }
    ];

    let emptyChoreNameMessage;
    if (this.props.emptyChoreName === true) {
      emptyChoreNameMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Chore name is required
          </Text>
        </View>
      );
    } else {
      emptyChoreNameMessage = <View></View>;
    }

    let emptyDescriptionMessage;
    if (this.props.emptyDescription === true) {
      emptyDescriptionMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Description is required.
          </Text>
        </View>
      );
    } else {
      emptyDescriptionMessage = <View></View>;
    }

    let emptyChildMessage;
    console.log("emptyChild: ", this.props.emptyChild);
    if (this.props.emptyChild === true) {
      emptyChildMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Chore must be assigned to a child
          </Text>
        </View>
      );
    } else {
      emptyChildMessage = <View></View>;
    }

    let emptyPointsValueMessage;
    if (this.props.emptyPointsValue === true) {
      emptyPointsValueMessage = (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Points is required.
          </Text>
        </View>
      );
    } else {
      emptyPointsValueMessage = <View></View>;
    }

    const users = this.props.users;

    const children = _.filter(users, function(item) {
      console.log("item.status: ", item.status);
      return item.status === "Child";
    });
    console.log("children: ", children, "users: ", users);

    return (
      <View>
        <View style={{ backgroundColor: "blue" }}>
          <ScrollView>
            <CardSection>
              <Input
                label="ChoreName"
                placeholder="Dishes"
                value={this.props.choreName}
                onChangeText={value => {
                  this.props.choreUpdate({
                    prop: "emptyChoreName",
                    value: false
                  });
                  this.props.choreUpdate({ prop: "choreName", value: value });
                }}
              />
            </CardSection>
            {emptyChoreNameMessage}

            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}> Description </Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                placeholder="A brief description of the chore"
                autoCorrect={false}
                style={styles.inputStyle}
                value={this.props.description}
                onChangeText={value => {
                  this.props.choreUpdate({
                    prop: "emptyDescription",
                    value: false
                  });
                  this.props.choreUpdate({ prop: "description", value: value });
                }}
              />
            </View>
            {emptyDescriptionMessage}

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
              <Picker
                selectedValue={this.state.child}
                style={{
                  height: 50
                  // width: 200
                  // TOTmake equal to width
                }}
                onValueChange={(itemValue, itemIndex) => {
                  this.props.choreUpdate({
                    prop: "emptyChild",
                    value: false
                  });
                  this.props.choreUpdate({ prop: "child", value: itemValue });
                  this.setState({ child: itemValue });
                }}
              >
                <Picker.Item label="Assign chore to a child:" value="" />
                {children.map(function(child) {
                  return <Picker.Item label={child.name} value={child.name} />;
                })}
              </Picker>
            </View>
            {emptyChildMessage}

            <CardSection>
              <Input
                label="Points"
                placeholder="Points the chore is worth."
                value={this.props.pointsValue}
                onChangeText={value => {
                  this.props.choreUpdate({
                    prop: "emptyPointsValue",
                    value: false
                  });
                  this.props.choreUpdate({ prop: "pointsValue", value: value });
                }}
              />
            </CardSection>
            {emptyPointsValueMessage}

            <CardSection>
              <View>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  onPress={value => {
                    if (value === "other") {
                      this.setState({ isOther: true });
                    }
                    this.props.choreUpdate({
                      prop: "day",
                      value: value
                    });
                  }}
                />
              </View>
            </CardSection>

            <CardSection>
              <CheckBox
                style={{ flex: 1, padding: 10 }}
                onClick={() => {
                  this.onCheckBoxClicked();
                }}
                isChecked={this.state.isRecurring}
                leftText={"Recurring"}
              />
            </CardSection>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  CardSection: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    borderColor: "#ddd",
    position: "relative"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
    alignItems: "center"
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  }
};

const mapStateToProps = state => {
  const {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring,
    emptyChoreName,
    emptyDescription,
    emptyDay,
    emptyChild,
    emptyPointsValue,
    editChoreName,
    editDescription,
    editPointsValue,
    cid
  } = state.choreForm;

  return {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring,
    users: state.users,
    emptyChoreName,
    emptyDescription,
    emptyDay,
    emptyChild,
    emptyPointsValue,
    editChoreName,
    editDescription,
    editPointsValue,
    cid
  };
};

export default connect(mapStateToProps, { choreUpdate, usersFetch })(ChoreForm);
