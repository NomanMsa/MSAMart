import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
const styles = require('./OrderItemListStyles');
import { FormatDate } from '@utils'

export default class extends Component {
  static defaultProps = {
    onProductClick: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <>
        {this.props.Items.map((item, i) => (<>
          <View key={i}
            style={styles.listviewContainer}>
            <TouchableOpacity 
              testID={"singleOrder"} accessibilityLabel="singleOrder"
              onPress={() => this.props.onProductClick(item)}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.Picture.ImageUrl }} style={styles.imageStyle} />
                </View>
            </TouchableOpacity>
            <View style={styles.rightContainer}>
              <View style={styles.txtContainer}>
                <TouchableOpacity 
                  onPress={() => this.props.onProductClick(item)}>
                  <Text testID={"purchasesTitle"} accessibilityLabel="purchasesTitle" style={styles.productTitleTxt}>{item.ProductName}</Text>
                </TouchableOpacity>
                {item.VendorName ? <Text style={styles.quantityTxt}>{item.VendorName}</Text> : null }
                {item.EstimatedDelivery ? <Text style={styles.productStatusTitleTxt}>{item.EstimatedDelivery ? FormatDate.formatDate(item.EstimatedDelivery, 'dd/mm/yyyy') : null} {new Date(item.EstimatedDelivery).toLocaleTimeString()}</Text> : null}
                <Text testID={item.ItemStatus} accessibilityLabel={item.ItemStatus} style={styles.productStatusTitleTxt}>Status: <Text style={styles.productStatusTxt}>{item.ItemStatus}</Text></Text>
                <View>
                  {(item.CustomProperties && item.CustomProperties.ItemCancelReason && item.CustomProperties.ItemCancelReason != '') ? <Text style={styles.productStatusTitleTxt}>Reason: <Text style={styles.productStatusTxtBold}>{item.Reason}</Text></Text> : <></>}
                  {(item.CustomProperties && item.CustomProperties.ItemPaymentStatus && item.CustomProperties.ItemPaymentStatus != '') ? <Text style={styles.productStatusTitleTxt}>Payment Status: <Text style={styles.productStatusTxt}>{item.CustomProperties.ItemPaymentStatus}</Text></Text> : <></>}
                </View>

                <Text style={styles.amountTxt}>{item.UnitPrice}</Text>
                <Text style={styles.quantityTxt}>QTY {item.Quantity}</Text>
                {item.IsDisplayReturnLink ? <Text style={[styles.amountTxt, styles.RIStyles]} testID={"returnAnItemBtn"} accessibilityLabel="returnAnItemBtn" onPress={() => this.props.itemReturnClick(item)}>Return an item</Text> : <></>}
              </View>
            </View>
          </View>
        </>)
        )}
      </>
    );
  }
}
