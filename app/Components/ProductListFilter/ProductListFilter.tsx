import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
const styles = require('./ProductListFilterStyles');
const pickerStyle = {
  inputIOS: {
    color: 'black',
    height: '100%',
    fontFamily: 'verdana',
    fontSize: 16,
    marginLeft: 15,
  },
};
export default class extends Component {
  static defaultProps = {
    userClick: () => { },
    onFilterClick: () => { },
    onSortByClick: () => { },
  };

  constructor(props) {
    super(props);
    let selVal = 0;
    if (Platform.OS == "android") {
      selVal = 'a'
    } else {
      selVal = 0
    }
    this.state = {
      selectedItems: [],
      isGrid: false,
      isRecommendedClicked: false,
      isDropdownClicked: false,
      FileterCount: 0,
      Options: ['type1'],
      list: [
        {
          value: 0,
          label: 'Sort by',

          testID: 'sortTitle',
          accessibilityLabel: "sortTitle",
        },
        {
          value: 15,
          label: 'Newest',

          testID: 'sortNewest',
          accessibilityLabel: "sortNewest",
        },
        {
          value: 10,
          label: 'Low Price',
          testID: 'sortLowPrice',
          accessibilityLabel: "sortLowPrice",
        },
        {
          value: 11,
          label: 'Max Price',
          testID: 'sortMaxPrice',
          accessibilityLabel: "sortMaxPrice",
        }

      ],
      language: 'english',
      services: ['a', 'b', 'c', 'd', 'e'],
      selectedService: selVal,
    };

    this.renderLeft = this.renderLeft.bind(this);
    this.renderLastLeft = this.renderLastLeft.bind(this);
    this.renderLastRight = this.renderLastRight.bind(this);
  }
  componentDidMount() {
    this.setState({ FileterCount: Number(this.props.FileterCount) })
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems })
  };
  onDropDownSelection = (service, index) => {
    console.log("onDropDownSelection...............", service, index)
    this.setState({ selectedService: service })
    var newList = this.state.list
    for (let i = 0; newList.length > i; i++) {
      if (service == newList[i].value) {
        this.props.onSortByClick(newList[i].value)
      }
    }
  }


  renderLeft = () => {

    return (
      <View style={[styles.leftContainer, this.props.leftContainerStyle]}>

        {Platform.OS == "android" ?

          <View style={[styles.dropdownContainer]}>
            <Picker
              selectedValue={this.state.selectedService}
              style={{ width: '100%' }}
              onValueChange={(service, index) => this.onDropDownSelection(service, index)} >
              {this.state.list.map((item, index) => {
                return <Picker.Item key={index} value={item.value} label={item.label}
                  testID={item.testID}
                  accessibilityLabel={item.accessibilityLabel} />
              })}

            </Picker>
          </View>
          :

          <View style={[styles.dropdownContainerIos]}>
            <RNPickerSelect
              value={this.state.selectedService}
              placeholder={''}
              doneText={'Done'}
              style={{ ...pickerStyle }}
              onValueChange={(value, index) => this.onDropDownSelection(value, index)}
              items={this.state.list}
            />
          </View>
        }

      </View>
    );
  };

  renderLastLeft = () => {
    return (
      <View
        style={{}}
      >
        {this.props.isGrid ? (
          <Image style={styles.imgStyle} source={this.props.gridIcon}
            testID="gridView"
            accessibilityLabel="gridView"
          />
        ) : (
          <Image style={styles.imgStyle} source={this.props.listIcon}
            testID="listView"
            accessibilityLabel="listView"
          />
        )}
      </View>
    );
  };

  renderLastRight = () => {
    return (
      <View
        style={[
          styles.LastRightContainer,
          this.props.LastRightContainerStyles,
        ]}>
        <View
          style={[
            styles.LastRightCountContainer,
            this.props.LastRightCountContainerStyle,
          ]}>
          <Text
            testID="priceRangeSelector"
            accessibilityLabel="priceRangeSelector"
            style={[
              styles.LastRightCountText,
              this.props.LastRightCountTextStyle,
            ]}>
            {' '}
            {Number(this.props.FileterCount)}{' '}
          </Text>
        </View>

        <Image
          style={[
            styles.LastRightCountImage,
            this.props.LastRightCountImageStyle,
          ]}
          source={this.props.filterIcon}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={[styles.container, this.props.ContainerStyle]}>
        <View style={[styles.dropDownContainer, this.props.dropDownContStyle]}>
          {this.renderLeft()}
        </View>

        {/* <TouchableOpacity
          testID={this.props.isGrid ? "gridView" : "listView"}
          accessibilityLabel={this.props.isGrid ? "gridView" : "listView"}
          style={[styles.gridRowToggleContainer, this.props.gridRowToggleContStyle]} onPress={() => this.props.userClick()}>
          {this.renderLastLeft()}
        </TouchableOpacity> */}

        <TouchableOpacity style={[
          styles.filterContainer,
          this.props.filterContainerStyles,
        ]} onPress={() => this.props.onFilterClick()}>

          {this.renderLastRight()}
        </TouchableOpacity>
      </View>
    );
  }
}