import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  BackHandler,
  Image
} from "react-native";
import {
  completionRequestsFetch,
  requestAccept,
  requestReject
} from "../../actions/ParentActions";
import { CardSection, Input, Button } from "../common/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class CompletionRequestListItem extends Component {
  state = {
    modalVisible: false,
    reason: ""
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  ///// back button example ////////
  componentDidMount() {
    // this._start();
    loc(this);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    rol();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.choreManager();
    return true;
  }

  ////////////////////////////////////////

  onAccept(cid, choreName, day, child, description, pointsValue) {
    // this.props.choreUpdate({ prop: "status", value: "Complete" });
    Alert.alert(
      "Logout",
      "Are you sure you want to accept this chore?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.requestAccept(
              cid,
              choreName,
              day,
              child,
              description,
              pointsValue,
              this.props.completionRequest.uid
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  onReject(cid, choreName, day, child, description, pointsValue, reason) {
    // this.props.choreUpdate({ prop: "status", value: "Rework" });
    Alert.alert(
      "Logout",
      "Are you sure you want to reject this chore?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this.props.requestReject(
              cid,
              choreName,
              day,
              child,
              description,
              pointsValue,
              reason
            );
            this.setState({ modalVisible: !this.state.modalVisible });
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const choreName = this.props.completionRequest.choreName;
    const day = this.props.completionRequest.day;
    const cid = this.props.completionRequest.cid;
    const { description, pointsValue } = this.props.completionRequest;
    const child = this.props.completionRequest.child;
    const uid = this.props.completionRequest.uid;
    const completionRequest = this.props.completionRequest;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: wp("95%") }}>
          <View style={styles.childStyle}>
            <View style={styles.choreStyle}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 0.4,
                    backgroundColor: "powderblue",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../../Images/completionRequest.png")}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "skyblue",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 5
                  }}
                >
                  <Text style={styles.choreNameStyle}>{choreName}</Text>
                  <Text style={styles.choreNameStyle}>
                    <Text style={styles.choreInfoStyle}>({child})</Text>
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity
                      onPress={this.onAccept.bind(
                        this,
                        cid,
                        choreName,
                        day,
                        child,
                        description,
                        pointsValue
                      )}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.textStyle}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={this.setModalVisible}
                      style={styles.buttonStyle}
                    >
                      <Text style={styles.textStyle}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "grey"
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <View style={styles.containerStyle}>
                  <Text style={styles.labelStyle}> Description </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={2}
                    placeholder="Rejection Reason"
                    autoCorrect={false}
                    style={styles.inputStyle}
                    value={this.state.reason}
                    onChangeText={value => this.setState({ reason: value })}
                  />
                </View>
              </View>
            </View>

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
              <Button
                onPress={this.onReject.bind(
                  this,
                  cid,
                  choreName,
                  day,
                  child,
                  description,
                  pointsValue,
                  this.state.reason
                )}
              >
                Submit
              </Button>
            </View>
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
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                Close
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
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
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  choreNameStyle: {
    fontSize: 26,
    paddingLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    paddingBottom: 5
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    alignSelf: "center"
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
    backgroundColor: "powderblue"
    // width: Dimensions.get("window").width
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
    backgroundColor: "powderblue",
    alignItems: "center",
    borderColor: "#ddd"
  },
  modalTextStyle: {
    fontSize: 24,
    paddingLeft: 5
  },
  buttonStyle: {
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser
  };
};

export default connect(mapStateToProps, {
  completionRequestsFetch,
  requestAccept,
  requestReject
})(CompletionRequestListItem);
