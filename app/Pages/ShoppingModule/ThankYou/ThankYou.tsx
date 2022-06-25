import React, { Component, useEffect } from 'react';
import { SafeAreaView, BackHandler, Dimensions, ScrollView, View, Text, StatusBar, Image, TouchableOpacity, LogBox, Platform, } from 'react-native';
LogBox.ignoreAllLogs();
const { width, height } = Dimensions.get('window')
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Footer, SearchBar, OfflineNotice, Button, OrderItemList } from '@components';
import { ServiceCall } from '@utils';
import { Api, EventTags } from '@config';
import { Colors } from '@theme';
import styles from './ThankYouStyles';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";
// import Emarsys from "react-native-emarsys-wrapper";

class ThankYou extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      showItems: false,
      userEmail: '',
      orderId: '',
      billingAddress: [],
      shippingAddress: [],
      ItemsArray: [],
      OrderTotal: '',
      CartCount: 0,
      wishListCount: 0,
      shipToEnabled: false,
      currentCountryModel: null,
    }
    this.fetchOrderCompleteDetails = this.fetchOrderCompleteDetails.bind(this);
    this.onSuccessfetchOrderDetails = this.onSuccessfetchOrderDetails.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }

  componentWillMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    console.log(this.props.navigation.canGoBack())
    console.log(this.props.route.name);
    //this.props.navigation.goBack(null);
    //return true;

    if (!this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
    else {

    }
    return true;
    // if(this.props.route.name == 'ThankYou'){
    //   this.props.navigation.navigate('ShoppingCart')
    //   return true;
    // }else{
    //   return false;
    // }
    //this.props.navigation.navigate('ShoppingCart')
  };


  async componentDidMount() {
    console.log('Tankyou Page')
    console.log((this.props.route.params).productId);
    this.setState({ loading: true });
    await this.fetchOrderCompleteDetails((this.props.route.params).productId);
    await this.getCartCountData();
    this.setState({ loading: false });


    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    // useEffect(() => {
    //   BackHandler.addEventListener('hardwareBackPress', () => true)
    //   return () =>
    //     BackHandler.removeEventListener('hardwareBackPress', () => true)
    // }, [])
  }

  onSuccessfetchOrderDetails = async (data) => {
    let payment_data = data.model
    let order_details = payment_data.orderDetailsModel
    //  let coupen_data = data.
    await this.setState({
      userEmail: data.model.DPWEmail,
      orderId: data.model.OrderId,
      billingAddress: data.model.orderDetailsModel.BillingAddress,
      shippingAddress: data.model.CustomProperties.ShippingAddress,
      OrderTotal: data.model.orderDetailsModel.OrderTotal,
      ItemsArray: data.model.orderDetailsModel.Items,
    });
    const value = await AsyncStorage.getItem('@currencysymbol')
    console.log("value.......", value)
    if (value !== null) {
      let purchaseEventParams = { 'affiliation': ' ', 'coupon': order_details.GiftCards, 'currency': value, 'items': order_details.Items, 'transaction_id': payment_data.OrderId, 'shipping': order_details.DPWOrderShippingWithoutCurr, 'tax': order_details.DPWTaxWithoutCurr, 'value': order_details.DPWOrderTotalWithoutCurr, 'payment_method': order_details.PaymentMethod };
      let fbEventsParams = { 'currency': value, 'transaction_id': payment_data.OrderId, 'value': order_details.DPWOrderTotalWithoutCurr, 'payment_method': order_details.PaymentMethod ,'tax': order_details.DPWTaxWithoutCurr, 'value': order_details.DPWOrderTotalWithoutCurr};
      AppEventsLogger.logEvent(EventTags.PURCHASE, fbEventsParams);
      analytics().logEvent('purchase', purchaseEventParams);
    } else {
      let purchaseEventParams = { 'affiliation': ' ', 'coupon': order_details.GiftCards, 'currency': ' ', 'items': order_details.Items, 'transaction_id': payment_data.OrderId, 'shipping': order_details.DPWOrderShippingWithoutCurr, 'tax': order_details.DPWTaxWithoutCurr, 'value': order_details.DPWOrderTotalWithoutCurr, 'payment_method': order_details.PaymentMethod };
      let fbEventsParams = { 'transaction_id': payment_data.OrderId, 'value': order_details.DPWOrderTotalWithoutCurr, 'payment_method': order_details.PaymentMethod ,'tax': order_details.DPWTaxWithoutCurr, 'value': order_details.DPWOrderTotalWithoutCurr};
      AppEventsLogger.logEvent(EventTags.PURCHASE, fbEventsParams);
      analytics().logEvent('purchase', purchaseEventParams);

    }
    this.trackPurchase(payment_data.OrderId,order_details);
    if(data.model && data.model.CommonShipToModel){
      await this.setState({
        shipToEnabled: data.model.CommonShipToModel.IsShipToEnable,
        currentCountryModel: data.model.CommonShipToModel.CurrentCountryModel,
      });
    }
    await this.getCartCountData();

  }

  async trackPurchase(orderId,orderDetails) {
    let cartItems = orderDetails.Items.map((item)=>{
      return {
        itemId: item.ProductId.toString(),
        price: item.DPWUnitPriceWithoutCurr,
        quantity: item.Quantity,
      };
    })
  
    try {
      let result = "";/*await Emarsys.predict.trackPurchase(orderId.toString(), cartItems);*/
    } catch (e) {
      console.log(e);
    }
  }
  onFailureAPI(data) {
    console.log(data);
  }
  onPromiseFailure(data) {
    console.log(data);
  }
  onOffline(data) {
    console.log(data);
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

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  getCartCountData = async () => {
    //console.log("wishlistItem........................", data)
    let Service = {
      //apiUrl: "https://dmtest.dpworld.com/api/v1//shoppingcart/getcount",
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

  onSuccessGetCountCall = (data) => {

    console.log("onsuccess.......Count........", data)

    this.setState({
      CartCount: data.model.Items.length,
      wishListCount: data.model.Items.length
    })
    this.props.addCountToCart({ cartCount: data.model.Items.length, wishListCount: data.model.Items.length })
    //this.props.addCountToCart(data) 
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
          <Header
            burgerMenuClick={(data) => {
              this.props.navigation.toggleDrawer();
            }}
            userIcoStyles={{ tintColor: Colors.WHITE }}
            cartIcoStyles={{ tintColor: Colors.WHITE }}
            menuIcoStyles={{ tintColor: Colors.WHITE }}
            countryModel={this.state.currentCountryModel}
            shipToEnabled={this.state.shipToEnabled}
            shipToButtonClick={this.handleShipToButtonClick}
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
            userClick={async (data) => { if (await AsyncStorage.getItem('loginStatus') == 'true') { this.props.navigation.navigate('Account', { passData: data, }) } else { this.props.navigation.navigate('SignIn', { passData: data, }) } }}
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
            <View style={styles.thankyouCard}>
              <View style={styles.thankyouHeader}>
                <Text style={styles.thankyouHeaderText}
                  testID={"Thank you"}
                  accessibilityLabel={"Thank you"}
                >Thank you</Text>
                <Text style={styles.confirmationText}
                  testID={"orderConfirmationMesg"}
                  accessibilityLabel={"orderConfirmationMesg"}
                >Your order has been confirmed. We will be shipping it soon.</Text>
                <Text style={styles.confirmationEmailText}>A confirmation email has been sent to:<Text style={styles.emailText}>{this.state.userEmail}</Text></Text>
                <View style={styles.cardContainer}>
                  <View style={styles.cardBox}>
                    <Text style={styles.headerTxt}
                      testID={"orderId"}
                      accessibilityLabel={"orderId"}
                    >Order No. <Text style={styles.primaryTxt} onPress={() => this.props.navigation.push('PurchaseDetails', { passData: { data: { Id: this.state.orderId } } })}>{this.state.orderId}</Text></Text>
                    {/* <Text style={styles.titleTxt}>Date <Text style={styles.descTxt}>this.state.billingAddress</Text></Text> */}
                    <Text style={styles.titleTxt}>Name <Text style={styles.descTxt}>{this.state.billingAddress.FirstName} {this.state.billingAddress.LastName}</Text></Text>
                    <Text style={styles.titleTxt}>Email <Text style={styles.descTxt}>{this.state.billingAddress.Email}</Text></Text>
                    <Text style={styles.titleTxt}>Phone <Text style={styles.descTxt}>{this.state.billingAddress.PhoneNumber}</Text></Text>
                  </View>

                  <View style={styles.cardBox}>
                    <Text style={styles.headerTxt}
                      testID={"shippingAddress"}
                      accessibilityLabel={"shippingAddress"}
                    >Shipping Address</Text>
                    {this.state.shippingAddress.length > 0 && (
                      <>
                        {this.state.shippingAddress.map((item, i) => (
                          <>
                            <Text key={i} style={styles.descTxt}>{item}</Text>
                          </>
                        )
                        )}
                      </>
                    )}
                  </View>

                  <View style={styles.cardBox}>
                    <Text style={styles.headerTxt}>Order Amount</Text>
                    <View style={styles.amountRow}><Text style={styles.titleTxt}>Total </Text><Text style={styles.amtTxt}>{this.state.OrderTotal}</Text></View>
                  </View>

                </View>
                <Button
                  testId={"trackMyOrder"}
                  title={'Track My Order'}
                  disabled={false}
                  btnStyle={{ borderWidth: 1, marginLeft: 0, borderColor: Colors.PRIMARY, backgroundColor: Colors.WHITE, width: width - 90 }}
                  titleStyle={{
                    color: Colors.PRIMARY,
                    ...Platform.select({
                      ios: {
                        fontWeight: '800',
                        fontFamily: 'verdana',
                      },
                      android: {
                        fontWeight: 'normal',
                        fontFamily: 'verdanab',
                      },
                    }), fontSize: 18,
                  }}
                  OnClick={(data) => this.props.navigation.push('PurchaseDetails', { passData: { data: { Id: this.state.orderId } } })}
                />
                <Button
                  testId={"continueShopping"}
                  title={'Continue Shopping'}
                  disabled={false}
                  btnStyle={{ borderWidth: 0, marginLeft: 0, width: width - 90 }}
                  titleStyle={{}}
                  OnClick={(data) => this.props.navigation.navigate('Home')}
                />
                <Text style={styles.ordItmsViewTxt} onPress={() => this.setState({ showItems: !this.state.showItems })}>View ordered items</Text>

                {this.state.showItems && <>{(this.state.ItemsArray && this.state.ItemsArray.length > 0) && <OrderItemList
                  Items={this.state.ItemsArray}
                  onProductClick={(data) => this.props.navigation.navigate('ProductDetails', { passData: { Id: data.ProductId } })}
                />}</>}
              </View>
            </View>
            <View style={styles.nextShareContainer}>
              <Text style={styles.headerTxt}>What happens next?</Text>
              <View style={styles.whtNxtCont}>
                <View style={styles.whtNxtBox}>
                  <Image style={styles.imageStyle} source={Icons.shipping} />
                  <Text style={styles.shpStyles}>Shipping</Text>
                </View>
                <View style={styles.whtNxtBox}>
                  <Image style={styles.imageStyle} source={Icons.policy} />
                  <Text style={styles.shpStyles}>Policies</Text>
                </View>
                <TouchableOpacity style={styles.whtNxtBox} onPress={() => this.props.navigation.navigate('Delivery')}>
                  <Image style={styles.imageStyle} source={Icons.faq} />
                  <Text style={styles.shpStyles}>FAQs</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.nextShareContainer}>
                <Text style={styles.headerTxt}>Share Item</Text>
              </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou)