import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'
import { Loaders, Images, Icons } from '@assets';
import { default as DropdownWithIcon } from '../DropdownWithIcon/DropdownWithIcon';
const { width, height } = Dimensions.get('window');
const styles = require('./ROItemStyles');

export default class ProductList extends Component {
  static defaultProps = {
    onQtySelection: () => { },
    emptyMsg: 'No Items Found...',
  }

  constructor(props) {
    super(props)
    this.state = {
      //data: this.props.data,
    }
    this.renderItemList = this.renderItemList.bind(this);
  }

  componentDidMount() {

  }

  /*UpdateWishlistandAddToCartData = async (data) => {
    let Service = {
      apiUrl: Api.widgetProductAddWishlist,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        productId: data.Id,
        quantity: data.AdditionalInfo.OrderMinimumQuantity,
        ShoppingCartType: "Wishlist"
      }),
      onSuccessCall: this.onSuccessWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };*/

  onFailureAPI(data) {
    console.log(data);
  }

  onPromiseFailure(data) {
    console.log(data);
  }

  onOffline(data) {
    console.log(data);
  }


  renderItemList({ item, index }) {
    let quantity = [
      { "Name": "0", "Id": "0" }
    ]//new Array(item.Quantity)

    // console.log("Item", item)
    if (item.Quantity > 0) {
      for (var i = 1; i <= item.Quantity; i++) {
        quantity.push({ Name: (i).toString(), Id: (i).toString() })
      }
    }
    console.log(quantity)
    return <View key={index} style={styles.itemContainer}>
      <View style={styles.itemCountContainer}>
        <Text style={styles.countTextStyle}>{index + 1}</Text>
      </View>
      <View style={styles.itemDetailContainer}>
        <Text style={styles.detailTextStyle}>{item.ProductName}</Text>
        <Text style={styles.unitPriceTitle}>Unit Price <Text style={styles.unitPriceValue}>{item.UnitPrice}</Text></Text>
      </View>
      <View style={styles.itemQuantityContainer}>
        <Text style={styles.qtyReturnTextStyle}>Qty. to return</Text>
        <DropdownWithIcon
          containerStyles={{ width: width - 60, marginBottom: 8 }}
          ddStyles={{ height: 40 }}
          Id={item.Id}
          data={quantity}
          onItemSelection={(data, Id) => this.props.onQtySelection(Id, data)} />
      </View>
    </View>
  }
  renderEmptyProductList(txt) {
    return (<Text style={styles.menuTextStyle}>{txt}</Text>)
  }

  render() {
    const { onProClick } = this.props;
    //const { onQtySelection } = this.props;
    return (
      <>
        <FlatList
          data={this.props.data}
          renderItem={this.renderItemList}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={this.renderEmptyProductList(this.props.emptyMsg)}
          style={styles.itemsContainer}
        />

      </>
    )
  }
}