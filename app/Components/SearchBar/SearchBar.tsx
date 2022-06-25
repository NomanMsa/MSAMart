import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Icons } from '@assets';
import { ThemeConfig, } from '@theme';
const styles = require('./SearchBarStyles');
export default class extends Component {
  static defaultProps = {
    onTextChange: () => { },
    onSearch: () => { },
    onClear: () => { },
    onFocus: () => { },
    searchPlaceholder: 'Search store!',
  };
  constructor(props) {
    super(props);
    console.log('Into Search 1');
    this.state = {
      searchText: '',
    };
    this.renderLeftComponent = this.renderLeftComponent.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.onPressSearch = this.onPressSearch.bind(this);
  }
  fieldRef = React.createRef();
  updateInput = (searchText: string) => {
    this.setState({ searchText: searchText });
    this.props.onTextChange(searchText);
  };
  onPressSearch = () => {
    this.props.onSearch(this.state.searchText);
  };
  renderLeftComponent = () => {
    return (
      <TouchableOpacity
        testID = {"searchSubmitBtn"}
        accessibilityLabel="searchSubmitBtn"
        style={[styles.searchLeftComponent, this.props.iconContainerStyles]}
        onPress={() => this.props.onSearch(this.state.searchText)}>
        <Image
          testID = {"mobileSearchBtn"}
          accessibilityLabel="mobileSearchBtn"
          style={[styles.listColIcon, { tintColor: this.props.iconColor }]}
          source={Icons.search}
        />
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <TouchableOpacity
      testID = {"searchItems"}
      accessibilityLabel="searchItems"
      activeOpacity={ThemeConfig.activeOpacityHigh} onPress={() => this.props.onFocus('')}>

        <View style={[styles.searchInputContainer, this.props.styles]}>
          <View style={[styles.inputStyle]}>
            <Text 
            testID = {"mobileSearchTxt"}
            accessibilityLabel="mobileSearchTxt" style={[styles.textInput]}>Search store!</Text>
          </View>
          {this.renderLeftComponent()}

        </View>
      </TouchableOpacity>
    );
  }
}
