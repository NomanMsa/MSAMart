import React, { Component } from 'react';
import { SafeAreaView, Dimensions, ScrollView, View, Text, StatusBar, Image, LogBox, TouchableOpacity, Linking, Alert,BackHandler  } from 'react-native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window')
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Footer, SearchBar, OfflineNotice, Button, OrderItemList } from '@components';
import { ServiceCall } from '@utils';
import { Api,Constants } from '@config';

import { Colors } from '@theme';
import { FormatDate } from '@utils'
import styles from './PurchaseDetailsStyles';
import Toast from 'react-native-simple-toast';
import perf from '@react-native-firebase/perf';
import { DrawerActions, StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';


class PurchaseDetails extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      orderId: 0,
      orderData: [],
      Items: [],
      Items1: [],
      ShippingAddress: '',
      BillingAddress: '',
      customeProps: {},
      shipToEnabled: false,
      currentCountryModel: null,
    }
    this.fetchPurchaseDetails = this.fetchPurchaseDetails.bind(this);
    this.onSuccessfetchPurchaseDetails = this.onSuccessfetchPurchaseDetails.bind(this);
    this.updateData = this.updateData.bind(this);
    this.reorderItem = this.reorderItem.bind(this);
    this.onSuccessReorder = this.onSuccessReorder.bind(this);
    // this.handleBackButton = this.handleBackButton.bind(this);
  }

  async componentDidMount() {

    if (this.props.route!=null && this.props.route.params!=null && this.props.route.params.guestFlow === true) {
      this.setState({
        orderId: (this.props.route.params).passData.data.Id,
        orderData: (this.props.route.params).passData.data,
        Items: (this.props.route.params).passData.data.Items,
        ShippingAddress: (this.props.route.params).passData.data.ShippingAddress,
        customeProps: (this.props.route.params).passData.data.CustomProperties,
        BillingAddress: (this.props.route.params).passData.data.BillingAddress,
        Items1: (this.props.route.params).passData.data.Items
      });
    }
    else {
      this.setState({ loading: true });
      console.log(this.props.route.params);
      const purchasedetailsTrace = await perf().startTrace('custom_trace_purchase_details_screen');
      await this.fetchPurchaseDetails((this.props.route.params).passData.data.Id);
      purchasedetailsTrace.putAttribute('occurrence', 'firstVisit');
      await purchasedetailsTrace.stop();
      this.setState({ loading: false });
      this.focusListener = await this.props.navigation.addListener('focus', async () => {
        const purchasedetailsTrace = await perf().startTrace('custom_trace_purchase_details_screen');
        this.fetchPurchaseDetails((this.props.route.params).passData.data.Id);
        purchasedetailsTrace.putAttribute('occurrence', 'reVisit');
        await purchasedetailsTrace.stop();
      });
    }
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton.bind(this));
  }
//   componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress');
//  }

  componentWillMount() {
    
  BackHandler.addEventListener('hardwareBackPress',()=>{return true});
}
  handleBackButton = () => {
    const routes = this.props.navigation.getState()?.routes;
    const pre = routes[routes.length - 2];
    console.log("*/*/*/*/*///*/*/**/*/--*-*-*-*-*-*-*-*-*-*-*-*-",pre);
    
    if(pre.name == 'PayNow'){
      this.props.navigation.push("Home")
    } else this.props.navigation.goBack();
}
  onSuccessfetchPurchaseDetails(data) {
    console.log("Fetch Purchase Data", data);
    if (data.status) {
      this.setState({
        orderId: (this.props.route.params).passData.data.Id,
        orderData: data.model,
        Items: data.model.Items,
        ShippingAddress: data.model.ShippingAddress,
        BillingAddress: data.model.BillingAddress,
        customeProps: data.model.CustomProperties,
        //periodFilter:data.model.ListTimePeriodFilter,
        //orderList:data.model.Orders,
        //statusSelection:data.model.ListStatusSorting[0].Value,
        //filterSelection:data.model.ListTimePeriodFilter[0].Value,
        //statusSelection:this.state.statusSelection,
        //filterSelection:this.state.filterSelection,
      });
    }
    if (data.model && data.model.CommonShipToModel) {
      this.setState({
        shipToEnabled: data.model.CommonShipToModel.IsShipToEnable,
        currentCountryModel: data.model.CommonShipToModel.CurrentCountryModel,
      });
    }
    else {
      if (data.errorlist[0] == 'User is not registered') {
        //StackActions.replace('Home')
        setTimeout(async () => {
          Alert.alert(
            'Msa Mart',
            'Order don\'t belongs to you', [{
              text: 'Ok',
              onPress: async () => {
                this.props.navigation.pop();
                //this.props.navigation.dispatch(
                //  StackActions.replace('Home')
                //);
              }
            },], {
            cancelable: false
          }
          )
        }, 500)
      }
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

  onCancelOrderSuccessForGuestUser = (data) => {
    this.setState({
      orderId: data.passData.data.Id,
      orderData: data.passData.data,
      Items: data.passData.data.Items,
      ShippingAddress: data.passData.data.ShippingAddress,
      customeProps: data.passData.data.CustomProperties,
      BillingAddress: data.passData.data.BillingAddress,
    });
  }
  onReturnOrderSuccessForGuestUser = (data) => {
    this.setState({
      orderId: data.passData.data.Id,
      orderData: data.passData.data,
      Items: data.passData.data.Items,
      ShippingAddress: data.passData.data.ShippingAddress,
      customeProps: data.passData.data.CustomProperties,
      BillingAddress: data.passData.data.BillingAddress,
    });
  }


  fetchPurchaseDetails = async (Id) => {
    let Service = {
      apiUrl: Api.orderDetails + '?orderId=' + Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchPurchaseDetails,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  PrintOrderCall = (url) => {
    console.log(url)
    // Linking.canOpenURL(ulr).then(supported => {
    //   if (supported) {
    //     Linking.openURL(ulr);
    //   } else {
    //     console.log("Don't know how to open URI: " + ulr);
    //   }
    // });

    this.props.navigation.navigate('InvoicePrint', { passData: { Id: url } })
  };
  updateData = async (from, value) => {
    if (from == 'status') {
      this.setState({ statusSelection: value })
    } else {
      this.setState({ filterSelection: value })
    }
    this.setState({ loading: true });
    await this.fetchPurchases();
    this.setState({ loading: false });
  };
  reorderItem = async () => {
    let Service = {
      apiUrl: Api.reOrder + '?orderId=' + (this.props.route.params).passData.data.Id,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessReorder,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessReorder(data) {
    console.log(data);
    if (data.status == true) {
      this.props.navigation.push('ShoppingCart');
    }
  }

  render() {
    let estimated_Del_Date = this.state.customeProps

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
            backButtonClick={() =>{
              
              const routes = this.props.navigation.getState()?.routes;
              const pre = routes[routes.length - 2];
              if(pre.name == 'PayNow'){
                this.props.navigation.push("Home")

              }else{
                this.props.navigation.pop()
              }
              
                
              
            }}
              
              
            NavButton={true}
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
            <View style={styles.oDetailsContainer}>
              <View style={styles.header}>
                <Text testID={"orderDetails"} accessibilityLabel="orderDetails" style={styles.headerTxt}>Order #{(this.props.route.params).passData.data.Id}</Text>
              </View>
              {(this.state.orderData).IsReOrderAllowed && this.props.route.params.guestFlow == null ? <Button
                testId={"reorderBtn"}
                title={'REORDER'}
                disabled={false}
                btnStyle={{ borderWidth: 0, width: width / 2.5, alignSelf: 'flex-start', marginTop: 0, marginBottom: 0 }}
                titleStyle={{
                  ...Platform.select({
                    ios: {
                      fontWeight: '800',
                      fontFamily: 'verdana',
                    },
                    android: {
                      fontWeight: 'normal',
                      fontFamily: 'verdanab',
                    },
                  }), textTransform: 'none', fontSize: 16,
                }}
                OnClick={(data) => this.reorderItem()}
              /> : <></>}

              <View style={styles.orderDetailsContainer}>
                <View style={[styles.orderBlocks, styles.orderBlockBorder]}>
                  <View style={styles.detailContainer}>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailHeaderTxt}
                      >No. of items</Text>
                      <Text style={styles.detailTxt}
                        testID={"items"} accessibilityLabel="items"
                      >{(this.state.orderData).Items ? (this.state.orderData).Items.length : 0} Items</Text>
                    </View>
                    <View style={styles.detailBlockRight}>
                      <Text style={styles.detailHeaderTxt}>Date Ordered</Text>
                      <Text style={styles.detailTxt}>{FormatDate.formatDate((this.state.orderData).CreatedOn, 'dd/mm/yyyy')}</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailHeaderTxt}>Total Cost</Text>
                      <Text style={styles.detailTxt}>{(this.state.orderData).OrderTotal}</Text>
                    </View>
                    {estimated_Del_Date.OrderDetailEstimateDeliveryShow ?
                      <View style={styles.detailBlockRight}>
                        <Text testID={"estimatedDelivery"} accessibilityLabel="estimatedDelivery" style={styles.detailHeaderTxt}>Estimated delivery</Text>
                        <Text style={styles.detailTxt}>{FormatDate.formatDate(estimated_Del_Date.OrderDetailEstimateDelivery, 'dd/mm/yyyy')}</Text>
                      </View>
                      :
                      null
                    }

                  </View>
                </View>
                {((this.state.orderData).CustomProperties && (this.state.orderData).CustomProperties.OrderMultiVenderMessage) && <View style={styles.orderBlocks2}>
                  <View style={styles.bottomBox}>
                    <View style={styles.bellContainer}>
                      <Image style={styles.bottomBellImage} source={Icons.bellIco} />
                    </View>
                    <View style={styles.btmTxtContainer}>
                      <Text style={styles.multiSellerText}>You bought from different sellers so your items will be delivered in separate shipments</Text>
                    </View>
                  </View>
                </View>}
              </View>
              {((this.state.orderData).Shipments && (this.state.orderData).Shipments.length > 0) && <View style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text testID={"viewOrderDetails"} accessibilityLabel="viewOrderDetails" style={styles.itemHeaderTxt}>Shipments</Text>
                </View>
                <View style={styles.itemDetails}>
                  {this.state.orderData.Shipments.map((each, index) => {
                    return (
                      <View style={styles.detailContainer}>
                        <View style={styles.detailBlock}>
                          <Text testID={"shipmentId"} accessibilityLabel="shipmentId" style={styles.detailHeaderTxt}>Shipments ID</Text>
                          <Text style={styles.detailTxt}>{each.Id}</Text>
                        </View>
                        <View style={styles.detailBlockRight}>
                          <Text style={styles.detailHeaderTxt}>Tracking number</Text>
                          <Text style={styles.detailTxt}>{each.TrackingNumber}</Text>
                        </View>
                        <View style={styles.detailBlock}>
                          <Text style={styles.detailHeaderTxt}>Date Shipped</Text>
                          <Text style={styles.detailTxt}>{each.ShippedDate != null ? FormatDate.formatDate(each.ShippedDate, 'dd/mm/yyyy') : ' '}</Text>
                        </View>
                        <View style={styles.detailBlockRight}>
                          <Text style={styles.detailHeaderTxt}>Date Delivered</Text>
                          <Text style={styles.detailTxt}>{each.DeliveryDate != null ? FormatDate.formatDate(each.DeliveryDate, 'dd/mm/yyyy') : 'Not yet'}</Text>
                        </View>
                        <View style={styles.itemFooter}>
                          <Text style={styles.itemFooterTxt} onPress={() => this.props.navigation.navigate('ShippingDetails', { passData: each.Id })}>View Details</Text>
                        </View>
                        <View style={styles.dividerBackground}></View>
                      </View>
                    )
                  })
                  }
                </View>
              </View>}
              <View style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemHeaderTxt}
                    testID={"Item"} accessibilityLabel="Item"
                  >Items</Text>
                </View>
                <View style={styles.itemDetails}>
                  <View style={styles.detailContainer}>
                    {/* <View style={styles.detailBlock}>
                      <Text style={styles.detailHeaderTxt}>Seller</Text>
                      <Text style={styles.detailTxt}>{(this.state.orderData).CustomProperties ? (this.state.orderData).CustomProperties.Vendors : ''}</Text>
                    </View> */}
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailHeaderTxt}>No. of items</Text>
                      <Text style={styles.detailTxt}>{(this.state.orderData).Items ? (this.state.orderData).Items.length : 0} Items</Text>
                    </View>
                    {estimated_Del_Date.OrderDetailEstimateDeliveryShow ?
                      <View style={{ ...styles.detailBlock, width: '75%', marginBottom: 8 }}>
                        <Text testID={"estimatedDelivery"} accessibilityLabel="estimatedDelivery" style={styles.detailHeaderTxt}>Estimated delivery</Text>
                        <Text style={styles.detailTxt}>{FormatDate.formatDate(estimated_Del_Date.OrderDetailEstimateDelivery, 'dd/mm/yyyy')}</Text>
                      </View>
                      :
                      null
                    }
                  </View>
                </View>
                <View>
                  {this.props.route.params.guestFlow == null ?
                    <OrderItemList
                      Items={this.state.Items}
                      itemReturnClick={(data) => this.props.navigation.navigate('RORequest', { passData: { orderId: this.state.orderId, itemId: data.Id } })}
                      onProductClick={(data) => this.props.navigation.navigate('ProductDetails', { passData: { Id: data.ProductId } })}
                    />

                    :

                    <OrderItemList
                      Items={this.state.Items}
                      itemReturnClick={(data) => this.props.navigation.navigate('RORequest', { passData: { orderId: this.state.orderId, itemId: data.Id, passData: (this.props.route.params).passData.data }, onReturnOrderSuccess: this.onReturnOrderSuccessForGuestUser })}
                      onProductClick={(data) => this.props.navigation.navigate('ProductDetails', { passData: { Id: data.ProductId } })}
                    />
                  }
                </View>
                {/* ProductDetails */}

              </View>
              <View style={styles.orderPayContainer}>
                <View style={styles.paymentDetailsContainer}>
                  <View style={styles.detailContainer}>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailHeaderTxt}
                        testID={"paymentTxt"} accessibilityLabel="paymentTxt"
                      >Payment</Text>
                      {/* <Text style={styles.detailTxt}>{(this.state.orderData).Items ? (this.state.orderData).Items.length : 0} Items</Text> */}
                      <Text style={styles.detailTxt}>{(this.state.orderData).PaymentMethod ? (this.state.orderData).PaymentMethod : ''}</Text>

                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailHeaderTxt}
                        testID={"deliverTo"} accessibilityLabel="deliverTo"
                      >Deliver To</Text>
                      {/* <Text style={styles.detailTxt}>{FormatDate.formatDate((this.state.orderData).CreatedOn, 'dd/mm/yyyy')}</Text> */}
                      {(this.state.ShippingAddress) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.FirstName + " " + this.state.ShippingAddress.LastName}</Text> : <></>}
                      {(this.state.ShippingAddress) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.Email}</Text> : <></>}
                      {(this.state.ShippingAddress) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.PhoneNumber}</Text> : <></>}

                    </View>
                    {
                      
                        <View style={styles.detailBlock}>
                          <Text style={styles.detailHeaderTxt}
                            testID={"shippingAddress"} accessibilityLabel="shippingAddress"
                          >Shipping Address</Text>
                          {(this.state.ShippingAddress.Address1) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.Address1}</Text> : <></>}
                          {(this.state.ShippingAddress.Address2) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.Address2}</Text> : <></>}
                          {(this.state.ShippingAddress.City) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.City + " " + this.state.ShippingAddress.StateProvinceName}</Text> : <></>}
                          {(this.state.ShippingAddress.ZipPostalCode) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.ZipPostalCode}</Text> : <></>}
                          {(this.state.ShippingAddress.CountryName) ? <Text style={styles.detailTxt}> {this.state.ShippingAddress.CountryName}</Text> : <></>}
                        </View>
                    }
                    {

                      <View style={styles.detailBlock}>
                        <Text style={styles.detailHeaderTxt}
                          testID={"billingAddress"} accessibilityLabel="billingAddress"
                        >Billing Address</Text>

                        {(this.state.BillingAddress.Address1) ? <Text style={styles.detailTxt}> {this.state.BillingAddress.Address1}</Text> : <></>}
                        {(this.state.BillingAddress.Address2) ? <Text style={styles.detailTxt}> {this.state.BillingAddress.Address2}</Text> : <></>}
                        {(this.state.BillingAddress.City) ? <Text style={styles.detailTxt}> {this.state.BillingAddress.City + " " + this.state.BillingAddress.StateProvinceName}</Text> : <></>}
                        {(this.state.BillingAddress.ZipPostalCode) ? <Text style={styles.detailTxt}> {this.state.BillingAddress.ZipPostalCode}</Text> : <></>}
                        {(this.state.BillingAddress.CountryName) ? <Text style={styles.detailTxt}> {this.state.BillingAddress.CountryName}</Text> : <></>}
                      </View>

                    }

                  </View>
                </View>
                <View style={styles.thread} />
                <View style={styles.orderContainer}>
                  <Text style={styles.orderDetailHeader}
                    testID={"orderSummary"} accessibilityLabel="orderSummary"
                  >Order Summary</Text>
                  <View style={styles.detailContainer}>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>Sub-Total:</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.headerTxt}>{(this.state.orderData).OrderSubtotal}</Text>
                    </View>
                    {(this.state.orderData).OrderTotalDiscount && <><View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>Discount:</Text>
                    </View>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailTxt}>{(this.state.orderData).OrderTotalDiscount}</Text>
                      </View></>}
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>Shipping:</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>{(this.state.orderData).OrderShipping}</Text>
                    </View>
                    {(this.state.orderData).PaymentMethodAdditionalFee && (this.state.orderData).PaymentMethodAdditionalFee != 0 && (this.state.orderData).PaymentMethodAdditionalFee != '' && (this.state.orderData).CustomProperties && <><View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>{(this.state.orderData.CustomProperties).PaymentMethodAdditionalFeeTitle}:</Text>
                    </View>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailTxt}>{(this.state.orderData).PaymentMethodAdditionalFee}</Text>
                      </View></>}
                    {((this.state.orderData).GiftCards && (this.state.orderData).GiftCards.length > 0) ? <>
                      {(this.state.orderData).GiftCards.map((item, i) => (<><View style={styles.detailBlock}>
                        <Text style={styles.detailTxt}>{item.CouponCode}</Text>
                      </View>
                        <View style={styles.detailBlock}>
                          <Text style={styles.detailTxt}>{item.Amount}</Text>
                        </View></>))}</> : <></>}
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>VAT:</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>{(this.state.orderData).Tax}</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.detailTxt}>Order Total:</Text>
                    </View>
                    <View style={styles.detailBlock}>
                      <Text style={styles.headerTxt}>{(this.state.orderData).OrderTotal}</Text>
                    </View>

                  </View>
                </View>
              </View>
              <View>
                {(this.state.orderData) && (this.state.orderData).CanCancelOrder ? <TouchableOpacity onPress={() => this.props.navigation.navigate('CancelOrderDetails', { passData: { orderData: this.state.orderData }, cancelOrderSucess: this.onCancelOrderSuccessForGuestUser })}>
                  <Text style={styles.orderCancelHeader}>Cancel Order</Text>
                </TouchableOpacity>
                  :
                  <></>
                }

                {/* {(this.state.orderData).CanCancelOrder ?  */}
                {(this.state.orderData).IsReturnRequestAllowed ? <TouchableOpacity
                  testID={"returnOrderBtn"}
                  accessibilityLabel={"returnOrderBtn"}
                  onPress={() => this.props.navigation.navigate('RORequest', { passData: { orderId: this.state.orderId, itemId: 0 } })}>
                  <Text style={styles.orderCancelHeader}>Return Order</Text>
                </TouchableOpacity>
                  :
                  <></>
                }
                <TouchableOpacity testID={"printBtn"} accessibilityLabel={"printBtn"}
                  onPress={() => this.PrintOrderCall(this.state.orderId)}>
                  <Text style={styles.orderCancelHeader}>Print</Text>
                </TouchableOpacity>
                {/* :
                  <></>
                } */}
              </View>
            </View>
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

export default PurchaseDetails;