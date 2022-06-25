import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { Icons } from '@assets';
const styles = require('./ProductQuantityStyles');
export default class extends Component {
  static defaultProps = {
    onTextChange: () => { },
    onSearch: () => { },
    onClear: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      Quantity: 0,
      maxProductCount: this.props.maxProductQuantity,
      ProductLimitIndicator: this.props.ProductLimitIndicatorCount <= this.props.maxProductQuantity ? false : true,
      isLimit: false,
    };
    this.renderLeftComponent = this.renderLeftComponent.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.onPressSearch = this.onPressSearch.bind(this);
    this.checkforzero = this.checkforzero.bind(this);

  }

  componentDidMount() {
    this.setState({ Quantity: this.props.Quantity })
  }

  onQuentityChange = async (text) => {
    console.log(text)
    text = parseInt(text)
    console.log(text)
    console.log('non in nan')
    if (isNaN(text)) {
      await this.setState({
        quantity: 0,
      });
    } else {
      if (text !== 0) {

        if (text < this.state.maxProductCount) {
          await this.setState({ Quantity: text })
          await this.props.onTextChange(text)
        }


      } else {
        await this.setState({ Quantity: 2 })
        //await this.props.onTextChange(1)
        this.productQuentityManager(this.state.Quantity, '-')
      }
    }
  }
  checkforzero = async () => {
    console.log('called on blur')
    console.log(this.state.Quantity)
    if (this.state.Quantity < 1 || isNaN(this.state.Quantity)) {
      await this.setState({
        Quantity: 2,
      });
      await this.productQuentityManager(this.state.Quantity, '-')
    }
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
        style={[styles.searchLeftComponent, this.props.iconContainerStyles]}
        onPress={() => this.props.onSearch(this.state.searchText)}>
        <Image
          style={[styles.listColIcon, { tintColor: this.props.iconColor }]}
          source={Icons.search}
        />
      </TouchableOpacity>
    );
  };

  productQuentityManager = (currentProductCount, operator) => {
    if (operator == '+') {
      if (this.props.Quantity < this.state.maxProductCount) {
        var newQuentity = parseInt(this.props.Quantity) + 1
        this.setState({
          Quantity: newQuentity.toString(),
          isLimit: false,
        });
        this.props.onTextChange(newQuentity.toString())
      } else {
        this.setState({ isLimit: true });
      }
    }
    if (operator == '-') {
      if (this.props.Quantity > 1) {
        var newQuentity = parseInt(this.props.Quantity) - 1

        this.setState({
          Quantity: newQuentity.toString(),
          isLimit: false,
        });
        this.props.onTextChange(newQuentity.toString())

      }
    }
    if (this.props.ProductLimitIndicatorCount <= this.state.maxProductCount) {
      this.setState({
        ProductLimitIndicator: false,
      });
    } else {
      this.setState({
        ProductLimitIndicator: true,
      });
    }
  };

  render() {
    return (
      <View style={{ marginLeft: -5 }}>
        <View
          style={{
            flexDirection: 'row',
          }}>

          {(this.state.ProductLimitIndicator) ? (
            <View
              style={[
                styles.ItemQuentityRed,
                this.props.ItemQuentityRedStyles,
              ]}>

              <TouchableOpacity
                style={{ ...styles.btnCircle, borderBottomRightRadius: 30, borderTopRightRadius: 30 }}
                onPress={() =>
                  this.productQuentityManager(this.props.Quantity, '-')
                }>
                <Text style={[styles.OperatorText, this.props.OperatorTextStyle]}>
                  -
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.searchInputs}
                //value={this.props.Quantity}
                keyboardType={"number-pad"}
                textAlign={'center'}
                maxLength={4}
                onBlur={() => this.checkforzero()}
                // placeholder="Search"
                onChangeText={(text) => this.onQuentityChange(text)}
              > {this.props.Quantity}</TextInput>
              {this.state.isLimit ? (
                <Text
                  style={[styles.redMark, this.props.redMarkStyles]}>
                  !
                </Text>
              ) : (
                <Text numberOfLines={1} ellipsizeMode={'tail'}></Text>
              )}

              <TouchableOpacity
                style={{ ...styles.btnCircle, borderBottomLeftRadius: 30, borderTopLeftRadius: 30 }}
                onPress={() =>
                  this.productQuentityManager(this.props.Quantity, '+')
                }>
                <Text style={[styles.OperatorText, this.props.OperatorTextStyle]}>
                  +
            </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.ItemQuentity, this.props.ItemQuentityStyles]}>

              <TouchableOpacity
                style={{ ...styles.btnCircle, borderBottomRightRadius: 30, borderTopRightRadius: 30 }}
                onPress={() =>
                  this.productQuentityManager(this.props.Quantity, '-')
                }>
                <Text style={[styles.OperatorText, this.props.OperatorTextStyle]}>
                  -
            </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.searchInputs}
                value={this.props.Quantity}
                keyboardType={"number-pad"}
                textAlign={'center'}
                maxLength={4}
                // placeholder="Search"
                onChangeText={(text) => this.onQuentityChange(text)}
              />
              {this.state.isLimit ? (
                <Text
                  style={[styles.redText, this.props.redTextStyles]}>
                  !
                </Text>
              ) : (
                <Text numberOfLines={1} ellipsizeMode={'tail'}></Text>
              )}

              <TouchableOpacity
                style={{ ...styles.btnCircle, borderBottomLeftRadius: 30, borderTopLeftRadius: 30 }}
                onPress={() =>
                  this.productQuentityManager(this.props.Quantity, '+')
                }>
                <Text style={[styles.OperatorText, this.props.OperatorTextStyle]}>
                  +
            </Text>
              </TouchableOpacity>
            </View>
          )}


        </View>
        {this.state.ProductLimitIndicator ? (
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.redText, this.props.redTextStyles]}>
            {'Only ' + this.state.maxProductCount + ' left in stock'}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}
