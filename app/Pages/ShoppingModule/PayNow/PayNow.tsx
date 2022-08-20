import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {
  OfflineNotice,
} from '@components';
import AnimatedLoader from "react-native-animated-loader";
import { CommonActions } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { WebView } from 'react-native-webview';
import styles from './PayNowStyles';
import { Constants } from '@config';
import { Images, Loaders, Icons } from '@assets';
import { Colors } from '@theme';
import AsyncStorage from '@react-native-community/async-storage';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { connect } from 'react-redux'
var PushNotificationLogModels = {};
export default class PayNow extends Component {
  static defaultProps = {
    onBackBtnClick: () => { },
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      loaderVisible: true,
      newurl: Constants.HOSTs_URL + 'onepagecheckout',
      session: false,
    }
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.fetchSession = this.fetchSession.bind(this);
    this.onSuccessfetchSession = this.onSuccessfetchSession.bind(this);
    this.getParameterByName = this.getParameterByName.bind(this);
    this.fetchOrderCompleteDetails =this.fetchOrderCompleteDetails.bind(this);
    this.onSuccessfetchOrderDetails =this.onSuccessfetchOrderDetails.bind(this);
    this.getCartCountData = this.getCartCountData.bind(this);
    this.onSuccessGetCountCall = this.onSuccessGetCountCall.bind(this);

  }
  async componentWillUnmount() {
    //token = await AsyncStorage.getItem('custGuid')
    //console.log(token);
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  onFailureAPI(data) {
    this.setState({ loading: false });
    console.log(data);
  }
  onPromiseFailure(data) {
    this.setState({ loading: false });
    console.log(data);
  }
  onOffline(data) {
    this.setState({ loading: false });
    console.log(data);
  }
  fetchSession = async () => {
    //let token = (this.props.route.params).passData
    let token = await AsyncStorage.getItem('custGuid')
    let Service = {
      apiUrl: Api.getSession,
      methodType: 'POST',
      //bodyData: JSON.stringify({ "identity": token }),
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchSession,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  async onSuccessfetchSession(data) {
    this.setState({ loading: false });
    //Alert.alert('session regenerated')
    this.setState({ session: true,token:data.customer_guid })
  }
  fetchOrderCompleteDetails = async (orderId) => {
    let Service = {
      apiUrl: Api.orderCompleted + '?orderId=' + orderId,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchOrderDetails,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessfetchOrderDetails = async (data) => {
    let payment_data = data.model
    this.getCartCountData();
     this.props.navigation.navigate('PurchaseDetails', { passData: { data: { Id: data.model.OrderId} } })
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
    });
    this.props.addCountToCart({
      cartCount: data.model.Items.length,
    });
  };
  handleBackButtonClick = () => {
    //this.props.navigation.goBack(null);
    return true;
    //Alert.alert("alert", "alert")
    //this.props.navigation.navigate('ShoppingCart')
    //return true;
  };
  getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    console.log(decodeURIComponent(results[2].replace(/\+/g, ' ')));
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  async componentDidMount() {
    let DeviceType = 1;
    let DeviceId = DeviceInfo.getUniqueId();
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (Platform.OS === 'ios') { DeviceType = 2 }

    PushNotificationLogModels = {
      "Token": fcmToken,
      "DeviceId": DeviceId,
      "DeviceType": DeviceType,
    }
    PushNotificationLogModels = JSON.stringify(PushNotificationLogModels)

    this.setState({ loading: true });
    this.fetchSession()
    this.setState({ loading: false });
    //console.log((this.props.route.params).passData);
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  renderHeader = () => {
    return (
      <View style={[styles.headerContainer]}>
        <TouchableOpacity
          style={{ padding: 10, marginRight: -10, marginLeft: -10 }}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.backAvatar}
            source={Icons.arrowBack}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginHeaderTextContainer]}
          testID={"goBackBtn"}
          accessibilityLabel={"goBackBtn"}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.headerText}>{'Checkout'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  render() {
   //const js='var a=JSON.stringify({ele1:document.getElementsByTagName("img")[3].attributes.id.textContent,ele2:document.getElementsByClassName("productimages")[0].attributes.href.textContent}); window.ReactNativeWebView.postMessage(a);$(document).ready(function(){var a ="#"+document.getElementsByClassName("productimages")[0].attributes.href.textContent; document.getElementsByClassName("productimages")[0].attributes.href.textContent=a})'
   const js ='var da=[];var arr= document.getElementsByClassName("productimages");for(var i=0;i<arr.length;i++){var hl= arr[i].getAttribute("href");if(!arr[i].getAttribute("href").includes("#")){arr[i].setAttribute("href","#"+hl);$(document.getElementsByClassName("product-name")[i]).attr("href","#"+hl);da.push({"key":$(document.getElementsByClassName("product-name")[i]).attr("href") ,"value":arr[i].children[0].getAttribute("id")})}else{da.push({"id":$(document.getElementsByClassName("product-name")[i]).attr("href") ,"value":arr[i].children[0].getAttribute("id")})}}window.ReactNativeWebView.postMessage(JSON.stringify(da))';
    var eventdta ;
    var Id = '';
    var urlid='';
    
    return (
      <>
        <AnimatedLoader
          visible={this.state.loaderVisible}
          overlayColor="rgba(255,255,255,0.8)"
          source={Loaders.rings}
          animationStyle={styles.lottie}
          speed={1}
        />
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <View style={styles.pageContainer}>
            {this.renderHeader()}
            <OfflineNotice
              noInternetText={'No internet!'}
              offlineText={'You are offline!'}
              offlineStyle={{}}
              noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
              offlineTextStyle={{}}
              noInternetTextStyle={{}}
            />

            {this.state.session && <WebView
             ref={(ref) => (this.webview = ref)}
              javaScriptEnabled={true}
              injectedJavaScript={js}
             source={{
              uri: this.state.newurl,
              headers: {
                'Content-Type': 'application/json',
                'Authorization':this.state.token,  //(this.props.route.params).passData,
                //'DeviceInfo': PushNotificationLogModels,
              },
            }}
           
            onMessage={(event) => {
              eventdta = JSON.parse(event.nativeEvent.data);
            }}
              originWhitelist={['*']}
              androidHardwareAccelerationDisabled={true}
              onLoadStart={() => this.setState({ loaderVisible: false })}
              onNavigationStateChange={(webViewState) => {
                console.log("pay now -- ", webViewState)
                console.log("pay now url-- ", webViewState.url)//https://dmtest.dpworld.com/checkout/RosoomResponse
               
                if (((webViewState.url).split('?')[0]).includes(Constants.HOSTs_URL + 'checkout/RosoomResponse')) {
                  console.log('into rosoom response')
                  let urlstatus = this.getParameterByName('status', webViewState.url)
                  console.log(urlstatus)
                  if (urlstatus == 0 || urlstatus == '0') {
                    Alert.alert('Payment was unsuccessfull');
                    this.props.navigation.navigate('ShoppingCart');
                  }
                }
                let lastItem = webViewState.url.substring(webViewState.url.lastIndexOf('/') + 1)

                if (webViewState.url.includes(Constants.HOSTs_URL + 'checkout/completed/')) {
                  webViewState.loading = false;
                  this.fetchOrderCompleteDetails(lastItem);
                }
               if(eventdta != undefined)
               for(var i=0; i<eventdta.length;i++){
                var url = eventdta[i].key;
                var pid = eventdta[i].value;

                if (webViewState.url == Constants.HOSTs_URL+"onepagecheckout"+url){
                  if(pid != '')
                  this.props.navigation.navigate('ProductDetails', { passData: { Id: pid } });
                  this.webview.reload();
                }
               }

                
                if (webViewState.url == Constants.HOSTs_URL) {
                  this.props.navigation.navigate('Home');
                }
              }
              }
              style={styles.WebContainer}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.log(nativeEvent);
              }}

              javaScriptEnabled={true}
              domStorageEnabled={true}
              sharedCookiesEnabled={true}
              renderError={(errorName) => console.log(errorName)}
            />}
          </View>
        </SafeAreaView>
      </>

    );
  }
  
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCountToCart: (newCount) => dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount })
  }
}
const mapStateToProps = (state) => {
  let Store_data = state.Count
  return {
    CarCount: Store_data.shoppingCartCount,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayNow)