import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Text,
  StatusBar,
  LogBox,
  Platform,
  Alert,
} from 'react-native';
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Images, Loaders, Icons } from '@assets';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
import { DrawerActions } from '@react-navigation/native';

import {
  Button,
  Header,
  SearchBar,
  OfflineNotice,
  FormTextInput,
} from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings } from '@config';
import { Api } from '@config';
import styles from './AddAddressStyles';
import { Colors } from '@theme';
const Drawer = createDrawerNavigator();

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
const pickerStyle2 = {
  inputIOS: {
    alignSelf: 'flex-start',
    width: (width / 3) - 50,
    color: 'black',
    height: '100%',
    fontFamily: 'verdana',
    fontSize: 16,
    //marginLeft:15,
  },
};
interface State { firstname: string; lastname: string; country: string; email: string; address1: string; address2: string; state: string; area: string; zip: string; phcode: string; phnumber: string; firstnameTouched: boolean; lastnameTouched: boolean; emailTouched: boolean; address1Touched: string; address2Touched: string; emailFormat: boolean; }
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstname: '',
      lastname: '',
      country: '1',
      email: '',
      address1: '',
      address2: '',
      state: '1',
      city: '',
      area: '1',
      zip: '',
      phcode: '1',
      phnumber: '',
      firstnameTouched: false,
      lastnameTouched: false,
      countryTouched: false,
      emailTouched: false,
      address1Touched: false,
      address2Touched: false,
      stateTouched: false,
      areaTouched: false,
      zipTouched: false,
      phcodeTouched: false,
      phnumberTouched: false,
      emailFormat: false,
      countryArray: [],
      stateArray: [],
      cityArray: [],
      areaArray: [],
      countrycodeArray: [],
      btnText: Strings.ADD_ADDRESS,
      countryEnabled: true,
      streetAddressEnabled: true,
      streetAddress2Enabled: true,
      stateProvinceEnabled: true,
      cityEnabled: true,
      addressAreaEnabled: true,
      zipPostalCodeEnabled: true,
      phoneEnabled: true,
      faxEnabled: true,
      companyEnabled: true,
      shipToEnabled: false,
      currentCountryModel: null,
    };
    this.onSuccessAdding = this.onSuccessAdding.bind(this);
    this.fetchEditAddress = this.fetchEditAddress.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.countryChange = this.countryChange.bind(this);
    this.onSuccessCountryList = this.onSuccessCountryList.bind(this);
    this.onSuccessStateList = this.onSuccessStateList.bind(this);
    this.getStateList = this.getStateList.bind(this);
    this.stateChange = this.stateChange.bind(this);
    //this.getCityList = this.getCityList.bind(this);
    //this.onSuccessCityList = this.onSuccessCityList.bind(this);
    this.cityChange = this.cityChange.bind(this);
    //this.getAreaList = this.getAreaList.bind(this);
    this.onSuccessAreaList = this.onSuccessAreaList.bind(this);
    this.onSuccessfetchEditAddress = this.onSuccessfetchEditAddress.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }

  componentDidMount() {
    if (this.props.route.params != undefined && this.props.route.params != null && this.props.route.params.passData && this.props.route.params.passData.Id) {
      this.setState({ loading: true });
      this.fetchEditAddress((this.props.route.params).passData.Id);
      this.setState({
        loading: false,
      });
    }
    else {
      if (this.props.route.params && this.props.route.params.passData && this.props.route.params.passData.shipToModelEnabled){
        let currentShipToModel = this.props.route.params.passData.currentShipToModel;
        let shipToModelFlagEnabled = this.props.route.params.passData.shipToModelEnabled;
        if(shipToModelFlagEnabled && currentShipToModel){
          this.setState({ 
            shipToEnabled: shipToModelFlagEnabled,
            currentCountryModel: currentShipToModel,
          });
        }  
      }
      this.setState({ loading: true });
      this.getCountryList();
      this.setState({ loading: false })

    }
    //console.log(this.props.route.params);
    // let passData = (this.props.route.params).passData;
  }


  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  emailInputRef = React.createRef<FormTextInput>();
  firstnameInputRef = React.createRef<FormTextInput>();
  lastnameInputRef = React.createRef<FormTextInput>();
  address1InputRef = React.createRef<FormTextInput>();
  address2InputRef = React.createRef<FormTextInput>();
  zipInputRef = React.createRef<FormTextInput>();
  phnumberInputRef = React.createRef<FormTextInput>();
  //---------------------------------------------***********************----------------------------------//

  onSuccessfetchEditAddress = (data) => {
    //console.log(data);
    let passData = data.model.Address;
    console.log(passData);

    // if(data.model.CommonShipToModel){
    //   this.setState({
    //     shipToEnabled: data.model.CommonShipToModel.IsShipToEnable,
    //     currentCountryModel: data.model.CommonShipToModel.CurrentCountryModel,
    //   });
    // }
    let AvailableCountryArray = passData.AvailableCountries;
    AvailableCountryArray = AvailableCountryArray.map(item => { return { value: item.Value, label: item.Text, text: item.Text, Value: item.Value, Text: item.Text }; });
console.log("-----------------------------------------**-");

    let AvailableStateArray = passData.AvailableStates;
    AvailableStateArray = AvailableStateArray.map(item => { return { value: item.Value, label: item.Text, text: item.Text, Value: item.Value, Text: item.Text }; });

    /*let AvailableCountryCodeArray = passData.AvailableCountryCode;
    AvailableCountryCodeArray = AvailableCountryCodeArray.map(item => { return { value: item.Value, label: item.Text, text: item.Text, Value: item.Value, Text: item.Text } });*/

    /*let AvailableAreaArray = passData.AvailableAddressAreas;
    AvailableAreaArray = AvailableAreaArray.map(item => { return { value: item.Value, label: item.Text, text: item.Text, Value: item.Value, Text: item.Text } });*/
    console.log("-----------------------------------------**-");
    
    //console.log('------------------------------')
    //console.log(passData.AvailableCites,passData.CityId);
    //console.log('------------------------------',passData.CityId)
    if (passData) {
      this.setState({
        countryArray: AvailableCountryArray,
        stateArray: AvailableStateArray,
        cityArray: [],//passData.AvailableCites,
        areaArray: [],//AvailableAreaArray,
        countrycodeArray: [],//AvailableCountryCodeArray,
        firstname: passData.FirstName,
        lastname: passData.LastName,
        country: "",//passData.CountryCode,
        email:  passData.Email,
        address1: passData.Address1,
        address2: passData.Address2,
        state:"",// (passData.StateProvinceId).toString(),
        city: passData.City,// (passData.CityId).toString(),
        area:"",// (passData.AddressAreaId).toString(),
        zip: passData.ZipPostalCode,
        phcode: "",//passData.CountryCode,
        phnumber: passData.PhoneNumber,
        btnText: Strings.UPDATE_ADDRESS,
        countryEnabled: passData.CountryEnabled,
        streetAddressEnabled: passData.StreetAddressEnabled,
        streetAddress2Enabled: passData.StreetAddress2Enabled,
        stateProvinceEnabled: passData.StateProvinceEnabled,
        cityEnabled: passData.CityEnabled,
        addressAreaEnabled:false,// passData.AddressAreaEnabled,
        zipPostalCodeEnabled: passData.ZipPostalCodeEnabled,
        phoneEnabled: passData.PhoneEnabled,
        AddressId:passData.Id
      })
    }
    //this.onSuccessCountryList
    console.log("-----------------------------assikij--------------------------");
    
  }
  onFailureAPI(data) {
    //console.log(data);
  }
  onPromiseFailure(data) {
    //console.log(data);
  }
  onOffline(data) {
    //console.log(data);
  }
  fetchEditAddress = async (addId) => {
    //console.log(addId);
    let Service = {
      apiUrl: Api.getAddressById + '?addressId=' + addId,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall:this.onSuccessfetchEditAddress,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  //---------------------------------------------***********************----------------------------------//
  handleEmailChange = (email: string) => {
    this.setState({ email: email });
    let reg = Constants.IS_VALID_EMAIL_REGEX;//^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (reg.test(email) === false) {
      //console.log("Email is Not Correct");
      this.setState({ emailFormat: false })
      return false;
    }
    else {
      this.setState({ emailFormat: true })
    }
  };

  handleEmailSubmitPress = () => {
    if (this.firstnameInputRef.current) {
      this.firstnameInputRef.current.focus();
    }
  };
  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };

  handleFirstnameChange = (firstname: string) => {
    if (firstname.length < 25) {
      this.setState({ firstname: firstname });
    }
    else {
      Alert.alert(
        'MsaMart',
        'First Name must be maximum of 24 chars long'
      );
    }
  };
  handleFirstnameSubmitPress = () => {
    if (this.lastnameInputRef.current) {
      this.lastnameInputRef.current.focus();
    }
  };
  handleFirstnameBlur = () => {
    this.setState({ firstnameTouched: true });
  };

  handleLastnameChange = (lastname: string) => {
    if (lastname.length < 25) {
      this.setState({ lastname: lastname });
    }
    else {
      Alert.alert(
        'MsaMart',
        'Last Name must be maximum of 24 chars long'
      );
    }
  };
  handleLastnameSubmitPress = () => {
    if (this.address1InputRef.current) {
      this.address1InputRef.current.focus();
    }
  };
  handleLastnameBlur = () => {
    this.setState({ lastnameTouched: true });
  };

  handleAddress1Change = (address1: string) => {
    //this.setState({ address1: address1 });
    if (address1.length < 64) {
      this.setState({ address1: address1 });
    }
    else {
      Alert.alert(
        'MsaMart',
        'Address line must be of maximum 64 chars long'
      );
    }
  };
  handleAddress1SubmitPress = () => {
    if (this.address2InputRef.current) {
      this.address2InputRef.current.focus();
    }
  };
  handleAddress1Blur = () => {
    this.setState({ address1Touched: true });
  };

  handleAddress2Change = (address2: string) => {
    //this.setState({ address2: address2 });
    if (address2.length < 64) {
      this.setState({ address2: address2 });
    }
    else {
      Alert.alert(
        'MsaMart',
        'Address line must be of maximum 64 chars long'
      );
    }
  };
  handleAddress2SubmitPress = () => {
    if (this.zipInputRef.current) {
      this.zipInputRef.current.focus();
    }
  };
  handleAddress2Blur = () => {
    this.setState({ address2Touched: true });
  };

  handleZipChange = (zip: string) => {
    this.setState({ zip: zip });
  };
  handleZipSubmitPress = () => {
    if (this.phnumberInputRef.current) {
      this.phnumberInputRef.current.focus();
    }
  };
  handleZipBlur = () => {
    this.setState({ zipTouched: true });
  };

  handlePhnumberChange = (phnumber: string) => {
    this.setState({ phnumber: phnumber });
  };
  handlePhnumberSubmitPress = () => {
    if (this.phnumberInputRef.current) {
      this.phnumberInputRef.current.focus();
    }
  };
  handlePhnumberBlur = () => {
    this.setState({ phnumberTouched: true });
  };
  //--------------------------------------------------------------------------------------------


  onSuccessAdding(data) {
    //this.props.navigation.pop();
    if (data.status == true) {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
      this.props.navigation.pop();
    }
    else {
      if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
        Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
      }
    }
    //console.log(data)
  }
  onBtnPress = async () => {
    //console.log('onBtnPress');
    //{!firstname || !lastname || !country || !email || !address1 || !address2 || !state || !area || !zip || !phcode || !phnumber}
    if (!this.state.firstname || !this.state.lastname || !this.state.country || !this.state.email || !this.state.address1 || !this.state.address2 || !this.state.state ||  !this.state.zip ||  !this.state.phnumber) {
      Alert.alert(
        'MsaMart',
        'Please fill all mandatory fields in correct Format'
      );
    } else if (this.state.phnumber.length < 9 || this.state.phnumber.length > 14) {
      Alert.alert(
        'MsaMart',
        'Mobile number must be of min 9 digits.'
      );
    } else {
      let API = Api.addAddress;
      let data = JSON.stringify({ "address": { "FirstName": this.state.firstname, "LastName": this.state.lastname, "Email": this.state.email, "company": '', "CountryId": this.state.country, "StateProvinceId": this.state.state, "Address1": this.state.address1, "Address2": this.state.address2, "ZipPostalCode": this.state.zip, "county": "", "FaxNumber": "", "PhoneNumber": this.state.phnumber, "City": this.state.city, "CountryCode": this.state.phcode, "AddressAreaId": this.state.area } });
      //console.log(data);
      if (this.props.route.params != undefined && this.props.route.params != null&& this.props.route.params.passData && this.props.route.params.passData.Id) {
        API = Api.editAddress + '?addressId=' + this.state.AddressId;
        data = JSON.stringify({ "address": { "id": (this.props.route.params).passData.Id, "FirstName": this.state.firstname, "LastName": this.state.lastname, "Email": this.state.email, "company": '', "CountryId": this.state.country, "StateProvinceId": this.state.state, "Address1": this.state.address1, "Address2": this.state.address2, "ZipPostalCode": this.state.zip, "county": "", "FaxNumber": "", "PhoneNumber": this.state.phnumber, "City": this.state.city, "CountryCode": this.state.phcode, "AddressAreaId": this.state.area } });
      } else {
        API = Api.addAddress;
        data = JSON.stringify({ "address": { "FirstName": this.state.firstname, "LastName": this.state.lastname, "Email": this.state.email, "company": '', "CountryId": this.state.country, "StateProvinceId": this.state.state, "Address1": this.state.address1, "Address2": this.state.address2, "ZipPostalCode": this.state.zip, "county": "", "FaxNumber": "", "PhoneNumber": this.state.phnumber, "City": this.state.city, "CountryCode": this.state.phcode, "AddressAreaId": this.state.area } });
      }
      let Service = {
        apiUrl: API,
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: data,
        onSuccessCall: this.onSuccessAdding,
        onFailureAPI: this.onFailureAPI,
        onPromiseFailure: this.onPromiseFailure,
        onOffline: this.onOffline,
      };
      const serviceResponse = await ServiceCall(Service);
      this.setState({ loaderVisible: false });
    }
  }

  countryChange = async (value) => {
    this.setState({ loaderVisible: true });
    this.setState({ country: value })
    await this.getStateList(value);
    this.setState({ loaderVisible: false });
  }

  onSuccessCountryList(data) {
    console.log("---------------------------country:-----"+data+"---------------------------");
    if (data.status == true) {
      
      //let AvailableCountryCodes =[] //data.model.Address.AvailableCountryCode;
      //AvailableCountryCodes.map(({ Text, Value }) => ({ text: Text, value: Value }));
      // AvailableCountryCodes = AvailableCountryCodes.map(item => {
      //   return {
      //     value: item.Value,
      //     label: item.Text,
      //     text: item.Text,
      //     Value: item.Value,
      //     Text: item.Text,
      //   };
      // });
      let AvailableCountryArray = data.model.Address.AvailableCountries;
      AvailableCountryArray = AvailableCountryArray.map(item => { return { value: item.Value, label: item.Text, text: item.Text, Value: item.Value, Text: item.Text }; });
      //console.log(AvailableCountryArray);
      //console.log('AvailableCountryCodes');
      this.setState({
        countryArray: AvailableCountryArray,
        country: AvailableCountryArray[0].value,
        //countrycodeArray: AvailableCountryCodes,
        //phcode: AvailableCountryCodes[0].value,
      });
      this.getStateList(AvailableCountryArray[0].value)
    }
    else {
      if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
        Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
      }
    }
  }
  getCountryList = async () => {
    let Service = {
      apiUrl: Api.addAddress,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessCountryList,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }

  onSuccessStateList(data) {
    //console.log(data);
    data = data.model
    let AvailableStateArray = data;
    var statetoShow = ''
    if (this.props.route.params != undefined && this.props.route.params != null && this.props.route.params.passData && this.props.route.params.passData.Id) {
      AvailableStateArray = AvailableStateArray.map(item => {
        if ((this.props.route.params).passData.StateProvinceId == item.id) {
          statetoShow = item.id
        }
        //console.log('in if statment...',statetoShow,item.id,item)
        return {
          value: item.id, label: item.name, text: item.name, Value: item.id, Text: item.name
        }
      });

      //console.log(data);
      this.setState({
        stateArray: AvailableStateArray,
        state: statetoShow ? statetoShow : AvailableStateArray[0].Value,
      });
    } else {
      AvailableStateArray = AvailableStateArray.map(item => {
        //console.log('in if statment...',statetoShow,item.id,item)
        return {
          value: item.id, label: item.name, text: item.name, Value: item.id, Text: item.name
        }
      });

      //console.log(data);
      this.setState({
        stateArray: AvailableStateArray,
        state: AvailableStateArray[0].Value,
      });
    }


  }
  getStateList = async (countryId) => {
    let Service = {
      apiUrl: Api.getStateByCountryId +'?countryId=101&addSelectStateItem=true',
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessStateList,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }

  stateChange = async (value) => {
    this.setState({ loaderVisible: true });
    this.setState({ state: value })
    //await this.getCityList(value);
    this.setState({ loaderVisible: false });
  }

  // onSuccessCityList(data) {
  //   //console.log(data);
  //   data = data.model
  //   var cityToShow = 0;
  //   let AvailableCityArray = data;
  //   console.log(" AVAILABLE CITY ARRAY1", AvailableCityArray)
  //   if (this.props.route.params != undefined && this.props.route.params != null && this.props.route.params.passData && this.props.route.params.passData.Id) {
  //     AvailableCityArray = AvailableCityArray.map(item => {
  //       if ((this.props.route.params).passData.CityId == item.id) {
  //         cityToShow = item.id
  //       }
  //       return { value: item.id, label: item.name, text: item.name, Value: item.id, Text: item.name }
  //     });
  //     //console.log(data);
  //     this.setState({
  //       cityArray: AvailableCityArray,
  //       city: cityToShow ? cityToShow : AvailableCityArray[0].Value,
  //     });
  //   } else {
  //     AvailableCityArray = AvailableCityArray.map(item => {
  //       return { value: item.id, label: item.name, text: item.name, Value: item.id, Text: item.name }
  //     });
  //     //console.log(data);
  //     this.setState({
  //       cityArray: AvailableCityArray,
  //       city: AvailableCityArray[0].Value,
  //     });
  //   }

  // }
  /*getCityList = async (stateId) => {
    //console.log(stateId);
    let Service = {
      apiUrl: Api.getCityByStateId + '?stateId=' + stateId,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessCityList,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }*/

  cityChange = async (value) => {
    let city = value;
    this.setState({ city })
    //await this.getAreaList(value);
  }

  onSuccessAreaList(data) {
    //console.log(data);
    data = data.model
    let AvailableAreaArray = data;
    var areaToShow = ''
    if (this.props.route.params != undefined && this.props.route.params != null && this.props.route.params.passData && this.props.route.params.passData.Id) {
      AvailableAreaArray = AvailableAreaArray.map(item => {
        if ((this.props.route.params).passData.AddressAreaId == item.id) {
          areaToShow = item.id
        }
        return { value: item.id, label: item.name, text: item.name, Value: item.id, Text: item.name }
      });

      //console.log(data);
      this.setState({
        areaArray: AvailableAreaArray,
        area: areaToShow ? areaToShow : AvailableAreaArray[0].Value,
      });
    } else {
      AvailableAreaArray = AvailableAreaArray.map(item => {
        return { value: item.id, label: item.name, text: item.name, Value: item.id, Text: item.name }
      });

      //console.log(data);
      this.setState({
        areaArray: AvailableAreaArray,
        area: AvailableAreaArray[0].Value,
      });
    }

  }
  /*getAreaList = async (cityId) => {
    let Service = {
      apiUrl: Api.getAreaByCityId + '?cityId=' + cityId,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessAreaList,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    //console.log('-----area url-------',Service.apiUrl)
    const serviceResponse = await ServiceCall(Service);
  }*/
  //--------------------------------------------------------------------------------------------
  render() {




    const {
      firstname,
      lastname,
      country,
      email,
      address1,
      address2,
      state,
      area,
      zip,
      phcode,
      phnumber,
      firstnameTouched,
      lastnameTouched,
      countryTouched,
      emailTouched,
      address1Touched,
      address2Touched,
      stateTouched,
      areaTouched,
      zipTouched,
      phcodeTouched,
      phnumberTouched,
      emailFormat,
      AddressId,
    } = this.state;
    var firstnameError = undefined;
    if (!firstname && firstnameTouched) {


      firstnameError = Strings.FIRST_NAME_REQUIRED;
    } else if (firstnameTouched && firstname == '') {


      firstnameError = Strings.FIRST_NAME_REQUIRED;
    } else {

      firstnameError = undefined;
    }

    var lastnameError = undefined;
    if (!lastname && lastnameTouched) {

      lastnameError = Strings.LAST_NAME_REQUIRED;
    } else if (lastnameTouched && lastname == '') {

      lastnameError = Strings.LAST_NAME_REQUIRED;
    } else {

      lastnameError = undefined;
    }

    var emailError = undefined;
    if (!email && emailTouched) {

      emailError = Strings.EMAIL_REQUIRED;
    } else if (emailTouched && !emailFormat) {

      emailError = Strings.EMAIL_WRONG_FORMAT;
    } else {

      emailError = undefined;
    }

    var address1Error = undefined;
    if (!address1 && address1Touched) {
      address1Error = Strings.ADDRESS1_REQUIRED;
    } else if (address1Touched && address1 == '') {
      address1Error = Strings.ADDRESS1_REQUIRED;
    } else {
      address1Error = undefined;
    }

    var address2Error = undefined;
    if (!address2 && address2Touched) {
      address2Error = Strings.ADDRESS2_REQUIRED;
    } else if (address2Touched && address2 == '') {
      address2Error = Strings.ADDRESS2_REQUIRED;
    } else {
      address2Error = undefined;
    }

    var zipError = undefined;
    if (!zip && zipTouched) {

      zipError = Strings.ZIP_REQUIRED;
    } else if (zipTouched && zip == '') {

      zipError = Strings.ZIP_REQUIRED;
    } else {

      zipError = undefined;
    }

    var phnumberError = undefined;
    if (!phnumber && phnumberTouched) {

      phnumberError = Strings.PHNUMBER_REQUIRED;
    } else if (phnumberTouched && phnumber == '') {


      phnumberError = Strings.PHNUMBER_REQUIRED;
    } //else if (phnumber.length < 9 || phnumber.length > 14) {

      //phnumberError = 'Number must be of min 9 digits';
     else {

      phnumberError = undefined;
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
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <Header
            burgerMenuClick={(data) => {
              //this.props.navigation.toggleDrawer();
              this.props.navigation.dispatch(DrawerActions.openDrawer());
              //this.props.navigation.openDrawer()
            }}
            countryModel={this.state.currentCountryModel}
            shipToEnabled={this.state.shipToEnabled}
            shipToButtonClick={this.handleShipToButtonClick}
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
              <FormTextInput
                error_testId={"Error_Address_Email"}
                testID="Address_Email"
                accessibilityLabel="Address_Email"
                inputStyle={styles.inputStyle}
                style={styles.inputContainer}
                ref={this.emailInputRef}
                value={this.state.email}
                onChangeText={this.handleEmailChange}
                onSubmitEditing={this.handleEmailSubmitPress}
                placeholder={Strings.EMAIL}
                placeholderTextColor={Colors.GRAY_TEXT}
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                title={Strings.EMAIL}
                mandatory={true}
                titleStyles={styles.titleStyle}
                leftIcon={false}
                withBorder={true}
                onBlur={this.handleEmailBlur}
                error={emailError}
                blurOnSubmit={Constants.IS_IOS}
              />

              {this.state.countryEnabled &&
                <>
                  <Text style={styles.titleStyle}>{Strings.COUNTRY}<Text style={{ color: Colors.PRIMARY }}>*</Text></Text>


                  {Platform.OS == "android" ?

                    <View style={[styles.dropdownContainer]}>
                      <Picker
                        testID="Address_CountryId"
                        accessibilityLabel="Address_CountryId"
                        selectedValue={this.state.country}
                        style={[styles.dropdownContainerInner]}
                        onValueChange={(selCountry, index) => this.countryChange(selCountry)} >
                        {this.state.countryArray.map((item, index) => {
                          return <Picker.Item key={index} value={item.Value} label={item.Text} />
                        })}

                      </Picker>
                    </View>
                    :
                    <View style={[styles.dropdownContainerIos]}><RNPickerSelect
                      testID="Address_CountryId"
                      accessibilityLabel="Address_CountryId"
                      value={this.state.country}
                      placeholder={''}
                      viewContainer={{ marginTop: 10 }}
                      style={{ ...pickerStyle }}
                      onValueChange={(value, index) => this.countryChange(value)}
                      items={this.state.countryArray}
                    />
                    </View>}
                </>
              }
              {/* </View> */}
              <FormTextInput
                error_testId={"Error_Address_FirstName"}
                testID="Address_FirstName"
                accessibilityLabel="Address_FirstName"
                inputStyle={styles.inputStyle}
                style={styles.inputContainer}
                ref={this.firstnameInputRef}
                value={this.state.firstname}
                maxLength={25}
                multiline={false}
                onChangeText={this.handleFirstnameChange}
                onSubmitEditing={this.handleFirstnameSubmitPress}
                placeholder={Strings.FIRST_NAME}
                placeholderTextColor={Colors.GRAY_TEXT}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                title={Strings.FIRST_NAME}
                mandatory={true}
                titleStyles={styles.titleStyle}
                leftIcon={false}
                withBorder={true}
                onBlur={this.handleFirstnameBlur}
                error={firstnameError}
                blurOnSubmit={Constants.IS_IOS}
              />
              <FormTextInput
                error_testId={"Error_Address_LastName"}
                testID="Address_LastName"
                accessibilityLabel="Address_LastName"
                inputStyle={styles.inputStyle}
                style={styles.inputContainer}
                ref={this.lastnameInputRef}
                value={this.state.lastname}
                maxLength={25}
                multiline={false}
                onChangeText={this.handleLastnameChange}
                onSubmitEditing={this.handleLastnameSubmitPress}
                placeholder={Strings.LAST_NAME}
                placeholderTextColor={Colors.GRAY_TEXT}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                title={Strings.LAST_NAME}
                mandatory={true}
                titleStyles={styles.titleStyle}
                leftIcon={false}
                withBorder={true}
                onBlur={this.handleLastnameBlur}
                error={lastnameError}
                blurOnSubmit={Constants.IS_IOS}
              />
              {this.state.streetAddressEnabled &&
                <FormTextInput
                  testID="addressLine1"
                  accessibilityLabel="addressLine1"
                  inputStyle={styles.inputStyle}
                  style={styles.inputContainer}
                  ref={this.address1InputRef}
                  value={this.state.address1}
                  maxLength={65}
                  multiline={false}
                  onChangeText={this.handleAddress1Change}
                  onSubmitEditing={this.handleAddress1SubmitPress}
                  placeholder={Strings.ADDRESS1}
                  placeholderTextColor={Colors.GRAY_TEXT}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  title={Strings.ADDRESS1}
                  mandatory={true}
                  titleStyles={styles.titleStyle}
                  leftIcon={false}
                  withBorder={true}
                  onBlur={this.handleAddress1Blur}
                  error={address1Error}
                  blurOnSubmit={Constants.IS_IOS}
                />
              }
              {this.state.streetAddress2Enabled &&
                <FormTextInput
                  testID="addressLine2"
                  accessibilityLabel="addressLine2"
                  inputStyle={styles.inputStyle}
                  style={styles.inputContainer}
                  ref={this.address2InputRef}
                  value={this.state.address2}
                  maxLength={65}
                  multiline={false}
                  onChangeText={this.handleAddress2Change}
                  onSubmitEditing={this.handleAddress2SubmitPress}
                  placeholder={Strings.ADDRESS2}
                  placeholderTextColor={Colors.GRAY_TEXT}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  title={Strings.ADDRESS2}
                  mandatory={true}
                  titleStyles={styles.titleStyle}
                  leftIcon={false}
                  withBorder={true}
                  onBlur={this.handleAddress2Blur}
                  error={address2Error}
                  blurOnSubmit={Constants.IS_IOS}
                />
              }
              {this.state.countryEnabled && this.state.stateProvinceEnabled &&
                <>
                  <Text style={styles.titleStyle}>{Strings.EMIRATE}<Text style={{ color: Colors.PRIMARY }}>*</Text></Text>


                  {Platform.OS == "android" ?

                    <View style={[styles.dropdownContainer]}>
                      <Picker
                        testID="stateSelect"
                        accessibilityLabel="stateSelect"
                        selectedValue={this.state.state}
                        style={[styles.dropdownContainerInner]}
                        onValueChange={(selCountry, index) => this.stateChange(selCountry)} >
                        {this.state.stateArray.map((item, index) => {
                          return <Picker.Item key={index} value={item.Value} label={item.Text} />
                        })}

                      </Picker>
                    </View>
                    :
                    <View style={[styles.dropdownContainerIos]}><RNPickerSelect
                      testID="stateSelect"
                      accessibilityLabel="stateSelect"
                      value={this.state.state}
                      placeholder={''}
                      style={{ ...pickerStyle }}
                      viewContainer={{ marginTop: 10 }}
                      onValueChange={(value, index) => this.stateChange(value)}
                      items={this.state.stateArray}
                    />
                    </View>}
                </>
              }
              {this.state.cityEnabled && this.state.countryEnabled &&
              <>

                <Text style={styles.titleStyle}>{Strings.CITY}<Text style={{ color: Colors.PRIMARY }}>*</Text></Text>
                <FormTextInput
                error_testId={"Error_city"}
                testID="city"
                accessibilityLabel="city"
                inputStyle={styles.inputStyle}
                style={styles.inputContainer}
                value={this.state.city}
                onChangeText={this.cityChange}
                placeholder={Strings.city}
                placeholderTextColor={Colors.GRAY_TEXT}
                autoCorrect={false}
                keyboardType="default"
                title={Strings.city}
                mandatory={true}
                titleStyles={styles.titleStyle}
                leftIcon={false}
                withBorder={true}
                blurOnSubmit={Constants.IS_IOS}
                />
                </>
              }
              {/* {this.state.cityEnabled && this.state.countryEnabled &&
                <>
                  <Text style={styles.titleStyle}>{Strings.CITY}<Text style={{ color: Colors.PRIMARY }}>*</Text></Text>

                  {Platform.OS == "android" ?
                    <View style={[styles.dropdownContainer]}>
                      <Picker
                        testID="citySelect"
                        accessibilityLabel="citySelect"
                        selectedValue={this.state.city}
                        style={[styles.dropdownContainerInner]}
                        onValueChange={(value, index) => this.cityChange(value)} >

                        {this.state.cityArray.map((item, index) => {
                          return <Picker.Item key={index} value={item.Value} label={item.Text} />
                        })}

                      </Picker>

                    </View>
                    :
                    <View style={[styles.dropdownContainerIos]}><RNPickerSelect
                      testID="citySelect"
                      accessibilityLabel="citySelect"
                      value={this.state.city}
                      placeholder={''}
                      style={{ ...pickerStyle }}
                      viewContainer={{ marginTop: 10 }}
                      onValueChange={(value, index) => this.cityChange(value)}
                      items={this.state.cityArray}
                    />
                    </View>}
                </>
              } */}
              {/* {this.state.countryEnabled && this.state.stateProvinceEnabled && this.state.addressAreaEnabled &&
                <>
                  <Text style={styles.titleStyle}>{Strings.AREA}<Text style={{ color: Colors.PRIMARY }}>*</Text></Text>
                  {Platform.OS == "android" ?

                    <View style={[styles.dropdownContainer]}>
                      <Picker
                        testID="areaSelect"
                        accessibilityLabel="areaSelect"
                        selectedValue={this.state.area}
                        style={[styles.dropdownContainerInner]}
                        onValueChange={(value, index) => this.setState({ area: value })} >
                        {this.state.areaArray.map((item, index) => {
                          return <Picker.Item key={index} value={item.Value} label={item.Text} />
                        })}

                      </Picker>
                    </View>
                    :
                    <View style={[styles.dropdownContainerIos]}><RNPickerSelect
                      testID="areaSelect"
                      accessibilityLabel="areaSelect"
                      value={this.state.area}
                      placeholder={''}
                      style={{ ...pickerStyle }}
                      viewContainer={{ marginTop: 10 }}
                      onValueChange={(value, index) => this.setState({ area: value })}
                      items={this.state.areaArray}
                    />
                    </View>}
                </>
              } */}
              {this.state.zipPostalCodeEnabled &&
                <FormTextInput
                  error_testId={"Error_Address_ZipPostalCode"}
                  testID="Address_ZipPostalCode"
                  accessibilityLabel="Address_ZipPostalCode"
                  inputStyle={styles.inputStyle}
                  style={styles.inputContainer}
                  ref={this.zipInputRef}
                  value={this.state.zip}
                  onChangeText={this.handleZipChange}
                  onSubmitEditing={this.handleZipSubmitPress}
                  placeholder={Strings.ZIP}
                  placeholderTextColor={Colors.GRAY_TEXT}
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  title={Strings.ZIP}
                  mandatory={true}
                  titleStyles={styles.titleStyle}
                  leftIcon={false}
                  withBorder={true}
                  onBlur={this.handleZipBlur}
                  error={zipError}
                  blurOnSubmit={Constants.IS_IOS}
                />
              }
              {
                this.state.phoneEnabled &&
                <>
                  <Text style={styles.titleStyle}>{Strings.PHONE_NUMBER}<Text style={{ color: Colors.PRIMARY }}>*</Text></Text>
                  <View style={styles.phoneContainer}>
                    {/* <View style={styles.phCodeCont}>

                      {Platform.OS == "android" ?

                        <View style={[styles.codeDropdown]}><Picker

                          selectedValue={this.state.phcode}
                          style={[styles.codeDropdownInner]}
                          onValueChange={(value, index) => this.setState({ phcode: value })} >
                          {this.state.countrycodeArray.map((item, index) => {
                            return <Picker.Item key={index} value={item.value} label={item.text} />
                          })}

                        </Picker>
                        </View>
                        :
                        <View style={[styles.codeDropdownIos]}><RNPickerSelect
                          value={this.state.phcode}
                          placeholder={''}
                          style={{ ...pickerStyle2 }}
                          onValueChange={(value, index) => this.setState({ phcode: value })}
                          items={this.state.countrycodeArray}
                        />
                        </View>}
                    </View> */}
                    <View style={styles.phCodeCont}>
                      <FormTextInput
                        error_testId={"phoneNumberError"}
                        inputStyle={styles.inputStyle}
                        style={[styles.inputContainer]}
                        ref={this.phnumberInputRef}
                        value={this.state.phnumber}
                        onChangeText={this.handlePhnumberChange}
                        onSubmitEditing={this.handlePhnumberSubmitPress}
                        placeholder={Strings.PHONE_NUMBER}
                        placeholderTextColor={Colors.GRAY_TEXT}
                        autoCorrect={false}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        leftIcon={false}
                        withBorder={true}
                        onBlur={this.handlePhnumberBlur}
                        error={phnumberError}
                        blurOnSubmit={Constants.IS_IOS}
                      />
                    </View>
                  </View>
                </>
              }
              <Button
                testId={"saveBtn"}

                title={this.state.btnText}
                disabled={false}//{!firstname || !lastname || !country || !email || !address1 || !address2 || !state || !area || !zip || !phcode || !phnumber}
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
                OnClick={(data) => this.onBtnPress()}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
