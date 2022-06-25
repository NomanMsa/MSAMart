import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import { Icons, Images, Loaders } from '@assets';

const styles = require('./EmptyShoppingCartStyle');

export default class extends Component {
  static defaultProps = {

    onCartClick: () => { },
    onHomeClick: () => { },

  };

  constructor(props) {
    super(props);
    this.state = {
      DescriptionLimit:
        this.props.descriptionLimit == null ? 40 : this.props.descriptionLimit,
      listData: [
        {
          imageURL:
            'http://www.pngmart.com/files/10/String-Light-PNG-Picture.png',
          discount: true,
          discountRate: 20,
          rtTopIconFilled: true,
          ltBottomIcon: Icons.addCart,
          descL1: 'Led Projector 1080P Home Media Player With Remote Control - Yellow',
          descL2:
            "A picture's worth a thousand words, so here's 21K worth of placeholder image ",
          rate: 34.55,
          netRate: 80.34,
          currency: 'AED',
          star: true,
          starRating: 4.5,
        },

      ],
      isRemoveChecked: false,
      isAddCartChecked: false,

    };
    this.renderProductList = this.renderProductList.bind(this);
  }

  renderProductList = ({ item, index }) => {
    return (
      <View style={{ borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
        <Image
          style={{ height: 30, width: 30, margin: 30 }}
          source={Icons.heart}
        />
        <Text>dfsdfsdfsdfsfsdff</Text>
      </View>
    );
  };
  render() {
    return (
      <View
        style={[styles.listviewContainer, this.props.listviewContainerStyle]}>
        <View style={styles.DataContainer}>
          <Image
            style={styles.iconStyle}
            source={this.props.EmptyIcon}
          />

          <Text style={styles.titleStyle}
            testID="emptyCartMesg"
            accessibilityLabel="emptyCartMesg"

          >{this.props.EmptyTitle}</Text>

          <Text style={styles.detaiTextStyle}
            testID="cartTxt"
            accessibilityLabel="cartTxt"
          > Don’t worry, please visit our
            <Text style={styles.redText}
              onPress={() =>
                this.props.onHomeClick()
              }> Homepage </Text>
            and get inspired or you could take a few products from your
            <Text style={styles.redText}
              onPress={() =>
                this.props.onCartClick()
              }> Wishlist </Text></Text>
        </View>
      </View>
    );
  }
}
