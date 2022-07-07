import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  StatusBar,
  LogBox,
  Alert,
  Platform
} from 'react-native';
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import AsyncStorage from '@react-native-community/async-storage';
import { Loaders, } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
import { Button, Header, SearchBar, OfflineNotice, AddressCardsV2 } from '@components';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import styles from './AddressStyles';
import { Colors } from '@theme';
import { DrawerActions } from '@react-navigation/native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userAddresses: [],
      shipToEnabled: false,
      currentCountryModel: null,
    };
    this.onSuccessfetchAddress = this.onSuccessfetchAddress.bind(this);
    this.onSuccessAddressDeleteCall = this.onSuccessAddressDeleteCall.bind(this);
    this.addSelChange = this.addSelChange.bind(this);
    this.addEdit = this.addEdit.bind(this);
    this.addDeletePrompt = this.addDeletePrompt.bind(this);
    this.addDelete = this.addDelete.bind(this);
    this.addDefault = this.addDefault.bind(this);
    this.onSuccessAddressDefalutCall = this.onSuccessAddressDefalutCall.bind(this);
    this.checkAddressLimit = this.checkAddressLimit.bind(this);
    this.onSuccessAddressLimit = this.onSuccessAddressLimit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.fetchAddressList();
    this.setState({ loading: false });

    this.focusListener = await this.props.navigation.addListener('focus', async () => {
      this.setState({ loading: true });
      await this.fetchAddressList();
      this.setState({ loading: false });
    });
  }

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  onSuccessfetchAddress(data) {
    console.log(data.model);
    this.setState({
      userAddresses: data.model.Addresses,
    });

    if(data.CommonShipToModel){
      this.setState({
        shipToEnabled: data.CommonShipToModel.IsShipToEnable,
        currentCountryModel: data.CommonShipToModel.CurrentCountryModel,
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
  fetchAddressList = async () => {
    let Service = {
      apiUrl: Api.UsersAddress,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchAddress,
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
        item.CustomProperties.IsDefaultAddress = true
        tempArr.push(item);
        this.setState({ selected: item.Id });
      } else {
        item.CustomProperties.IsDefaultAddress = false
        tempArr.push(item);
      }
    });
    this.setState({ userAddresses: tempArr })
    this.addDefault(item)
  }
  addEdit = (item, key) => {
    console.log(item);
    console.log(key);
    this.props.navigation.navigate('AddAddress', { passData: item })
  }
  addDeletePrompt = async (item, key) => {
    testID = "Delete"
    accessibilityLabel = "Delete"
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
      apiUrl: Api.UserAddressDelete + '?addressId=' + item.Id,
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


  addDefault = async (item, key) => {
    let Service = {
      apiUrl: Api.defaultAddress + '?id=' + item.Id,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessAddressDefalutCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }

  onSuccessAddressDefalutCall = async (data) => {
    console.log("saev default add--", data.model);
    if (data.message) {
      testID = "address-0"
      accessibilityLabel = "address-0"
      if( data.message!=null && data.message.length > 0 ){
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
    await this.fetchAddressList();
  }

  onSuccessAddressDeleteCall = async (data) => {
    console.log(data);
    if( data.message!=null && data.message.length > 0 ){
      Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
    }
    await this.fetchAddressList();
  }


  onSuccessAddressLimit(data) {
    console.log(data);
    this.setState({ loading: false });
    if (data.status == true) {
      let shipToModel = null;
      let shipToEnabled = false;
      if(data.model && data.model.CommonShipToModel){
        shipToModel = data.model.CommonShipToModel.CurrentCountryModel;
        shipToEnabled = data.model.CommonShipToModel.IsShipToEnable;
      }
      this.props.navigation.navigate('AddAddress', { passData: {currentShipToModel: shipToModel ,shipToModelEnabled: shipToEnabled}});
    }
    else {
      if( data.errorlist[0]!=null && data.errorlist[0].length > 0 ){
        setTimeout(()=> {
          Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
        },100);
      }
    }
  }
  checkAddressLimit = async () => {
    let Service = {
      apiUrl: Api.getCountryList,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessAddressLimit,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    this.setState({ loading: true });
    await ServiceCall(Service);
    this.setState({ loading: false });
  }
  //--------------------------------------------------------------------------------------------
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
            backButtonClick={() => this.props.navigation.pop()}
            NavButton={true}
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
            <View style={styles.pageContainer}>
              <View>

                <Button
                  testId={"Add new"}
                  title={'Add new'}
                  disabled={false}
                  btnStyle={{ borderWidth: 1, borderColor: Colors.PRIMARY, backgroundColor: Colors.WHITE, width: width / 2.5, alignSelf: 'flex-end' }}
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
                    }), textTransform: 'none', fontSize: 18,
                  }}
                  OnClick={(data) => this.checkAddressLimit()}
                />
                {this.state.userAddresses.length > 0 && <AddressCardsV2
                  cust_Info_TestId={"add_customerInf"}
                  nameAddTestId={"add_nameTitle"}
                  editAddTestId={"editAddress"}
                  deleteAddTestId={"deleteAddress"}
                  defaultAddTestId={"defaultAddress"}
                  onAddOneTestId={"newAddress1"}
                  addressData={this.state.userAddresses}
                  onSelect={(data, key) => this.addSelChange(data, key)}
                  onEditAddr={(data, key) => this.addEdit(data, key)}
                  onDeleteAddr={(data, key) => this.addDeletePrompt(data, key)}
                />}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
