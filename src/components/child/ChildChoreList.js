import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, Picker, ScrollView } from "react-native";
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
  }

  render() {
    const chores = this.props.childChores;
    const choreStatus = this.state.choreStatus;
    const day = this.state.day;

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
        return e.status === choreStatus;
      });
    }

    if (day === "All") {
      filteredChores = filteredChores;
    } else {
      filteredChores = _.filter(filteredChores, function(item) {
        return item.day === day;
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "skyblue",
            flex: 0.15
          }}
        >
          <Text
            style={{
              fontSize: 24
            }}
          >
            This week's chores:
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5,
            backgroundColor: "powderblue"
          }}
        >
          <Picker
            selectedValue={this.state.choreStatus}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ choreStatus: itemValue });
            }}
          >
            <Picker.Item label={"All"} value={"All"} />
            {choreStatuses.map(function(status) {
              return <Picker.Item label={status.value} value={status.value} />;
            })}
          </Picker>

          <Picker
            selectedValue={this.state.day}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ day: itemValue });
            }}
          >
            <Picker.Item label={"All"} value={"All"} />
            {days.map(function(day) {
              return <Picker.Item label={day.value} value={day.value} />;
            })}
          </Picker>
        </View>
        <View style={{ flex: 0.85, backgroundColor: "grey" }}>
          <ScrollView>
            <View>
              <FlatList
                data={filteredChores}
                renderItem={({ item }) => <ChildChoreListItem chore={item} />}
              />
            </View>
          </ScrollView>
        </View>
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
