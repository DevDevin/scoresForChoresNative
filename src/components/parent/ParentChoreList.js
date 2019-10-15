import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { FlatList, Picker, ScrollView } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { FloatingAction } from "react-native-floating-action";
import { choresFetch } from "../../actions/ParentActions";
import ParentChoreListItem from "./ParentChoreListItem";
import { View, Text } from "react-native";
import { usersFetch, loadingUsersEnd } from "../../actions/AuthActions";
import Spinner from "react-native-loading-spinner-overlay";

class ParentChoreList extends Component {
  state = {
    child: "All",
    language: "",
    day: "All"
  };
  componentWillMount() {
    this.props.choresFetch();
    this.props.usersFetch();
  }

  onButtonPress() {
    console.log("addUserPress");
    Actions.choreCreate();
  }

  componentDidMount() {
    this.props.loadingUsersEnd();
  }

  // const childArray = chores.

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          // textStyle={styles.spinnerTextStyle}
          textStyle={{ color: "#FFF" }}
          overlayColor="blue"
        />
      );
    }

    return <View></View>;
  }

  // TODO: ON COMPONENTs like the parents chores set loading to true when the choresFetch action is called and set it to
  // false when it is finished. That way I can ensure that the data is ready before the spinner stops. I can
  // still put the timeout function on there just to ensure the spinner is seen if the data happens to load really fast.

  render() {
    const chores = this.props.chores;
    console.log("chores.childName: ", chores.name);
    const users = this.props.users;
    console.log("users: ", users);

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

    // const pickerItem = _.map(users, function(item) {
    //   console.log("item: ", item.name);
    //   return item.name;
    // });

    var pickerItem = users.map(function(user) {
      return { value: user.name };
    });
    console.log("pickerItem: ", pickerItem);
    const child = this.state.child;
    console.log("child: ", child);
    const day = this.state.day;
    console.log("this.state.day: ", day);

    let filteredChores;
    // need to find a way to pass this.state.choreStatus into this function
    if (child === "All") {
      console.log("inside if: ", child);
      filteredChores = chores;
    } else {
      filteredChores = _.filter(chores, function(item) {
        console.log("inside else: ", child);
        return item.child === child;
      });
    }

    if (day === "All") {
      console.log("day = all. Child: ", child);
      filteredChores = filteredChores;
    } else {
      console.log("day does not = all: ", filteredChores);
      filteredChores = _.filter(filteredChores, function(item) {
        console.log("const day:  ", day, "item.day: ", item.day);
        return item.day === day;
      });
      console.log("inside second else again ", filteredChores);
    }

    const children = _.filter(users, function(item) {
      console.log("inside filter");
      console.log("item.status: ", item.status, "-item.name");
      return item.status === "child";
    });

    return (
      <View style={{ flex: 1 }}>
        {this.renderSpinner()}
        <Picker
          selectedValue={this.state.child}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ child: itemValue })
          }
        >
          <Picker.Item label={"All"} value={"All"} />

          {children.map(function(child) {
            return <Picker.Item label={child.name} value={child.name} />;
          })}
        </Picker>

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

        <Text>Chore Manager</Text>
        <ScrollView>
          <View>
            <View>
              <FlatList
                data={filteredChores}
                renderItem={({ item }) => <ParentChoreListItem chore={item} />}
              />
            </View>

            <FloatingAction
              // actions={actions}
              onPressMain={this.onButtonPress.bind(this)}
            />
          </View>
        </ScrollView>
      </View>
      // where there are not users the view is not tall enough to be able to click on the floating button. I can add an view below that is always tall enough to include room for the button and is always at the bottom
    );
  }
}

const mapStateToProps = state => {
  console.log("state.auth.activeUser.name", state.auth.activeUser.name);
  const chores = _.map(state.chores, (val, cid) => {
    return { ...val, cid };
  });

  ///bring in users
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });

  return { chores: chores, users: users, loading: state.loading.loading };
};

export default connect(
  mapStateToProps,
  { choresFetch, usersFetch, loadingUsersEnd }
)(ParentChoreList);
