import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';

const styles = require('./OrderDetailsStyles');

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
          customerName: 'John Smith',
          shippingAddress:
            '1801, Horizon Towers AI Marzha St, Jumeirah Dubai, UAE',
          phoneNumber: '+ 971 90 90 90 90',
        },
      ],
    };

    this.OrderDetailsContainer = this.OrderDetailsContainer.bind(this);
    this.OrderDetailsList = this.OrderDetailsList.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
  }

  OrderDetailsContainer = () => {
    return (
      <View>
        <View
          style={[
            styles.orderDetailContainer,
            this.props.orderDetailContainerStyle,
          ]}>
          <Text style={[styles.boldTitleText, this.props.boldTitleTextStyles]}>
            {this.props.OrderNumberLabel}{' '}
            <Text
              style={[
                styles.boldTitleRedText,
                this.props.boldTitleRedTextStyle,
              ]}>
              {this.props.OrderNumber}
            </Text>
          </Text>
          <View
            style={[
              styles.HorizontalSpaceContainer,
              this.props.HorizontalSpaceContainerStyles,
            ]}>
            <View
              style={[
                styles.HorizontalContainer,
                this.props.HorizontalContainerStyles,
              ]}>
              <Text style={[styles.boldText, this.props.boldTextStyles]}>
                {this.props.VenderTitle}{' '}
              </Text>
              <Text style={[styles.detailText, this.props.detailTextStyles]}>
                {this.props.VenderName}
              </Text>
            </View>
            <View
              style={[
                styles.HorizontalContainer,
                this.props.HorizontalContainerStyles,
              ]}>
              <Text style={[styles.boldText, this.props.boldTextStyles]}>
                {this.props.dateLabel}{' '}
              </Text>
              <Text style={[styles.detailText, this.props.detailTextStyles]}>
                {this.props.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  OrderDetailsList = () => {
    return (
      <View>
        <View
          style={[
            styles.orderDetailsListContainer,
            this.props.orderDetailsListContainerStyle,
          ]}>
          <FlatList
            data={this.props.titleData}
            horizontal={true}
            renderItem={this.OrederDetailsTitleItems}
            keyExtractor={(item, index) => index}
          />
        </View>
        <FlatList
          data={this.props.data}
          renderItem={this.OrderDetailsItems}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };
  OrederDetailsTitleItems = ({ item, index }) => {
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
        <Text style={[styles.listText, this.props.listTextStyles]}>
          {item.customerName}
        </Text>
        <Text style={[styles.listText, this.props.listTextStyles]}>
          {item.shippingAddress}
        </Text>
        <Text style={[styles.listText, this.props.listTextStyles]}>
          {item.phoneNumber}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.OrderDetailsContainer()}
        {this.OrderDetailsList()}
      </View>
    );
  }
}
