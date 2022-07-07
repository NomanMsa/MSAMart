import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import { Icons, Images, Loaders } from '@assets';

import { Colors } from "@theme";
import { ServiceCall } from '@utils';
import { Api } from '@config';
import Toast from 'react-native-simple-toast';
const styles = require('./ProductListViewStyles');

export default class extends Component {
  static defaultProps = {
    listData: [],
    onImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
    onProductClick: () => { },
    OnWishlistClick: () => { },

  };

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      index: 0,
      DeleteWishlistItem: [],
      DescriptionLimit: this.props.descriptionLimit == null ? 40 : this.props.descriptionLimit,

    };
    this.renderProductList = this.renderProductList.bind(this);
  }

  componentDidMount() {
    var newCheckBoxData = []
    newCheckBoxData = this.props.listData

    this.setState(
      {
        listData: newCheckBoxData
      })

  }

  UpdateWishlistandAddToCartData = async (data) => {
    let Service = {
      apiUrl: Api.widgetProductAddWishlist + '?productId=' +data.Id +'&shoppingCartTypeId=2' +'&quantity=1',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      
      onSuccessCall: this.onSuccessWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccessWishlistCall = (datas) => {
    let IdArray = [];
    let tempListArray = this.props.listData;
    if (datas.errorlist.length > 0) {
      var messeageString = ''
      for (let i = 0; datas.errorlist.length > i; i++) {
        messeageString = datas.errorlist[i] + " ";
      }
      Alert.alert(
        'MsaMart',
        messeageString, [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'Ok',
          onPress: () => console.log('OK Pressed'),
        },], {
        cancelable: false
      }
      )


    } else {
      if( datas.message!=null && datas.message.length > 0 ){
        Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
      }


      tempListArray = Array.apply(null, Array(this.props.listData.length)).map((v, i) => {
        if (i == this.state.index) {
          let currData = this.props.listData[i];
          this.props.listData[i].CustomProperties.IsProductInYourWishList = !this.props.listData[i].CustomProperties.IsProductInYourWishList
          return currData;
        }
        else {
          return this.props.listData[i];
        }

      });
      this.setState({
        listData: tempListArray,

      });


    }

    this.props.OnWishlistClick(tempListArray)

  }

  UpdateWishlistData = async (data) => {
    console.log("wishlistItem........................", data)
    let Service = {
      apiUrl: Api.removeWishlistItem+ data.Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessUpdatedWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessUpdatedWishlistCall = async (datas) => {
    let IdArray = [];
    let tempArray = [];

    let tempListArray = this.props.listData;
    if (datas.errorlist.length > 0) {
      var messeageString = ''
      for (let i = 0; datas.errorlist.length > i; i++) {
        messeageString = datas.errorlist[i] + " ";
      }
      Alert.alert(
        'MsaMart',
        messeageString, [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'Ok',
          onPress: () => console.log('OK Pressed'),
        },], {
        cancelable: false
      }
      )

    } else {
      if( datas.message!=null && datas.message.length > 0 ){
        Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
      }


      tempListArray = Array.apply(null, Array(this.props.listData.length)).map((v, i) => {
        if (i == this.state.index) {
          let currData = this.props.listData[i];
          this.props.listData[i].CustomProperties.IsProductInYourWishList = !this.props.listData[i].CustomProperties.IsProductInYourWishList
          return currData;
        }
        else {
          return this.props.listData[i];
        }

      });
      this.setState({
        listData: tempListArray,

      });

    }
    var data = datas.model

    this.props.OnWishlistClick(tempListArray)

  }


  onFailureAPI(data) {
    console.log("error called.................", data);
    if( data.errorlist[0]!=null && data.errorlist[0].length > 0 ){
      Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
    }
  }

  onPromiseFailure(data) {
    console.log(data);
  }

  onOffline(data) {
    console.log(data);
  }


  onWishlist = (item, index) => {
    let IdArray = [];

    let tempArray = []
    this.setState({ index: index })
    if (item.CustomProperties.IsProductInYourWishList == false) {
      this.UpdateWishlistandAddToCartData(item)


    } else {
      var DeleteArray = []
      DeleteArray = this.state.DeleteWishlistItem;
      DeleteArray.push(item.Id)
      console.log("Item to be deleted");
      //this.UpdateWishlistandAddToCartData(item)
     this.UpdateWishlistData(item)
    }

  }

  renderProductList = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} onPress={() => this.props.onProductClick(item)}
        testID={this.props.testID}
        accessibilityLabel={this.props.testID}
      >
        <View
          style={[styles.productRowBox, this.props.productRowBoxStyle]}>
          <View style={styles.productImageBox}>
            <TouchableOpacity
              style={styles.productImageContainer}
              onPress={() => this.props.onImageClick(item)}>
              <Image
                style={styles.productImage}
                source={{ uri: item.DefaultPictureModel.ImageUrl }}
              />
            </TouchableOpacity>
            {(item.CustomProperties && item.CustomProperties.ProductRibbons && item.CustomProperties.ProductRibbons.Enabled) && (
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>
                  {item.CustomProperties.ProductRibbons.Text}
                </Text>
              </View>
            )}
            {item.ProductPrice.DisableWishlistButton == false && (
              <>
                {item.CustomProperties.IsProductInYourWishList == true && <TouchableOpacity style={styles.rightTopIconContainer} onPress={() => this.onWishlist(item, index)}>
                  <Image
                    style={styles.rightTopIcon2}
                    source={Icons.heartClear}
                  />
                </TouchableOpacity>
                }
                {item.CustomProperties.IsProductInYourWishList == false && <TouchableOpacity style={styles.rightTopIconContainer} onPress={() => this.onWishlist(item, index)}>
                  <Image
                    style={styles.rightTopIcon}
                    source={Icons.heartClear}
                  />
                </TouchableOpacity>
                }
              </>
            )}
          </View>
          <View style={styles.productDataBox}>
            <View>
              <TouchableOpacity
                style={styles.titleBox}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
                  style={styles.titleText1}>
                  {item.Name}
                </Text>
              </TouchableOpacity>
              <View style={styles.rateBox}>

                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.rateText1}>
                  {item.ProductPrice.Price}
                </Text>
                {item.ProductPrice.OldPrice ? <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.rateText2}>
                  {item.ProductPrice.OldPrice}
                </Text> : <></>}
              </View>
            </View>


            {item.CustomProperties.ShowStockMessage == true ?
              <>
                {item.CustomProperties.ShowOutOfStockMessage == true ?
                  <>
                    <Text style={styles.FlashDealstitleQty}>out of stock</Text>
                    {item.AdditionalInfo.StockQuantity < item.AdditionalInfo.ProductLeftLimit && <View style={{ marginTop: 5 }}>
                      <View style={{ borderRadius: 20, width: '100%', height: 5, backgroundColor: Colors.LIGHT_GRAY, paddingRight: 3, paddingLeft: 3 }}></View>

                      {item.AdditionalInfo.DPWStockQuantity != 0 ?
                        <></>
                        :
                        <View style={{ borderRadius: 20, width: item.AdditionalInfo.quantityPercentage + '%', height: 5, marginTop: -5, backgroundColor: Colors.PRIMARY_COLOR, paddingRight: 3, paddingLeft: 3 }}></View>

                      }
                    </View>}
                  </>
                  :
                  <>
                    <Text style={styles.FlashDealstitleQty}>Only {item.AdditionalInfo.StockQuantity} Left!</Text>
                    {item.AdditionalInfo.StockQuantity < item.AdditionalInfo.ProductLeftLimit && <View style={{ marginTop: 5 }}>
                      <View style={{ borderRadius: 20, width: '100%', height: 5, backgroundColor: Colors.LIGHT_GRAY, paddingRight: 3, paddingLeft: 3 }}></View>

                      <View style={{ borderRadius: 20, width: item.AdditionalInfo.quantityPercentage + '%', height: 5, marginTop: -5, backgroundColor: Colors.PRIMARY_COLOR, paddingRight: 3, paddingLeft: 3 }}></View>
                    </View>}
                  </>
                }
              </>
              :
              <>
              </>

            }



          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.listviewContainer}>
        <FlatList
          data={this.props.listData}
          renderItem={this.renderProductList}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
