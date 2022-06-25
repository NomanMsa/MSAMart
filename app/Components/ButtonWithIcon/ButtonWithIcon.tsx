import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icons } from '@assets';

const styles = require('./ButtonWithIconStyles');

export default class extends Component {
  static defaultProps = {
    userClick: () => { },
    minVal: 0,
    maxVal: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      backButtonImage: Icons.arrowBack,
    };
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        onPress={() => this.props.userClick()}
        style={[styles.mainContainer, this.props.mainContainerStyles]}
        testID={this.props.testId}
        accessibilityLabel={this.props.testId}>
        {
          this.props.icon != '' ?

            <Image
              style={[styles.imageAvtar, this.props.imageAvtarStyle]}
              source={this.props.icon}

            />
            :
            <></>
        }
        <Text
          style={[styles.mainTitleStyle, this.props.titleStyle]}
          numberOfLines={1}
          testID={this.props.title_testId}
          accessibilityLabel={this.props.title_testId}>

          {this.props.text}
        </Text>
        <View style={[styles.SeCondaryTitleViewStyle, this.props.secondaryTitleViewStyle]}>

          <Text
            style={[styles.SeCondaryTitleStyle, this.props.secondaryTitleStyle]}
          // numberOfLines={1}
          >
            {' '}
            {this.props.Secondarytext}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
