import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
const styles = require('./FleashDealsViewAllStyles');
export default class extends Component {
  static defaultProps = {
    onPress: () => { },
    searchPlaceholder: 'Search Everything!',
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity 
      testID = {"allStoreBtn"}
      accessibilityLabel="allStoreBtn"
      onPress={() => this.props.onPress()}>
        <View style={styles.viewMoreSection}>
          <View style={styles.viewMore}>
            <Image style={styles.viewIcon} source={this.props.ViewAllLeftIcon} />

            <Text style={styles.viewAll}>View all </Text>
            <Image style={styles.viewIcon} source={this.props.ViewAllRightIcon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
