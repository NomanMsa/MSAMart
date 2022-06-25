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
    KeyboardAvoidingView, TouchableOpacity, TextInput,
    TextInputFocusEventData,
    NativeSyntheticEvent

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
    FormTextInput, Button
} from '@components';

LogBox.ignoreAllLogs();
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-community/async-storage';
import { ServiceCall } from '@utils';
import { Api, EventTags, EmarsysEvents, Constants, Strings } from '@config';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import styles from './GuestUserStyles';
import { Colors } from '@theme';
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');
import { DeepLinkUrlOpn } from '@nav';
import DeviceInfo from 'react-native-device-info';
import { RemotePushController } from '@utils';
// import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import perf from '@react-native-firebase/perf';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";

import CategoryMenuData from '../../../ReduxActions/Reducers/CategoryMenuData/CategoryMenuData';
const Drawer = createDrawerNavigator();
interface State {
    email: string;
    emailTouched: boolean;
    emailFormat: boolean;
    loaderVisible: boolean;
}
class GuestUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isMatchOrder: '',
            orderNumber: 0,
            isFocused: false,
            loading: true,
            showSplash: global.splashToShow,
            scrollMenuData: [],
            imgSliderData: [],
            imgCardsData: [],
            topWidget: [],
            bottomWidget: [],
            beforeNewsWidget: [],
            beforeBestSellersWidget: [],
            beforeProductsWidget: [],
            topBanner: [],
            bottomBanner: [],
            ShoppingCartType: '',
            CartCount: 0,
            wishListCount: 0,
            splashLoading: true,
            isVisible: true,
            discountInformationText: '',
            shipToEnabled: false,
            currentCountryModel: null,
            apiCallInProgress: false,
        };
        this.onSuccessCall = this.onSuccessCall.bind(this);
        this.onSuccessWidgetCall = this.onSuccessWidgetCall.bind(this);
        this.fetchWidgitData = this.fetchWidgitData.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.getCartCountData = this.getCartCountData.bind(this);
        this.onReceiveURL = this.onReceiveURL.bind(this);
        this.getDiscountTextByCountry = this.getDiscountTextByCountry.bind(this);
        this.renderError = this.renderError.bind(this);
    }


    onSuccessActivation = async (data) => {

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
            let emailString = urlObjects.query['email'];
            if (token != undefined && emailString != undefined) {
                const getUrl =
                    Api.UserActivation + 'token=' + token + '&email=' + emailString + '';
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
        const authStatus = await messaging().requestPermission();
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
                    const homeTrace =await perf().startTrace('custom_trace_home_screen');
                    await this.fetchHomeData();
                    await this.fetchWidgitData();
                    homeTrace.putAttribute('occurrence', 'firstVisit');
                    await homeTrace.stop();
                }
            } else {
                const homeTrace = await perf().startTrace('custom_trace_home_screen');
                await this.fetchHomeData();
                await this.fetchWidgitData();
                homeTrace.putAttribute('occurrence', 'firstVisit');
                await homeTrace.stop();
                global.splashToShow = false;
                await this.setState({ showSplash: false });
            }
        } else {
            global.splashToShow = false;
            await this.setState({ showSplash: false });
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
                const homeTrace =await perf().startTrace('custom_trace_home_screen');
                await this.fetchHomeData();
                await this.fetchWidgitData();
                 await this.fetchDiscountBanner();
                homeTrace.putAttribute('occurrence', 'firstVisit');
                await homeTrace.stop();
            }
        }
        this.getDiscountTextByCountry();
        this.focusListener = await this.props.navigation.addListener(
            'focus',
            async () => {
                const homeTrace = await perf().startTrace('custom_trace_home_screen');
                await this.fetchHomeData();
                await this.fetchWidgitData();
                await this.getDiscountTextByCountry();
                homeTrace.putAttribute('occurrence', 'reVisit');
                await homeTrace.stop();
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
            }
        }
    };

    onSuccessCall = async (data) => {
        if (data.errorlist) {
        } else {
            let imgSliderData = {};
            let imgCardsData = {};
            for (var i = 0; i < data.home_slider_images.length; i++) {
                if (data.home_slider_images[i].WidgetZone == 'home_page_main_slider') {
                    imgSliderData = data.home_slider_images[i];
                }
                if (
                    data.home_slider_images[i].WidgetZone ==
                    'home_page_before_best_sellers'
                ) {
                    imgCardsData = data.home_slider_images[i];
                }
            }
            await this.setState({
                loading: false,
                scrollMenuData: data.flat_menu,
                imgSliderData: imgSliderData,
                imgCardsData: imgCardsData,
                isShipToEnable: data.CommonShipToModel.IsShipToEnable,
            });
            await AsyncStorage.setItem('IsShipToEnable', JSON.stringify(data.CommonShipToModel.IsShipToEnable));
            // await this.props.addCategoryMenu({ MenuData: data.drawer_menu })
            if (this.props.MenuData.length == 0) {
                this.props.addCategoryMenu({ MenuData: data.drawer_menu });
            }

            console.log('addCategoryMenu...........', this.props.MenuData);
            if (
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
            }
        }
    };
    onSuccessWidgetCall = async (data) => {
        if (data.errorlist) {
        }
        let topWidget = [];
        let bottomWidget = [];
        let beforeNewsWidget = [];
        let beforeBestSellersWidget = [];
        let beforeProductsWidget = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].WidgetZoneName == 'home_page_top') {
                topWidget.push(data[i]);
            }
            if (data[i].WidgetZoneName == 'home_page_before_news') {
                beforeNewsWidget.push(data[i]);
            }
            if (data[i].WidgetZoneName == 'home_page_before_best_sellers') {
                beforeBestSellersWidget.push(data[i]);
            }
            if (data[i].WidgetZoneName == 'home_page_before_products') {
                beforeProductsWidget.push(data[i]);
            }
            if (data[i].WidgetZoneName == 'home_page_bottom') {
                bottomWidget.push(data[i]);
            }
        }
        await this.setState({
            loading: false,
            topWidget: topWidget,
            bottomWidget: bottomWidget,
            beforeNewsWidget: beforeNewsWidget,
            beforeBestSellersWidget: beforeBestSellersWidget,
            beforeProductsWidget: beforeProductsWidget,
        });
    };

    onFailureAPI = (data) => {
        console.log('error called.................', data);
        if (data.errorlist) {
        } else {
            if (data.message != null && data.message.length > 0) {
                Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
            }
        }
    };

    onPromiseFailure = (data) => {
        if (data.errorlist) {
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
        } else {
            if (data.message != null && data.message.length > 0) {
                Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
            }
        }
    };

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
            apiUrl: Api.Widget,
            methodType: 'POST',
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
        if (this.state.apiCallInProgress === false) {
            await this.setState({ apiCallInProgress: true });
            this.props.updateWishlist();

            this.setState({ ShoppingCartType: 'Wishlist' });

            await this.fetchWidgitData();
            this.props.updateCartCount();
            await this.setState({ ShoppingCartType: '', apiCallInProgress: false });
        }
    };

    updateAddToCartListData = async (data) => {
        this.setState({ ShoppingCartType: 'ShoppingCart' });
        await this.UpdateWishlistandAddToCartData(data);
        this.setState({ ShoppingCartType: '' });
    };

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
        this.props.updateCartCount();
    };

    getCartCountData = async () => {
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
    };
    onSuccessGetCountCall = async (data) => {
        await this.setState({
            CartCount: data.model.Items.length,
            wishListCount: data.model.Items.lengtht,
        });

        await this.props.addCountToCart({
            cartCount: data.model.Items.length,
            wishListCount: data.model.Items.length,
        });
    };

    OnViewAllPress = async (item) => {
        console.log('OnViewAllPress...', item);

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

    handleEmailBlur = () => {
        this.setState({ emailTouched: true });
    }
    onLookUpOrderPlace = async () => {
        console.log("Order Placed")
        const { isMatchOrder } = this.state;


        if (!this.state.email || !this.state.orderNumber) {
            Alert.alert('MsaMart', 'Please fill all mandatory fields');
        }

        else if (isMatchOrder == null) {
            Alert.alert('MsaMart', 'Please Enter valid order number.');
        }
        else if (this.props.loginStatus == 'true') {
            setTimeout(() => {
                Alert.alert('MsaMart', 'You are logged in as another user please log out that user for further step.');
            }, 500);
        }
        else {

            let Service = {
                apiUrl: Api.GuestUser,
                methodType: 'POST',
                headerData: { 'Content-Type': 'application/json' },
                bodyData: JSON.stringify({

                    email: this.state.email,
                    orderId: this.state.orderNumber,
                }),
                onSuccessCall: this.onSuccessLookUpOder,
                onFailureAPI: this.onFailureAPI,
                onPromiseFailure: this.onPromiseFailure,
                onOffline: this.onOffline,
            };
            this.setState({ loaderVisible: true });
            const serviceResponse = await ServiceCall(Service);
            this.setState({ loaderVisible: false });
        }
    }



    onSuccessLookUpOder = async (data) => {

        var d1 = data.model;

        if (data.status) {

            this.props.navigation.navigate('PurchaseDetails', { passData: { data: d1 }, 'guestFlow': true })
        }
        else {
            if (data.errorlist && data.errorlist.length > 0) {
                setTimeout(() => {
                    Alert.alert('MsaMart', data.errorlist[0]);
                }, 500);
            }

        }

    }




    handleEmailChange = (email: string) => {
        this.setState({ email: email });
        let reg = Constants.IS_VALID_EMAIL_REGEX; //^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if (reg.test(email) === false) {
            console.log('Email is Not Correct');
            this.setState({ emailFormat: false });
            return false;
        } else {
            this.setState({ emailFormat: true });
        }
    };
    handleEmailSubmitPress = () => {
        // if (this.passwordInputRef.current) {
        //     this.passwordInputRef.current.focus();
        // }
    };
    handleSignInBtn = () => {
        this.props.navigation.navigate('SignIn')
    }

    handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    };
    handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        this.setState({ isFocused: true });
    };
    formatOrderNumber = (text) => {
        var cleaned = ("" + text).replace(/[^0-9]/g, "");
        var match = cleaned.match(/^(1|)?(\d{2})(\d{5})$/);
        console.log("Match", match)
        this.setState({ isMatchOrder: match })
        if (match == null) {
            this.handleRenderError()
        }
        else if (match) {

            var intlCode = match[1] ? "+1 " : "",

                number = [match[2], "-", match[3]].join(
                    ""
                );
            return number;
        }
        return text;

    }
    onChangeOrderNumber = (text) => {
        let formatedNo = this.formatOrderNumber(text);

        this.setState({ orderNumber: formatedNo });

    }
    renderError = () => {
        var error = 'You are already logged in as another user. Please log out from your current account to prceed further.';
        return (
            <View style={[styles.MainTitleContainer, { marginRight: 15, marginLeft: 20, marginTop: 15, color: 'red' }]}>
                {error && <Text style={[styles.titleStyle, {
                    color: Colors.PRIMARY,
                }]}

                >{error}</Text>}
            </View>
        );

    }
    handleRenderError = () => {
        var error1 = "Please match the requested format";
        return (
            <>
                {error1 && <Text style={[styles.title, styles.inputTitleStyle, { color: Colors.PRIMARY }]}

                >{error1}</Text>}
            </>
        );

    }

    handleLogInUser = () => {
        this.props.navigation.navigate('Purchases')
    }


    render() {
        const {
            email,
            emailTouched,
            emailFormat,
        } = this.state;
        var registerTitle = 'to view your complete purchase history and information';
        var logInTitle = 'You have already logged in , If you want to manage the orders for this users click ';
        var guestTitle = 'Track and Manage your orders by entering the below details ';
        var emailError = undefined;
        if (!email && emailTouched) {
            emailError = Strings.EMAIL_REQUIRED;
        } else if (emailTouched && !emailFormat) {
            emailError = Strings.EMAIL_WRONG_FORMAT;
        } else {
            emailError = undefined;
        }

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


                                <View style={{ marginRight: 15, marginLeft: 20, marginTop: 15 }}>
                                    <Text style={{
                                        fontSize: 18,
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
                                    }}>Registered User ?</Text>
                                    {this.props.loginStatus == 'true' ?


                                        <View style={styles.MainTitleContainer}>

                                            <Text>
                                                <Text style={[styles.titleStyle]}>{logInTitle}</Text>
                                                <Text style={[styles.titleStyle, { color: 'blue' }]} onPress={this.handleLogInUser} >
                                                    here
                                                </Text>
                                            </Text>
                                        </View>
                                        :

                                        <View style={styles.MainTitleContainer}>
                                            <Text >
                                                <Text style={[styles.titleStyle, { textDecorationLine: 'underline' }]} onPress={this.handleSignInBtn}>Sign In </Text>

                                                <Text style={[styles.titleStyle]}>{registerTitle}</Text>

                                            </Text>

                                        </View>


                                    }

                                </View>
                                <View style={{ marginRight: 15, marginLeft: 20, marginTop: 15 }}>
                                    <Text style={{
                                        fontSize: 18,
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
                                    }}>Guest User ?</Text>
                                    <View style={styles.MainTitleContainer}>
                                        <Text style={[styles.titleStyle]}>{guestTitle}</Text>

                                    </View>
                                </View>
                                {(this.props.loginStatus === 'true') ? this.renderError() : <></>}
                                <View>
                                    <Text style={[styles.title, styles.inputTitleStyle]}>
                                        Order Number
                                    </Text>
                                    {(this.state.isMatchOrder == null) ? this.handleRenderError() : <></>}
                                    <View style={[styles.inputContainer, styles.withBorderCont, styles.guest_user_container]}>

                                        <TextInput
                                            selectionColor={Colors.LIGHT_GRAY_TEXT}

                                            style={[styles.textInput, styles.inputStyle]}

                                            onChangeText={this.onChangeOrderNumber}
                                            value={this.state.orderNumber}
                                            placeholder="8 digits -Example 21-12121"
                                            keyboardType="numeric"
                                            returnKeyType="next"
                                            maxLength={8}
                                            onSubmitEditing={this.handleEmailSubmitPress}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}

                                        />
                                    </View>
                                </View>

                                <KeyboardAvoidingView
                                    style={styles.guest_user_container}
                                    behavior="padding">
                                    <FormTextInput
                                        accessible={false}
                                        inputStyle={styles.inputStyle}
                                        value={this.state.email}
                                        onChangeText={this.handleEmailChange}
                                        onSubmitEditing={this.handleEmailSubmitPress}
                                        placeholder={'The email used when placing an order'}
                                        placeholderTextColor={Colors.GRAY_TEXT}
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        title={'E-mail'}
                                        mandatory={false}
                                        leftIcon={false}
                                        withBorder={true}
                                        onBlur={this.handleEmailBlur}
                                        error={emailError}
                                        blurOnSubmit={Constants.IS_IOS}
                                    />


                                </KeyboardAvoidingView>

                                <Button
                                    accessible={false}

                                    title={'Look Up Order'}
                                    disabled={false} //!email || !emailFormat || !password
                                    btnStyle={{ borderWidth: 0, width: width - 60 }}
                                    titleStyle={{
                                        color: Colors.WHITE,
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
                                    }}
                                    OnClick={(data) => this.onLookUpOrderPlace()}
                                />
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
                        </SafeAreaView>
                    </>
                }
            </>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(GuestUser);
