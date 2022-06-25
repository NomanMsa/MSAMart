import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Easing,
  LogBox,
  Linking
} from 'react-native';
LogBox.ignoreAllLogs();
import AnimatedLoader from "react-native-animated-loader";
import { Images, Loaders, Icons } from '@assets';
import {
  Button,
  OfflineNotice,
  FormTextInput,
  Footer,
} from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api } from '@config';
import { FormatDate } from '@utils'
import styles from './ShippingDetailsStyles';
import { Colors } from '@theme';
import HTMLView from 'react-native-htmlview';
export default class ShippingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: false,
      shipmentId: 0,
      shipmentData: [],
      // ShipmentStatusEvents: [],
      loading: true
    };
    this.fetchShipmentDetails = this.fetchShipmentDetails.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.onSuccessfetchShipmentDetails = this.onSuccessfetchShipmentDetails.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    console.log(this.props.route.params);
    await this.fetchShipmentDetails((this.props.route.params).passData);
    this.setState({ loading: false });

    this.focusListener = await this.props.navigation.addListener('focus', async () => {
      this.setState({ loading: true });
      console.log(this.props.route.params);
      await this.fetchShipmentDetails((this.props.route.params).passData);
      this.setState({ loading: false });


    });
  }

  onSuccessfetchShipmentDetails(data) {
    console.log("Shipment detail success fetch");
    console.log(data);
    this.setState({
      shipmentId: (this.props.route.params).passData,
      shipmentData: data.model,
      // ShipmentStatusEvents: data.model.ShipmentStatusEvents
    });
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
  fetchShipmentDetails = async (Id) => {
    let Service = {
      apiUrl: Api.shipmentDetails + '?shipmentId=' + Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchShipmentDetails,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
    console.log('this is the APIURL shipment details....', Service.apiUrl)
  };

  //-------------------------Render Shipment flow images-------------------------------------
  _renderShipmentFlow = () => {
    return (
      <View style={{ flex: 1, marginTop: -24, marginBottom: 48 }}>
        <View style={styles.mainView}>
          <View style={styles.subView}>
            {(this.state.shipmentData).DeliveryDate ?
              <View style={styles.completeYellowBar}></View>
            :
              <> 
                <View style={styles.yellowBar}></View>
                <View style={styles.GreyBar}></View>
              </>
            }
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', zIndex: 1, marginTop: -60 }}>
          <View style={{ flexDirection: 'row', margin: 20, }}>
            <View style={{
              marginLeft: -8,
            }}>
              <Image style={styles.PSDImageView}
                source={Icons.ShipmentSetting} />
              <Text style={styles.textFlow}>Processing</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 20 }}>
            <View style={{ marginRight: 10, }}>
              <Image style={styles.PSDImageView}
                source={Icons.ShipmentDeliveryTruck} />
              <Text style={styles.textFlow}>Shipped</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 20 }}>
            <View style={{
              marginRight: -10,
            }}>
            {(this.state.shipmentData).DeliveryDate ?
              <Image style={styles.PSDImageView}
                source={Icons.ShipmentDeliveryBox} />
            :  
              <Image style={styles.PSDImageView}
                source={Icons.ShipmentDeliveryGreyBox} />}  
              <Text style={styles.textFlow}>Delivered</Text>
            </View>
          </View>
        </View>

      </View>
    )
  }


  //---------------------------handle click of tracking number--------------------------------
  _handleClick = () => {
    console.log("shipment details, trackingnumber URL - ", this.state.shipmentData.TrackingNumberUrl)
    if (this.state.shipmentData.TrackingNumberUrl !== null) {
      let urlToPass = this.state.shipmentData.TrackingNumberUrl.replace('  ', '')
      const url = urlToPass.replace(' ', '')
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + this.state.shipmentData.TrackingNumberUrl);
        }
      });
    }

  };

  //---------------------------render shipment event status block-------------------------------
  _shipmentEventStatusrender = () => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemHeaderTxt}>Shipment status events</Text>
        </View>
        <View style={styles.itemDetails}>
          {(this.state.shipmentData).ShipmentStatusEvents.map((item) => (

            <View style={styles.detailContainer}>
              {item.EventName ?
                <View style={styles.detailBlock}>
                  <Text style={styles.detailHeaderTxt}>Event</Text>
                  <Text style={styles.detailTxt}>{item.EventName ? item.EventName : ''}</Text>
                </View>
                :
                null
              }
              {item.Date ?
                <View style={styles.detailBlock}>
                  <Text style={styles.detailHeaderTxt}>Date</Text>
                  <Text style={styles.detailTxt}>{item.Date ? FormatDate.formatDate(item.Date, 'dd/mm/yyyy') : ''}</Text>
                </View>
                :
                null
              }
              {
                item.Location ?
                  <View style={styles.detailBlock}>
                    <Text style={styles.detailHeaderTxt}>Location</Text>
                    <Text style={styles.detailTxt}>{item.Location}</Text>
                  </View>
                  :
                  null
              }
              {item.Country ?
                <View style={styles.detailBlock}>
                  <Text style={styles.detailHeaderTxt}>Country</Text>
                  <Text style={styles.detailTxt}>{item.Country}</Text>
                </View>
                :
                null
              }
            </View>

          ))
          }

        </View>
      </View>
    )
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
        <View style={[styles.loginHeaderTextContainer]}>
          <Text style={styles.headerText}>{Strings.ShipmentDetails}</Text>
        </View>
      </View>
    );
  };

  //-------------------------------------navigate to PurchaseDetails screen--------------------
  _navToPurchaseDetails = (idToPass) => {
    // let idToPass = this.state.shipmentData).Order.Id;
    this.props.navigation.push('PurchaseDetails', { passData: { data: { Id: idToPass } } })
  }

  render() {
    // console.log("SHIPMENT DATA", this.state.shipmentData.Items);

    let ShipmentStatusEvents = (this.state.shipmentData).ShipmentStatusEvents ? (this.state.shipmentData).ShipmentStatusEvents.length : 0
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
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>

              <View style={styles.oDetailsContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Shipment #{(this.props.route.params).passData}</Text>
                </View>
                <View style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    {/* <Text style={styles.itemHeaderTxt}>Order # <Text style={{ color: Colors.PRIMARY }}>{(this.state.shipmentData).Order ? (this.state.shipmentData).Order.Id : 0}</Text></Text> */}
                    <TouchableOpacity onPress={() => this._navToPurchaseDetails((this.state.shipmentData).Order.Id)} >
                      <Text style={styles.itemHeaderTxt}>Order # <Text style={{ color: Colors.PRIMARY }}>{(this.state.shipmentData).Order ? (this.state.shipmentData).Order.Id : 0}</Text></Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.itemDetails}>
                    <View style={styles.detailContainer}>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailHeaderTxt}>Shipping Method</Text>
                        <Text style={styles.detailTxt}>{(this.state.shipmentData).ShipmentMethod ? (this.state.shipmentData).ShipmentMethod : ''}</Text>
                      </View>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailHeaderTxt}>Date Shipped</Text>
                        <Text style={styles.detailTxt}>{(this.state.shipmentData).ShippedDate ? FormatDate.formatDate((this.state.shipmentData).ShippedDate, 'dd/mm/yyyy') : ''}</Text>
                      </View>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailHeaderTxt}>Date Delivered</Text>
                        <Text style={styles.detailTxt}>{(this.state.shipmentData).DeliveryDate ? FormatDate.formatDate((this.state.shipmentData).DeliveryDate, 'dd/mm/yyyy') : 'Not yet'}</Text>
                      </View>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailHeaderTxt}>Tracking number</Text>
                        <TouchableOpacity onPress={() => { this._handleClick() }}>
                          <View style={styles.button}>
                            <Text style={{ ...styles.detailTxt, color: 'blue' }}>{this.state.shipmentData.TrackingNumber}</Text>
                          </View>
                        </TouchableOpacity>
                        {/* <Text style={styles.detailTxt}>{(this.state.shipmentData).TrackingNumber ? (this.state.shipmentData).TrackingNumber : 0}</Text> */}
                      </View>
                    </View>
                  </View>

                  {/* <>
        {this.props.Items.map((item, i) => (<>
          <TouchableOpacity style={styles.listviewContainer} onPress={() => this.props.onProductClick(item)}>
            <View styles={styles.leftContainer}>
              <View style={styles.imageContainer}>
                <Image source={{uri:item.DPWProductPictureURL}} style={styles.imageStyle} />
              </View>
            </View>
            <View styles={styles.rightContainer}>
              <View style={styles.txtContainer}>
                <Text style={styles.productTitleTxt}>{item.ProductName}</Text>
                <Text style={styles.productStatusTitleTxt}>Status: <Text style={styles.productStatusTxt}>{item.ItemStatus}</Text></Text>
                <Text style={styles.amountTxt}>{item.UnitPrice}</Text>
                <Text style={styles.quantityTxt}>QTY {item.Quantity}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </>)
        )}
      </> */}


                </View>

                {this._renderShipmentFlow()}

                {/* <View style={{ flexDirection: 'column' }}>

                </View> */}
                <View style={styles.itemContainer}>

                  <View style={styles.itemHeader}>
                    <Text style={styles.itemHeaderTxt}>Shipped Product(s)</Text>
                  </View>
                  <View style={styles.itemDetails}>
                    <View style={{ ...styles.detailContainer, marginBottom: 20 }}>
                      {(this.state.shipmentData && (this.state.shipmentData).Items) && <>{((this.state.shipmentData).Items).map((item, i) => (<>

                        <TouchableOpacity key={i} style={styles.listviewContainer}>
                          <View style={{ marginTop: 5 }}>

                            <Text style={styles.itemListText}>{item.ProductName}</Text>
                            {item.CustomProperties!=null && item.CustomProperties.ProductAttributeInfo!=null && item.CustomProperties.ProductAttributeInfo.length > 0 && item.CustomProperties.ProductAttributeInfo.map((attItem,i)=> (
                              <Text style={{ ...styles.itemFooterTxt, marginLeft: 16 }}>{attItem}</Text>
                            ))}
                            <Text style={{ ...styles.itemFooterTxt, marginLeft: 16 }} >Qty shipped: {item.QuantityShipped}</Text>
                            {/* <View style={{ width: '100%', alignItems: 'flex-end' }}>
                              <Text style={{ ...styles.itemFooterTxt, marginLeft: 16 }} >Qty shipped: {item.QuantityShipped}</Text>
                            </View> */}
                          </View>
                        </TouchableOpacity>
                      </>)
                      )}</>}
                    </View>
                  </View>
                </View>
                <View style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemHeaderTxt}>Shipping Address</Text>
                  </View>
                  <View style={styles.itemDetails}>
                    <View style={styles.detailContainer}>

                      <View style={styles.detailBlock}>
                        <Text style={styles.detailHeaderTxt}>Delivery To</Text>
                        {(this.state.shipmentData).Order && <>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.FirstName} {(this.state.shipmentData).Order.ShippingAddress.LastName}</Text>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.Email}</Text>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.PhoneNumber}</Text>
                        </>}
                      </View>
                      <View style={styles.detailBlock}>
                        <Text style={styles.detailHeaderTxt}

                        >Shipping Address</Text>
                        {(this.state.shipmentData).Order && <>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.Address1} {(this.state.shipmentData).Order.ShippingAddress.Address2}</Text>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.AddressArea}</Text>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.City}</Text>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.StateProvinceName}</Text>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.ZipPostalCode}</Text>
                          <Text style={styles.detailTxt}>{(this.state.shipmentData).Order.ShippingAddress.CountryName}</Text>
                        </>}
                      </View>
                    </View>
                  </View>
                </View>
                {ShipmentStatusEvents > 0 ? this._shipmentEventStatusrender() : null}
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
          </View>
        </SafeAreaView>
      </>
    );
  }
}









