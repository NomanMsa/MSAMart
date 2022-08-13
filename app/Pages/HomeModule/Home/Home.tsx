import React, { Component } from 'react';
import url from 'url';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  LogBox,
  BackHandler,
  Alert,
  Platform,
  Image,
  Linking,
  Modal,
  Dimensions,
  DrawerLayoutAndroidBase,
  TouchableOpacity,
} from 'react-native';

import {
  ImageSlider,
  ProductGridListView,
  FleashDealsCount,
  Header,
  Footer,
  SearchBar,
  ImageCards,
  OfflineNotice,
  DiscountBanner,
  ProductCategory,
  AnyCategoryGrid
} from '@components';


LogBox.ignoreAllLogs();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Images, Loaders, Icons } from '@assets';
import LottieView from 'lottie-react-native';
import perf from '@react-native-firebase/perf';
// import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";

import AnimatedLoader from 'react-native-animated-loader';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-community/async-storage';
import { ServiceCall } from '@utils';
import { Api, EventTags, EmarsysEvents } from '@config';
import styles from './HomeStyles';
import { Colors } from '@theme';
const { width, height } = Dimensions.get('window');
import { DeepLinkUrlOpn } from '@nav';
import { RemotePushController } from '@utils';
// import NetInfo from '@react-native-community/netinfo';
//import SplashScreen from 'react-native-splash-screen'





const Drawer = createDrawerNavigator();
var tittle1 = '';
var tittle2 = '';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showSplash: global.splashToShow,
      scrollMenuData: [],
      imgSliderData: [],
      imgCardsData: [],
      productData: [],
      topWidget: [],
      bottomWidget: [],
      beforeNewsWidget: [],
      beforeBestSellersWidget: [],
      beforeProductsWidget: [],
      topBanner: [],
      bottomBanner: [],
      CatagoryData: [],
      NewsData: [],
      ShoppingCartType: '',
      CartCount: 0,
      wishListCount: 0,
      splashLoading: true,
      isVisible: true,
      discountInformationText: '',
      shipToEnabled: false,
      currentCountryModel: null,
      apiCallInProgress: false,
      appimage: '',
      productTitle: '',
      categorytitle: ''
    };
    this.onSuccessCall = this.onSuccessCall.bind(this);
    this.onSuccessWidgetCall = this.onSuccessWidgetCall.bind(this);
    this.fetchHomeData = this.fetchHomeData.bind(this);
    this.fetchWidgitData = this.fetchWidgitData.bind(this);
    // this.onSuccessBannerFetch = this.onSuccessBannerFetch.bind(this);
    // this.fetchDiscountBanner = this.fetchDiscountBanner.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.getCartCountData = this.getCartCountData.bind(this);
    this.onSuccessGetCountCall = this.onSuccessGetCountCall.bind(this);
    this.onReceiveURL = this.onReceiveURL.bind(this);
    this.sendFCMToken = this.sendFCMToken.bind(this);
    this.onSuccessFCMToken = this.onSuccessFCMToken.bind(this);
    this.getDiscountTextByCountry = this.getDiscountTextByCountry.bind(this);
    this.fetchAnywhere = this.fetchAnywhere.bind(this);
    // this.onSuccessTopMenuCall = this.onSuccessTopMenuCall.bind(this);
  }
  onSuccessActivation = async (data) => {
    this.getCartCountData();
    // this.setState({ loading: false });
    // console.log('recieved data of activation', data);
    const j = JSON.parse(JSON.stringify(data));

    console.log('on success activation data --- ', data);
    if (j.status === true) {
      if (data.message == "Your account has been activated") {
        Alert.alert('MsaMart', data.message);
      }
      // Alert.alert('MsaMart', data.message);
    } else {
      console.log('565656----', data.errorlist);
      if (data.errorlist[0] == "Your account already has been activated") {
        Alert.alert('MsaMart', data.errorlist[0]);
      }
      if (data.message !== 'Invalid token found') {
        // Alert.alert('MsaMart', data.errorlist[0]);
      }
    }
  };
  onFailureActivation = (data) => {
    console.log('error activation.................', data);
    if (data.errorlist) {
      Alert.alert('MsaMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  onPromiseFailureActivation = (data) => {
    // console.log(data);
    if (data.errorlist) {
      Alert.alert('MsaMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  getDiscountTextByCountry = async () => {
    let Service = {
      apiUrl: Api.GetDiscountTextByCountry,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onDiscountTextApiSuccess,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    await ServiceCall(Service);
  }

  onDiscountTextApiSuccess = (response) => {
    this.getCartCountData();
    if (response !== null && response !== undefined && response.shippingInfoText != null) {
      this.setState({ discountInformationText: response.shippingInfoText });
    }
  }

  onOfflineActivation = (data) => {
    // console.log(data);
    if (data.errorlist) {
      Alert.alert('MsaMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };
  async operateActivation(link: String) {
    if (link !== null) {
      let urlObjects = url.parse(link.toString(), true);
      let token = urlObjects.query['token'];
      let authToken = await AsyncStorage.getItem('custToken');
      let emailString = urlObjects.query['email'];
      // console.log('url token', token);
      // console.log('url email', emailString);
      if (token != undefined && emailString != undefined) {
        const getUrl =
          Api.UserActivation + 'token=' + authToken + '&email=' + emailString + '';
        // console.log('url link', getUrl);
        let Service = {
          apiUrl: getUrl,
          methodType: 'GET',
          headerData: { 'Content-Type': 'application/json' },
          onSuccessCall: this.onSuccessActivation,
          onFailureAPI: this.onFailureActivation,
          onPromiseFailure: this.onPromiseFailureActivation,
          onOffline: this.onOfflineActivation,
        };
        const serviceResponse = await ServiceCall(Service);
      }
    }
  }

  async componentDidMount() {

    // NetInfo.fetch().then(state  => {
    //   console.log('netinfo ip add ****--- ', state.details.ipAddress);
    // })
    // DeviceInfo.getIpAddress().then((ip) => {
    //   console.log('deviceinfo ip add -- ', ip);
    // });

    //RemotePushController
    const authStatus = await messaging().requestPermission();
    //const token = await messaging().getToken();
    //this.sendFCMToken(token);

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    var appOpenedForFirstTime = global.splashToShow;
    const initialUrl = await Linking.getInitialURL();
    Linking.addEventListener('url', this.onReceiveURL);
    console.log('initial url0---', initialUrl);
    if (initialUrl !== null && appOpenedForFirstTime === true) {
      if (initialUrl.split("/")[3] !== "passwordrecovery") {
        await this.operateActivation(initialUrl);
      }
    }

    dynamicLinks().getInitialLink().then(link => {
      console.log("Dynamic link is ", link);
      this.handleDynamicLink(link);
    });

    // await this.operateActivation(initialUrl);
    console.log("THe app is opened for first time ", appOpenedForFirstTime === true);
    if (((await DeepLinkUrlOpn.redirectionRequired(initialUrl)) == false)) {
      if (global.scrToNav != '') {
        global.splashToShow = false;
        await this.setState({ showSplash: false });
        let data = await DeepLinkUrlOpn.getFinalUrlAndParams(global.scrToNav);
        console.log('data 1--- ', data);
        global.scrToNav = '';
        if (
          appOpenedForFirstTime === true &&
          data.screen != undefined &&
          data.screen != null &&
          data.screen != 'null' &&
          data.screen != 'undefined'
        ) {
          this.setState({ loading: false });
          this.props.navigation.navigate(data.screen, data.params);
        } else {
          const homeTrace = await perf().startTrace('custom_trace_home_screen');
          this.GetConfiguration();
          await this.fetchAnywhere();
          await this.fetchHomeData();
          await this.fetchWidgitData();
          //await this.fetchDiscountBanner();
          /*homeTrace.putAttribute('occurrence', 'firstVisit');
          await homeTrace.stop();*/
        }
      } else {
        const homeTrace = await perf().startTrace('custom_trace_home_screen');
        this.GetConfiguration();
        await this.fetchAnywhere();
        await this.fetchHomeData();
        await this.fetchWidgitData();
        //await this.fetchDiscountBanner();
        global.splashToShow = false;
        /*homeTrace.putAttribute('occurrence', 'firstVisit');
        await homeTrace.stop();
        await this.setState({ showSplash: false });*/
      }
      //if(Platform.OS != 'ios'){SplashScreen.hide();}
    } else {
      global.splashToShow = false;
      await this.setState({ showSplash: false });
      //if(Platform.OS != 'ios'){SplashScreen.hide();}
      let data = await DeepLinkUrlOpn.getFinalUrlAndParams(initialUrl);
      console.log('data 2--', data);
      if (
        appOpenedForFirstTime === true &&
        data.screen != undefined &&
        data.screen != null &&
        data.screen != 'null' &&
        data.screen != 'undefined'
      ) {
        this.setState({ loading: false });
        console.log('pwd screen navigate---', data.screen);
        this.props.navigation.navigate(data.screen, data.params);
      } else {
        const homeTrace = await perf().startTrace('custom_trace_home_screen');
        await this.fetchHomeData();
        await this.fetchWidgitData();
        //await this.fetchDiscountBanner();
        /*homeTrace.putAttribute('occurrence', 'firstVisit');
        await homeTrace.stop();*/
      }
    }
    this.getDiscountTextByCountry();
    this.focusListener = await this.props.navigation.addListener(
      'focus',
      async () => {
        const homeTrace = await perf().startTrace('custom_trace_home_screen');
        await this.fetchHomeData();
        await this.fetchWidgitData();
        //await this.fetchDiscountBanner();
        await this.getDiscountTextByCountry();
        /*homeTrace.putAttribute('occurrence', 'reVisit');
        await homeTrace.stop();
        this.props.updateCartCount();*/
      },
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    let durationM = new Date().getTime() - this.state.startTime
    let homerenderTime = {
      item_id: durationM,
      slug_url: ' ',
      entity_name: 'Home',
    };
    console.log("home duration--", this.state.startTime, " ---- ", durationM);
    await analytics().logEvent('homeScreen_renderingTime', homerenderTime);
    AppEventsLogger.logEvent(EventTags.homeScreen_renderingTime, homerenderTime);
  }

  componentWillMount() {
    let startTimeM = new Date().getTime()
    this.setState({ startTime: startTimeM });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onReceiveURL = async (link) => {
    console.log('on receive url -- ', link);
    if (link.url.split("/")[3] !== "passwordrecovery") {
      await this.operateActivation(link.url);
    }
    if ((await DeepLinkUrlOpn.redirectionRequired(link.url)) == false) {
      await this.fetchHomeData();
      await this.fetchWidgitData();
      //await this.fetchDiscountBanner();
    } else {
      let data = await DeepLinkUrlOpn.getFinalUrlAndParams(link.url);
      if (
        data.screen != undefined &&
        data.screen != null &&
        data.screen != 'null' &&
        data.screen != 'undefined'
      ) {
        console.log('on receive url naviagte --- ', data);
        this.props.navigation.navigate(data.screen, data.params);
      } else {
        await this.fetchHomeData();
        await this.fetchWidgitData();
        //await this.fetchDiscountBanner();
      }
    }
  };
  handleDynamicLink = (link) => {
    const url = link.url;
    if (url != null) {
      this.onReceiveURL(url);
    }
  }

  sendFCMToken = (fcmToken) => {
    let DeviceType = 2;
    let DeviceId = DeviceInfo.getUniqueId();
    if (Platform.OS === 'ios') {
      DeviceType = 1;
    }
    let Service = {
      apiUrl: Api.Home, //Api.sendFCMToken,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        Token: fcmToken,
        DeviceId: DeviceId,
        DeviceType: DeviceType,
      }),
      onSuccessCall: this.onSuccessFCMToken,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    ServiceCall(Service);
  };

  onSuccessFCMToken = (data) => {
    console.log('home screen success fcm call-- ', data);
    this.getCartCountData();
    let catdata = data.model.CategoryModels;
    this.setState({
      CatagoryData: catdata
    })
  };
  async GetConfiguration() {
    let Service = {
      apiUrl: Api.AppConfig,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.Success
    }
    await ServiceCall(Service);
  }
  async Success(data) {
    var a = "data:image/png;base64,"
    // await  AsyncStorage.setItem("image",i)
    AsyncStorage.setItem("image", '')
    var appdata1 = data.model.AppImageConfiguration;
    var textconfig = data.model.AppTextConfig

    AsyncStorage.setItem("navmodel", JSON.stringify(data.model.NavigationLink))
    appdata1.map((element, index) => {
      if (element.ConfigKey == "headerlogo") {
        AsyncStorage.setItem("image", a + element.ImgBinary)
      }
      if (element.ConfigKey == "footerlogo") {
        AsyncStorage.setItem("footerlogo", a + element.ImgBinary)
      }
    });
    textconfig.forEach(element => {
      if (element.TextKey == "feturedcategory") {

        tittle1 = element.Body
      }
      if (element.TextKey == "feturedproduct") {
        tittle2 = element.Body
      }
      if (element.TextKey == "phonenumber") {
        AsyncStorage.setItem("mobieno", element.Body)
      }
      if (element.TextKey == "supportemail") {
        AsyncStorage.setItem("semail", element.Body)
      }
    });
    console.log("***/*/*/*/-*----/-/-/--/-/-/-/-/-/---/-/-//**/*/*/*/gvdsvdhbh", this.state.categorytitle);

    // textconfig.map((text,index)=>{
    //   if(text.TextKey =="feturedproduct"){
    //      this.setState({
    //       productTitle:text.Body
    //     })
    //   }

    //   if(text.TextKey =="feturedcategory"){
    //     this.setState({
    //      categorytitle:text.Body
    //    })
    //  }

    // });


  }
  onSuccessCall = async (data) => {
    this.GetConfiguration();
    console.log('HomeData...........', data);
    let catdata = data.model.CategoryModels;
    if (data.errorlist && data.errorlist.length > 0) {
      console.log("---------------------------------------------------------if");

      // Alert.alert('MsaMart', data.errorlist[0]);
    } else {
      console.log("-------------------------------------------------------else");

      let imgSliderData = {};
      let imgCardsData = {};

      imgSliderData = data.model.PublicInfoModelApi;
      console.log("--------------------------------------------------------------------------------slider images length = " + imgSliderData.length);
      for (var i = 0; i < imgSliderData.length; i++) {
        /* if (data.home_slider_images[i].WidgetZone == 'home_page_main_slider') {
           //imgSliderData = data.home_slider_images[i];
         }
         if (
           data.home_slider_images[i].WidgetZone ==
           'home_page_before_best_sellers'
         ) {*/
        imgSliderData = imgSliderData[i];
        imgCardsData = imgSliderData[i];

      }
      await this.setState({
        loading: false,
        //scrollMenuData: data.flat_menu,
        imgSliderData: imgSliderData,
        imgCardsData: imgCardsData,
        CatagoryData: catdata,
        NewsData: data.model.HomepageNewsItemsModel
        //isShipToEnable: data.CommonShipToModel.IsShipToEnable,
      });

      this.props.addCategoryMenu({ MenuData: catdata });


      /*await AsyncStorage.setItem('IsShipToEnable', JSON.stringify(data.CommonShipToModel.IsShipToEnable));
      // await this.props.addCategoryMenu({ MenuData: data.drawer_menu })
      if (this.props.MenuData.length == 0) {
        this.props.addCategoryMenu({ MenuData: data.drawer_menu });
      }*/

      console.log('addCategoryMenu...........');
      /*if (
        data.CurrencySymbol != null &&
        data.CurrencySymbol != undefined &&
        data.CurrencySymbol != 'null' &&
        data.CurrencySymbol != 'undefined'
      ) {
        await AsyncStorage.setItem('@currencysymbol', data.CurrencySymbol);
      }
      if (data.CommonShipToModel) {
        await this.setState({
          shipToEnabled: data.CommonShipToModel.IsShipToEnable,
          currentCountryModel: data.CommonShipToModel.CurrentCountryModel,
        });
      }*/
    }
  };
  onSuccessBannerFetch = async (data) => {
    if (data.errorlist && data.errorlist.length > 0) {
      // Alert.alert('MsaMart', data.errorlist[0]);
    }
    console.log(data);
    let bannerList = data.model;
    let topBanner = [];
    let bottomBanner = [];
    for (var i = 0; i < bannerList.length; i++) {
      if (bannerList[i].WidgetZone == 'home_page_top') {
        topBanner.push(bannerList[i]);
      }
      if (bannerList[i].WidgetZone == 'home_page_bottom') {
        bottomBanner.push(bannerList[i]);
      }
    }
    await this.setState({
      loading: false,
      topBanner: topBanner,
      bottomBanner: bottomBanner,
    });
    console.log('top banner---- ', this.state.topBanner);
  };

  fetchDiscountBanner = async () => {
    let Service = {
      apiUrl: Api.DiscountBanner + '?page=home',
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessBannerFetch,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    await ServiceCall(Service);
  };
  onSuccessWidgetCall = async (data) => {
    if (data.errorlist) {
      // Alert.alert('MsaMart', data.errorlist[0]);
    }
    //console.log('onSuccessWidgetCall......', JSON.stringify(data));
    this.getCartCountData
    let model = data.model;
    let topWidget = [];
    let bottomWidget = [];
    let beforeNewsWidget = [];
    let beforeBestSellersWidget = [];
    let beforeProductsWidget = [];
    // for (var i = 0; i < data.length; i++) {
    //   //if (data[i].WidgetZoneName == 'home_page_top') { topWidget.push(data[i]); }
    //   if (data[i].WidgetZoneName == 'home_page_top') {
    //     topWidget.push(data[i]);
    //   }
    //   if (data[i].WidgetZoneName == 'home_page_before_news') {
    //     beforeNewsWidget.push(data[i]);
    //   }
    //   if (data[i].WidgetZoneName == 'home_page_before_best_sellers') {
    //     beforeBestSellersWidget.push(data[i]);
    //   }
    //   if (data[i].Section == 'home_page_before_products') {
    //     beforeProductsWidget.push(data[i]);
    //   }
    //   if (data[i].WidgetZoneName == 'home_page_bottom') {
    //     bottomWidget.push(data[i]);
    //   }
    // }
    await this.setState({
      loading: false,
      productData: model,
      // topWidget: topWidget,
      // bottomWidget: bottomWidget,
      // beforeNewsWidget: beforeNewsWidget,
      // beforeBestSellersWidget: beforeBestSellersWidget,
      // beforeProductsWidget: beforeProductsWidget,
    });
  };

  onFailureAPI = (data) => {
    console.log('error called.................', data);
    if (data.errorlist) {
      // Alert.alert('MsaMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  onPromiseFailure = (data) => {
    console.log('on promise failure --', data);
    if (data.errorlist) {
      // Alert.alert('MsaMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  onOffline = (data) => {
    this.setState({ loading: false });
    console.log('on offline data -- ', data);
    if (data.errorlist) {
      // Alert.alert('MsaMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };
  onSuccessAnywhere = async (data) => {
    console.log("anywhwewevhd/*/**/*/*//**//*/*/*/*/*/", data);
    var beforeProductsWidget = [];
    var topWidget = [];
    data.model.sections.map((item, i) => {
      if (item.SectionName == 'home_page_before_products') {
        beforeProductsWidget.push(item.anyWhereWidgets);
      }
      if (item.SectionName == 'home_page_after_products') {
        topWidget.push(item.anyWhereWidgets);
      }
    })
    this.setState({
      beforeProductsWidget: data.model.sections,
      topWidget: topWidget
    })
  }
  fetchAnywhere = async () => {
    let Service = {
      apiUrl: Api.AnyWhere + '?pageName=Home',
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessAnywhere,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline
    }
    const serviceResponse = await ServiceCall(Service);
  }
  fetchHomeData = async () => {
    let DeviceType = 1;
    let DeviceId = DeviceInfo.getUniqueId();
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (Platform.OS === 'ios') {
      DeviceType = 2;
    }
    let Service = {
      apiUrl: Api.Home,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        categoryIncludeInTopMenu: 'true',
        showOnHomePage: true,
        parentSliderWidget: 'home',
        PushNotificationLogModel: {
          Token: fcmToken,
          DeviceId: DeviceId,
          DeviceType: DeviceType,
        },
      }),
      onSuccessCall: this.onSuccessCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  fetchWidgitData = async () => {
    let Service = {
      apiUrl: Api.Widgets,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({ widget: 'home' }),
      onSuccessCall: this.onSuccessWidgetCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  UpdateWishlistData = async (data) => {
    console.log("testdtdtdtdftdftdftdfdtfdtftjhududubyhb-----==-=--");

    // if(this.state.apiCallInProgress == false){
    await this.setState({ apiCallInProgress: true });
    this.UpdateWishlistandAddToCartData();


    this.setState({ ShoppingCartType: 'Wishlist' });

    await this.fetchWidgitData();
    await this.getCartCountData();
    this.props.updateCartCount();
    await this.setState({ ShoppingCartType: '', apiCallInProgress: false });
    // }
  };

  updateAddToCartListData = async (data) => {
    this.setState({ ShoppingCartType: 'ShoppingCart' });
    await this.UpdateWishlistandAddToCartData(data);
    this.setState({ ShoppingCartType: '' });
  };

  UpdateWishlistandAddToCartData = async (data) => {
    let jdata = {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
    console.log('wishlistItem........................', data);
    let Service = {
      apiUrl: Api.AddToCart + '?productId=' + data.Id + '&shoppingCartTypeId=2',
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
  onSuccessWishlistCall = (datas) => {
    if (datas.errorlist.length > 0) {
      var messeageString = '';
      for (let i = 0; datas.errorlist.length > i; i++) {
        messeageString = datas.errorlist[i] + ' ';
      }
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
    } else {
      if (datas.message != null && datas.message.length > 0) {
        Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
      }
    }
    var data = datas.model;
    console.log('onsuccess.......onSuccessWishlistCall........', datas);
    this.getCartCountData()
    this.props.updateCartCount();
  };

  getCartCountData = async () => {

    let authToken = await AsyncStorage.getItem('custToken');
    if (global.splashToShow != true) {
      if (authToken != null) {

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
    }
  };
  onSuccessGetCountCall = async (data) => {
    console.log('onSuccessGetCountCall..........', data);
    await this.setState({
      CartCount: data.model.Items.length,
      //wishListCount: data.model.Items.length,
    });

    await this.props.addCountToCart({
      cartCount: data.model.Items.length,
      //wishListCount: data.model.Items.length,
    });
    if ((await AsyncStorage.getItem('loginStatus')) == 'false') {
      await AsyncStorage.setItem('custToken', '');
    }

  };

  OnBanerclick = async (item) => {
    let URL = item.Link;
    var matchProtocolDomainHost = /^.*\/\/[^\/]+:?[0-9]?\//i;
    var myNewUrl = URL.replace(matchProtocolDomainHost, '');

    this.props.navigation.push('SearchFilterProductList', {
      passData: {
        pageName: 'Home',
        data: { slugUrl: myNewUrl, SearchName: ' ' },
      },
    });
  }

  OnViewAllPress = async (item) => {
    console.log('OnViewAllPress...', item);

    // console.log("////////////////////////////",myNewUrl);
    if (item.CustomProperties) {
      var navigationData = item.CustomProperties.UrlRecord;
      if (navigationData) {
        if (navigationData.EntityName == 'Vendor') {

          let vendorParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Vendor',
          };
          await analytics().logEvent('banner_click', vendorParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, vendorParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, vendorParams);
          this.props.navigation.push('VendorFilterProductList', {
            passData: { pageName: 'Home', data: { Id: navigationData.EntityId } },
          });

        }
        if (navigationData.EntityName == 'Category') {

          let categoryParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Category',
          };
          await analytics().logEvent('banner_click', categoryParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, categoryParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, categoryParams);
          this.props.navigation.push('FilterProductList', {
            passData: { pageName: 'Home', data: { Id: navigationData.EntityId } },
          });

        }
        if (navigationData.EntityName == 'Manufacturer') {

          let manufacturerParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Manufacturer',
          };

          await analytics().logEvent('banner_click', manufacturerParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, manufacturerParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, manufacturerParams);
          this.props.navigation.push('ManufacturerFilterProductList', {
            passData: { pageName: 'Home', data: { Id: navigationData.EntityId } },
          });

        }
        if (navigationData.EntityName == 'ExternalSearch') {

          let externalSearchParams = {
            item_id: navigationData.EntityId,
            slug_url: navigationData.Slug,
            entity_name: 'ExternalSearch',
          };

          await analytics().logEvent('banner_click', externalSearchParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, externalSearchParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, externalSearchParams);
          this.props.navigation.push('SearchFilterProductList', {
            passData: {
              pageName: 'Home',
              data: { slugUrl: navigationData.Slug, SearchName: ' ' },
            },
          });

        }
        if (navigationData.EntityName == 'Register') {

          let registerParams = {
            item_id: navigationData.EntityId,
            slug_url: ' ',
            entity_name: 'Register',
          };

          await analytics().logEvent('banner_click', registerParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, registerParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, registerParams);

          this.props.navigation.push('Register');
        }
        if (navigationData.EntityName == 'Mailto') {

          let mailtoParams = {
            item_id: navigationData.EntityId,
            slug_url: navigationData.Slug,
            entity_name: 'Mailto',
          };

          await analytics().logEvent('banner_click', mailtoParams);
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, mailtoParams);
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, mailtoParams);

          Linking.openURL(
            'mailto:support@example.com?subject=SendMail&body=Description',
          );
        }
      } else {
        console.log(
          'OnViewAllPress UrlRecord not found',
          item.CustomProperties,
        );
      }
    }
  };

  handleBackButton = () => {
    if (!this.props.navigation.canGoBack()) {
      Alert.alert(
        'Exit App',
        'Are You sure want to exit MsaMart App?',
        [
          {
            text: 'No',
            onPress: () => console.log('Back button pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  getTopMenu = async () => {
    let Service = {
      apiUrl: Api.Categories + "?customerSiteId=0",
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessTopMenuCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }

  onSuccessTopMenuCall = async (data) => {
    if (this.props.MenuData.length == 0) {
      this.props.addCategoryMenu({ MenuData: data.model.Categories });
    }
  }

  render() {
    // console.log("mapStateToProps:.................. ", this.props.loginStatus)
    return (
      <>
        {
          <>
            <AnimatedLoader
              visible={this.state.loading}
              overlayColor="rgba(255,255,255,0.8)"
              source={Loaders.rings}
              animationStyle={styles.lottie}
              speed={1}
            />

            <StatusBar
              backgroundColor={Colors.PRIMARY}
              barStyle="light-content"
            />
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />

            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
              {/* {!this.state.splashLoading ?
              <> */}
              <Header
                testId_Logo={"headerLogoImg"}
                burgerMenuClick={(data) => {
                  this.props.navigation.toggleDrawer();
                  this.props.navigation.navigate('Drawer')

                }}
                countryModel={this.state.currentCountryModel}
                shipToEnabled={this.state.shipToEnabled}
                shipToButtonClick={this.handleShipToButtonClick}
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
                    onTextChange={(data) =>
                      console.log('serch bar data --- ', data)
                    }
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
                //flagShipTo
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
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {this.state.imgSliderData &&
                  this.state.imgSliderData.sliderImages &&
                  this.state.imgSliderData.sliderImages.length > 0 && (
                    <ImageSlider
                      data={this.state.imgSliderData.sliderImages}
                      slideInterval={
                        this.state.imgSliderData.NivoSettings
                          ? this.state.imgSliderData.NivoSettings
                            .AutoSlideInterval
                          : 100000
                      }
                      onSlideClick={(data) =>

                        // this.props.navigation.push('FilterProductList', { passData: { pageName: 'Home', data: data }, })
                        this.OnBanerclick(data)
                      }
                    />

                  )}

                {this.state.topBanner && this.state.topBanner.length > 0 ? (
                  <>
                    {this.state.topBanner.map((item, i) => (
                      <View style={{ paddingTop: 10, }}>
                        <DiscountBanner data={[item]} />
                      </View>
                    ))}
                    {/* <>
                      <DiscountBanner
                        data={this.state.topBanner}
                      />
                    </> */}
                  </>
                ) : (
                  <></>
                )}

                {/* Top Widget */}
                <>
                  <Text style={styles.CTitles}>{tittle1}</Text>

                  <ProductCategory
                    //showAllButton={false}
                    //ViewAllClick={() => this.OnViewAllPress(this.state.productData)}
                    listViewContainerStyle={{
                      borderTopWidth: 0,
                      marginTop: 0,
                    }}
                    ListTitleTextStyle={{}}
                    imgTopRtIcon={Icons.heartClear}
                    isBottomRightIcon={false}
                    listData={this.state.CatagoryData}
                    bottomRightIcon={Icons.cartBtn}
                    oncatClick={(data) =>
                      this.props.navigation.push('SearchFilterProductList', {
                        passData: { pageName: 'Home', data: { slugUrl: data.Name } },
                      })
                    }
                    oncatImageClick={(data) =>
                      this.props.navigation.push('SearchFilterProductList', {
                        passData: { pageName: 'Home', data: { slugUrl: data.Name } },
                      })
                    }
                  />
                </>


                {this.state.productData.length > 0 && (
                  <>
                    <Text style={styles.PTitle}>{tittle2}</Text>
                    <ProductGridListView
                      //key={i}
                      showAllButton={true}
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
                        this.props.navigation.navigate(
                          'ProductDetails',
                          { passData: data },
                        )
                      }
                      onImageClick={(data) =>
                        this.props.navigation.navigate(
                          'ProductDetails',
                          { passData: data },
                        )
                      }
                      onTitleClick={(data) =>
                        this.props.navigation.navigate(
                          'ProductDetails',
                          { passData: data },
                        )
                      }
                      onImgTopRtIcon={(data) =>
                        this.props.navigation.navigate(
                          'ProductDetails',
                          { passData: data },
                        )
                      }
                      onCartClick={(data) =>
                        this.props.navigation.navigate(
                          'ProductDetails',
                          { passData: data },
                        )
                      }
                      OnWishlistClick={(data) =>
                        this.UpdateWishlistData(data)

                      }
                    />

                  </>
                )}



               


                {this.state.bottomBanner &&
                  this.state.bottomBanner.length > 0 ? (
                  <>
                    {this.state.bottomBanner.map((item, i) => (
                      <>
                        <DiscountBanner data={[item]} />
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                {this.state.shipToEnabled && this.state.discountInformationText != null &&
                  <Text style={styles.discountInformation}>
                    {this.state.discountInformationText}
                  </Text>}
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
              {/* </>
              :
              <>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                  <Image style={[styles.dragonIcon, this.props.logoStyles]} source={Icons.logo} />
                </View>
              </>
            } */}
            </SafeAreaView>
          </>
        }
      </>
    );
  }
}

const getCurrentDateStamp = (string) => {
  var gmtString = new Date().toTimeString().split(" ")[1].replace("GMT", "");
  return string + gmtString.slice(0, gmtString.length - 2) + ":" + gmtString.slice(-2);
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCountToCart: (newCount) =>
      dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount }),
    addCategoryMenu: (newCount) =>
      dispatch({ type: 'ADD_CATEGORY_DATA', paylod: newCount }),
    UpdateAuthStatus: (status) =>
      dispatch({ type: 'AUTH_STATUS', paylod: status }),

    updateWishlist: () => dispatch({ type: 'WISHLIST_CALL' }),
    updateCartCount: () => dispatch({ type: 'COUNT_CALL' }),
  };
};

const mapStateToProps = (state) => {
  console.log('Totol Home data:.................', state);
  let Store_data = state.Count;
  let Menu_data = state.Menu_Data;
  let LoginStatus = state.Login_Status;
  let Home_Data = state.Home_Data;
  let Widget_Data = state.Widget_Data;

  return {
    CarCount: Store_data.shoppingCartCount,
    loginStatus: LoginStatus.loginStatus,
    MenuData: Menu_data.MenuData,
    HomeData: Home_Data,
    WidgetData: Widget_Data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
