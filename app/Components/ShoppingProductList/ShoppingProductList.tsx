import React, { Component } from 'react';
import { RenderHTML } from 'react-native-render-html'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { default as ProductQuantity } from '../ProductQuantity/ProductQuantity.tsx';
const styles = require('./ShoppingProductListStyle');

export default class extends Component {
  static defaultProps = {
    onImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
    onDelete: () => { },
    QuentityUpdate: () => { },
    onAddToWishlistClick: () => { },
    onProductClick: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {

      ListData: [],
      IsProductInYourWishList: false,

    };
    this.renderProductList = this.renderProductList.bind(this);
    this.onAddToWishlistClick = this.onAddToWishlistClick.bind(this);
    this.QuentityChange = this.QuentityChange.bind(this);

  }
  async componentDidMount() {
    await this.setState({ ListData: this.props && this.props.shoppingListData })
    console.log("shopping List chck ###############", this.props && this.props.shoppingListData)

  }

  onAddToWishlistClick = (item, index) => {

    this.props.onAddToWishlistClick(item)
  }

  QuentityChange = (text, item, index) => {
    console.log("this.state.ListData%%%%%%%%%%%%%%%%%%%%%%%%%%%", this.state.ListData)

    let updataListData = this.props.shoppingListData
    console.log("QuentityChange%%%%%%%%%%%%%%%%%%%%%%%%%%%", text, "%%%%%%%%%%%%%%%%%%%%%%%%%%%", item)
    updataListData[index].Quantity = text
    console.log("updataListData.Quantity%%%%%%%%%%%%%%%%%%%%%%%%%%%", updataListData.Quantity)
    // this.setState({ ListData: updataListData })

    console.log("ListData%%%%%%%%%%%%%%%%%%%%%%%%%%%", this.state.ListData)

    this.props.QuentityUpdate(updataListData, item, text)


  }

  renderProductList = ({ item, index }) => {
    var html = item.AttributeInfo
    console.log("shopping product list data  ----- ", item);
    return (
      <TouchableOpacity key={index}
        style={[styles.productRowBox, this.props.productRowBoxStyle]}
        onPress={() => this.props.onProductClick(item)}>
          

        <View style={{ flexDirection: 'row', }}>
          <View>
            
            <View
           
              style={[
                styles.productImageBox,
                this.props.productImageBoxStyles,
              ]}>
              <TouchableOpacity
                style={[
                  styles.productImageContainer,
                  this.props.productImageContainerStyles,
                ]}>
              
                <Image
                  style={[styles.productImage, this.props.productImageStyles]}
                  source={{ uri: item.Picture.ImageUrl }}
                />
              </TouchableOpacity>
            
            </View>
          </View>
          
          <View style={{ flex: 1, }}>
            <View
              style={[styles.productDataBox, this.props.productDataBoxStyles]}>
              <View style={[styles.titleBox, this.props.titleBoxStyles]}>
                <Text
                  //numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.rateText1, this.props.rateText1Styles]}
                  testID={this.props.productNameTestId}
                  accessibilityLabel={this.props.productNameTestId}
                >
                  {item.ProductName}
                </Text>
                

                {/* {Array.isArray(item.AttributeInfo) && item.AttributeInfo.length ?
                  <View style={{ marginTop: 5, marginBottom: 5, }}>
                    <Text
                      ellipsizeMode={'tail'}
                      style={[styles.titleText2, this.props.titleText2Styles]}>
                      {item.AttributeInfo}
                    </Text>
                    <Text
                      ellipsizeMode={'tail'}
                      style={[styles.titleText2, this.props.titleText2Styles]}>
                      {item.AttributeInfo}
                    </Text>
                  </View>
                  :
                  <></>
                } */}

              </View>
              <View style={[styles.bottomRow, this.props.bottomRowStyles]}>

                <View>
                  <Text
                    //  numberOfLines={1}
                    //  ellipsizeMode={'tail'}
                    style={{
                          fontWeight: 'bold',
                          fontFamily: 'verdanab',
                          fontSize: 12
                    }}>
                    {item.Sku}
                  </Text>
                  
                </View>
              <View style={[styles.deliveryDateStyle, this.props.titleBoxStyles]}>
                <Text
                  ellipsizeMode={'tail'}
                  style={[styles.estimatedDeliveryText, this.props.rateText1Styles]}>
                  {item.DPWEstimatedDeliverydate}
                </Text>
              </View>
              <View style={[styles.BottonContentContainer]}>
                
                <RenderHTML  source={{ html }}baseStyle={styles.prizeText1} />
                </View>


                <View style={[styles.PriceQuentityCenter, this.props.PriceQuentityCenter]}>


                  <View style={{ alignItems: 'flex-start', flex: 1, justifyContent: 'space-between', alignContent: 'center', flex: 1, }}>
                    {item.CustomProperties.OldPriceCut != '' ?
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={[styles.rateText2, this.props.rateText2Styles]}>
                        {item.CustomProperties.OldPriceCut}
                      </Text>
                      : <></>
                    }


                    {item.SubTotal != '' ?
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={[styles.prizeText, this.props.prizeTextStyles]}>
                        {item.SubTotal}
                      </Text>
                      : <></>
                    }
                    {item.Quantity > 1 ?
                      <Text
                        style={[styles.rateText3, this.props.rateText3Styles]}>
                        {item.UnitPrice} {'per unit'}
                      </Text>
                      :
                      <></>
                    }

                    {item.Discount == '' ?
                      <Text
                        style={[styles.rateText3, this.props.rateText3Styles]}>
                        {item.Discount} {'savings'}
                      </Text>
                      :
                      <></>
                    }


                  </View>
                     {/* {item.IsShipToEnable == true ?  */}
                        {/* ( */}

                        {/* { item.IsServiceableByVendor != true ? <Text style={{color:'red'}}> Item not deliverable</Text> : */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -20, flex: 1, alignContent: 'center', }}>
   
                        <ProductQuantity key={index}
                          Quantity={item.Quantity.toString()}
                          //Quantity="2"
                          onTextChange={(text) => this.QuentityChange(text, item, index)}
                          maxProductQuantity={item.ProductStockQuantity}
                          ProductLimitIndicatorCount={item.ProductLeftLimit}
                        />
                      </View>
                      {/* } */}
                       {/* ) */}
                       {/* : 
                       (<View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -20, flex: 1, alignContent: 'center', }}>
   
                        <ProductQuantity key={index}
                          Quantity={item.Quantity.toString()}
                          //Quantity="2"
                          onTextChange={(text) => this.QuentityChange(text, item, index)}
                          maxProductQuantity={item.DPWStockQuantity}
                          ProductLimitIndicatorCount={item.DPWProductLeftLimit}
                        />
                      </View>)
                       } */}
                    
                 

                </View>


                <View style={[styles.ViewCenter, this.props.ViewCenterStyles]}>



                  <TouchableOpacity onPress={() => this.onAddToWishlistClick(item, index)}>
                    {item.CustomProperties.IsProductInYourWishList ?
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={[styles.ButtonText11, this.props.ButtonText11Styles]}>
                        Add to Wishlist
                      </Text>
                      :
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={[styles.ButtonText1, this.props.ButtonText1Styles]}>
                        Add to Wishlist
                      </Text>
                    }
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.onDelete(item)}

                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[styles.ButtonText1, this.props.ButtonText1Styles]}
                      testID="Cart_deleteBtn"
                      accessibilityLabel="Cart_deleteBtn"
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* )} */}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={[styles.listviewContainer, this.props.listviewContainerStyle]}>

        {this.props && this.props.shoppingListData && <FlatList
          data={this.props.shoppingListData}
          renderItem={this.renderProductList}
          keyExtractor={(item, index) => item}
        />}
      </View>
    );
  }
}
