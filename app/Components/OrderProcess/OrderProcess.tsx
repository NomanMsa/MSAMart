import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
const styles = require('./OrderProcessStyles');
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
          imageURL: 'https://placeimg.com/480/480/tech',
          name: 'shipping',
        },
        {
          id: 2,
          imageURL: 'https://placeimg.com/480/480/tech',
          name: 'policies',
        },
        {
          id: 3,
          imageURL: 'https://placeimg.com/480/480/tech',
          name: "FAQ's",
        },
      ],
    };

    this.OrderDetailsList = this.OrderDetailsList.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
  }

  OrderDetailsList = () => {
    return (
      <ScrollView style={{ padding: 10 }}>
        <View
          style={[
            styles.HorizontalSpaceContainer,
            this.props.HorizontalSpaceContainerStyle,
          ]}>
          <FlatList
            style={{ alignContent: 'center' }}
            ListHeaderComponent={() => (
              <View
                style={[
                  styles.listItemContainer,
                  this.props.listItemContainer,
                ]}>
                <Text
                  style={[styles.boldTitleText, this.props.boldTitleTextStyle]}>
                  {this.props.Title}
                </Text>
              </View>
            )}
            data={this.props.Data}
            horizontal={true}
            renderItem={this.OrderDetailsItems}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ScrollView>
    );
  };

  OrderDetailsItems = ({ item, index }) => {
    return (
      <View key={index} style={[styles.listContainer, this.props.listContainerStyles]}>
        <View>
          <Image
            style={[styles.imageContiner, this.props.imageContiner]}
            source={item.imageURL}
          />
          <Text style={[styles.boldText, this.props.boldTextStyle]}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    return <View style={styles.container}>{this.OrderDetailsList()}</View>;
  }
}
