import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import FleashDealsViewAll from '../FleashDealsViewAll/FleashDealsViewAll.tsx';
import { Colors } from "@theme";
const styles = require('./FleashDealsProductStyles');

export default class FleashDealsProduct extends Component {
  static defaultProps = {
    onTap: () => { },
    emptyMsg: 'No Items Found...',

  }

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      showViewer: true,
      showIndex: 0
    }
    this.renderFleashDealsProduct = this.renderFleashDealsProduct.bind(this);
    this.renderEmptyFleashDealsProduct = this.renderEmptyFleashDealsProduct.bind(this);
  }
  renderFleashDealsProduct({ item, index }) {
    return <TouchableOpacity key={index} style={styles.productImgBox} onPress={() => this.props.onTap(item)} >
      <Image style={styles.productImg} source={{ uri: item.DefaultPictureModel.ImageUrl }} />
      <View style={styles.priceBox}>
        <Text style={styles.FlashDealsPrice}>{item.ProductPrice.Price}</Text>
        {item.ProductPrice.OldPrice && <Text style={styles.FlashDealstitleMainPrice}>{item.ProductPrice.OldPrice}</Text>}
        {item.AdditionalInfo.DisplayStockQuantity && <Text style={styles.FlashDealstitleQty}>{item.AdditionalInfo.StockQuantity} Left!</Text>}
        {item.AdditionalInfo.StockQuantity < 11 && <View style={{ width: item.AdditionalInfo.quantityPercentage + '%', height: 3, backgroundColor: Colors.PRIMARY_COLOR, paddingRight: 3, paddingLeft: 3 }}></View>}
      </View>
    </TouchableOpacity>
  }
  renderEmptyFleashDealsProduct(txt) {
    return (<Text style={styles.menuTextStyle}>{txt}</Text>)
  }

  render() {
    return (
      <>
        <View style={styles.productImgBoxContentMargin}>
          <FlatList
            numColumns={3}
            data={this.props.data}
            renderItem={this.renderFleashDealsProduct}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={this.renderEmptyFleashDealsProduct(this.props.emptyMsg)}
            style={[{ margin: 0, padding: 0 }]}
          />
        </View>
        <FleashDealsViewAll />
      </>
    )
  }
}