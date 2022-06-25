import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
const styles = require('./ProductDetailsStyles');
const { width, height } = Dimensions.get('window');

export default class extends Component {
  static defaultProps = {
    onNavLink: () => { },
    slideInterval: 9000,
    bulletStyles: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      listData: [
        {
          id: 1,
          label: 'Item SubTotal',
          Value: 'AED 640',
        },
        {
          id: 2,
          label: 'Item SubTotal',
          Value: 'AED 640',
        },
      ],
    };

    this.OrderDetailsContainer = this.OrderDetailsContainer.bind(this);
    this.OrderDetailsList = this.OrderDetailsList.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
    this.renderAmountCalculation = this.renderAmountCalculation.bind(this);
    this.renderCalculationItems = this.renderCalculationItems.bind(this);
  }

  OrderDetailsContainer = () => {
    return (
      <View>
        <View style={{ padding: 10 }}>
          <Text style={[styles.boldTitleText, this.props.boldTitleTextStyle]}>
            {this.props.ListTitle}
          </Text>
        </View>
      </View>
    );
  };

  OrderDetailsList = () => {
    return (
      <View>
        <View
          style={[
            styles.HorizontalSpaceContainer,
            this.props.HorizontalSpaceContainerStyle,
          ]}>

          <FlatList
            data={this.props.titleData}
            horizontal={true}
            renderItem={this.ProductDetailsTitleItems}
            keyExtractor={(item, index) => index}
          />
        </View>
        <FlatList
          data={this.props.OrederDetailsdata}
          renderItem={this.OrderDetailsItems}
          keyExtractor={(item, index) => index}
        />
        {/* {this.OrderDetailsItems()} */}
      </View>
    );
  };
  ProductDetailsTitleItems = ({ item, index }) => {
    return (
      <View key={index}
        style={[
          styles.orderDetailsListContainer,
          this.props.orderDetailsListContainerStyle,
        ]}>
        <Text style={[styles.boldText, this.props.boldTextStyles]}>
          {item.Title}
        </Text>
      </View>
    );
  };
  OrderDetailsItems = ({ item, index }) => {
    return (
      <View key={index}
        style={[styles.listItemContainer, this.props.listItemContainerStyles]}>
        <View style={{ borderWidth: 1, borderRadius: 5 }}>
          <Image
            style={{ width: width / 7, height: width / 7 }}
            source={{ uri: item.imageURL }}
          />
        </View>

        <View>
          <Text style={[styles.boldText, this.props.boldTextStyle]}>
            {item.productName}
          </Text>
          <Text style={[styles.boldText, this.props.boldTextStyle]}>
            {item.productCategory}
          </Text>
          <Text style={[styles.boldText, this.props.boldTextStyle]}>
            {item.productColor}
          </Text>
        </View>
        <Text style={[styles.detailText, this.props.detailText]}>
          {item.Quentity}
        </Text>

        <Text style={[styles.PrizeText, this.props.PrizeTextStyle]}>
          {item.Prize}
        </Text>
      </View>
    );
  };

  renderAmountCalculation = () => {
    return (
      <View>
        <FlatList
          data={this.props.amountCalculationData}
          renderItem={this.renderCalculationItems}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };
  renderCalculationItems = ({ item, index }) => {
    return (
      <View key={index}
        style={[
          styles.calculationContainer,
          this.props.calculationContainerStyles,
        ]}>
        <Text>{''}</Text>
        <Text>{''}</Text>

        <Text style={[styles.detailText, this.props.detailText]}>
          {item.label}
        </Text>
        <Text style={[styles.detailText, this.props.detailText]}>
          {item.Value}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.OrderDetailsContainer()}
        {this.OrderDetailsList()}
        <View
          style={[styles.topBorderContiner, this.props.topBorderContinerStyle]}>
          {this.renderAmountCalculation()}

          <Text
            style={{
              alignSelf: 'flex-end',
              fontWeight: "800",
              fontSize: 18,
              padding: 15,
            }}>
            {this.props.TotalTextLabel} {this.props.TotalAmount}
          </Text>
        </View>
      </View>
    );
  }
}
