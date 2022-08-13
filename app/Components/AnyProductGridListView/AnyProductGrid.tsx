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
import { Api, EventTags, EmarsysEvents } from '@config';

import Toast from 'react-native-simple-toast';
import FleashDealsViewAll from '../FleashDealsViewAll/FleashDealsViewAll.tsx';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";

const styles = require('../ProductGridListView/ProductGridListViewStyle');

export default class extends Component {
  static defaultProps = {
    listData: [],
    onImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
    OnProductClick: () => { },
    OnWishlistClick: () => { },
    ViewAllClick: () => { },
    UpdateWishlistandAddToCartData: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      listData: '',
      index: 0,
      DeleteWishlistItem: [],
      DescriptionLimit: this.props.descriptionLimit == null ? 40 : this.props.descriptionLimit,
      apiLoading: false,
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
    console.log("test21234**********", data);
    let jdata ={
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }

    let Service = {
      apiUrl: Api.widgetProductAddWishlist + '?productId=' + data.Id + '&shoppingCartTypeId=2',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        jdata
      }),
      onSuccessCall: this.onSuccessWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccessWishlistCall = async (datas) => {
    console.log("success////////");

    if (this.state.apiLoading == false) {
      this.setState({ apiLoading: true });
      console.log("onSuccessWishlistCall............", datas)
      this.props.OnWishlistClick()
      let IdArray = [];
      let tempArray = [];
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
        })
      } else {
        if (datas.message != null && datas.message.length > 0) {
          Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
        }

        tempArray = this.state.listData;
        tempArray = Array.apply(null, Array(this.state.listData.length)).map((v, i) => {

          if (i == this.state.index) {
            let tempRoom = this.state.listData[i];
            console.log("onSuccessWishlistCall............", tempRoom)

            if (this.state.listData[i].CustomProperties.IsProductInWishlist == false) {
              tempRoom.CustomProperties.IsProductInWishlist = true
              IdArray.push(this.state.listData[i]);
              let prizeDetails = tempRoom.ProductPrice
              AppEventsLogger.logEvent(EventTags.ADD_TO_WISHLIST, { 'currency': '', 'item_id': tempRoom.Id, 'value': prizeDetails.Price });
              analytics().logEvent('add_to_wishlist', { 'currency': '', 'item_id': tempRoom.Id, 'value': prizeDetails.Price });
              EmarsysEvents.trackEmarsys('add_to_wishlist', { 'currency': '', 'item_id': tempRoom.Id, 'value': prizeDetails.Price });

            } else if (this.state.listData[i].CustomProperties.IsProductInWishlist == true) {
              tempRoom.CustomProperties.IsProductInWishlist = false
              IdArray.push(this.state.listData[i]);
            }

            return tempRoom;
          }
          else {
            let tempRoom = this.state.listData[i];
            tempRoom.CustomProperties.IsProductInWishlist = tempRoom.CustomProperties.IsProductInWishlist
            tempRoom.ProductPrice.DisableWishlistButton = tempRoom.ProductPrice.DisableWishlistButton
            return tempRoom;
          }
        });
        this.setState({
          listData: tempArray,
        });
        this.props.OnWishlistClick()
      }
      var data = datas.model
      //await this.props.OnWishlistClick();
      this.setState({ apiLoading: false });
    }
  }

  UpdateWishlistData = async (data) => {
    let Service = {
      apiUrl: Api.removeWishlistItem + data.Id,
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
      Toast.showWithGravity('Item removed from wishlist.', Toast.LONG, Toast.BOTTOM);

      tempArray = this.state.listData;
      tempArray = Array.apply(null, Array(this.state.listData.length)).map((v, i) => {

        if (i == this.state.index) {
          let tempRoom = this.state.listData[i];
          if (this.state.listData[i].CustomProperties.IsProductInWishlist == false) {
            tempRoom.CustomProperties.IsProductInWishlist = true
            IdArray.push(this.state.listData[i]);

          } else if (this.state.listData[i].CustomProperties.IsProductInWishlist == true) {
            tempRoom.CustomProperties.IsProductInWishlist = false
            IdArray.push(this.state.listData[i]);
          }

          return tempRoom;
        }
        else {
          let tempRoom = this.state.listData[i];
          tempRoom.CustomProperties.IsProductInWishlist = tempRoom.CustomProperties.IsProductInWishlist
          tempRoom.ProductPrice.DisableWishlistButton = tempRoom.ProductPrice.DisableWishlistButton
          return tempRoom;
        }

      });
      this.setState({
        listData: tempArray,
      });
    }
    var data = datas.model
    this.props.OnWishlistClick()
  }




  onFailureAPI(data) {
    console.log("error called.................", data);
    if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
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


    console.log("testcastgvdn///////'''///////''////'''//////");

    let IdArray = [];

    let tempArray = []
    this.setState({ index: index })
    //this.UpdateWishlistandAddToCartData(item)
    if (item.CustomProperties.IsProductInWishlist == false) {
      this.UpdateWishlistandAddToCartData(item)
      this.props.OnWishlistClick()

    } else {
      var DeleteArray = []
      DeleteArray = this.state.DeleteWishlistItem;
      DeleteArray.push(item.Id)
      this.setState({ DeletedItemData: DeleteArray })
      // this.UpdateWishlistandAddToCartData(item)
      this.UpdateWishlistData(item)
      //this.props.OnWishlistClick(item)

      this.setState({ DeletedItemData: [] })

    }

  }


  renderProductList = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} style={[styles.productRowBox, this.props.productRowBoxStyle]} onPress={() => this.props.OnProductClick(item)}
        testID={this.props.onImageClickTestId}
        accessibilityLabel={this.props.onImageClickTestId}
      >

        <View style={styles.productImageBox}
          testID="productDesktop"
          accessibilityLabel="productDesktop"
        >
          <TouchableOpacity
            testID={"selectProductMobile"}
            accessibilityLabel="selectProductMobile"

            style={styles.productImageContainer}
            onPress={() => this.props.onImageClick(item)}>
            <Image
              testID={"selectProductFromHomeBtn"}
              accessibilityLabel="selectProductFromHomeBtn"
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
              {item.CustomProperties.IsProductInWishlist == true && <TouchableOpacity
                testID={"addedToWishListBtn"}
                accessibilityLabel="addedToWishListBtn"
                style={styles.rightTopIconContainer} onPress={() => this.onWishlist(item, index)}>
                <Image
                  testID={"favicon"}
                  accessibilityLabel="favicon"
                  style={styles.rightTopIcon2}
                  source={Icons.heartClear}
                />
              </TouchableOpacity>
              }
              {item.CustomProperties.IsProductInWishlist == false && <TouchableOpacity
                testID={"addtoWishListBtn"}
                accessibilityLabel="addtoWishListBtn"
                style={styles.rightTopIconContainer} onPress={() => this.onWishlist(item, index)}>
                <Image
                  style={styles.rightTopIcon}
                  source={Icons.heartClear}
                  testID={"addToWishListMobileBtn"}
                  accessibilityLabel={"addToWishListMobileBtn"}
                />
              </TouchableOpacity>
              }
            </>
          )}
        </View>
        <View style={styles.productDataBox}>
          <TouchableOpacity
            testID={"productName"}
            accessibilityLabel="productName"
            style={styles.titleBox} onPress={() => this.props.onImageClick(item)}>
            <Text ellipsizeMode={'tail'} numberOfLines={2} style={styles.titleText2}>
              {item.Name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomRow} onPress={() => this.props.onImageClick(item)}

          >
            <View style={{ height: 25 }}>
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

            {this.props.isBottomRightIcon && (<>
              {item.ProductPrice.DisableBuyButton != false && <TouchableOpacity
                style={styles.leftBottomIconContainer}
                onPress={() => this.props.onCartClick(item)}>
                <Image
                  style={styles.leftBottomIcon}
                  source={this.props.bottomRightIcon}
                />
              </TouchableOpacity>}
            </>)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onImageClick(item)}

          >
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
          </TouchableOpacity>
        </View>
        {/* )} */}
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={[styles.listviewContainer, this.props.listViewContainerStyle]}>
        <FlatList
          data={this.props.listData}
          numColumns={2}
          columnWrapperStyle={{ flex: 1, justifyContent: 'flex-start' }}
          renderItem={this.renderProductList}
          keyExtractor={(item, index) => index}
          extraData={this.props}
        />
        <>
          {this.props.showAllButton != null ?
            <FleashDealsViewAll
              onPress={() => this.props.ViewAllClick()}
              ViewAllLeftIcon={this.props.ViewAllLeftIcon}
              ViewAllRightIcon={this.props.ViewAllRightIcon}
            />
            :
            <View></View>

          }
        </>
      </View>
    );
  }
}
