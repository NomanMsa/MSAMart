import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Easing,
  Share,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { DrawerActions } from '@react-navigation/native';
import { EventTags,EmarsysEvents} from '@config';
/*import Emarsys from "react-native-emarsys-wrapper";*/
import perf from '@react-native-firebase/perf';
import { AppEventsLogger } from "react-native-fbsdk-next";
import {
  ProductGridListView,
  FleashDealsCount,
  Header,
  Footer,
  SearchBar,
  ProductPhotoGallery,
  ColorSelector,
  ImageSelector,
  QuantitySelector,
  Button,
  ProductSpecification,
  ProductTitle,
  OfflineNotice,
  ButtonWithIcon,
  DropdownWithIcon,
  CheckBoxAttribute,
  RadioAttribute,
  BuyMoreAndSaveMore
} from '@components';


import { ServiceCall } from '@utils';
import { Api, Constants } from '@config';
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from 'react-native-animated-loader';
import Toast from 'react-native-simple-toast';

import styles from './ProductDetailsStyles';
import { Colors } from '@theme';

import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
let IS_SCREEN_SIZE_SMALL = false;
if (SCREEN_WIDTH <= 320) {
  IS_SCREEN_SIZE_SMALL = true;
} else {
  IS_SCREEN_SIZE_SMALL = false;
}

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pData: {},
      pManufacutrerName: '',
      pName: '',
      pOldPrice: '',
      pNewPrice: '',
      currency: '',
      pCustomeProperties: '',
      pVendorModel: '',
      pProductAttributes: [],
      pCustomerWhoBoughtThisAlsoBoughtThis: [],
      pRelatedProducts: [],
      notifyMEState: false,
      isSharingDisabled: false,
      pImgs: [],
      pMinQuantity: 1,
      topWidget: [],
      productData:[],
      bottomWidget: [],
      beforeNewsWidget: [],
      beforeBestSellersWidget: [],
      beforeProductsWidget: [],
      pBreadcrumb: [],
      pManufacturerData: '',
      DropDownData: '',
      radioButton: '',
      CheckBox: '',
      ColorSquares: '',
      ImageSquares: '',
      pInstock: null,
      pAttributeSelected: '',
      heavyNBulkyMessage: '',
      SizeAttribute: '',
      OrderAttribute: '',
      shareMessageData: '',
      QuantitySelectorText: 1,
      ShoppingCartType: '',
      CartCount: 0,
      wishListCount: 0,
      IsProductInYourWishList: false,
      notifyMeModel: false,
      IsCurrentCustomerRegistered: false,
      NotifyHeaderTitle: '',
      notifyMessage: '',
      notifyErrorMsg: '',
      notifyMeButton: '',
      isShareVisible: false,
      pStockAvailability: '',
      AttributeValueArray: [],
      expandShort: false,
      easyReturnAvailable: false,
      serviceableByVendor: true,
      nonReturnable: false,
      noOfReturnRequestAvailable: 0,
      shipToEnabled: false, 
      currentCountryModel : null,
      deliveryDate : '',
      htmlData: {},
      productId: null,
    };
    this.fetchProductDetialsData = this.fetchProductDetialsData.bind(this);
    //this.addToWishList = this.addToWishList.bind(this);
    this.onSuccessCall = this.onSuccessCall.bind(this);
    this.onSuccessWidgetCall = this.onSuccessWidgetCall.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const pdpTrace =  await perf().startTrace(
      'custom_trace_product_detail_screen',
    );
    let passData = this.props.route.params.passData;
    await this.fetchProductDetialsData(passData.Id);
    pdpTrace.putAttribute('occurrence', 'firstVisit');
    await pdpTrace.stop();
    this.setState({ loading: false, productId:passData.Id});
    //await this.fetchWidgitData(passData.Id);
     await this.getCartCountData();
    this.props.updateCartCount();
    this.fetchordreTotal();
    this.fetchShoppingData();
    this.setState({ loading: false });
    this.focusListener = await this.props.navigation.addListener(
      'focus',
      async () => {
        const pdpTrace =  await perf().startTrace(
          'custom_trace_product_detail_screen',
        );
        await this.fetchProductDetialsData(passData.Id);
        pdpTrace.putAttribute('occurrence', 'reVisit');
        await pdpTrace.stop();
        //this.fetchWidgitData(passData.Id);
        await this.props.updateCartCount();
        this.setState({ loading: false });

         this.getCartCountData();
      },
    );
    let durationM = new Date().getTime() - this.state.startTime

    let PDPRenderTime = {
      item_id: durationM,
      slug_url: ' ',
      entity_name: 'PDP',
    };
    console.log("PDP duration--", this.state.startTime ," ---- ", durationM);
    await analytics().logEvent('PDP_renderingTime', PDPRenderTime);
    AppEventsLogger.logEvent(EventTags.PDP_renderingTime, PDPRenderTime);
  }

  componentWillMount() {
    let startTimeM = new Date().getTime()
    this.setState({ startTime : startTimeM });
  }

  async componentWillReceiveProps(nextProps) {  
    if(nextProps!=null && nextProps.route!=null && nextProps.route.params!=null && nextProps.route.params.passData.Id != this.state.productId){     
      await this.setState({ loading: true });
      await this.fetchProductDetialsData(nextProps.route.params.passData.Id);
     // await this.fetchWidgitData(nextProps.route.params.passData.Id);
      await this.props.updateCartCount();
      await this.setState({ loading: false });
    }
  }
  fetchordreTotal = async()=>{
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

  onSuccessgetOrderTotal = async (data) => { 
    let data1 = data.model;
    
    await this.setState({
      summuryData : data1,
    })
  }
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


  onSuccessShoppingCall = async (dataa) => {
    let data = dataa.model;
    // this.props.UpdateShoppingData({ ShoppingCartData: data })
    // var discountBox = data.DiscountBox
    // var customData = data.CustomProperties
    // console.log("onSuccessShoppingCall.........", customData.OrderTotals);
    await this.setState({
      summuryData: data,
    })
  }

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  onSuccessCall = async (datas) => {
    let data = datas.model;
    this.setState({ loading: false });
    console.log('fetchProductDetialsData.............', data);

    let manufacturerName = '';

    let manufacturerData = ';';
    if (data.ProductManufacturers.length > 0) {
      manufacturerName = data.ProductManufacturers[0].Name;
      manufacturerData = data.ProductManufacturers[0];
    }
    if (data.CustomProperties) {
      await this.setState({
        pCustomeProperties: data.CustomProperties,
        pCustomerWhoBoughtThisAlsoBoughtThis:
          data.CustomProperties.CustomerWhoBoughtThisAlsoBoughtThis,
        IsProductInYourWishList: data.CustomProperties.IsProductInYourWishList,
        pRelatedProducts: data.CustomProperties.RelatedProducts,
        heavyNBulkyMessage: data.CustomProperties.HeavyNBulkyMessage,
      });
    }

    await this.setState({
      pData: data,
      pManufacutrerName: manufacturerName,
      pManufacturerData: manufacturerData,
      pName: data.Name,
      shareMessageData: Constants.HOSTs_URL +"/"+ data.SeName,
      currency: data.ProductPrice.CurrencyCode,
      pOldPrice: data.ProductPrice.OldPrice,
      pNewPrice: data.ProductPrice.Price,
      pImgs: data.PictureModels,
      pMinQuantity: data.OrderMinimumQuantity,
      pStockAvailability: data.StockAvailability,
      pVendorModel: data.VendorModel,
      pProductAttributes: data.ProductAttributes,
      easyReturnAvailable: data.IsEasyReturnAvailable,
      serviceableByVendor: data.IsServiceableByVendor,
      nonReturnable: data.NotReturnable,
      noOfReturnRequestAvailable: data.NumberOfDaysReturnRequestAvailable,
      deliveryDate: data.DeliveryDate,
      // pBreadcrumb: data.Breadcrumb.CategoryBreadcrumb
      htmlData: {html: data.FullDescription}
    });


    if (data.CommonShipToModel) {
      await this.setState({
        shipToEnabled: data.CommonShipToModel.IsShipToEnable,
        currentCountryModel: data.CommonShipToModel.CurrentCountryModel,
      })
    }
    var DropDownData = [];
    var radioButton = [];
    var CheckBox = [];
    var ColorSquares = [];
    var ImageSquares = [];

    for (var i = 0; this.state.pProductAttributes.length > i; i++) {
      if (this.state.pProductAttributes[i].AttributeControlType == 1) {
        DropDownData.push(this.state.pProductAttributes[i]);
      }
      if (this.state.pProductAttributes[i].AttributeControlType == 2) {
        radioButton.push(this.state.pProductAttributes[i]);
      }
      if (this.state.pProductAttributes[i].AttributeControlType == 3) {
        CheckBox.push(this.state.pProductAttributes[i]);
      }
      if (this.state.pProductAttributes[i].AttributeControlType == 40) {
        ColorSquares.push(this.state.pProductAttributes[i]);
      }
      if (this.state.pProductAttributes[i].AttributeControlType == 45) {
        ImageSquares.push(this.state.pProductAttributes[i]);
      }
    }

    await this.setState({
      DropDownData: DropDownData,
      radioButton: radioButton,
      CheckBox: CheckBox,
      ColorSquares: ColorSquares,
      ImageSquares: ImageSquares,
    });
    let eventParams = {
      currency: this.state.currency,
      item_id: data.Id,
      value: this.state.pNewPrice,
    };

    await analytics().logEvent('view_item', eventParams);
    AppEventsLogger.logEvent(EventTags.VIEW_ITEM, eventParams);
    this.trackItemView(this.state.pName+"-"+data.Id);
  };
  onSuccessWidgetCall(data) {
    let productdata =data.model;
    // let topWidget = [];
    // let bottomWidget = [];
    // let beforeNewsWidget = [];
    // let beforeBestSellersWidget = [];
    // let beforeProductsWidget = [];
    // for (var i = 0; i < data.length; i++) {
    //   if (data[i].WidgetZoneName == 'productdetails_top') {
    //     topWidget.push(data[i]);
    //   }
      // if (data[i].WidgetZoneName == 'home_page_before_news') {
      //   beforeNewsWidget.push(data[i]);
      // }
      // if (data[i].WidgetZoneName == 'home_page_before_best_sellers') {
      //   beforeBestSellersWidget.push(data[i]);
      // }
      // if (data[i].WidgetZoneName == 'home_page_before_products') {
      //   beforeProductsWidget.push(data[i]);
      // }
      // if (data[i].WidgetZoneName == 'productdetails_bottom') {
      //   bottomWidget.push(data[i]);
      // }
      this.setState({ loading: false });

    //}
    this.setState({
      productData : productdata,
      // topWidget: topWidget,
      // bottomWidget: bottomWidget,
      // beforeNewsWidget: beforeNewsWidget,
      // beforeBestSellersWidget: beforeBestSellersWidget,
      // beforeProductsWidget: beforeProductsWidget,
    });
  }
  onSuccessWishlistCall(data) {
    if (data.errorlist) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 300);
    } else {
      if (data.message != null && data.message.length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
        }, 300);
      }
    }
  }
  onFailureAPI(data) {
    if (data.errorlist) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 300);
    } else {
      if (data.message != null && data.message.length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
        }, 300);
      }
    }
  }
  onPromiseFailure(data) {
    console.log(data);
    if (data.errorlist) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 300);
    } else {
      if (data.message != null && data.message.length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
        }, 300);
      }
    }
  }
  onOffline(data) {
    console.log(data);
    if (data.errorlist) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 300);
    } else {
      if (data.message != null && data.message.length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
        }, 300);
      }
    }
  }

  OnViewAllPress = async (item) => {
    console.log('OnViewAllPress...', item);

    if (item.CustomProperties) {
      var navigationData = item.CustomProperties.UrlRecord;
      if (navigationData) {
        if (navigationData.EntityName == 'Vendor') {

          let vendorEventParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Vendor',
          };

          await analytics().logEvent('banner_click', vendorEventParams);
          EmarsysEvents.trackEmarsys('banner_click', vendorEventParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, vendorEventParams);
          this.props.navigation.push('VendorFilterProductList', {
            passData: { pageName: 'Home', data: { Id: navigationData.EntityId } },
          });
        }
        if (navigationData.EntityName == 'Category') {

          let categoryEventParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Category',
          };

          await analytics().logEvent('banner_click', categoryEventParams);
          EmarsysEvents.trackEmarsys('banner_click', categoryEventParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, categoryEventParams);

          this.props.navigation.push('FilterProductList', {
            passData: { pageName: 'Home', data: { Id: navigationData.EntityId } },
          });
        }
        if (navigationData.EntityName == 'Manufacturer') {
          let manufacturerEventParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Manufacturer',
          };

          await analytics().logEvent('banner_click', manufacturerEventParams);
          EmarsysEvents.trackEmarsys('banner_click', manufacturerEventParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, manufacturerEventParams);
          this.props.navigation.push('ManufacturerFilterProductList', {
            passData: { pageName: 'Home', data: { Id: navigationData.EntityId } },
          });
        }
        if (navigationData.EntityName == 'ExternalSearch') {

          let externalSearchParams = {
            item_id: navigationData.EntityId,
            slug_url: navigationData.Slug,
            entity_name: 'ExternalSearch',
          }

          await analytics().logEvent('banner_click', externalSearchParams);
          EmarsysEvents.trackEmarsys('banner_click', externalSearchParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, externalSearchParams);

          this.props.navigation.push('SearchFilterProductList', {
            passData: {
              pageName: 'Home',
              data: { slugUrl: navigationData.Slug, SearchName: ' ' },
            },
          });
        }
        if (navigationData.EntityName == 'Register') {

          let registerEventParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Register',
          };

          await analytics().logEvent('banner_click', registerEventParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, registerEventParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, registerEventParams);
          this.props.navigation.push('Register');
        }
        if (navigationData.EntityName == 'Mailto') {

          let mailToEventParams = {
            item_id: navigationData.EntityId,
            slug_url: navigationData.Slug,
            entity_name: 'Mailto',
          }

          await analytics().logEvent('banner_click', mailToEventParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, mailToEventParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, mailToEventParams);
          Linking.openURL(
            'mailto:support@example.com?subject=SendMail&body=Description',
          );
        }
      }
    }
  };

  fetchProductDetialsData = async (prodId) => {
    let Service = {
      apiUrl: Api.ProductDetail + '?productId=' + prodId,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  fetchWidgitData = async (prodId) => {
    let Service = {
      apiUrl: Api.Widgets,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      // bodyData: JSON.stringify({
      //   widget: 'product',
      //   productid: prodId,
      // }),
      onSuccessCall: this.onSuccessWidgetCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onWishIconClick = async () => {
   // await this.fetchWidgitData();
    await this.getCartCountData();

    this.props.updateWishlist();
    this.props.updateCartCount();
  };

  trackItemView = async(itemId) => {
  
    try {
      let result = "";/*await Emarsys.predict.trackItemView(itemId);*/
    } catch (e) {
      console.log(e);
    }
  }

  UpdateWishlistData = async (data) => {
    console.log("////////test123256",data);
    let jdata ={
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
    
    let Service = {
      apiUrl: Api.widgetProductAddWishlist + '?productId=' +data.Id +'&shoppingCartTypeId=2',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        jdata
      }),
      onSuccessCall: this.onSuccesswidgetWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccesswidgetWishlistCall(data) {
    if (data.errorlist) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 300);
    } else {
      if (data.message != null && data.message.length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
        }, 500);
      }
    }
  }

  shareMessage = async () => {
    await this.setState({ isShareVisible: true });

    if (!this.state.isSharingDisabled) {
      this.setState({
        isSharingDisabled: true,
      });

      await Share.share({
        message: this.state.shareMessageData.toString(),
      })
        //after successful share return result
        .then(({ action, activityType }) => {
          if (action === Share.dismissedAction) {
            this.setState({
              isSharingDisabled: false,
            });
          } else {
            this.setState({
              isSharingDisabled: false,
            });
          }
        })
        .catch((errorMsg) => console.log(errorMsg));
      await this.setState({ isShareVisible: false });
      let shareProdParams = {
        item_name: this.state.pName,
        item_id: this.state.pData.Id,
      };

      await analytics().logEvent('share', shareProdParams);
      AppEventsLogger.logEvent(EventTags.SHARE_PRODUCT, shareProdParams);
      EmarsysEvents.trackEmarsys(EventTags.SHARE_PRODUCT, shareProdParams);

    }
  };
  onColorAttributeSelected = (data, Id) => {
    var attributeArry = [];
    attributeArry = this.state.AttributeValueArray;

    attributeArry.push({ id: Id, value: data.Id });
    this.setState({ AttributeValueArray: attributeArry });
    this.UpdateAttributes();
  };

  onImageAttributeSelected = (data, Id) => {
    var attributeArry = [];
    attributeArry = this.state.AttributeValueArray;
    attributeArry.push({ id: Id, value: data.Id });

    for (let i = 0; attributeArry.length > i; i++) {
      if (attributeArry[i].id == Id) {
        attributeArry[i].id = attributeArry[i].Id;
        attributeArry[i].value = data.Id;
      } else {
        attributeArry[i].id = attributeArry[i].id;
        attributeArry[i].value = attributeArry[i].value;
      }
    }
    let newArray = Array.from(new Set(attributeArry.map((a) => a.id))).map(
      (id) => {
        return attributeArry.find((a) => a.id === id);
      },
    );

    this.setState({ AttributeValueArray: newArray });
    this.UpdateAttributes();
  };

  onRadioAttributeSelected = (data, Id) => {
    // console.log("data--", data,"------->", Id);
    var attributeArry = [];
    attributeArry = this.state.AttributeValueArray;
    attributeArry.push({ id: Id, value: data.Id });
    for (let i = 0; attributeArry.length > i; i++) {
      if (attributeArry[i].id == Id) {
        attributeArry[i].id = attributeArry[i].id;
        attributeArry[i].value = data.Id;
      } else {
        attributeArry[i].id = attributeArry[i].id;
        attributeArry[i].value = attributeArry[i].value;
      }
    }
    let newArray = Array.from(new Set(attributeArry.map((a) => a.id))).map(
      (id) => {
        return attributeArry.find((a) => a.id === id);
      },
    );
    // console.log("radiobutoon - ", newArray)
    this.setState({ AttributeValueArray: newArray });
    this.UpdateAttributes();
  };

  onDropdownAttributeSelected = (data, Id) => {
    // console.log('DROP DOWN IS WORKED');
    var attributeArry = [];
    attributeArry = this.state.AttributeValueArray;
    attributeArry.push({ id: Id, value: data });

    for (let i = 0; attributeArry.length > i; i++) {
      if (attributeArry[i].id == Id) {
        attributeArry[i].id = attributeArry[i].id;
        attributeArry[i].value = data;
      } else {
        attributeArry[i].id = attributeArry[i].id;
        attributeArry[i].value = attributeArry[i].value;
      }
    }
    let newArray = Array.from(new Set(attributeArry.map((a) => a.id))).map(
      (id) => {
        return attributeArry.find((a) => a.id === id);
      },
    );
    // console.log("dropdownattribute-----", newArray);
    this.setState({ AttributeValueArray: newArray });
    this.UpdateAttributes();
  };
  onCheckBoxAttributeSelected = (data, Id) => {
    var attributeArry = [];
    attributeArry = data;
    for (let i = 0; data.length > i; i++) {
      if (data[i].IsPreSelected == true) {
        // console.log("attribute--", Id, "------", data[i].Id);
        attributeArry.push({ id: Id, value: data[i].Id });
      }
    }
    // console.log("checkbox attributearray - ", attributeArry);
    this.setState({ AttributeValueArray: attributeArry });
    this.UpdateAttributes();
  };

  UpdateAttributes = async () => {
    // console.log("AttributeValueArray---", this.state.AttributeValueArray);
    let a ='{'
    let attributearay =this.state.AttributeValueArray;
    var customProperties = [];
    for (let key = 0; key < attributearay.length; key++) {
      var keyName = "product_attribute_" + attributearay[key].id;
      const value = attributearay[key].value;
      a = a + '"' + keyName +'"'+ ":" +'"'+ value+'"';
      if(key != attributearay.length - 1){
        a = a + ",";
    }

    }
    var keysName ="customer_qty"
    if(a =="{"){
      a = a + '"' + keysName +'"'+ ":" +'"'+ this.state.QuantitySelectorText+'"';
    }else{
      a = a+"," + '"' + keysName +'"'+ ":" +'"'+ this.state.QuantitySelectorText+'"';
    }
    
    a = a + '}';


    let form = JSON.parse(a);
    
   
    let Service = {
      apiUrl: Api.UpdateAttributeAPI + '?productId='+this.state.pData.Id + '&validateAttributeConditions=true&loadPicture=true',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: a,
        
        //productId: this.state.pData.Id,
        //attribute: this.state.AttributeValueArray,
        //quantity: this.state.QuantitySelectorText,
      
      onSuccessCall: this.onSuccessAttributeUpdate,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    //this.setState({ loading: true })
    const serviceResponse = await ServiceCall(Service);
    this.setState({ loading: false });
  };
  onSuccessAttributeUpdate = (data) => {
    console.log('onSuccessAttributeUpdate', data);
    if (data.errorlist) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 300);
    } else {
      //gtin,
      //     mpn,
      //     sku,
      //     price, - product price ke sath replce
      //     totalPrice,
      //     tierPriceId = tierPrice != null && tierPrice.Id > 0 ? tierPrice.Id : 0,
      //     basepricepangv,
      //     stockAvailability,-- message of stock availibity (In Stcok)
      //     enabledattributemappingids = enabledAttributeMappingIds.ToArray(),
      //     disabledattributemappingids = disabledAttributeMappingIds.ToArray(),
      //     pictureFullSizeUrl,
      //     pictureDefaultSizeUrl,
      //     isFreeShipping,

      //     inStock,
      //     attributeSelected,
      //     //dpw
      //     combinationId

      // if(data.inStock != undefined && data.inStock == 0)
      // Disable add to cart and buy now button be disable

      this.setState({
        //pData: data,
        // pManufacutrerName: manufacturerName,
        //pManufacturerData:manufacturerData,
        // pName: data.Name,
        //shareMessageData: Constants.HOST_URL+data.SeName,
        //pOldPrice: data.ProductPrice.OldPrice,
        pStockAvailability: data.StockAvailability,
        pNewPrice: data.totalPrice,
        pInstock: data.inStock,
        pAttributeSelected: data.attributeSelected,
        // pImgs: data.PictureModels,
        //pMinQuantity: data.OrderMinimumQuantity,
        //pCustomeProperties:data.CustomProperties,
        //pVendorModel:data.VendorModel,
        //pProductAttributes: data.ProductAttributes,
        //pCustomerWhoBoughtThisAlsoBoughtThis:data.CustomProperties.CustomerWhoBoughtThisAlsoBoughtThis,
        //pRelatedProducts:data.CustomProperties.RelatedProducts,
        //pBreadcrumb:data.Breadcrumb.CategoryBreadcrumb
      });
    }
  };

  onQuantitySelector = async (text) => {
    console.log("Changing quantity into ",text);
    await this.setState({ QuantitySelectorText: text });
    this.UpdateAttributes();
  };

  onAddToWishList = async () => {
    await this.setState({ ShoppingCartType: 'Wishlist', loading: true });
var addcart = 2;
    await this.AddtoCart(addcart);
    await this.setState({
      ShoppingCartType: '',
      IsProductInYourWishList: true,
      loading: false,
    });
    let addToWishListParams = {
      currency: this.state.currency,
      item_id: this.state.pData.Id,
      value: this.state.pNewPrice,
    };
    await analytics().logEvent('add_to_wishlist', addToWishListParams);
    AppEventsLogger.logEvent(EventTags.ADD_TO_WISH_LIST, addToWishListParams);
    EmarsysEvents.trackEmarsys(EventTags.ADD_TO_WISH_LIST, addToWishListParams);
  };

  onRemoveFromWishlist = async () => {
    console.log("////|||teat",this.state.pData);
    
    let Service = {
      apiUrl: Api.removeWishlistItem + this.state.pData.Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessDeleteWishlist,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessDeleteWishlist = async (datas) =>{
    if (datas.errorlist.length > 0) {
      var messeageString = '';
      for (let i = 0; datas.errorlist.length > i; i++) {
        messeageString += datas.errorlist[i] + ' ';
      }
      await this.setState({ loading: false });
      setTimeout(() => {
        Alert.alert(
          'MsaMart',
          messeageString,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {
            cancelable: false,
          },
        );
      }, 300);
    } else {
      await this.setState({
        ShoppingCartType: '',
        IsProductInYourWishList: false,
        loading: false,
      });
      if (datas.message != null && datas.message.length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
        }, 300);
      }
      this.props.updateCartCount();
      this.props.updateWishlist();
    }
  }


  onAddToCart = async () => {
    await this.setState({ loading: true, ShoppingCartType: 'ShoppingCart' });
    var cart =1;
    await this.AddtoCart(cart);
    await this.setState({ loading: false });
    
    let startTimeM = new Date().getTime()
    this.setState({ startTime : startTimeM });

  };

  AddtoCart = async (cart) => {
    let a ='{'
    let attributearay =this.state.AttributeValueArray;
    var customProperties = [];
    for (let key = 0; key < attributearay.length; key++) {
      var keyName = "product_attribute_" + attributearay[key].id;
      const value = attributearay[key].value;
      a = a + '"' + keyName +'"'+ ":" +'"'+ value+'"';
      if(key != attributearay.length - 1){
        a = a + ",";
    }

    }
    var keysName ="addtocart_"+this.state.pData.Id+".EnteredQuantity"
    if(a =="{"){
      a = a + '"' + keysName +'"'+ ":" +'"'+ this.state.QuantitySelectorText+'"';
    }else{
      a = a+"," + '"' + keysName +'"'+ ":" +'"'+ this.state.QuantitySelectorText+'"';
    }
    a = a + '}';
    let form = JSON.parse(a);
    customProperties.push(JSON.parse(a));

    let Service = {
      apiUrl: Api.AddToCart+'?productId='+this.state.pData.Id + '&shoppingCartTypeId='+cart,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData:JSON.stringify(
        form
      ),
        
  
      onSuccessCall: this.onSuccessAddtoCartUpdate,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    const serviceResponse = await ServiceCall(Service);
    this.setState({ loading: false });
  };

  onSuccessAddtoCartUpdate = async (datas) => {
    if (datas.errorlist.length > 0) {
      var messeageString = '';
      for (let i = 0; datas.errorlist.length > i; i++) {
        messeageString += datas.errorlist[i] + ' ';
      }
      await this.setState({ loading: false });

      setTimeout(() => {
        Alert.alert(
          'MsaMart',
          messeageString,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {
            cancelable: false,
          },
        );
      }, 300);
    } else {
      await this.setState({ loading: false });

      if (datas.message != null && datas.message.length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
        }, 300);
      }
      await this.getCartCountData();
      this.props.updateCartCount();

      this.props.updateWishlist();

      let durationM = new Date().getTime() - this.state.startTime

      let addToCart_Time = {
        item_id: durationM,
        slug_url: ' ',
        entity_name: 'addToCart',
      };
      console.log("PDP duration--", this.state.startTime ," ---- ", durationM);
      await analytics().logEvent('addToCart_Time', addToCart_Time);
      AppEventsLogger.logEvent(EventTags.addToCart_Time, addToCart_Time);

      let items = [
        {
          'Item id': this.state.pData.Id,
          item_id: this.state.pData.Id,
          currency: this.state.currency,
          quantity: '1',
        },
      ];

      let addToCartEventParams = {
        currency: this.state.currency,
        items: items,
        item_id: this.state.pData.Id,
        value: this.state.pNewPrice,
      };

      let addToCartFbParams = {
        currency: this.state.currency.toString(),
        item_id: this.state.pData.Id.toString(),
        value: this.state.pNewPrice.toString(),
      };

      await analytics().logEvent('add_to_cart', addToCartEventParams);
      AppEventsLogger.logEvent(EventTags.ADD_TO_CART, addToCartFbParams);
      EmarsysEvents.trackEmarsys(EventTags.ADD_TO_CART, addToCartFbParams);


    }
  };

  onBuyNow = async () => {
    var attributeArry = [];

    this.setState({ loading: true, ShoppingCartType: 'ShoppingCart' });
    await this.AddtoCart();
    this.setState({ loading: false });
  };

  onBuyNowClick = async () => {
    let a ='{'
    let attributearay =this.state.AttributeValueArray;
    var customProperties = [];
    for (let key = 0; key < attributearay.length; key++) {
      var keyName = "product_attribute_" + attributearay[key].id;
      const value = attributearay[key].value;
      a = a + '"' + keyName +'"'+ ":" +'"'+ value+'"';
      if(key != attributearay.length - 1){
        a = a + ",";
    }

    }
    var keysName ="addtocart_"+this.state.pData.Id+".EnteredQuantity"
    if(a =="{"){
      a = a + '"' + keysName +'"'+ ":" +'"'+ this.state.QuantitySelectorText+'"';
    }else{
      a = a+"," + '"' + keysName +'"'+ ":" +'"'+ this.state.QuantitySelectorText+'"';
    }
    
    a = a + '}';
    let form = JSON.parse(a);
    let Service = {
      apiUrl: Api.AddToCart+'?productId='+this.state.pData.Id + '&shoppingCartTypeId=1',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        form
      }),
      onSuccessCall: this.onSuccessonBuyNowClick,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessonBuyNowClick = async (data) => {
    this.fetchordreTotal();
    let token = await AsyncStorage.getItem('custGuid')
    console.log("/////////////******/////////");
    
    // await this.props.navigation.navigate('PayNow', { passData: token, })
    if (data.message) {
      
      
      this.setState({ isSummuryOpen: false });
      if (await AsyncStorage.getItem('loginStatus') == 'true') {
        
        let coupenData = '';
        // if (this.state.summuryData.OrderTotalDiscount != '' && this.state.summuryData.OrderTotalDiscount != null) {
        //   coupenData = this.state.summuryData.OrderTotalDiscount
        // }else{}
        
        // for (let i = 0; this.state.)
        //   //await analytics().logEvent('begin_checkout', { 'coupon': coupenData, 'currency': '', 'items': [data.Id,], 'value': data.SubTotal });
        const value = await AsyncStorage.getItem('@currencysymbol')
        console.log("////////////******22222");
        console.log("////value.......", value)
        if (value !== null) {
          let beginCheckoutEventParams = { 'coupon': coupenData, 'currency': value, 'value': this.state.summuryData.SubTotal };
          await analytics().logEvent('begin_checkout', beginCheckoutEventParams);
          EmarsysEvents.trackEmarsys('begin_checkout', beginCheckoutEventParams);
          AppEventsLogger.logEvent(EventTags.BEGIN_CHECKOUT, beginCheckoutEventParams);
        } else {
          
          

          let beginCheckoutEventParams = { 'coupon': coupenData, 'currency': ' ', 'value': this.state.summuryData.SubTotal };
          EmarsysEvents.trackEmarsys('begin_checkout', beginCheckoutEventParams);
          await analytics().logEvent('begin_checkout', beginCheckoutEventParams);
          AppEventsLogger.logEvent(EventTags.BEGIN_CHECKOUT, beginCheckoutEventParams);
          console.log("***//////**////444");
          
        }
        await this.props.navigation.navigate('PayNow', { passData: token, })
      } else {
        this.props.navigation.navigate('SignIn', { passData: { screen: 'PayNow' }, })
      }
    } else {
      console.log("err on pdp---", data.errorlist[0]);
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 300);
    }
  };

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
      wishListCount: data.model.Items.length,
    });
    this.props.addCountToCart({
      cartCount: data.model.Items.length,
      wishListCount: data.model.Items.length,
    });
  };

  notifyMeCall = async () => {
    let Service = {
      apiUrl: Api.notifyMeAPI + this.state.pData.Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessnotifyMeCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccessnotifyMeCall = async (data) => {
    var notifyData = data.model.CustomProperties;

    if (data.model.IsCurrentCustomerRegistered == false) {
      await this.setState({
        NotifyHeaderTitle: notifyData.Header,
        notifyMessage: notifyData.Meaasge,
        notifyErrorMsg: notifyData.ErrorMeaasge,
        notifyMeButton: notifyData.SubscribeButtonText,
        notifyMeModel: true,
        IsCurrentCustomerRegistered: data.model.IsCurrentCustomerRegistered,
        notifyMEState: data.model.AlreadySubscribed,
      });
    } else {
      await this.setState({
        NotifyHeaderTitle: notifyData.Header,
        notifyMessage: notifyData.Meaasge,
        notifyErrorMsg: notifyData.ErrorMeaasge,
        notifyMeButton: notifyData.SubscribeButtonText,
        notifyMeModel: true,
        notifyMEState: data.model.AlreadySubscribed,
        IsCurrentCustomerRegistered: data.model.IsCurrentCustomerRegistered,
      });
    }
  };

  onSubscriptionStatusChange = async () => {
    let Service = {
      apiUrl: Api.notifyMeSubscriptionAPI + this.state.pData.Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessonSubscriptionStatusChange,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccessonSubscriptionStatusChange = async (data) => {
    await this.setState({
      notifyMeModel: false,
      notifyMEState: !this.state.notifyMEState,
    });

    if (data.message) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.message);
      }, 500);
    } else {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 500);
    }
  };

  render() {
    console.log('STOCK AVAILIBILITY', this.state.pStockAvailability);
    console.log('DPW QUANTITY ', this.state.pData.DPWStockQuantity);
    console.log('INSTOCK ', this.state.pInstock);
    console.log('ATTRIBUTE SELECTED', this.state.pAttributeSelected);

    let itemNotAvailableBody = <Text style={styles.errorTextStyle}>Sorry This product is not available at your location now!</Text>;

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
          <OfflineNotice
            noInternetText={'No internet!'}
            offlineText={'You are offline!'}
            offlineStyle={{}}
            noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
            offlineTextStyle={{}}
            noInternetTextStyle={{}}
          />
          <Header
            burgerMenuClick={(data) => {
              //this.props.navigation.toggleDrawer();
              this.props.navigation.dispatch(DrawerActions.openDrawer());
              //this.props.navigation.openDrawer()
            }}
            backButtonClick={() => this.props.navigation.pop()}
            NavButton={true}
            userIcoStyles={{ tintColor: Colors.WHITE }}
            cartIcoStyles={{ tintColor: Colors.WHITE }}
            menuIcoStyles={{ tintColor: Colors.WHITE }}
            logoStyles={{ tintColor: Colors.WHITE }}
            countryModel={this.state.currentCountryModel}
            shipToEnabled={this.state.shipToEnabled}
            shipToButtonClick={this.handleShipToButtonClick}
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
            userClick={async (data) => {
              if ((await AsyncStorage.getItem('loginStatus')) == 'true') {
                this.props.navigation.navigate('Account', { passData: data });
              } else {
                this.props.navigation.navigate('SignIn', { passData: data });
              }
            }}
            cartClick={(data) =>
              this.props.navigation.navigate('ShoppingCart', {
                passData: data,
              })
            }
            logoClick={(data) => this.props.navigation.navigate('Home')}
          />

          <ScrollView
            style={{ backgroundColor: Colors.WHITE }}
            contentInsetAdjustmentBehavior="automatic">
            {/* Top Widget */}
                        <>
                        <ProductGridListView
                         // key={i}
                          //showAllButton={false}
                          ViewAllClick={() => this.OnViewAllPress(this.state.productData)}
                          listViewContainerStyle={{
                            borderTopWidth: 0,
                            marginTop: 0,
                          }}
                          ListTitleTextStyle={{}}
                          imgTopRtIcon={Icons.heartClear}
                          isBottomRightIcon={false}
                          listData={this.state.productData}
                          bottomRightIcon={Icons.cartBtn}
                          onProductClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImageClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onTitleClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImgTopRtIcon={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onCartClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          // OnWishlistClick={(data) =>
                          //   this.UpdateWishlistData(data)
                          // }
                        />
                      </>
            {/* {this.state.topWidget.length > 0 && (
              <>
                {this.state.topWidget.map((item, i) => (
                  <>
                    {item.LayoutType == 'Grid_WithTimer' ? (
                      <>
                        <FleashDealsCount
                          key={i}
                          IconPictureURL={item.IconPictureURL}
                          FromDate={new Date()}
                          ToDate={getCurrentDateStamp(item.ToDate)}
                          blockStyle={{ backgroundColor: item.BackgroundColor }}
                          LayoutTypeId={2}
                          Title={item.Title}
                          titleStyle={{ fontSize: 14 }}
                          SubTitle={'Ending In'}
                        />
                        <ProductGridListView
                          key={i}
                          showAllButton={item.ViewAllURL}
                          ViewAllClick={() => this.OnViewAllPress(item)}
                          listViewContainerStyle={{
                            borderTopWidth: 0,
                            marginTop: 0,
                          }}
                          ListTitleTextStyle={{}}
                          imgTopRtIcon={Icons.heartClear}
                          isBottomRightIcon={false}
                          listData={item.DPWProductOverviewModel}
                          bottomRightIcon={Icons.cartBtn}
                          onProductClick={(data) =>
                            this.props.navigation.navigate('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImageClick={(data) =>
                            this.props.navigation.navigate('ProductDetails', {
                              passData: data,
                            })
                          }
                          onTitleClick={(data) =>
                            this.props.navigation.navigate('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImgTopRtIcon={(data) =>
                            this.props.navigation.navigate('ProductDetails', {
                              passData: data,
                            })
                          }
                          onCartClick={(data) =>
                            this.props.navigation.navigate('ProductDetails', {
                              passData: data,
                            })
                          }
                          OnWishlistClick={(data) =>
                            this.UpdateWishlistData(data)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <FleashDealsCount
                          key={i}
                          IconPictureURL={item.IconPictureURL}
                          blockStyle={{ backgroundColor: item.BackgroundColor }}
                          LayoutTypeId={1}
                          Title={item.Title}
                          titleStyle={{ fontSize: 14 }}
                        />
                        <ProductGridListView
                          key={i}
                          showAllButton={item.ViewAllURL}
                          ViewAllClick={() => this.OnViewAllPress(item)}
                          listViewContainerStyle={{
                            borderTopWidth: 0,
                            marginTop: 0,
                          }}
                          ListTitleTextStyle={{}}
                          imgTopRtIcon={Icons.heartClear}
                          isBottomRightIcon={false}
                          listData={item.DPWProductOverviewModel}
                          bottomRightIcon={Icons.cartBtn}
                          onProductClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImageClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onTitleClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImgTopRtIcon={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onCartClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          OnWishlistClick={(data) =>
                            this.UpdateWishlistData(data)
                          }
                        />
                      </>
                    )} */}
                  {/* </> */}
                {/* ))}
              </>
            )} */}
            <ProductTitle
              pro_title_TestId={"productName"}
              pro_netprice_TestId={"productPrice"}
              zone={this.state.pManufacutrerName}
              title={this.state.pName}
              netPrice={this.state.pNewPrice}
              discountedPrice={this.state.pOldPrice}
              totalStars={5}
              ratedStars={3}
              totalReviews={23}
              reviewText={'reviews'}
              currencyText={''}
              onNavLink={(data) => console.log('common   ' + data.text)}
              onManufactureClick={() =>
                // this.props.navigation.push('ManufacturerFilterProductList', {
                //   passData: { data: this.state.pManufacturerData, }
                // })
                this.props.navigation.push('ManufacturerFilterProductList', {
                  passData: {
                    pageName: 'pdp',
                    data: { Id: this.state.pManufacturerData.Id },
                  },
                })
              }
            />
            {this.state.pImgs.length > 0 && (
              <ProductPhotoGallery data={this.state.pImgs}>              
                <View>
                  {(this.state.pCustomeProperties && this.state.pCustomeProperties.ProductRibbons && this.state.pCustomeProperties.ProductRibbons.Enabled) && (
                    <View style={[styles.discountContainer,
                      { marginTop: -(width - 40),
                        marginBottom: width - 140,}]}>
                      <Text style={styles.discountText}>
                        {this.state.pCustomeProperties.ProductRibbons.Text}
                      </Text>
                    </View>
                  )}  
                  <View
                    style={{
                      alignItems: 'flex-end',
                      alignSelf: 'flex-end',
                      flexDirection: 'column',
                      marginTop: -(width - 40),
                      marginBottom: width - 140,
                      //justifyContent: 'space-between',
                    }}>
                    {this.state.IsProductInYourWishList && (
                      <ButtonWithIcon
                        testId={"addedToWishListMobileBtn"}
                        userClick={(data) => this.onRemoveFromWishlist()}
                        titleStyle={{ color: Colors.PRIMARY }}
                        imageAvtarStyle={{
                          height: 25,
                          width: 25,
                          resizeMode: 'contain',
                          tintColor: Colors.PRIMARY,
                        }}
                        mainContainerStyles={{ padding: 10, paddingBottom: 5 }}
                        icon={Icons.heartClear}
                        text={''}
                      />
                    )}
                    {!this.state.IsProductInYourWishList && (
                      <ButtonWithIcon
                        testId={"addToWishListMobileBtn"}
                        userClick={(data) => this.onAddToWishList()}
                        titleStyle={{ color: Colors.DARK_GRAY_TEXT }}
                        imageAvtarStyle={{
                          height: 25,
                          width: 25,
                          resizeMode: 'contain',
                        }}
                        mainContainerStyles={{ padding: 10, paddingBottom: 5 }}
                        icon={Icons.heartClear}
                        text={''}
                      />
                    )}

                    {this.state.isShareVisible ? (
                      <ButtonWithIcon
                        testId={"shareProduct"}
                        imageAvtarStyle={{
                          height: 25,
                          width: 25,
                          resizeMode: 'contain',
                        }}
                        mainContainerStyles={{ padding: 10, paddingBottom: 5 }}
                        titleStyle={{ color: Colors.DARK_GRAY_TEXT }}
                        icon={Icons.share}
                        text={''}
                      />
                    ) : (
                      <ButtonWithIcon
                        testId={"shareProduct"}
                        userClick={(data) => this.shareMessage()}
                        IsDesabled={this.state.isSharingDisabled}
                        imageAvtarStyle={{
                          height: 25,
                          width: 25,
                          resizeMode: 'contain',
                        }}
                        mainContainerStyles={{ padding: 10, paddingBottom: 5 }}
                        titleStyle={{ color: Colors.DARK_GRAY_TEXT }}
                        icon={Icons.share}
                        text={''}
                      />
                    )}
                  </View>
                </View>
              </ProductPhotoGallery>
            )}

            <View>
              {this.state.pData.ShortDescription ? (
                <View
                  style={{
                    width: width - 30,
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderColor: Colors.DARK_GRAY_COLOR,
                  }}>
                  {!this.state.expandShort ? (
                    <Text> {this.state.pData.ShortDescription} </Text>
                   ) : (
                    <Text> {this.state.pData.ShortDescription} </Text>
                  )}

                  {/* <HTMLView
                    value={this.state.pData.MetaDescription}
                  // stylesheet={styles}
                  /> */}
                </View>
              ) : (
                <></>
              )}
            </View>

            <View>
              {this.state.ColorSquares.length > 0 ? (
                <>
                  {this.state.ColorSquares.map((item, i) => (
                    <>
                      <View key={i} style={{ flex: 1 }}>
                        <ColorSelector
                          title={this.state.ColorSquares[i].Name}
                          Id={this.state.ColorSquares[i].Id}
                          colorsData={this.state.ColorSquares[i].Values}
                          onColorSelect={(data, Id) =>
                            this.onColorAttributeSelected(data, Id)
                          }
                        />
                      </View>
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}
            </View>

            {this.state.DropDownData.length > 0 ? (
              <>
                {this.state.DropDownData.map((item, i) => (
                  <>
                    <View key={i}>
                      <DropdownWithIcon
                        title={this.state.DropDownData[i].Name}
                        Id={this.state.DropDownData[i].Id}
                        data={this.state.DropDownData[i].Values}
                        onItemSelection={(data, Id) =>
                          this.onDropdownAttributeSelected(data, Id)
                        }
                      />
                    </View>
                  </>
                ))}
              </>
            ) : (
              <></>
            )}

            <View>
              {this.state.radioButton.length > 0 && (
                <View>
                  {this.state.radioButton.map((item, i) => (
                    <View key={i} style={{ flex: 1 }}>
                      <RadioAttribute
                        //listData={[{FilterItemState:0,Name:"fdfdsf"},{FilterItemState:0,Name:"fdfdsf"},{FilterItemState:0,Name:"fdfdsf"}]}
                        Id={this.state.radioButton[i].Id}
                        userClick={(data, Id) =>
                          this.onRadioAttributeSelected(
                            data,
                            this.state.radioButton[i].Id,
                          )
                        }
                        listData={this.state.radioButton[i].Values}
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>

            {this.state.ImageSquares.length > 0 ? (
              <>
                {this.state.ImageSquares.map((item, i) => (
                  <>
                    <View key={i} style={{ flex: 1 }}>
                      <ImageSelector
                        title={this.state.ImageSquares[i].Name}
                        Id={this.state.ImageSquares[i].Id}
                        ImageData={this.state.ImageSquares[i].Values}
                        onImageSelect={(data, Id) =>
                          this.onImageAttributeSelected(data, Id)
                        }
                      />
                    </View>
                  </>
                ))}
              </>
            ) : (
              <></>
            )}

            <View>
              {this.state.CheckBox.length > 0 && (
                <View>
                  {this.state.CheckBox.map((item, i) => (
                    <View key={i} style={{ flex: 1 }}>
                      <CheckBoxAttribute
                        // listData={[{FilterItemState:0,Name:"fdfdsf"},{FilterItemState:0,Name:"fdfdsf"},{FilterItemState:0,Name:"fdfdsf"}]}
                        Id={this.state.CheckBox[i].Id}
                        userClick={(data, Id) =>
                          this.onCheckBoxAttributeSelected(data, Id)
                        }
                        listData={this.state.CheckBox[i].Values}
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>
            {/* <QuantitySelector
                  Quantity={this.state.QuantitySelectorText}
                  StockText={this.state.pStockAvailability}
                  QuentityChange={(text) => this.onQuantitySelector(text)}
                /> */}

            {this.state.pData.DisplayBackInStockSubscription ? (
              <View>
                <ButtonWithIcon
                  mainContainerStyles={{ paddingTop: 5, paddingBottom: 5 }}
                  icon={Icons.notify}
                  imageAvtarStyle={styles.normalNotifyMEStyle}
                  text={'Notify me when Available'}
                  titleStyle={{
                    fontWeight: '400',
                  }}
                  secondaryTitleStyle={{
                    color: Colors.PRIMARY,
                  }}
                  userClick={() => this.notifyMeCall()}
                />
              </View>
            ) : (
              <></>
            )}
            {this.state.shipToEnabled && this.state.heavyNBulkyMessage != null && this.state.heavyNBulkyMessage.length !== ''
              && <Text style={styles.descriptionTextStyle}>{this.state.heavyNBulkyMessage}</Text>}

            <ButtonWithIcon
              mainContainerStyles={{
                paddingBottom: 5,
                justifyContent: 'flex-start',
              }}
              icon={Icons.market}
              imageAvtarStyle={{ tintColor: Colors.GRAY_TEXT }}
              text={'Sold By'}
              titleStyle={{
                color: Colors.GRAY_TEXT,
                fontWeight: '400',
                //  fontSize: 13,
              }}
              Secondarytext={this.state.pVendorModel.Name}
              secondaryTitleStyle={{
                color: Colors.PRIMARY,
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                //textDecorationLine: 'underline',
                // fontSize: 15,
              }}
              secondaryTitleViewStyle={{ width: width / 1.7 }}
              userClick={(data) =>
                // this.props.navigation.push('VendorFilterProductList', {
                //   passData: { data: this.state.pVendorModel }
                // })
                this.props.navigation.push('VendorFilterProductList', {
                  passData: {
                    pageName: 'PDP',
                    data: { Id: this.state.pVendorModel.Id },
                  },
                })
              }
            />

            <ButtonWithIcon
              imageAvtarStyle={{ tintColor: Colors.GRAY_TEXT }}
              titleStyle={{
                color: Colors.GRAY_TEXT,
                fontWeight: '400',
                //fontSize: 13,
              }}
              mainContainerStyles={{ paddingTop: 5 }}
              icon={Icons.cargShip}
              text={'SKU'}
              Secondarytext={this.state.pData.Sku}
              secondaryTitleStyle={{
                color: Colors.PRIMARY,
                //textDecorationLine: 'underline',
                // fontSize: 15,
              }}
            />

          <ButtonWithIcon
              imageAvtarStyle={{
                tintColor: Colors.GRAY_TEXT,
                width:30,
                marginTop: 0,
              }}
              titleStyle={{
                color: Colors.GRAY_TEXT,
                fontWeight: '400',
                marginTop: 0,
              }}
              mainContainerStyles={{
                paddingTop:0,
                paddingBottom:5,
                marginTop: 0,
                justifyContent: 'flex-start',
              }}
              icon={Icons.truck}
              text={'Delivered in'}
              Secondarytext={this.state.deliveryDate}
              secondaryTitleStyle={{
                color: Colors.PRIMARY,
                marginTop: 0,
              }}
            />
            {this.state.nonReturnable ? (
             <ButtonWithIcon
              imageAvtarStyle={{
                tintColor: Colors.GRAY_TEXT,
                marginTop: 5,
              }}
              titleStyle={{
                color: Colors.GRAY_TEXT,
                fontWeight: '400',
                marginTop: 5,
              }}
              mainContainerStyles={{
                paddingTop:5,
                paddingBottom:5,
                marginTop: 0,
                justifyContent: 'flex-start',
              }}
              icon={Icons.returnsAllowedUpto}
              text={'Returns allowed upto'}
              Secondarytext={this.state.noOfReturnRequestAvailable +" Days"}
              secondaryTitleStyle={{
                color: Colors.PRIMARY,
                marginTop: 5,
              }}
            />
            ):(
              <ButtonWithIcon
              imageAvtarStyle={{
                tintColor: Colors.GRAY_TEXT,
                marginTop: 5,
              }}
              titleStyle={{
                color: Colors.GRAY_TEXT,
                fontWeight: '400',
                marginTop: 5,
              }}
              mainContainerStyles={{
                paddingTop:5,
                paddingBottom:5,
                marginTop: 0,
                justifyContent: 'flex-start',
              }}
              icon={Icons.easyReturns}
              text={'Non Returnable'}
            />
            )}

           {/* { this.state.shipToEnabled && 
              this.state.easyReturnAvailable &&
              this.state.noOfReturnRequestAvailable > 0 &&  
            <ButtonWithIcon
              imageAvtarStyle={{ tintColor: Colors.GRAY_TEXT }}
              titleStyle={{
                color: Colors.GRAY_TEXT,
                fontWeight: '400',
                //fontSize: 13,
              }}
              mainContainerStyles={{ paddingTop: 5 }}
              icon={Icons.easyReturns}
              text={this.state.nonReturnable? 'Non Returnable':'Easy Returns'}
            />} */}
            {this.state.pData.FullDescription != '' ? (
              // <ProductSpecification
              //   title={'Product Specifications'}
              //   description={this.state.pData.FullDescription}
              //   descPoints={this.state.pData.ProductSpecifications}
              //   bulletStyles={{backgroundColor: Colors.GRAY_TEXT}}
              //   onNavLink={(data) => console.log('common   ' + data.text)}
              // />
              <View style={{marginRight:15,marginLeft:20,marginTop:15 }}>
                <Text style={{fontSize:18,
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
                    color: Colors.BLACK,
                    }}>Product Specifications</Text>
                <RenderHtml
                    // contentWidth={width}
                    source={this.state.htmlData}
                />
              </View>
            ) : (
              <></>
            )}
            
            {(this.state.pData?.TierPrices != '' && this.state.pData?.TierPrices != undefined) ?

              <BuyMoreAndSaveMore title={'Buy More Save More'} pId={this.state.pData.Id} data={this.state.pData} pQuantity={this.state.QuantitySelectorText} pMiniQuantity={this.state.pMinQuantity} pPrice={this.state.pNewPrice} 
              onQuantityChange={this.onQuantitySelector}
              />

              :
              <></>
              }             
              
              {this.state.pRelatedProducts &&
              this.state.pRelatedProducts.length ? (
              <>
                <FleashDealsCount
                  blockStyle={{ backgroundColor: Colors.WHITE }}
                  LayoutTypeId={1}
                  Title={'Related Products'}
                  titleStyle={{ fontSize: 14 }}
                  SubTitle={'Ending In'}
                />
                <ProductGridListView
                  //showAllButton={item.ViewAllURL}
                  listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0 }}
                  ListTitleTextStyle={{}}
                  imgTopRtIcon={Icons.heartClear}
                  isBottomRightIcon={false}
                  listData={this.state.pRelatedProducts}
                  bottomRightIcon={Icons.cartBtn}
                  onProductClick={(data) =>
                    this.props.navigation.push('ProductDetails', {
                      passData: data,
                    })
                  }
                  onImageClick={(data) =>
                    this.props.navigation.push('ProductDetails', {
                      passData: data,
                    })
                  }
                  onTitleClick={(data) =>
                    this.props.navigation.push('ProductDetails', {
                      passData: data,
                    })
                  }
                  onImgTopRtIcon={(data) =>
                    this.props.navigation.push('ProductDetails', {
                      passData: data,
                    })
                  }
                  onCartClick={(data) =>
                    this.props.navigation.push('ProductDetails', {
                      passData: data,
                    })
                  }
                  OnWishlistClick={(data) => this.onWishIconClick()}
                />
              </>
            ) : (
              <></>
            )}

            {this.state.pCustomerWhoBoughtThisAlsoBoughtThis &&
              this.state.pCustomerWhoBoughtThisAlsoBoughtThis.length > 0 && (
                <>
                  <FleashDealsCount
                    blockStyle={{ backgroundColor: Colors.WHITE }}
                    LayoutTypeId={1}
                    Title={'Customers who bought this item also bought'}
                    titleStyle={{ fontSize: 14 }}
                    SubTitle={'Ending In'}
                  />
                  <ProductGridListView
                    //showAllButton={item.ViewAllURL}
                    listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0 }}
                    ListTitleTextStyle={{}}
                    imgTopRtIcon={Icons.heartClear}
                    isBottomRightIcon={false}
                    listData={this.state.pCustomerWhoBoughtThisAlsoBoughtThis}
                    bottomRightIcon={Icons.cartBtn}
                    onProductClick={(data) =>
                      this.props.navigation.push('ProductDetails', {
                        passData: data,
                      })
                    }
                    onImageClick={(data) =>
                      this.props.navigation.push('ProductDetails', {
                        passData: data,
                      })
                    }
                    onTitleClick={(data) =>
                      this.props.navigation.push('ProductDetails', {
                        passData: data,
                      })
                    }
                    onImgTopRtIcon={(data) =>
                      this.props.navigation.push('ProductDetails', {
                        passData: data,
                      })
                    }
                    onCartClick={(data) =>
                      this.props.navigation.push('ProductDetails', {
                        passData: data,
                      })
                    }
                    OnWishlistClick={(data) => this.onWishIconClick()}
                   OnWishlistClick={(data) => this.getCartCountData()}
                  />
                </>
              )}

            {/* Bottom Widget */}
            {/* {this.state.bottomWidget.length > 0 && (
              <>
                {this.state.bottomWidget.map((item, i) => (
                  <>
                    {item.LayoutType == 'Grid_WithTimer' ? (
                      <>
                        <FleashDealsCount
                          key={i}
                          IconPictureURL={item.IconPictureURL}
                          FromDate={new Date()}
                          ToDate={getCurrentDateStamp(item.ToDate)}
                          blockStyle={{ backgroundColor: item.BackgroundColor }}
                          LayoutTypeId={2}
                          Title={item.Title}
                          titleStyle={{ fontSize: 14 }}
                          SubTitle={'Ending In'}
                        />
                        <ProductGridListView
                          key={i}
                          showAllButton={item.ViewAllURL}
                          listViewContainerStyle={{
                            borderTopWidth: 0,
                            marginTop: 0,
                          }}
                          ListTitleTextStyle={{}}
                          imgTopRtIcon={Icons.heartClear}
                          isBottomRightIcon={false}
                          listData={item.DPWProductOverviewModel}
                          bottomRightIcon={Icons.cartBtn}
                          onProductClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImageClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onTitleClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImgTopRtIcon={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onCartClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          OnWishlistClick={(data) => this.onWishIconClick()}
                        OnWishlistClick={(data) => this.getCartCountData()}
                        />
                      </>
                    ) : (
                      <>
                        <FleashDealsCount
                          key={i}
                          IconPictureURL={item.IconPictureURL}
                          blockStyle={{ backgroundColor: item.BackgroundColor }}
                          LayoutTypeId={1}
                          Title={item.Title}
                          titleStyle={{ fontSize: 14 }}
                        />
                        <ProductGridListView
                          key={i}
                          showAllButton={item.ViewAllURL}
                          listViewContainerStyle={{
                            borderTopWidth: 0,
                            marginTop: 0,
                          }}
                          ListTitleTextStyle={{}}
                          imgTopRtIcon={Icons.heartClear}
                          isBottomRightIcon={false}
                          listData={item.DPWProductOverviewModel}
                          bottomRightIcon={Icons.cartBtn}
                          onProductClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImageClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onTitleClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onImgTopRtIcon={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          onCartClick={(data) =>
                            this.props.navigation.push('ProductDetails', {
                              passData: data,
                            })
                          }
                          OnWishlistClick={(data) => this.onWishIconClick()}
                        // OnWishlistClick={(data) => this.getCartCountData()}
                        />
                      </>
                    )}
                  </>
                ))}
              </>
            )} */}

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
          </ScrollView>
          <View
            style={{
              ...styles.SpredCrumbcontainer,
              flexDirection: 'column',
              height: 110,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                //backgroundColor:Colors.MORE_ORANGE,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <QuantitySelector
                selectQuantity_TestId={"selectQuantity"}
                plusQua_TestId={"plusQuantity"}
                minusQua_TestId={"minusQuantity"}
                title={'Qty: '}
                Quantity={this.state.QuantitySelectorText}
                StockText={this.state.pStockAvailability}
                QuentityChange={(text) => this.onQuantitySelector(text)}
              />

              <View>
                {this.state.pOldPrice != null && this.state.pOldPrice != '' ? (
                  <ButtonWithIcon
                    mainContainerStyles={{
                      padding: 0,
                      marginRight: 5,
                      margin: 0,
                      flexDirection: 'column',
                    }}
                    imageAvtarStyle={{
                      height: 0,
                      width: 0,
                      margin: 5,
                      marginLeft: 5,
                    }}
                    text={this.state.pNewPrice}
                    titleStyle={{
                      color: Colors.PRIMARY,
                      fontSize: 14,
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
                      alignSelf: 'center',
                    }}
                    Secondarytext={this.state.pOldPrice}
                    secondaryTitleStyle={{
                      color: Colors.GRAY_TEXT,
                      fontSize: 14,
                      margin: 5,
                      marginTop: -5,
                      marginBottom: -5,
                      padding: 0,
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
                      textDecorationLine: 'line-through',
                    }}
                  />
                ) : (
                  <ButtonWithIcon
                    mainContainerStyles={{
                      padding: 0,
                      marginRight: 5,
                      margin: 0,
                    }}
                    imageAvtarStyle={{
                      height: 0,
                      width: 0,
                      margin: 5,
                      marginLeft: 5,
                    }}
                    text={this.state.pNewPrice}
                    titleStyle={{
                      color: Colors.PRIMARY,
                      fontSize: IS_SCREEN_SIZE_SMALL ? 14 : 16,
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
                      alignSelf: 'center',
                      // alignItems : 'center',
                      // justifyContent : 'center',
                      // backgroundColor : 'pink',
                      // marginTop : '15%'
                    }}
                  />
                )}
              </View>
            </View>
            {this.state.shipToEnabled && !this.state.serviceableByVendor ?
              <View>
                {itemNotAvailableBody}
              </View> :

              (this.state.pInstock == null &&
                ((this.state.pStockAvailability != null &&
                  this.state.pStockAvailability != '' &&
                  this.state.pStockAvailability.endsWith('n stock')) ||
                  (this.state.pData.DPWStockQuantity > 0 &&
                    this.state.pAttributeSelected == ''))) ||
                this.state.pInstock > 0 ? (
                <>
                  <View
                    style={{
                      margin: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <ButtonWithIcon
                      mainContainerStyles={{
                        padding: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                        borderRadius: 30,
                        height: 40,
                        width: width / 2.4,
                        borderWidth: 1,
                        borderColor: Colors.PRIMARY,
                        backgroundColor: Colors.WHITE,
                      }}
                      imageAvtarStyle={{
                        height: 0,
                        width: 0,
                        margin: 5,
                      }}
                      text={'Add To Cart'}
                      titleStyle={{
                        color: Colors.PRIMARY,
                        fontSize: 15,
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
                        alignSelf: 'center',
                      }}
                      userClick={() => this.onAddToCart()}
                    />
                    <ButtonWithIcon
                      mainContainerStyles={{
                        padding: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 30,
                        height: 40,
                        width: width / 2.4,
                      }}
                      imageAvtarStyle={{
                        height: 0,
                        width: 0,
                        margin: 5,
                      }}
                      text={'Buy Now'}
                      titleStyle={{
                        color: Colors.WHITE,
                        fontSize: 15,
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
                        alignSelf: 'center',
                      }}
                      userClick={(data) => this.onBuyNowClick()}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      margin: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <ButtonWithIcon
                      IsDesabled={true}
                      mainContainerStyles={{
                        padding: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                        backgroundColor: Colors.WHITE,
                        borderRadius: 30,
                        height: 40,
                        width: width / 2.4,
                        borderWidth: 1,
                        borderColor: Colors.GRAY_TEXT,
                      }}
                      imageAvtarStyle={{
                        height: 0,
                        width: 0,
                        margin: 5,
                      }}
                      text={'Add To Cart'}
                      titleStyle={{
                        color: Colors.GRAY_TEXT,
                        fontSize: 15,
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
                        alignSelf: 'center',
                      }}
                    />
                    <ButtonWithIcon
                      IsDesabled={true}
                      mainContainerStyles={{
                        padding: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                        borderRadius: 30,
                        height: 40,
                        width: width / 2.4,
                        borderWidth: 1,
                        borderColor: Colors.GRAY_TEXT,
                        backgroundColor: Colors.GRAY_TEXT,
                      }}
                      imageAvtarStyle={{
                        height: 0,
                        width: 0,
                        margin: 5,
                      }}
                      text={'Buy Now'}
                      titleStyle={{
                        color: Colors.WHITE,
                        fontSize: 15,
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
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                </>
              )}
          </View >
          <View>
            <Modal
              visible={this.state.notifyMeModel}
              animated
              transparent={true}
              onRequestClose={() => { }}>
              <View
                style={{
                  flex: 1,
                  width: width,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.BG_OVERLAY,
                }}>
                <View
                  style={{
                    height: 250,
                    width: width - 30,
                    backgroundColor: Colors.WHITE,
                    padding: 20,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
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
                        fontSize: 16,
                      }}>
                      {' '}
                      {this.state.NotifyHeaderTitle}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          notifyMeModel: !this.state.notifyMeModel,
                        })
                      }>
                      <Image
                        style={{
                          height: 20,
                          width: 20,
                          margin: 10,
                          // alignSelf: 'flex-end',
                          transform: [{ rotate: '50deg' }],
                        }}
                        source={Icons.plus}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
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
                    }}>
                    {this.state.notifyMessage}
                  </Text>

                  <Text
                    style={{
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
                    }}>
                    {this.state.notifyErrorMsg}
                  </Text>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    {this.state.IsCurrentCustomerRegistered == true ? (
                      <ButtonWithIcon
                        mainContainerStyles={{
                          padding: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          margin: 0,
                          backgroundColor: Colors.PRIMARY,
                          borderRadius: 30,
                          height: 40,
                          width: 150,
                        }}
                        imageAvtarStyle={{
                          height: 0,
                          width: 0,
                          margin: 5,
                        }}
                        text={this.state.notifyMeButton}
                        titleStyle={{
                          color: Colors.WHITE,
                          fontSize: 12,
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
                          alignSelf: 'center',
                        }}
                        userClick={(data) => this.onSubscriptionStatusChange()}
                      />
                    ) : (
                      <View>
                        <ButtonWithIcon
                          mainContainerStyles={{
                            padding: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 10,
                            backgroundColor: Colors.PRIMARY,
                            borderRadius: 30,
                            height: 40,
                            width: 150,
                          }}
                          imageAvtarStyle={{
                            height: 0,
                            width: 0,
                            margin: 5,
                          }}
                          text="LOG IN"
                          titleStyle={{
                            color: Colors.WHITE,
                            fontSize: 12,
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
                            alignSelf: 'center',
                          }}
                          userClick={async () => {
                            await this.setState({ notifyMeModel: false });
                            this.props.navigation.navigate('SignIn');
                          }}
                        />

                        <ButtonWithIcon
                          mainContainerStyles={{
                            padding: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 10,
                            backgroundColor: Colors.PRIMARY,
                            borderRadius: 30,
                            height: 40,
                            width: 200,
                          }}
                          imageAvtarStyle={{
                            height: 0,
                            width: 0,
                            margin: 5,
                          }}
                          text="REGISTER FOR FREE"
                          titleStyle={{
                            color: Colors.WHITE,
                            fontSize: 12,
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
                            alignSelf: 'center',
                          }}
                          userClick={async () => {
                            await this.setState({ notifyMeModel: false });
                            this.props.navigation.navigate('Register');
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView >
      </>
    );
  }
}


const getCurrentDateStamp = (string) =>{
  var gmtString = new Date().toTimeString().split(" ")[1].replace("GMT","");
  return string + gmtString.slice(0, gmtString.length - 2) + ":" + gmtString.slice(-2);
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCountToCart: (newCount) =>
      dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount }),
    updateWishlist: () => dispatch({ type: 'WISHLIST_CALL' }),
    updateCartCount: () => dispatch({ type: 'COUNT_CALL' }),
  };
};

const mapStateToProps = (state) => {
  let Store_data = state.Count;

  return {
    CarCount: Store_data.shoppingCartCount,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

const htmlStyle = StyleSheet.create({
  br: {
    display: 'none',
    marginBottom: -10
  },
  p: {
    marginBottom: -10,
    marginTop: 0
  }

});
