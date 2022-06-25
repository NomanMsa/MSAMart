import React, { Component } from 'react';
import { SafeAreaView, Dimensions, ScrollView, View, Text, TextInput, StatusBar, TouchableOpacity, Alert, Platform } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Loaders } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Footer, SearchBar, OfflineNotice, OrderItemList } from '@components';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { Colors } from '@theme';
import styles from './CancelOrderDetailsStyles';
import Toast from 'react-native-simple-toast';
import { DrawerActions } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';


const pickerStyle = {
  inputIOS: {
    alignSelf: 'flex-start',
    color: 'black',
    height: '100%',
    fontFamily: 'verdana',
    fontSize: 16,
    marginLeft: 15,
  },
};
export default class CancelOrderDetails extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      orderId: 0,
      orderData: [],
      availableCancelReasons: [],
      availableCancelReasonsArray: [],
      selectedReason: 0,
      selectedReasonLower: 0,
      comment: null,
      customOrderNumber: 0,
      result: null,
      customProperties: {},
      items: [],
      showError: 0,
    }
    this.fetchCancelReasonDetails = this.fetchCancelReasonDetails.bind(this);
    this.onSuccessfetchCancelReasonDetails = this.onSuccessfetchCancelReasonDetails.bind(this);
    this.submitCancelRequestWithReason = this.submitCancelRequestWithReason.bind(this);
    this.onSuccessSubmitCancelRequest = this.onSuccessSubmitCancelRequest.bind(this);
    this.GuestUserStatuscall = this.GuestUserStatuscall.bind(this);
    this.onSuccessLookUpOder = this.onSuccessLookUpOder.bind(this);

  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.fetchCancelReasonDetails((this.props.route.params).passData.orderData.Id);
    this.setState({ loading: false });
  }

  fetchCancelReasonDetails = async (Id) => {
    let Service = {
      apiUrl: Api.CancelReasonCall + '?orderId=' + Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchCancelReasonDetails,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessfetchCancelReasonDetails(data) {
    if (data.status) {
      this.setState({ customOrderNumber: data.model.CustomOrderNumber });
      this.setState({ result: data.model.Result });
      this.setState({ customProperties: data.model.CustomProperties });
      this.setState({ items: data.model.Items });

      let AvailableCancelReasonsArray = data.model.AvailableCancelReasons;
      AvailableCancelReasonsArray = AvailableCancelReasonsArray.map(item => {
        return {
          value: item.Id,
          label: item.Name,
          text: item.Name,
          Value: item.Id,
          Text: item.Name,
        };
      });

      this.setState({
        orderData: data.model,
        availableCancelReasons: data.model.AvailableCancelReasons,
        availableCancelReasonsArray: AvailableCancelReasonsArray,
      });
      if (data.model.AvailableCancelReasons != null && data.model.AvailableCancelReasons.length > 1) {
        this.setState({ selectedReason: data.model.AvailableCancelReasons[0].Id });
      }
    }
    else {
      if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
        Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
      }
    }
  }

  onFailureAPI(data) {
  }
  onPromiseFailure(data) {
  }
  onOffline(data) {
  }

  submitCancelRequestWithReason = async (id) => {
    let Service = {
      apiUrl: Api.SubmitCancelReqest,
      methodType: 'POST',
      bodyData: JSON.stringify({
        "OrderId": id,
        "CustomOrderNumber": this.state.customOrderNumber,
        "Item": this.state.items,
        "CancelRequestReasonId": this.state.selectedReason,
        "Comments": this.state.comment,
        "Result": this.state.result,
        "AvailableCancelReasons": this.state.availableCancelReasons,
        "CustomProperties": this.state.customProperties,
      }),
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessSubmitCancelRequest,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessSubmitCancelRequest = async (data) => {
    if (data.status) {
      if (await AsyncStorage.getItem('loginStatus') == 'true') {
        this.props.navigation.push('Purchases')
      } else {
        this.GuestUserStatuscall();
      }
    } else {
      if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
        setTimeout(async () => {
          Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM)
        }, 500)
      }
    }
  };

  submitButtonClick = async (Id) => {
    console.log("Selected state is ", this.state.selectedReasonLower);
    if (((this.state.selectedReasonLower) == 'others' || this.state.selectedReasonLower == 'other') && ((this.state.comment == null) || (this.state.comment == ""))) {
      this.setState({ showError: 1 });
    } else {
      this.cancalOrderPrompt(Id);
      this.setState({ showError: 0 });
    }
  }

  cancalOrderPrompt = async (Id) => {
    Alert.alert(
      "MsaMart",
      "Are you sure to cancel this order?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
          }
        },
        {
          text: "Yes",
          onPress: () => {
            this.submitCancelRequestWithReason(Id);
          }
        }
      ],
      { cancelable: false }
    );
  }

  reasonChange = async (value, index) => {
    this.setState({ selectedReason: value })
    this.setState({ showError: 0 })
    this.setState({ comment: null });
    if(Platform.OS == "ios" && index > 0)
    {
      index = index-1
    }
    await this.setState({ selectedReasonLower: this.state.availableCancelReasons[index].Name.toLowerCase() })
  }

  GuestUserStatuscall = async () => {
    let Service = {
      apiUrl: Api.GuestUser,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        email: (this.props.route.params).passData.orderData.BillingAddress.Email,
        orderId: (this.props.route.params).passData.orderData.CustomOrderNumber,
      }),
      onSuccessCall: this.onSuccessLookUpOder,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    this.setState({ loading: true });
    const serviceResponse = await ServiceCall(Service);
    this.setState({ loading: false });
  }

  onSuccessLookUpOder = async (data) => {
    var d1 = data.model;

    if (data.errorlist && data.errorlist.length > 0) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 500);
    }
    else {
      this.props.route.params.cancelOrderSucess({ passData: { data: d1 } });
      this.props.navigation.goBack();
    }
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
              this.props.navigation.dispatch(DrawerActions.openDrawer());
            }}
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

            <View style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemHeaderTxt}>Items# {(this.props.route.params).passData.orderData.Id}</Text>
              </View>
              <View>
                <OrderItemList
                  Items={((this.props.route.params).passData.orderData).Items}
                />
              </View>
            </View>

            <View>
              <Text style={styles.reasonHeaderTxt}>Why are you cancelling order?</Text>
              <Text style={styles.detailTxt}>Cancel reason :</Text>
              {Platform.OS == "android" ?
                <View style={[styles.dropdownContainer]}>
                  <Picker
                    selectedValue={this.state.selectedReason}
                    style={[styles.dropdownContainerInner]}
                    onValueChange={(value, index) => this.reasonChange(value, index)} >
                    {this.state.availableCancelReasonsArray.map((item, index) => {
                      return <Picker.Item key={index} value={item.Value} label={item.Text} />
                    })}
                  </Picker>
                </View>
                :
                <View style={styles.iosDropDownContainerStyle}>
                  <View style={[styles.dropdownContainerIos]}>
                    <RNPickerSelect
                      value={this.state.selectedReason}
                      placeholder={''}
                      viewContainer={{ marginTop: 10 }}
                      style={{ ...pickerStyle }}
                      onValueChange={(value, index) => this.reasonChange(value, index)}
                      items={this.state.availableCancelReasonsArray}
                    />
                  </View>
                </View>
              }
            </View>

            {(this.state.selectedReasonLower == 'others' || this.state.selectedReasonLower == 'other') ?
              <View style={styles.commentContainer}>
                <Text style={styles.detailTxt}>Comments :</Text>

                {((this.state.showError) == 1) ?
                  <View>
                    <Text style={styles.errorCommentsTxt}>Comment is required</Text>
                  </View>
                  :
                  <></>
                }
                <View style={styles.returnCommentBlock}>
                  <TextInput
                    {...this.props}
                    multiline={true}
                    onChange={(event) => {
                      this.setState({
                        comment: event.nativeEvent.text,
                      });
                      this.setState({ showError: 0 });
                    }}
                    style={{ minHeight: 150, textAlignVertical: 'top' }}
                    value={this.state.comment}
                  />
                </View>
              </View>
              :
              <></>
            }

            <View style={styles.submitCancelHeader}>
              <TouchableOpacity onPress={() => this.submitButtonClick((this.props.route.params).passData.orderData.Id)}>
                <Text style={styles.orderCancelHeader}>SUBMIT CANCEL REQUEST</Text>
              </TouchableOpacity>
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
