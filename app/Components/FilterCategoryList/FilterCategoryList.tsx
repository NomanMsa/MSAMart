

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { Images, Loaders, Icons } from '@assets';
import { Colors } from '@theme';
import NestedList from '../NestedList/NestedList'

// import NestedListView, { NestedRow } from 'react-native-nested-listview';
//import NestedList from "@natalia.li/react-native-nested-list";

const styles = require('./FilterCategoryListStyles');
const getColor = (level) => {

  switch (parseInt(level)) {
    case 0:
      return styles.nodeTextStyle;
    case 1:
      return styles.semiNodeTextStyle;
    case 2:
      return styles.childNodeTextStyle;
    case 3:
      return styles.semiNodeStyle;
  }
  return " ";
};
const openAlert = (item) =>
  Alert.alert(
    "This is the last node!",
    "You pressed " + item.topic,
    [{ text: "OK", onPress: () => console.log("You pressed", item.topic) }],
    { cancelable: false }
  );

export default class extends Component {
  static defaultProps = {
    userClick: () => { },
    minVal: 0,
    maxVal: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      backButtonImage: Icons.arrowBack,
      headerText: 'Your Account',
      GrettingText: 'Hello',
      CustomerName: 'Joe Bloggs',
      LogoutText: 'Log out',
      LogoutImage: Icons.arrowBack,
      isMoreClicked: false,
      isChecked: false,
      dataSource: [],
      sliceDataSource: [],
      fullDataSource: [],

    };

  }


  render() {
    return (

      <View>
        <NestedList
          listItems={this.props.CategoryData}
          listWrapperStyle={styles.listWrapper}
          childrenPath={"SubCategories"}
          opacity={0.8}
          itemKey={(item) => item.Id}
          onItemPressed={(item) => {
            console.log("AN ELEMENT WAS PRESSED", item);
          }}
          onLastItemPressed={(item) => {
            console.log("LAST ELEMENT", item);
          }}
          itemContent={(item) => (
            <View>
              {item.CustomProperties.CurrentOrIncludeCategory == true ?
                <Text style={{ ...getColor(item.CustomProperties.Level), color: Colors.PRIMARY }}>{item.Name}</Text>
                :
                <></>
              }
              {item.CustomProperties.CurrentOrIncludeCategory == false ?

                <Text style={getColor(item.CustomProperties.Level)}
                  onPress={() => this.props.userClick(item)}
                >{item.Name}</Text>
                :
                <></>
              }
            </View>
          )}
        />
      </View>
    );
  }
}



