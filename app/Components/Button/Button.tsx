import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,

} from 'react-native';
import { Images, Loaders, Icons } from '@assets';

const styles = require('./ButtonStyles');

export default class extends Component {
  static defaultProps = {
    onChangeVal: () => { },
    minVal: 0,
    maxVal: 10,
    OnClick: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
    this.changeVal = this.changeVal.bind(this);
  }
  componentDidMount() { }
  componentWillUnmount() { }
  changeVal = (operation) => {
    if (operation == 'decrement' && this.state.quantity > this.props.minVal) {
      this.setState({
        quantity: parseInt(parseInt(this.state.quantity) - parseInt(1)),
      });
    } else if (
      operation == 'increment' &&
      this.state.quantity < this.props.maxVal
    ) {
      this.setState({
        quantity: parseInt(parseInt(this.state.quantity) + parseInt(1)),
      });
    }
  };
  renderLeftComponent = () => {
    return (
      <TouchableOpacity style={[styles.mainTitleStyle]}>
        <Image style={styles.plusMinusIcon} source={Icons.pen} />
      </TouchableOpacity>
    );
  };
  renderRightComponent = () => {
    return (
      <TouchableOpacity style={[styles.mainTitleStyle]}>
        <Image style={styles.plusMinusIcon} source={Icons.pen} />
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <TouchableOpacity
        style={[styles.selectContainer, this.props.btnStyle]}
        disabled={this.props.disabled}
        onPress={() => this.props.OnClick()}
        testID={this.props.testId}
        accessibilityLabel={this.props.testId}>
        <Text
          style={[styles.mainTitleStyle, this.props.titleStyle]}
          numberOfLines={1}>
          {this.props.title}
        </Text>
        {this.props.rightIcon && (
          <>
            <Image style={styles.uploadIcon} source={this.props.iconPath} />
          </>
        )}
      </TouchableOpacity>
    );
  }
}
