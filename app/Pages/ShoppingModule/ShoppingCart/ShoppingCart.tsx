import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  Modal,
  Platform,
  Linking,
  ImageComponent,
} from 'react-native';

import {
  Header,
  Footer,
  Button,
  SearchBar,
  ProductGridListView,
  ShoppingProductList,
  CartSummary,
  CartSummaryModel,
  OfflineNotice,
  FleashDealsCount,
  EmptyShoppingCart,
  ButtonWithIcon
} from '@components';

import styles from './ShoppingCartStyles';
import { Icons, Images, Loaders } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
// import Emarsys from "react-native-emarsys-wrapper";
import Toast from 'react-native-simple-toast';
import { Colors } from '@theme';
import { DrawerActions } from '@react-navigation/native';
// import TreeView from 'react-native-final-tree-view';
//import library for the TreeView
import { ServiceCall } from '@utils';
import { Constants } from '@config';
import { Api , EventTags,EmarsysEvents} from '@config';
import { connect } from 'react-redux'
import perf from '@react-native-firebase/perf';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";

const SCREEN_WIDTH = Dimensions.get('window').width;
let IS_SCREEN_SEIZE_SMALL = false
if (SCREEN_WIDTH <= 320) {
  IS_SCREEN_SEIZE_SMALL = true
} else {
  IS_SCREEN_SEIZE_SMALL = false
}

class ShoppingCart extends Component {
  static defaultProps = {
    onImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      Title: 'Shopping cart',
      loading: false,
      isSummuryOpen: false,
      totalText: 'Total',
      // totalValue: '16,576.91',
      totalValue: 'calculated during checkout',

      totalCurrancy: '$',
      scrollMenuData: [],
      imgSliderData: [],
      imgCardsData: [],
      topWidget: [],
      bottomWidget: [],
      beforeNewsWidget: [],
      beforeBestSellersWidget: [],
      beforeProductsWidget: [],
      productData:[],
      shoppingCartData: '',
      shoppingCartList: [],
      summuryData: [],
      summuryDataCustomProperties: '',
      summuryCustomData: '',
      DeletedItemData: '',
      UpdatedQuentityItemData: '',
      cartqtyarr:[],
      CartCount: 0,
      wishListCount: 0,
      CoupenCode: '',
      isDisplayCoupenResponce: false,
      IsCoupenApplied: false,
      coupenResponceMessage: '',
      coupenAppliedList: [],
      renderGiftCardList: [],
      customeProperty: '',
      StandardDeliveryModel: '',
      serviceableByVendorArr: [],
      shipToEnabled: false,
      currentCountryModel: null,
    };
    this.onSuccessWidgetCall = this.onSuccessWidgetCall.bind(this);
    this.renderTotalPrize = this.renderTotalPrize.bind(this);
    this.onSuccessgetOrderTotal = this.onSuccessgetOrderTotal.bind(this);
    
  }
  async componentDidMount() {
    const shoppingcartTrace = await perf().startTrace('custom_trace_shoppingcart_screen');
    this.props.updateCartCount()
    this.setState({ loading: true });
     this.getCartCountData();
    this.onSuccessShoppingCall(this.props.ShoppingCartData)
    
    this.setState({ loading: false });
    await this.fetchShoppingData();
    this.fetchordreTotal();
  this.onSuccessgetOrderTotal();
    //this.fetchWidgitData();
    shoppingcartTrace.putAttribute('occurrence', 'firstVisit');
    await shoppingcartTrace.stop();

    this.focusListener = await this.props.navigation.addListener('focus', async () => {
      const shoppingcartTrace = await perf().startTrace('custom_trace_shoppingcart_screen');
      await this.props.updateShoppingCall()
      await this.onSuccessShoppingCall(this.props.ShoppingCartData)
     this.onSuccessgetOrderTotal(this.props.summuryData);
      this.props.updateCartCount()
      //this.fetchWidgitData();
      await this.fetchShoppingData();
      this.fetchordreTotal();
      shoppingcartTrace.putAttribute('occurrence', 'reVisit');
      await shoppingcartTrace.stop();
    });
    let durationM = new Date().getTime() - this.state.startTime

    let cartRenderTime = {
      item_id: durationM,
      slug_url: ' ',
      entity_name: 'cart',
    };
    console.log("PDP duration--", this.state.startTime ," ---- ", durationM);
    await analytics().logEvent('cart_renderingTime', cartRenderTime);
    AppEventsLogger.logEvent(EventTags.cart_renderingTime, cartRenderTime);
  }

  componentWillMount() {
    let startTimeM = new Date().getTime()
    this.setState({ startTime : startTimeM });
   }
  componentWillUnmount() {
    //this.focusListener();
  }

  onSuccessWidgetCall(data) {
    data = data.model;
    
    // let topWidget = [];
    // let bottomWidget = [];
    // let beforeNewsWidget = [];
    // let beforeBestSellersWidget = [];
    // let beforeProductsWidget = [];
    //for (var i = 0; i < data.length; i++) {
      //if (data[i].WidgetZoneName == 'home_page_top') { topWidget.push(data[i]); }
      // if (data[i].WidgetZoneName == 'home_page_top') {
      //   topWidget.push(data[i]);
      // }
      // if (data[i].WidgetZoneName == 'shopping_cart_with_items') {
      //   beforeNewsWidget.push(data[i]);
      // }
      // if (data[i].WidgetZoneName == 'home_page_before_best_sellers') {
      //   beforeBestSellersWidget.push(data[i]);
      // }
      // if (data[i].WidgetZoneName == 'home_page_before_products') {
      //   beforeProductsWidget.push(data[i]);
      // }
    //   if (data[i].WidgetZoneName == 'empty_shopping_cart_with_no_items') {

    //     bottomWidget.push(data[i]);
    //   }
    // }
    this.setState({
      // topWidget: topWidget,
      // bottomWidget: bottomWidget,
      // beforeNewsWidget: beforeNewsWidget,
      // beforeBestSellersWidget: beforeBestSellersWidget,
      // beforeProductsWidget: beforeProductsWidget,
      productData:data
    });
  }

  onSuccessShoppingCall = async (data) => {
    data = data.model;
    console.log("onSuccessShoppingCall.........", data);
    // this.props.UpdateShoppingData({ ShoppingCartData: data })
    var discountBox = data.DiscountBox
    var customData = data.CustomProperties
    await this.setState({
      shoppingCartData: data,
      shoppingCartList: data.Items,
      customeProperty: data.CustomProperties,
      StandardDeliveryModel: customData,
      //summuryData: customData,
      summuryDataCustomProperties: customData,
      summuryCustomData: customData,
      isDisplayCoupenResponce: discountBox.Display,
      IsCoupenApplied: discountBox.IsApplied,
      coupenAppliedList: discountBox.AppliedDiscountsWithCodes,
      isShipToEnable:false, //data.CommonShipToModel.IsShipToEnable
    })
    this.fetchordreTotal();
    this.state.shoppingCartList.map(item => {
      item.Items.map(val => {
        var arr = val.IsServiceableByVendor;
        this.state.serviceableByVendorArr.push(arr);

      })
    });
    if (data.CommonShipToModel) {
      await this.setState({
        shipToEnabled: data.CommonShipToModel.IsShipToEnable,
        currentCountryModel: data.CommonShipToModel.CurrentCountryModel,
      });
    }
    if (discountBox.Messages !== null && discountBox.Messages !== []) {
      let responceMsg = discountBox.Messages[0]

      await this.setState({
        coupenResponceMessage: responceMsg,

      })
    }
    
    // await analytics().logEvent('view_cart', { 'currency': '', 'items': data.VendorItems, 'value': '' });
    // console.log("value.......", value)
    let items = []
    let Listdata = data.VendorItems
    for (let i = 0; Listdata.length > i; i++) {
      items.push(Listdata[i].Id)
    }
    const value = await AsyncStorage.getItem('@currencysymbol')
    if (value !== null) {
      if (customData !== null && customData.ProductIds!=null && customData.ProductIds.length>0) {

        let viewCartEventParams = { 'currency': value, 'itemList': (customData.ProductIds).toString(), 'value': data.SubTotal };
        await analytics().logEvent('view_cart', viewCartEventParams);
        this.trackCart(Listdata);
        AppEventsLogger.logEvent(EventTags.VIEW_CART, viewCartEventParams);
      }
    } else {

      if(items!=null && items.length> 0){
        let viewCartEventParams = { 'currency': ' ', 'itemList': (items).toString(), 'value': data.SubTotal }
        await analytics().logEvent('view_cart', viewCartEventParams);
        EmarsysEvents.trackEmarsys('view_cart', viewCartEventParams);
        AppEventsLogger.logEvent(EventTags.VIEW_CART, viewCartEventParams);
      }

    }
    
    // await this.props.updateShoppingCall()
  }

  async trackCart(ListData) {
    
    let emarysCartTracker = ListData.map((value,index) =>{ 
      return { itemId:value.Items[0].ProductId.toString(), price:value.Items[0].DPWUnitPriceWithoutCurr, quantity:value.Items[0].Quantity }
    });
    
    try {
      let result = "";/*await Emarsys.predict.trackCart(emarysCartTracker);*/
    } catch (e) {
      console.log("Emarsys error ",e );
      console.log(e);
    }
  }

  onUpdateSuccessCall = async (datas) => {
    console.log("sucessss**/*/*//**/*///**//***",datas.model);
    
    if (datas.errorlist > 0) {
      Alert.alert('MsaMart', datas.errorlist[0])
    } else {
      console.log("onUpdateSuccessCall.............", datas)
      if(Platform.OS === 'ios'){
        setTimeout(() => {
          Toast.showWithGravity('Cart updated successfully', Toast.LONG, Toast.BOTTOM);
        }, 100);
      } else {
        Toast.showWithGravity('Cart updated successfully', Toast.LONG, Toast.BOTTOM);
      }
      //this.props.UpdateShoppingData({ ShoppingCartData: datas })
      this.props.updateShoppingCall()
      var data = datas.model
      await this.setState({
        shoppingCartData: data,
        shoppingCartList: data.Items,
       // summuryData: data.CustomProperties.OrderTotals,
        summuryCustomData: data.CustomProperties,
        customeProperty: data.CustomProperties,
        StandardDeliveryModel: data.CustomProperties.StandardDeliveryModel
      })
      this.fetchordreTotal();
      await this.getCartCountData()
      this.props.updateCartCount();
      // await analytics().logEvent('remove_from_cart', { 'currency': this.state.currency, 'items': [this.state.pName,], 'value': this.state.pNewPrice });
    }
  }

  onFailureAPI(data) {
    console.log("onFailureAPI", data);
    this.setState({ loading: false });
  }
  onPromiseFailure(data) {
    console.log("onPromiseFailure", data);
    this.setState({ loading: false });
  }
  onOffline(data) {
    console.log("onOffline", data);
    this.setState({ loading: false });
  }

  fetchWidgitData = async () => {
    let Service = {
      apiUrl: Api.Widgets,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({ widget: 'cart' }),
      onSuccessCall: this.onSuccessWidgetCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  fetchShoppingData = async () => {
    let Service = {
      apiUrl: Api.getShoppingCartList,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessShoppingCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  fetchordreTotal = async()=>{
    console.log("////////////////////////////////////////process");
    
    let Service = {
      apiUrl:Api.ordreTotal,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessgetOrderTotal,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }

  onSuccessgetOrderTotal(data){
    console.log("----------------------------------------------------successsssssss"+JSON.stringify(data.model));
    
    let data1 = data.model
    console.log("//////////////////////////",data1);
    

     this.setState({
      summuryData : data1
    })
  }


  onDeleteShoppingItem = async (data) => {
    console.log("deleted item", data)
    //var DeleteArray = []
    //DeleteArray = this.state.DeletedItemData;
    //DeleteArray.push(data.Id)
    var id = data.Id;
    console.log("----xnnid",id);
    
    this.setState({ DeletedItemData : id })
    console.log("--------------------------------------------------------------/-check dataitems"+data.Id);
    

    this.setState({ loading: true })
    await this.onUpdateShoppingItem(id)
    
    this.setState({  loading: false })
    // await analytics().logEvent('remove_from_cart', { 'currency': this.state.currency, 'items': [this.state.pName,], 'value': this.state.pNewPrice });
    const value = await AsyncStorage.getItem('@currencysymbol')
    console.log("value.......", value)
    if (value !== null) {

      let removeFromCartEventParams = { 'currency': value, 'item_id': data.Id, 'value': data.SubTotal };
      await analytics().logEvent('remove_from_cart', removeFromCartEventParams);
      EmarsysEvents.trackEmarsys(EventTags.REMOVE_FROM_CART, removeFromCartEventParams);
      AppEventsLogger.logEvent(EventTags.REMOVE_FROM_CART, removeFromCartEventParams);

    } else {

      let removeFromCartEventParams= { 'currency': ' ', 'item_id': data.Id, 'value': data.SubTotal };
      await analytics().logEvent('remove_from_cart',removeFromCartEventParams );
      EmarsysEvents.trackEmarsys(EventTags.REMOVE_FROM_CART, removeFromCartEventParams);
      AppEventsLogger.logEvent(EventTags.REMOVE_FROM_CART, removeFromCartEventParams);

    }
  }


  onQuentityUpdateShoppingItem = async (data, item, text) => {
    console.log("data -- ", data, " ---- ", item, " ---- ", text);
    var QuentityArray = {}
    // QuentityArray.push(data.Quantity)
    var dict = {};
    dict.key1 = item.Id.toString()
    dict.key2 = text.toString();
    QuentityArray[dict.key1] = dict.key2
    var a="{"+"itemquantity"+dict.key1+":"+'"'+ text.toString()+'"'+"}"
    console.log("newjson/*//*/**/***",a);
    
    //QuentityArray.push()
    await this.setState({ cartqtyarr: dict })
console.log("//**////*//////*/*/*///****/*/**/",this.state.UpdatedQuentityItemData);

    
    this.setState({ UpdatedQuentityItemData: '' })
    console.log("3/3/3/3/3/3/3/3/3/3/3/3", dict)
    await this.onUpdateShoppingItem('')


  }

  AddToWishlistChange = (data) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", data)
    this.onAddToWishList(data.ProductId);
  }


  onUpdateShoppingItem = async (id) => {
    var dict =this.state.cartqtyarr;
    var keyname ="itemquantity"+dict.key1
    var keyname2 ="removefromcart"
    var a ='{'+'"'+keyname+'"'+ ":"+'"'+dict.key2+'"'+','+'"'+keyname2+'"'+":"+'"'+id+'"'+'}';
    console.log("////////////////////////"+a)
    //var id= this.state.DeletedItemData;
    let Service = {
      apiUrl: Api.UpdateShoppingCartList,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: a,


      onSuccessCall: this.onUpdateSuccessCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };


  onAddToWishList = async (catId) => {
    
    await this.setState({ loading: true });
let jdata ={
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
    let Service = {
      apiUrl: Api.AddToCart + '?productId=' + catId + '&shoppingCartTypeId=2',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData:JSON.stringify(
        jdata
      ),
      onSuccessCall: this.onSuccessonAddToWishList,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);

  };


  onSuccessonAddToWishList = async (datas) => {
    console.log("onSuccessonAddToWishList.............", datas)
    if (datas.status == false) {
      if (datas.errorlist.length > 0) {
        Alert.alert('MsaMart', datas.errorlist ,[{onPress:()=>{
          this.setState({ loading: false });
        } }])

      } else {
        Alert.alert('MsaMart', "Something went wrong",[{onPress:()=>{
          this.setState({ loading: false });
        } }]);
      }
    } else {

      //var data = datas
      this.fetchShoppingData();
      await this.setState({
        loading: false,
        //shoppingCartData: data,
        //shoppingCartList: data.VendorItems,
        //summuryData: data.CustomProperties.OrderTotals,
        //summuryDataCustomProperties: data.CustomProperties.OrderTotals.CustomProperties,
        //summuryCustomData: data.CustomProperties,
        
      });
      //this.fetchordreTotal();
      await this.getCartCountData()
      await this.props.updateCartCount();
      if( datas.message!=null && datas.message.length > 0 ) {
        if(Platform.OS === 'ios'){
          setTimeout(() => {
            Toast.showWithGravity(datas.message, Toast.LONG,Toast.BOTTOM);
          }, 100);
        } else {
            Toast.showWithGravity(datas.message, Toast.LONG,Toast.BOTTOM);
        }
      }
    }
  }

  getCartCountData = async () => {
    let authToken = await AsyncStorage.getItem('custToken');
		if(authToken != null){
    let Service = {
      apiUrl: Api.getShoppingCount,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessGetCountCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }
  };

  onSuccessGetCountCall = (data) => {
    this.setState({
      CartCount: data.model.Items.length,
      //wishListCount: data.model.Items.length
    })
    this.props.addCountToCart({ cartCount: data.model.Items.length })

  }

  OnApplyCoupen = async () => {
    if (this.state.CoupenCode != '') {

      await this.setState({ loading: true })
      let Service = {
        apiUrl: Api.ApplyCoupen + this.state.CoupenCode,
        methodType: 'GET',
        headerData: { 'Content-Type': 'application/json' },

        onSuccessCall: this.onSuccessOnApplyCoupenCall,
        onFailureAPI: this.onFailureAPI,
        onPromiseFailure: this.onPromiseFailure,
        onOffline: this.onOffline,
      };

      const serviceResponse = await ServiceCall(Service);
      await this.setState({ loading: false })
    } else {
      Alert.alert(
        'MsaMart',
        "please enter valid coupen/gift card code", [{
          text: 'Ok',
          onPress: () => console.log('OK Pressed'),
        },], {
        cancelable: false
      }
      )
    }
  }


  onSuccessOnApplyCoupenCall = async (datas) => {
    console.log('onSuccessOnApplyCoupenCall...............', datas)
    let data = datas.model
    let discountBox = data.DiscountBox
    let customData = data.CustomProperties
    // var responceMsg = discountBox.Messages[0]

    await this.setState({
      summuryCustomData: customData,
      //summuryData: customData.OrderTotals,
      summuryDataCustomProperties: customData.OrderTotals.CustomProperties,
      isDisplayCoupenResponce: discountBox.Display,
      IsCoupenApplied: discountBox.IsApplied,
      CoupenCode: '',
      // coupenResponceMessage: responceMsg,
      coupenAppliedList: discountBox.AppliedDiscountsWithCodes,

    })
    this.fetchordreTotal();
    if (discountBox.Messages !== null && discountBox.Messages !== []) {
      let responceMsg = discountBox.Messages[0]

      await this.setState({
        coupenResponceMessage: responceMsg,

      })
    }


  }



  OnCoupenCancel = async (data) => {
    this.setState({ loading: true })
    let Service = {
      apiUrl: Api.CancelCoupen + data.Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessOnCoupenCancelCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    this.setState({ loading: false })

    const serviceResponse = await ServiceCall(Service);

  }

  onSuccessOnCoupenCancelCall = async (datas) => {
    console.log("onSuccessOnCoupenCancelCall...", datas)
    //  if (!datas.errorlist) {
    let data = datas.model


    let discountBox = data.DiscountBox
    var responceMsg = discountBox.Messages[0]
    let customData = data.CustomProperties
    await this.setState({
      summuryCustomData: customData,
      //summuryData: customData.OrderTotals,
      summuryDataCustomProperties: customData.OrderTotals.CustomProperties,
      isDisplayCoupenResponce: discountBox.Display,
      IsCoupenApplied: discountBox.IsApplied,
      coupenResponceMessage: responceMsg,
      coupenAppliedList: discountBox.AppliedDiscountsWithCodes

    })
    this.fetchordreTotal();
  }


  OnGiftCartCancel = async (data) => {
    this.setState({ loading: true })
    let Service = {
      apiUrl: Api.CancelGiftCard + data.Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessOnGiftCartCancelCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    this.setState({ loading: false })

    const serviceResponse = await ServiceCall(Service);

  }

  onSuccessOnGiftCartCancelCall = async (datas) => {
    console.log("onSuccessOnGiftCartCancelCall......", datas)
    let data = datas.model
    var discountBox = data.DiscountBox
    // var responceMsg = discountBox.Messages[0]

    await this.setState({
      summuryCustomData: data.CustomProperties,
      //summuryData: data.CustomProperties.OrderTotals,
      summuryDataCustomProperties: data.CustomProperties.OrderTotals.CustomProperties,
      isDisplayCoupenResponce: discountBox.Display,
      IsCoupenApplied: discountBox.IsApplied,
      // coupenResponceMessage: responceMsg,
      coupenAppliedList: discountBox.AppliedDiscountsWithCodes
    })
    this.fetchordreTotal();
    if (discountBox.Messages !== null && discountBox.Messages !== []) {
      let responceMsg = discountBox.Messages[0]

      await this.setState({
        coupenResponceMessage: responceMsg,

      })
    }
  }

  OnPayNowClick = async (data) => {
    
    let token = await AsyncStorage.getItem('custGuid')
    this.setState({ isSummuryOpen: false })
    if (await AsyncStorage.getItem('loginStatus') == 'true') {
      let coupenData = '';
      if (this.state.summuryData.OrderTotalDiscount != '' && this.state.summuryData.OrderTotalDiscount != null) {
        coupenData = this.state.summuryData.OrderTotalDiscount
      }
      // for (let i = 0; this.state.)
      //   await analytics().logEvent('begin_checkout', { 'coupon': coupenData, 'currency': '', 'items': [data.Id,], 'value': data.SubTotal });
      const value = await AsyncStorage.getItem('@currencysymbol')
      console.log("value.......", value)
      if (value !== null) {
        let beginCheckoutEventParams = { 'coupon': coupenData, 'currency': value, 'value': this.state.summuryData.SubTotal };
        await analytics().logEvent('begin_checkout', beginCheckoutEventParams);
        AppEventsLogger.logEvent(EventTags.BEGIN_CHECKOUT, beginCheckoutEventParams);
        EmarsysEvents.trackEmarsys(EventTags.BEGIN_CHECKOUT, beginCheckoutEventParams);
      } else {

        let beginCheckoutEventParams = { 'coupon': coupenData, 'currency': ' ', 'value': this.state.summuryData.SubTotal };

        await analytics().logEvent('begin_checkout', beginCheckoutEventParams);
        EmarsysEvents.trackEmarsys(EventTags.BEGIN_CHECKOUT, beginCheckoutEventParams);
        AppEventsLogger.logEvent(EventTags.BEGIN_CHECKOUT, beginCheckoutEventParams);
      }
      await this.props.navigation.navigate('PayNow', { passData: token, })
    } else {
      this.props.navigation.navigate('SignIn', { passData: { screen: 'PayNow' }, })
    }
  }

  OnViewAllPress = async (item) => {
    console.log("OnViewAllPress...", item)

    if (item.CustomProperties) {
      var navigationData = item.CustomProperties.UrlRecord
      if (navigationData) {
        if (navigationData.EntityName == "Vendor") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Vendor' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Vendor' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Vendor' });
          this.props.navigation.push('VendorFilterProductList', { passData: { pageName: 'Home', data: { Id: navigationData.EntityId } }, })
        }
        if (navigationData.EntityName == "Category") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Category' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Category' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Category' });
          this.props.navigation.push('FilterProductList', { passData: { pageName: 'Home', data: { Id: navigationData.EntityId } }, })
        }
        if (navigationData.EntityName == "Manufacturer") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Manufacturer' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Manufacturer' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Manufacturer' });
          this.props.navigation.push('ManufacturerFilterProductList', { passData: { pageName: 'Home', data: { Id: navigationData.EntityId } } })
        }
        if (navigationData.EntityName == "ExternalSearch") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'ExternalSearch' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'ExternalSearch' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'ExternalSearch' });
          this.props.navigation.push('SearchFilterProductList', { passData: { pageName: 'Home', data: { slugUrl: navigationData.Slug, SearchName: ' ' } } })
        }
        if (navigationData.EntityName == "Register") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Register' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Register' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Register' });
          this.props.navigation.push('Register')
        }
        if (navigationData.EntityName == "Mailto") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'Mailto' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'Mailto' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'Mailto' });
          Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')

        }
      }
    }
  }


  renderTotalPrize = () => {
     this.fetchordreTotal();
    return (
      <View
        style={[styles.totalPrizeContainer, this.props.totalPrizeContainer]}>
        <View>
          <Text>{this.state.totalText}</Text>
          <Text style={[styles.titleText, this.props.titleText]}>
            {/* {this.state.totalCurrancy} {this.state.totalValue} */}
            {this.state.totalCurrancy} {this.state.summuryData.OrderTotal}
          </Text>
        </View>
        <Button
          title={'Proceed'}
          OnClick={(data) =>
            this.props.navigation.navigate('ShoppingSummary', {
              passData: data,
            })
          }
          btnStyle={{
            borderWidth: 0,
            width: 200,
            backgroundColor: Colors.PRIMARY_DARK_BTN,
          }}
          titleStyle={{ color: Colors.WHITE, textTransform: 'none' }}
        />
      </View>
    );
  };

  onWishIconClick = async () => {
    this.props.updateWishlist()

    await this.fetchWidgitData();
     await this.getCartCountData();
    this.props.updateCartCount()

  }

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  render() {
    return (
      <>
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.8)"
          source={Loaders.rings}
          animationStyle={styles.lottie}
          speed={1}
        />
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          {/* <Header
            burgerMenuClick={(data) => {
              this.props.navigation.toggleDrawer();
            }} */}
          <Header
            burgerMenuClick={(data) => {
              //this.props.navigation.toggleDrawer();
              this.props.navigation.dispatch(DrawerActions.openDrawer());
              //this.props.navigation.openDrawer()
            }}
            countryModel={this.state.currentCountryModel}
            shipToEnabled={this.state.shipToEnabled}
            shipToButtonClick={this.handleShipToButtonClick}
            backButtonClick={() => this.props.navigation.pop()}
            NavButton={true}
            userIcoStyles={{ tintColor: Colors.WHITE }}
            cartIcoStyles={{ tintColor: Colors.WHITE }}
            menuIcoStyles={{ tintColor: Colors.WHITE }}
            logoStyles={{ tintColor: Colors.WHITE }}
            fullRowBottom={
              <SearchBar
                onFocus={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                editable={false}
                onSearchContainer={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                onTextChange={(data) => console.log(data)}
                onSearch={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                isEnabled={false}
                styles={{ borderWidth: 0 }}
                iconColor={Colors.BLACK}
                iconContainerStyles={{
                  backgroundColor: Colors.SECONDAY_COLOR,
                }}
                placeholderStyles={{}}
              />
            }
            fullRowTop={<></>}
            styles={{
              backgroundColor: Colors.PRIMARY,
              borderBottomColor: Colors.SILVER,
            }}
            userClick={async (data) => { if (await AsyncStorage.getItem('loginStatus') == 'true') { this.props.navigation.navigate('Account', { passData: data, }) } else { this.props.navigation.navigate('SignIn', { passData: { screen: 'ShoppingCart' }, }) } }}
            cartClick={(data) =>
              this.props.navigation.navigate('ShoppingCart', {
                passData: data,
              })
            }
            logoClick={(data) => this.props.navigation.navigate('Home')}
          />
          <OfflineNotice
            noInternetText={'No internet!'}
            offlineText={'You are offline!'}
            offlineStyle={{}}
            noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
            offlineTextStyle={{}}
            noInternetTextStyle={{}}
          />

          <ScrollView
            style={styles.pageStyles}
            contentInsetAdjustmentBehavior="automatic">
            <View>
              <View
                style={[
                  styles.titleTextContainer,
                  this.props.titleTextContainer,
                ]}>
                <Text style={[styles.HeaderText, this.props.HeaderText]}>
                  {this.state.Title}
                </Text>
              </View>
              {this.state.customeProperty && this.state.StandardDeliveryModel && (this.state.StandardDeliveryModel).IsFreeBanner == true ? <View style={{ flexDirection: 'row', padding: 15 }}>
                <View style={styles.IcoContainer}>
                  <Image style={styles.FlashDealsIcon} source={Icons.freeShippingDone} />
                </View>
                <Text
                  style={{ ...styles.prizeText, fontSize: 14, paddingRight: 20 }}>
                  {(this.state.customeProperty).StandardDelivery}
                </Text>
              </View>
                :
                <></>}

              {this.state.customeProperty && this.state.StandardDeliveryModel && (this.state.StandardDeliveryModel).IsFreeBanner == false ? <View style={{ flexDirection: 'row', padding: 15 }}>

                <View style={styles.IcoContainer}>
                  <Image style={styles.FlashDealsIcon} source={Icons.freeShippingWarning} />
                </View>
                <Text
                  style={{ ...styles.prizeText, fontSize: 14, paddingRight: 20 }}>
                  {(this.state.customeProperty).StandardDelivery}
                </Text>
              </View>
                :
                <></>}
              <>
                {this.state.shoppingCartList.length > 0 ?
                  <>
                    {this.state.shoppingCartData.Warnings.length !== 0 ?
                      <Text style={{ color: 'red', marginLeft: 10, marginRight: 10 }}> {this.state.shoppingCartData.Warnings[0]} </Text>
                      :
                      <></>
                    }
                    <Text
                      style={[styles.prizeText, this.props.prizeTextStyles]}
                      testID="Your Items"
                      accessibilityLabel="Your Items">
                      Your Items
                    </Text>

                    {
                      <View>
                        <ButtonWithIcon
                          mainContainerStyles={{ padding: 0, marginTop: 15, }}
                          // icon={Icons.notify}
                          imageAvtarStyle={{
                            height: 0,
                            width: 0,
                            margin: 5,
                            
                          }}
                          testId={"cart_sellerDetails"}

                          // text={"Sold by:"}
                          // titleStyle={{
                          //   ...Platform.select({
                          //     ios: {
                          //       fontWeight: '800',
                          //       fontFamily: 'verdana',
                          //     },
                          //     android: {
                          //       fontWeight: 'normal',
                          //       fontFamily: 'verdanab',
                          //     },
                          //   }),
                          // }}
                          // Secondarytext={item.Sku}
                          // secondaryTitleStyle={{
                          //   color: Colors.PRIMARY,
                          //   alignSelf: 'flex-start',
                          //   alignItems: 'flex-start',
                          // }}
                          
                          userClick={(data) =>
                            
                            // this.props.navigation.push('VendorFilterProductList', {
                            //   passData: { data: data }
                            // })
                            this.props.navigation.push('VendorFilterProductList', {
                              passData: {
                                pageName: 'PDP',
                                //data: { Id: item.Id},
                              },
                            })
                          }
                        />

                        {/* {item.CustomProperties != '' ?
                          <ButtonWithIcon
                            mainContainerStyles={{ padding: 0, marginTop: -7, }}
                            // icon={Icons.notify}
                            imageAvtarStyle={{
                              height: 0,
                              width: 0,
                              margin: 5,
                            }}
                            text={item.CustomProperties.MinCartValue}
                            titleStyle={{
                              ...Platform.select({
                                ios: {
                                  fontWeight: '400',
                                  fontFamily: 'verdana',
                                },
                                android: {
                                  fontWeight: 'normal',
                                  fontFamily: 'verdana',
                                },
                              }),
                              color: Colors.EMAIL_GREEN,
                              fontSize: 12,
                            }}
                          />
                          :
                          <></>
                        } */}

                        <View style={{ borderTopWidth: StyleSheet.hairlineWidth }}>
                          <ShoppingProductList
                            shoppingListData={this.state.shoppingCartList}
                            productNameTestId={"cart_productNames"}

                            isImgTopRtIcon={true}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            bottomRightIcon={Icons.addCart}
                            onImageClick={(data) => console.log('common   ' + data.text)}
                            onTitleClick={(data) => console.log('common   ' + data.text)}
                            onImgTopRtIcon={(data) =>
                              console.log('common   ' + data.text)
                            }
                            onCartClick={(data) => console.log('common   ' + data.text)}
                            // descriptionLimit={50}
                            onDelete={(data) => this.onDeleteShoppingItem(data)}
                            QuentityUpdate={(data, item, text) => this.onQuentityUpdateShoppingItem(data, item, text)}
                            onAddToWishlistClick={(data) => this.AddToWishlistChange(data)}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: { Id: data.ProductId } })}
                          />
                        </View>
                      </View>
                    }
                  </>
                  :
                  <EmptyShoppingCart

                    EmptyTitle={"Your Shopping Cart is empty!"}
                    EmptyIcon={Icons.emptyCart}
                    onHomeClick={(data) =>
                      this.props.navigation.navigate('Home', {
                        passData: data,
                      })
                    }
                    onCartClick={(data) =>
                      this.props.navigation.navigate('WishListPage', {
                        passData: data,
                      })
                    }
                  />
                }</>



              {this.state.shoppingCartList.length > 0 && <CartSummary
                error_Gift_Card_TestId={"wrongCouponAppliedMesg"}
                success_Gift_Card_TestId={"couponAppliedSuccessMessage"}
                remove_CoupenCode_TestId={"removeGiftCard"}
                testId={"cartTotal"}
                title={'Cart Total'}
                totalOrderTestId={"cart_orderTotal"}
                totalText={this.state.totalText}
                totalValue={this.state.isShipToEnable != true ? this.state.summuryData.OrderTotal : '30000'}
                // totalValue={this.state.summuryData.OrderTotal != null ? this.state.summuryData.OrderTotal : 'calculated during checkout' }
                // totalValue={this.state.totalValue}

                coupenPlaceHolder={'Coupon Code or Gift Card'}
                coupenButton={'Apply'}
                addressTitle={'Delivery to'}
                addressButton={'Change'}
                showAddress={this.props.AuthStatus}
                cart_sub_testId={"orderSubTotal"}
                listOfCharges={[
                  { title: 'Sub-Total (Incl VAT)', value: this.state.summuryData.SubTotal, testId: 'subOrderTotal' },
                  { title: 'VAT', value: this.state.summuryData.Tax },
                  { title: 'Shipping', value: this.state.summuryData.Shipping != null ? this.state.summuryData.Shipping : 'calculated during checkout' },
                  { title: 'Discount', value: this.state.summuryData.OrderTotalDiscount, testId: 'discountValue' },
                ]}
                paymentIconList={[

                  { image: Icons.pay },

                  { image: Icons.visaPay },

                  { image: Icons.cod },
                ]}
                addressList={[
                  {
                    placeTitle: '',
                    address: this.state.summuryCustomData.CartShippingAddress,
                  },
                ]}

                CoupenCode={this.state.CoupenCode}

                OnCoupenCodeUpdate={(text => this.setState({ CoupenCode: text }))}
                OnCoupenApplyClick={() => this.OnApplyCoupen()}
                isDisplayCoupen={this.state.isDisplayCoupenResponce}
                IsCoupenApplied={this.state.IsCoupenApplied}
                coupenResponceMessage={this.state.coupenResponceMessage}
                coupenAppliedList={this.state.coupenAppliedList}
                OnCoupenCancel={(data) => this.OnCoupenCancel(data)}
                listOfGiftResponce={this.state.summuryData.GiftCards}
                OnGiftCartToolTipClick={(data) => Alert.alert('MsaMart', 'Gift Card: ' + data.CouponCode + ', ' + data.Remaining + ' remaining',)}
                OnGiftCartCancel={(data) => this.OnGiftCartCancel(data)}
                OnAddressChange={() => this.props.navigation.navigate('Address')}
              />}


              {/* beforeNewsWidget Widget */}
              {/* {this.state.beforeNewsWidget.length > 0 && this.state.shoppingCartList.length > 0 && (
                <>
                  {this.state.beforeNewsWidget.map((item, i) => (
                    <>
                      {item.LayoutType == 'Grid_WithTimer' ? (
                        <>
                          <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}
                            FromDate={item.FromDate}
                            ToDate={item.ToDate}
                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={2}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}
                            SubTitle={'Ending In'}
                          />
                          <ProductGridListView key={i}
                            showAllButton={item.ViewAllURL}
                            ViewAllClick={() => this.OnViewAllPress(item)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={item.DPWProductOverviewModel}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}

                          />
                        </>
                      ) : (
                        <>
                          <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}

                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={1}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}

                          />
                          <ProductGridListView key={i}
                            showAllButton={item.ViewAllURL}
                            ViewAllClick={() => this.OnViewAllPress(item)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={item.DPWProductOverviewModel}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}
                          />
                        </>
                      )}
                    </>
                  ))}
                </>
              )} */}


              {/* beforeNewsWidget Widget */}
              { this.state.shoppingCartList.length < 1 && (
                <>
                  {/* {this.state.bottomWidget.map((item, i) => ( */}
                    <>
                      {/* {item.LayoutType == 'Grid_WithTimer' ? (
                        <>
                          <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}
                            FromDate={item.FromDate}
                            ToDate={item.ToDate}
                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={2}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}
                            SubTitle={'Ending In'}
                          />
                          <ProductGridListView key={i}
                            showAllButton={item.ViewAllURL}
                            ViewAllClick={() => this.OnViewAllPress(item)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={item.DPWProductOverviewModel}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}

                          />
                        </>
                      ) : ( */}
                        <>
                          {/* <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}

                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={1}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}

                          /> */}
                          <ProductGridListView 
                          //key={i}
                            showAllButton={true}
                            ViewAllClick={() => this.OnViewAllPress(this.state.productData)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={this.state.productData}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}
                          />
                        </>
                      
                    </>
                  
                </>
              )}


              <Footer
                footerLinksList={[
                  { text: 'Privacy Policy', url: 'PrivacyPolicy' },
                  { text: 'Returns', url: 'Returns' },
                  { text: 'Terms and Conditions', url: 'TermsConditions' },
                  { text: 'Contact Us', url: 'ContactUs' },
                  { text: 'Delivery', url: 'Delivery' },
                  { text: 'Laws and Regulations', url: 'LawsRegulations' },
                ]}
                onNavLink={(data) => this.props.navigation.navigate(data.url)}
              />
            </View>
          </ScrollView>
          {this.state.shoppingCartList.length > 0 && <View style={{ ...styles.SpredCrumbcontainer, flexDirection: 'column', height: 130, padding: 10, }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

              <View style={{ margin: 10, }}>
                <Text
                  style={[styles.rateText3, this.props.rateText3Styles]}>
                  Total:
                </Text>
                <Text
                  //numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles.rateText1, this.props.rateText1Styles]}>
                  {
                    this.state.isShipToEnable == true ?
                      (this.state.summuryData.OrderTotal != null ?
                        this.state.summuryData.OrderTotal : 'calculated during checkout')
                      : (this.state.totalValue)
                  }
                </Text>
              </View>
              <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }} onPress={() => this.setState({ isSummuryOpen: !this.state.isSummuryOpen })}>
                {this.state.isSummuryOpen ?
                  <Image

                    source={Icons.arrowDown}
                  />
                  :
                  <Image
                    style={{ transform: [{ rotate: '180deg' }], }}
                    source={Icons.arrowDown}

                  />}

              </TouchableOpacity>
            </View>


            {this.state.shoppingCartData.Warnings.length !== 0 ?
              <ButtonWithIcon disabled={true}
                activeOpacity={1}
                mainContainerStyles={{
                  padding: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  backgroundColor: Colors.DARK_GRAY_TEXT,
                  borderRadius: 30,
                  height: 50,
                  width: '60%',
                }}
                imageAvtarStyle={{
                  height: 0,
                  width: 0,
                  margin: '4%' //5,
                }}
                text={"PROCEED TO CHECKOUT"}
                titleStyle={{
                  color: Colors.WHITE,
                  fontSize: IS_SCREEN_SEIZE_SMALL ? 11 : 12,
                  ...Platform.select({
                    ios: {
                      fontWeight: '800',
                      fontFamily: 'verdana',
                    },
                    android: {
                      fontWeight: 'normal',
                      fontFamily: 'verdanab',
                    },
                  }),
                  textAlign: 'center',
                }}

                userClick={(data) => this.OnPayNowClick(data)}
              />
              :
              <ButtonWithIcon disabled={false}
                mainContainerStyles={{
                  padding: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 30,
                  height: 50,
                  width: '60%',
                }}
                imageAvtarStyle={{
                  height: 0,
                  width: 0,
                  margin: '4%' //5,
                }}
                text={"PROCEED TO CHECKOUT"}
                titleStyle={{
                  color: Colors.WHITE,
                  fontSize: IS_SCREEN_SEIZE_SMALL ? 11 : 12,
                  ...Platform.select({
                    ios: {
                      fontWeight: '800',
                      fontFamily: 'verdana',
                    },
                    android: {
                      fontWeight: 'normal',
                      fontFamily: 'verdanab',
                    },
                  }),
                  textAlign: 'center',
                }}

                userClick={(data) => this.OnPayNowClick(data)}
              />
            }

          </View >
          }
          <View style={{ flex: 1, }}>

            <Modal animationType="slide" transparent={true} visible={this.state.isSummuryOpen} style={{ width: SCREEN_WIDTH }}  >
              <TouchableOpacity style={styles.modelcontainer} activeOpacity={1} >
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <View style={{ ...styles.SpredCrumbcontainer, flexDirection: 'column', height: 420, padding: 10, width: SCREEN_WIDTH }}>

                    <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end', }} onPress={() => this.setState({ isSummuryOpen: !this.state.isSummuryOpen })}>
                      {this.state.isSummuryOpen ?
                        <Image
                          source={Icons.arrowDown}
                        />
                        :
                        <Image
                          style={{ transform: [{ rotate: '180deg' }], }}
                          source={Icons.arrowDown}

                        />}

                    </TouchableOpacity>

                    {this.state.shoppingCartList.length > 0 && <CartSummaryModel
                      // success_Gift_Card_TestId={"couponAppliedSuccessMessage"}
                      title={'Cart Total'}
                      totalText={this.state.totalText}
                      // totalValue={this.state.totalValue}
                      // totalValue={this.state.summuryData.OrderTotal != null ? this.state.summuryData.OrderTotal : 'calculated during checkout'}
                      totalValue={this.state.isShipToEnable != true ? (this.state.summuryData.OrderTotal != null ? this.state.summuryData.OrderTotal : 'calculated during checkout') : 'calculated during checkout'}
                      // totalCurrancy={this.state.totalCurrancy}
                      testID="discountcouponcode"
                      accessibilityLabel="discountcouponcode"
                      coupenPlaceHolder={'Coupen Code or Gift Card'}

                      coupenButton={'Apply'}
                      addressTitle={'Delivery to'}
                      showAddress={this.props.AuthStatus}
                      addressButton={'Change'}
                      listOfCharges={[
                        { title: 'Sub-Total (Incl VAT)', value: this.state.summuryData.SubTotal, testId: 'orderSubtotal' },
                        { title: 'VAT', value: this.state.summuryData.Tax },
                        { title: 'Discount', value: this.state.summuryDataCustomProperties.TotalDiscounts, testId: 'discountValue' },
                      ]}
                      paymentIconList={[

                        { image: Icons.pay },
                        { image: "" },
                        { image: Icons.visaPay },

                      ]}
                      addressList={[
                        {
                          placeTitle: '',
                          address: this.state.summuryCustomData.CartShippingAddress,
                        },
                      ]}
                      OnCoupenCodeUpdate={(text => this.setState({ CoupenCode: text }))}
                      OnCoupenApplyClick={() => this.OnApplyCoupen()}
                      isDisplayCoupen={this.state.isDisplayCoupenResponce}
                      IsCoupenApplied={this.state.IsCoupenApplied}
                      coupenResponceMessage={this.state.coupenResponceMessage}
                      coupenAppliedList={this.state.coupenAppliedList}
                      OnCoupenCancel={(data) => this.OnCoupenCancel(data)}
                      listOfGiftResponce={this.state.summuryData.GiftCards}
                      OnGiftCartToolTipClick={(data) => Alert.alert('MsaMart', 'Gift Card: ' + data.CouponCode + ', ' + data.Remaining + ' remaining',)}
                      OnGiftCartCancel={(data) => this.OnGiftCartCancel(data)}
                    />}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>

                      <View style={{ margin: 10, }}>
                        <Text
                          style={[styles.rateText3, this.props.rateText3Styles]}
                          testID="totalAmountLabel"
                          accessibilityLabel="totalAmountLabel"
                        >
                          Total:
                        </Text>
                        <Text
                          //numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={[styles.rateText1, this.props.rateText1Styles]}
                          testID="totalAmountToPay"
                          accessibilityLabel="totalAmountToPay"
                        >
                          {/* {this.state.totalValue} */}
                          {/* {this.state.summuryData.OrderTotal != null ? this.state.summuryData.OrderTotal : 'calculated during checkout'} */}
                          {this.state.isShipToEnable != true ? (this.state.summuryData.OrderTotal != null ? this.state.summuryData.OrderTotal : 'calculated during checkout') : 'calculated during checkout'}
                        </Text>
                      </View>

                    </View>
                        {console.log("---",this.state.shoppingCartData.Warnings)}
                    {this.state.shoppingCartData.Warnings !== undefined ?  
                        (this.state.shoppingCartData.Warnings.length !== 0 ? 
                            <ButtonWithIcon disabled={true}
                              activeOpacity={1}
                              mainContainerStyles={{
                                padding: 0, 
                                alignItems: 'center',
                                justifyContent: 'center', 
                                marginLeft: 10,
                                backgroundColor: Colors.DARK_GRAY_TEXT, 
                                borderRadius: 30,
                                height: 50, 
                                width: '60%',
                              }}
                              imageAvtarStyle={{
                                height: 0,
                                width: 0,
                                margin: '4%' //5,
                              }}
                              text={"PROCEED TO CHECKOUT"}
                              titleStyle={{
                                color: Colors.WHITE,
                                fontSize: IS_SCREEN_SEIZE_SMALL ? 11 : 12,              
                                ...Platform.select({
                                  ios: {
                                    fontWeight: '800',
                                    fontFamily: 'verdana',
                                  },
                                  android: {
                                    fontWeight: 'normal',
                                    fontFamily: 'verdanab',
                                  },
                                }),
                                textAlign: 'center',
                              }}
  
                              userClick={(data) => this.OnPayNowClick(data)}
                            />
                          : 
                          <ButtonWithIcon disabled={false}
                          mainContainerStyles={{
                            padding: 0, 
                            alignItems: 'center',
                            justifyContent: 'center', 
                            marginLeft: 10,
                            backgroundColor: Colors.PRIMARY, 
                            borderRadius: 30,
                            height: 50, 
                            width: '60%',
                          }}
                          imageAvtarStyle={{
                            height: 0,
                            width: 0,
                            margin: '4%' //5,
                          }}
                          text={"PROCEED TO CHECKOUT"}
                          titleStyle={{
                            color: Colors.WHITE,
                            fontSize: IS_SCREEN_SEIZE_SMALL ? 11 : 12,              
                            ...Platform.select({
                              ios: {
                                fontWeight: '800',
                                fontFamily: 'verdana',
                              },
                              android: {
                                fontWeight: 'normal',
                                fontFamily: 'verdanab',
                              },
                            }),
                            textAlign: 'center',
                          }}
    
                            userClick={(data) => this.OnPayNowClick(data)}
                          /> )
                        : <View> </View>
                    }
                    
                  </View >
                </View >
              </TouchableOpacity >
            </Modal >
          </View >

        </SafeAreaView >
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCountToCart: (newCount) => dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount }),
    UpdateShoppingData: (newCount) => dispatch({ type: 'ADD_SHOPPING_DATA', paylod: newCount }),
    UpdateAuthStatus: (status) => dispatch({ type: 'AUTH_STATUS', paylod: status }),
    updateShoppingCall: () => dispatch({ type: 'SHOPPING_CALL' }),
    updateCartCount: () => dispatch({ type: 'COUNT_CALL' }),
    updateWishlist: () => dispatch({ type: 'WISHLIST_CALL' }),

  }
}

const mapStateToProps = (state) => {
  let Store_data = state.Count
  let Menu_data = state.Menu_Data
  let Shopping_data = state.ShoppingCart_Data
  let LoginStatus = state.Login_Status
  return {
    CarCount: Store_data.shoppingCartCount,
    MenuData: Menu_data.MenuData,
    AuthStatus: LoginStatus.loginStatus,
    ShoppingCartData: Shopping_data.ShoppingCartData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
