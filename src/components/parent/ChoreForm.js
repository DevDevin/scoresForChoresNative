import React, { Component } from "react";
import _ from "lodash";
import { View, Picker, ScrollView } from "react-native";
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
    this.props.choreUpdate({
      prop: "isRecurring",
      value: false
    });

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

    const users = this.props.users;

    const children = _.filter(users, function(item) {
      return item.status === "child";
    });

    return (
      <View>
        <View style={{ backgroundColor: "blue" }}>
          <ScrollView>
            <CardSection>
              <Input
                label="ChoreName"
                placeholder="Dishes"
                value={this.props.choreName}
                onChangeText={value =>
                  this.props.choreUpdate({ prop: "choreName", value: value })
                }
              />
            </CardSection>

            <CardSection>
              <Input
                label="Desicription"
                placeholder="A brief description of the chore."
                value={this.props.description}
                onChangeText={value =>
                  this.props.choreUpdate({ prop: "description", value: value })
                }
              />
            </CardSection>

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

            <CardSection>
              <Input
                label="Points"
                placeholder="Points the chore is worth."
                value={this.props.pointsValue}
                onChangeText={value =>
                  this.props.choreUpdate({ prop: "pointsValue", value: value })
                }
              />
            </CardSection>

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
                  // this.setState({ isRecurring: !this.state.isRecurring });
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
    isRecurring,
    users: state.users
  };
};

export default connect(mapStateToProps, { choreUpdate, usersFetch })(ChoreForm);
