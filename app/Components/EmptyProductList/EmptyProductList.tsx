import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
const styles = require('./EmptyProductListStyle');
export default class extends Component {
  static defaultProps = {
    onCartClick: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View
        style={[styles.listviewContainer, this.props.listviewContainerStyle]}>
        <View style={styles.dataContianer}>
          <Image
            style={styles.iconStyle}
            source={this.props.EmptyIcon}
          />
          <Text style={styles.titleTextStyle}
            testID={this.props.testId}
            accessibilityLabel={this.props.testId}
          >{this.props.EmptyTitle}</Text>
        </View>
      </View>
    );
  }
}
