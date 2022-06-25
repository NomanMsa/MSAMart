import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Easing,
  Alert,
  StyleSheet,
  LogBox, Animated, TouchableWithoutFeedback,
} from 'react-native';
LogBox.ignoreAllLogs();
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
import {
  OfflineNotice,
  CheckoutHeader,
  CheckoutSteps,
  AddressCards,
  Button,
} from '@components';
import { ServiceCall } from '@utils';
import { Constants } from '@config';
import { Api } from '@config';
import { Colors } from '@theme';
import styles from './CheckoutStyles';
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get('window');
export default class Checkout extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      animationValue: new Animated.Value(120),
      viewState: true,
      showDetails: false,
      arrowIco: Icons.upArrow,
      invalidAddNos: 0,
      userAddresses: [],
      selectedBillingAddressId: 0,
      currentStep: 1,
      shippingAddrChk: true,
      btnText: 'Continue',
    }
    this.onSuccessAddressFetchCall = this.onSuccessAddressFetchCall.bind(this);
    this.onSuccessAddressDeleteCall = this.onSuccessAddressDeleteCall.bind(this);
    this.addSelChange = this.addSelChange.bind(this);
    this.addEdit = this.addEdit.bind(this);
    this.addDeletePrompt = this.addDeletePrompt.bind(this);
    this.addDelete = this.addDelete.bind(this);
    this.step1Clear = this.step1Clear.bind(this);
    this.shipAddressChkToggle = this.shipAddressChkToggle.bind(this);
  }

  toggleAnimation = () => {
    if (this.state.viewState == true) {
      Animated.timing(this.state.animationValue, {
        toValue: height / 2,
        timing: 500
      }).start(() => {
        this.setState({ viewState: false, arrowIco: Icons.arrowDown, showDetails: true })
      });
    }
    else {
      Animated.timing(this.state.animationValue, {
        toValue: 120,
        timing: 500
      }).start(this.setState({ viewState: true, arrowIco: Icons.upArrow, showDetails: false })
      );
    }
  }
  async componentDidMount() {
    this.setState({ loading: true });
    await this.fetchBillingAddresses();
    this.setState({ loading: false });
  }
  onSuccessAddressFetchCall(data) {
    console.log(data);
    if (data.model.BillingAddress) {
      this.setState({
        userAddresses: data.model.BillingAddress.ExistingAddresses,
        selectedBillingAddressId: data.model.BillingAddress.ExistingAddresses.Id
      });
    }
    if (data.model.BillingAddress.InvalidExistingAddresses) {
      this.setState({
        invalidAddNos: data.model.BillingAddress.InvalidExistingAddresses.length
      });
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
  fetchBillingAddresses = async () => {
    let Service = {
      apiUrl: Api.UserAddressList,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      //bodyData: JSON.stringify({ categoryIncludeInTopMenu: 'true', showOnHomePage: true, parentSliderWidget: 'home', }),
      onSuccessCall: this.onSuccessAddressFetchCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  addSelChange = (item, key) => {
    let tempArr = [];
    this.state.userAddresses.map((item, i) => {
      if (i == key) {
        item.selected = true
        tempArr.push(item);
        this.setState({ selectedBillingAddressId: item.Id });
      } else {
        item.selected = false
        tempArr.push(item);
      }
    });
    this.setState({ userAddresses: tempArr })
  }
  addEdit = (item, key) => {
    console.log('Editing')
  }
  addDeletePrompt = async (item, key) => {
    Alert.alert(
      "MsaMart",
      "Are you sure to delete address?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.addDelete(item, key) }
      ],
      { cancelable: false }
    );
  }
  addDelete = async (item, key) => {
    let Service = {
      apiUrl: Api.UserAddressDelete + '?id=' + item.Id,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      //bodyData: JSON.stringify({ categoryIncludeInTopMenu: 'true', showOnHomePage: true, parentSliderWidget: 'home', }),
      onSuccessCall: this.onSuccessAddressDeleteCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }
  onSuccessAddressDeleteCall = async (data) => {
    console.log(data);
    if( data.message!=null && data.message.length > 0 ){
      Toast.showWithGravity(data.message, Toast.LONG, Toast.TOP);
    }
    await this.fetchBillingAddresses();
  }
  step1Clear = async () => {
    let currentStep = this.state.currentStep;
    if (this.state.shippingAddrChk == true && this.state.currentStep == 1) { this.setState({ currentStep: 3 }); }
    else if (this.state.currentStep < 4) { this.setState({ currentStep: this.state.currentStep + 1 }); }
    if (currentStep == 0) { this.setState({ btnText: 'Continue' }) }
    else if (currentStep == 1) { this.setState({ btnText: 'Proceed to payment' }) }
    else if (currentStep == 2) { this.setState({ btnText: 'Review & Confirm' }) }
    else if (currentStep == 3) { this.setState({ btnText: 'Pay Now' }) }
    //if(this.state.currentStep < 4){ this.setState({currentStep: this.state.currentStep+1}); }
  }
  shipAddressChkToggle = async () => {
    this.setState({ shippingAddrChk: !this.state.shippingAddrChk })
  }
  render() {

    const animatedStyle = {
      //width: this.state.animationValue,
      height: this.state.animationValue
    }
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
        <OfflineNotice
          noInternetText={'No internet!'}
          offlineText={'You are offline!'}
          offlineStyle={{}}
          noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
          offlineTextStyle={{}}
          noInternetTextStyle={{}}
        />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <CheckoutHeader />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
              <CheckoutSteps
                stepNo={1}
                currentStepStyle={this.state.currentStep == 1 ? { borderColor: Colors.PRIMARY } : {}}
                stepTitletestId="Billing address"
                stepTitle={'Billing address'}
                stepSubtitle={'Step ' + 1 + ' to ' + 4}
              >{this.state.currentStep == 1 &&
                <>

                  <TouchableOpacity style={styles.shipAddrChk} onPress={(data) => this.shipAddressChkToggle()}

                  >

                    <View style={styles.chkBoxCircle}>


                      {this.state.shippingAddrChk && <Image style={styles.chkTick} source={Icons.plus} />}
                    </View>

                    <Text style={styles.shipAddrChkTxtStyle}
                      testID="shipToSameAddressLbl"
                      accessibilityLabel="shipToSameAddressLbl"
                    >Ship to the same address</Text>
                  </TouchableOpacity>
                  <Text style={styles.invalidAddTxt}>You have {this.state.invalidAddNos} invalid address(es)</Text>
                  {this.state.userAddresses.length > 0 && <AddressCards
                    addressData={this.state.userAddresses}
                    onSelect={(data, key) => this.addSelChange(data, key)}
                    onEditAddr={(data, key) => this.addEdit(data, key)}
                    onDeleteAddr={(data, key) => this.addDeletePrompt(data, key)}
                  />}
                  <TouchableOpacity
                    testID="Add a new address"
                    accessibilityLabel="Add a new address"
                    style={styles.addAddBtnStyle}
                    onPress={(data) => this.props.navigation.push('AddAddress')}>

                    <Image style={styles.addAddIco} source={Icons.plus} />
                    <Text style={styles.addNewAddTxt}>Add a new address</Text>
                  </TouchableOpacity>
                  <Button
                    testId={"continueBtn"}
                    title={this.state.btnText}
                    btnStyle={{ borderWidth: 0, width: width - 70, alignSelf: 'center' }}
                    titleStyle={{ color: Colors.WHITE }}
                    OnClick={(data) => this.step1Clear()}
                  />
                </>
                }
              </CheckoutSteps>
              <CheckoutSteps
                stepNo={2}
                currentStepStyle={this.state.currentStep == 2 ? { borderColor: Colors.PRIMARY } : {}}
                stepTitle={'Shipping address'}
                stepSubtitle={'Step ' + 2 + ' to ' + 4}
              >{this.state.currentStep == 2 &&
                <>
                  <Text style={styles.invalidAddTxt}>You have {this.state.invalidAddNos} invalid address(es)</Text>
                  {this.state.userAddresses.length > 0 && <AddressCards
                    addressData={this.state.userAddresses}
                    onSelect={(data, key) => this.addSelChange(data, key)}
                    onEditAddr={(data, key) => this.addEdit(data, key)}
                    onDeleteAddr={(data, key) => this.addDeletePrompt(data, key)}
                  />}
                  <TouchableOpacity
                    style={styles.addAddBtnStyle}
                    onPress={(data) => this.step1Clear()}>
                    <Image style={styles.addAddIco} source={Icons.plus} />
                    <Text style={styles.addNewAddTxt}>Add a new address</Text>
                  </TouchableOpacity>
                  <Button
                    title={this.state.btnText}
                    btnStyle={{ borderWidth: 0, width: width - 70, alignSelf: 'center' }}
                    titleStyle={{ color: Colors.WHITE }}
                    OnClick={(data) => this.step1Clear()}
                  />
                </>
                }
              </CheckoutSteps>
              <CheckoutSteps
                stepNo={3}
                currentStepStyle={this.state.currentStep == 3 ? { borderColor: Colors.PRIMARY } : {}}
                stepTitle={'Payment'}
                stepSubtitle={'Step ' + 3 + ' to ' + 4}
              >
              </CheckoutSteps>
              <CheckoutSteps
                stepNo={4}
                currentStepStyle={this.state.currentStep == 4 ? { borderColor: Colors.PRIMARY } : {}}
                stepTitle={'Review & Confirm'}
                stepSubtitle={'Step ' + 4 + ' to ' + 4}
              >
              </CheckoutSteps>
            </View>
          </ScrollView>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.animatedBox, animatedStyle]} >
              <View style={styles.bottomContainer}>
                <View style={styles.bottomTitleContainer}>
                  <Text style={styles.bottomTitleTxt}>Order Details</Text>
                  <TouchableOpacity style={styles.upArrowCont} onPress={this.toggleAnimation}>
                    <Image style={styles.upArrowIco} source={this.state.arrowIco} />
                  </TouchableOpacity>
                </View>
                {this.state.showDetails && <>
                  <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollDetails}
                    contentContainerStyle={{ alignItems: 'center', }}>
                    <View style={[styles.scrollContainer]}>

                    </View>
                  </ScrollView>
                </>}
                <View style={styles.bottomButtonContainer}>
                  <Button
                    title={this.state.btnText}
                    btnStyle={{ borderWidth: 0, }}
                    titleStyle={{ color: Colors.WHITE }}
                    width={window.width - 30}
                    OnClick={(data) => this.step1Clear()}
                  />
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </>
    );
  }
}
