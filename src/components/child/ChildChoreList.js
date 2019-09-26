import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, Picker } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { childChoresFetch } from "../../actions/ChildActions";
import ChildChoreListItem from "./ChildChoreListItem";
import { Text, View } from "react-native";
import { CardSection } from "../common/index";

class ChildChoreList extends Component {
  state = {
    choreStatus: "All",
    day: "All"
  };
  componentWillMount() {
    this.props.childChoresFetch(this.props.activeUser.name);
    console.log("this.state.choreStatus: ", this.state.choreStatus);
  }

  toggleChores = e => {
    //////////
    console.log("e.value: ", e);
    this.setState({ choreStatus: e });
  };

  render() {
    var radio_props = [
      { label: "All", value: "All" },
      { label: "In-Progress", value: "In-Progress" },
      { label: "Complete", value: "Complete" },
      { label: "Submitted", value: "Submitted" }
    ];
    const chores = this.props.childChores;
    console.log("chores: ", chores);
    const choreStatus = this.state.choreStatus;
    const day = this.state.day;
    console.log("this.state.day: ", day);

    const days = [
      { value: "Monday" },
      { value: "Tuesday" },
      { value: "Wednesday" },
      { value: "Thursday" },
      { value: "Friday" },
      { value: "Saturday" },
      { value: "Sunday" },
      { value: "Monday-Wednesday-Friday" },
      { value: "Tuesday-Thursday" },
      { value: "Daily" }
    ];

    const choreStatuses = [
      { value: "All" },
      { value: "In-Progress" },
      { value: "Complete" },
      { value: "Submited" }
    ];

    let filteredChores;
    // need to find a way to pass this.state.choreStatus into this function
    if (choreStatus === "All") {
      filteredChores = chores;
    } else {
      filteredChores = _.filter(chores, function(e) {
        console.log(choreStatus);
        return e.status === choreStatus;
      });
    }

    if (day === "All") {
      console.log("day = all");
      filteredChores = filteredChores;
    } else {
      console.log("day does not = all: ", filteredChores);
      filteredChores = _.filter(filteredChores, function(item) {
        console.log("const day:  ", day, "item.day: ", item.day);
        return item.day === day;
      });
      console.log("inside second else again ", filteredChores);
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5
          }}
        >
          <Picker
            selectedValue={this.state.choreStatus}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              console.log("inside of set state day: ", itemValue);
              this.setState({ choreStatus: itemValue });
            }}
          >
            <Picker.Item label={"All"} value={"All"} />
            {choreStatuses.map(function(status) {
              return <Picker.Item label={status.value} value={status.value} />;
            })}
          </Picker>
          {/* <RadioForm
            radio_props={radio_props}
            formHorizontal={true}
            initial={0}
            labelHorizontal={false}
            onPress={e => {
              this.toggleChores(e);
            }}
          /> */}

          <Picker
            selectedValue={this.state.day}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              console.log("inside of set state day: ", itemValue);
              this.setState({ day: itemValue });
            }}
          >
            <Picker.Item label={"All"} value={"All"} />
            {days.map(function(day) {
              return <Picker.Item label={day.value} value={day.value} />;
            })}
          </Picker>
        </View>

        <FlatList
          data={filteredChores}
          renderItem={({ item }) => <ChildChoreListItem chore={item} />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const chores = _.map(state.chores, (val, cid) => {
    return { ...val, cid };
  });

  return { childChores: chores, activeUser: state.auth.activeUser };
};
export default connect(
  mapStateToProps,
  { childChoresFetch }
)(ChildChoreList);
