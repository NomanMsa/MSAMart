import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

const styles = require('./RegisterInputStyles');

export default class extends Component {
  static defaultProps = {
    onChangeVal: () => { },
    minVal: 0,
    maxVal: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
    this.changeVal = this.changeVal.bind(this);
    this.renderDefaultInput = this.renderDefaultInput.bind(this);
    this.renderInvalideInput = this.renderInvalideInput.bind(this);
  }

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

  renderDefaultInput = () => {
    return (
      <View>
        <View
          style={[styles.ValidInputHeader, this.props.ValidInputHeaderStyle]}>
          <Text style={[styles.ValidTitle, this.props.ValidTitleStyle]}>
            {this.props.inputName}
          </Text>
          <Text style={[styles.SuggestionText, this.props.SuggestionTextStyle]}>
            {this.props.suggestionText}
          </Text>
        </View>

        <View
          style={[
            styles.ValidInputContainer,
            this.props.ValidInputContainerStyle,
          ]}>
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={this.props.isPasswordText}></TextInput>
          <Image
            style={[styles.ValidAvatar, this.props.ValidAvatarStyle]}
            source={this.props.validIcon}
          />
        </View>
      </View>
    );
  };

  renderInvalideInput = () => {
    return (
      <View>
        <View
          style={[
            styles.InValideInputHeader,
            this.props.InValideInputHeaderStyle,
          ]}>
          <Text style={[styles.InvalidTitle, this.props.InvalidTitleStyle]}>
            {this.props.inputName}
          </Text>
          <Text style={[styles.ValidationText, this.props.ValidationTextStyle]}>
            {this.props.validationText}
          </Text>
        </View>

        <View
          style={[
            styles.InvalidInputContainer,
            this.props.InvalidInputContainerStyle,
          ]}>
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={this.props.isPasswordText}></TextInput>
          <Image
            style={[styles.InValidAvatar, this.props.InValidAvatarStyle]}
            source={this.props.InValidIcon}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.props.IsInValid ? (
          <View>{this.renderInvalideInput()}</View>
        ) : (
            <View>{this.renderDefaultInput()}</View>
          )}
      </View>
    );
  }
}
