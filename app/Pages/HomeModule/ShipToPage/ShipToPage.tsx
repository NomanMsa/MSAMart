import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  StatusBar,
  LogBox,
  Alert, Pressable,
  Platform, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
// import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import AsyncStorage from '@react-native-community/async-storage';
import { Loaders, } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import { Constants, Strings } from '@config';
import Toast from 'react-native-simple-toast';
import { Button, Header, SearchBar, OfflineNotice, AddressCardsV2 } from '@components';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import styles from './ShipToPageStyles';
import { Colors } from '@theme';
import { DrawerActions } from '@react-navigation/native';

const pickerStyle = {
  inputIOS: {
    alignSelf: 'flex-start',
    width: width - 90,
    color: 'black',
    height: '100%',
    fontFamily: 'verdana',
    fontSize: 16,
    marginLeft: 15,
    
  },
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: true,
      loginStatus: false,
      countryArr: [],
      addressList: [],
      isModalVisible: false,
      // setModalVisible: true
  };
    this.onSuccessfetchCountry = this.onSuccessfetchCountry.bind(this);
  }

  async componentDidMount() {
    this.focusListener = await this.props.navigation.addListener('focus', async () => {
      if (await AsyncStorage.getItem('loginStatus') == 'true') {
        console.log("logged in....")
          this.setState({ loginStatus: true });
      }else{
        console.log("logged out....")
          this.setState({ loginStatus: false });
      }
      this.setState({ loaderVisible: true });
      await this.fetchShipableCountry();
      this.setState({ loaderVisible: false });
    });
    
  }

  async fetchShipableCountry() {

    let Service = {
      apiUrl: Api.FetchServiceableCountry + '?isAuthenticate=' + this.state.loginStatus,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchCountry,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }
  countryChange = async (value, index) => {
    this.setState({ loaderVisible: true });
    this.setState({ selectedCountry: value })
    await this.setShipToCountry(value);
    this.setState({ loaderVisible: false });
  }
  
  setShipToCountry = async(val) => {
    let Service = {
      apiUrl: Api.SetShipToCountry + '?countryId=' + val,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessShipToCountry,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }
  onSuccessShipToCountry(data){
    console.log("onsuccess ship to country--", data)
    // Toast.showWithGravity('Country has changed successfully.', Toast.LONG, Toast.BOTTOM);
    this.props.navigation.pop(); //navigate('Home');
  }
  onSuccessfetchCountry(data){
    console.log("data--", data);
    let countries = data.shipTo.ServiceableCountries;
    
    countries = countries.map(item => { 
      return { 
        value: item.Value, 
        label: item.Text,
        text: item.Text, 
        Value: item.Value, 
        Text: item.Text 
      };
    });
    this.setState({ 
      countryArr: countries,
      selectedCountry: String(data.shipTo.CurrentCountryModel.Id),
      fetchCountryData: data.shipTo,
      addressList: data.shipTo.ShipToAddresses,
      loaderVisible: false
    });
    console.log("address length--", this.state.addressList.length);
    if(this.state.addressList.length == 0){
      this.setState({ loaderVisible: false })
    }
    this.state.addressList.map((val =>{
      if(val.IsDefault == true){
        console.log("fname---", val.FirstName)
        this.setState({
          fName: val.FirstName,
          lName: val.LastName,
          cityName: val.City,
          stateName: val.StateProvinceName,
          countryName: val.CountryName,
          address: val.Address1,
          loaderVisible: false
        })
      }
    }))
  }
  onFailureAPI(){

  }
  onPromiseFailure(){

  }
  onOffline(){

  }
  openModal(){
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }
 render() {
  // const { modalVisible } = this.state;
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
              
                <Text style={styles.headerTextStyle}> Choose Location </Text>
                <View style={{ marginLeft: 5,marginTop: 15,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderColor: Colors.LIGHT_GRAY,
                  }} />
                <Text style={styles.subHeader} numberOfLines={2}>Delivery options and fees may vary based on your locations </Text>
                {this.state.loginStatus === true ? 
                  this.state.addressList.length  == 0 ? 
                    <View style={{ padding: 0,  marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'center', 
                      marginLeft: 10,
                      backgroundColor: Colors.PRIMARY, 
                      borderRadius: 30,
                      height: 50, 
                        }}>
                      <TouchableOpacity onPress={() =>
                                this.props.navigation.navigate('AddAddress')
                              }>
                              <Text style={{ fontSize: 17, fontWeight:'bold', color: 'white',padding: 5 }}> Add New Address </Text>
                        </TouchableOpacity>
                    </View> 
               :
                  <View>
                        <View style={{borderRadius: 10, marginTop: 10,
                          backgroundColor: Colors.LIGHT_GRAY_COLOR_UPLOAD,
                          width: '100%', height: 130
                        }}> 
                        <Text style={{ marginTop: 10, marginLeft: 15, fontWeight: 'bold', 
                            fontSize: 20}}> {this.state.fName} </Text>
                        <Text style={{ marginTop: 8, marginLeft: 15, 
                            fontSize: 18 }}> {this.state.address} </Text>
                        <Text style={{ marginTop: 8, marginLeft: 15, 
                            fontSize: 18 }}> {this.state.cityName} {this.state.stateName} {this.state.countryName} </Text>
                      </View>
                      
                      <View style={{justifyContent: 'flex-end', alignItems:'flex-end', marginTop: 10}}>
                        <View >
                          <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Address')
                                }>
                                <Text style={{color: Colors.PRIMARY, fontSize: 17, fontWeight:'bold',textDecorationLine: 'underline',padding: 5 }}> See all </Text>
                          </TouchableOpacity>
                          
                        </View>
                      </View>
                  </View> 
                                     : 
                                     <View style={{ padding: 0,  marginTop: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center', 
                                        marginLeft: 10,
                                        backgroundColor: Colors.PRIMARY, 
                                        borderRadius: 30,
                                        height: 50, 
                                          }}>
                                         <TouchableOpacity onPress={() =>
                                                   this.props.navigation.navigate('SignIn')
                                                 }>
                                                 <Text style={{ fontSize: 17, fontWeight:'bold', color: 'white',padding: 5 }}> Sign in to see your saved addresses </Text>
                                           </TouchableOpacity>
                                     </View>
                                 }
                
                  <View>
                    <View style={{ marginLeft: 5,marginTop: 15,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderColor: Colors.LIGHT_GRAY,
                    }} />
                    
                    <Text style={styles.titleStyle}>Ship To</Text>
                    
                    {Platform.OS == "android" ?
                        <View style={[styles.dropdownContainer]}>
                            <Picker
                              selectedValue={this.state.selectedCountry}
                              style={{ width: '100%' }}
                              onValueChange={(service, index) => 
                                  this.countryChange(service, index)} >
                              {this.state.countryArr.map((item, index) => {
                                  return <Picker.Item key={index} value={item.Value} label={item.Text} />
                              })}
                            </Picker>
                        </View>
                        :

                        <View style={[styles.dropdownContainerIos]}>
                        <RNPickerSelect
                            value={this.state.selectedCountry}
                            placeholder={''}
                            doneText={'Done'}
                            style={{ ...pickerStyle }}
                            onValueChange={(value, index) => this.countryChange(value, index)}
                            items={this.state.countryArr}
                            // items={[
                            //     { label: "Saudi Arabia", value: "saudiArabia" },
                            //     { label: "United Arab Emirates", value: "uae" },
                            // ]}
                        />
                        </View>
                    }
                  
                  </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

