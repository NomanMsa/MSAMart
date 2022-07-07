import React, { Component } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  LogBox,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
//import DatePicker from 'react-native-datepicker'
import {
  Button,
  Header,
  SearchBar,
  OfflineNotice,
  FormTextInput,
  Footer,
} from '@components';
import DatePicker from 'react-native-date-picker'
//import DateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePicker from "react-native-modal-datetime-picker";
import { ServiceCall } from '@utils';
import { Constants, Strings } from '@config';
import { Api } from '@config';
import { FormatDate } from '@utils'
import styles from './CustomerInfoStyles';
import { Colors } from '@theme';
import { DrawerActions } from '@react-navigation/native';

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
interface State { fullname: string; dob: string; gender: string; email: string; phcode: string; phnumber: string; fullnameTouched: boolean; emailTouched: boolean; emailFormat: boolean; }
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fullname: '',
      email: '',
      phcode: '1',
      phnumber: '',
      dob: new Date(),
      fullnameTouched: false,
      emailTouched: false,
      phcodeTouched: false,
      phnumberTouched: false,
      emailFormat: false,
      countrycodeArray: [],
      gender: 'M',
      shipToEnabled: false,
      currentCountryModel: null,
    };
    this.onSuccessSaving = this.onSuccessSaving.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.onSuccessfetchUserInfo = this.onSuccessfetchUserInfo.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.setDateDOB = this.setDateDOB.bind(this);
    this.convDate = this.convDate.bind(this);
  }
  async componentDidMount() {
    this.setState({ loading: true });
    await this.fetchUserInfo();
    this.setState({ loading: false });
  }
  emailInputRef = React.createRef<FormTextInput>();
  fullnameInputRef = React.createRef<FormTextInput>();
  phnumberInputRef = React.createRef<FormTextInput>();
  //---------------------------------------------***********************----------------------------------//
  convDate(dateStr) {
    // From mm-dd-yyyy to yyyy-mm-ddThh:MM:ssZ
    var dArr = dateStr.split("-");
    if (dArr[0].length == 1) { dArr[0] = '0' + dArr[0] }
    if (dArr[1].length == 1) { dArr[1] = '0' + dArr[1] }
    console.log(dArr[2] + "-" + dArr[0] + "-" + dArr[1] + "T00:00:00.000Z")
    return dArr[2] + "-" + dArr[0] + "-" + dArr[1] + "T00:00:00.000Z"; //2017-09-13T00:13:28
  }
  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }
  onSuccessfetchUserInfo = (data) => {
    console.log(data);
    data = data.model;
    //console.log(data.DateOfBirthMonth +'-'+ data.DateOfBirthDay +'-'+ data.DateOfBirthYear);
    let dataDOB = new Date();
    if (data.DateOfBirthMonth && data.DateOfBirthDay && data.DateOfBirthYear) {
      dataDOB = new Date(this.convDate(data.DateOfBirthMonth + '-' + data.DateOfBirthDay + '-' + data.DateOfBirthYear))
    }
  /*  let AvailableCountryCodes = data.AvailableCountryCode;
   let AvailableCountryCodes = AvailableCountryCodes.map(item => {
      return {
        value: '0',
        label: 'Code',
        text: 'Code',
        Value: 91,
        Text: item.Text,
      };
    });*/
    this.setState({
      //countrycodeArray: AvailableCountryCodes,
      fullname: data.FirstName,
      email: data.Email,
      dob: dataDOB,
      gender: data.Gender,
      phcode: data.CountryCode,
      phnumber: data.Phone,
      
    });
    console.log("-----------------------------------------------------done---"+this.state.fullname +"set///////////////////////////////////////");
    console.log("-----------------------------------------------------done---"+data.FirstName +"set///////////////////////////////////////");

    if (data.CommonShipToModel) {
      this.setState({
        shipToEnabled: data.CommonShipToModel.IsShipToEnable,
        currentCountryModel: data.CommonShipToModel.CurrentCountryModel,
      });
    }
    console.log(this.state.dob);
    console.log(new Date());
    console.log((new Date()).toLocaleString() == (this.state.dob).toLocaleString());
    console.log(new Date(this.state.dob));
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
  fetchUserInfo = async () => {
    //console.log(addId);
    let Service = {
      apiUrl: Api.userInfo,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchUserInfo,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  //---------------------------------------------***********************----------------------------------//

  handleFirstnameChange = (fullname: string) => {
    this.setState({ fullname: fullname });
  };
  handleFirstnameSubmitPress = () => {
    Keyboard.dismiss()
    // if (this.lastnameInputRef.current) {
    //   this.lastnameInputRef.current.focus();
    // }
  };
  handleFirstnameBlur = () => {
    this.setState({ fullnameTouched: true });
  };
  handleEmailChange = (email: string) => {
    this.setState({ email: email });
    let reg = Constants.IS_VALID_EMAIL_REGEX;//^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      this.setState({ emailFormat: false })
      return false;
    }
    else {
      this.setState({ emailFormat: true })
    }
  };

  handleEmailSubmitPress = () => {
    // if (this.fullnameInputRef.current) {
    //   this.fullnameInputRef.current.focus();
    // }

    Keyboard.dismiss()
  };
  handleEmailBlur = () => {
    let email = this.state.email;
    let reg = Constants.IS_VALID_EMAIL_REGEX;//^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      this.setState({ emailFormat: false })
      return false;
    }
    else {
      this.setState({ emailFormat: true })
    }

    this.setState({ emailTouched: true });
  };

  handlePhnumberChange = (phnumber: string) => {
    this.setState({ phnumber: phnumber });
  };
  handlePhnumberSubmitPress = () => {
    // if (this.phnumberInputRef.current) {
    //   this.phnumberInputRef.current.focus();
    // }
    Keyboard.dismiss()
  };
  handlePhnumberBlur = () => {
    this.setState({ phnumberTouched: true });
  };
  //--------------------------------------------------------------------------------------------


  onSuccessSaving(data) {
    //Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
    if (data.message && data.message.length > 0) { setTimeout(() => { Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM) }, 500); }
    else if (data.errorlist && data.errorlist.length > 0) { setTimeout(() => { Alert.alert(data.errorlist[0]) }, 500); }
  }

  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
  onBtnPress = async () => {
    // if(!this.state.fullname || !this.state.email ||  !this.state.phcode || !this.state.phnumber){
    //   console.log('Please fill all details');
    // }
    if (!this.state.fullname || !this.state.email) {
      Alert.alert(
        'MsaMart',
        'Please fill all mandatory fields in correct Format'
      );
     } 
    //else if (this.state.phnumber.length < 9 || this.state.phnumber.length > 14) {
    //   Alert.alert(
    //     'MsaMart',
    //     'Phone number must be of min 9 digits.'
    //   );
    // }
     else {
      console.log(this.state.dob);
      let dateOfBirth = new Date()
      //if (this.state.dob != undefined && this.state.dob != null && this.isValidDate(this.state.dob)) {
      dateOfBirth = (this.state.dob.toString()).split(/\//).reverse().join('/');
      // }

      console.log(JSON.stringify({ "FirstName": this.state.fullname, "Email": this.state.email, "Gender": this.state.gender, "DateOfBirthDay": new Date(dateOfBirth).getDate(), "DateOfBirthMonth": (new Date(dateOfBirth).getMonth()) + 1, "DateOfBirthYear": new Date(dateOfBirth).getFullYear(), "CountryCode": this.state.phcode }));
      console.log(dateOfBirth);
      let Service = {
        apiUrl: Api.userInfo,
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: JSON.stringify({ "FirstName": this.state.fullname, "Email": this.state.email, "Gender": this.state.gender, "DateOfBirthDay": new Date(dateOfBirth).getDate(), "DateOfBirthMonth": (new Date(dateOfBirth).getMonth()) + 1, "DateOfBirthYear": new Date(dateOfBirth).getFullYear()}),
        onSuccessCall: this.onSuccessSaving,
        onFailureAPI: this.onFailureAPI,
        onPromiseFailure: this.onPromiseFailure,
        onOffline: this.onOffline,
      };
      this.setState({ loading: true });
      await ServiceCall(Service);
      this.setState({ loading: false });
    }
  }
  setDateDOB = (event, date) => {
    console.log(event);
    console.log(date);
    if (event.type == 'set') {
      this.setState({
        dob: date,
        showDtPicker: false,
      });
    }
  }


  //--------------------------------------------------------------------------------------------
  render() {
    const {
      fullname,
      email,
      phcode,
      phnumber,
      fullnameTouched,
      emailTouched,
      phcodeTouched,
      phnumberTouched,
      emailFormat,
    } = this.state;
    var fullnameError = undefined;
    if (!fullname && fullnameTouched) {
      fullnameError = Strings.FULL_NAME_REQUIRED;
    } else if (fullnameTouched && fullname == '') {
      fullnameError = Strings.FULL_NAME_REQUIRED;
    } else {
      fullnameError = undefined;
    }
    var emailError = undefined;
    if (!email && emailTouched) {
      emailError = Strings.EMAIL_REQUIRED;
    } else if (emailTouched && !emailFormat) {
      emailError = Strings.EMAIL_WRONG_FORMAT;
    } else {
      emailError = undefined;
    }
    var phnumberError = undefined;
    if (!phnumber && phnumberTouched) {
      phnumberError = Strings.PHNUMBER_REQUIRED;
    } else if (phnumberTouched && phnumber == '') {
      phnumberError = Strings.PHNUMBER_REQUIRED;
    } else if (phnumberTouched && (phnumber.length < 9 || phnumber.length > 14)) {
      phnumberError = 'Number must be of min 9 digits';
    } else {
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
          {/* <Header
            burgerMenuClick={(data) => {
              this.props.navigation.toggleDrawer();
            }} */}
          <Header
            backBtn_TestId={"menuArrow"}
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
                testId={"fullName"}
                inputStyle={styles.inputStyle}
                style={styles.inputContainer}
                ref={this.fullnameInputRef}
                value={this.state.fullname}
                onChangeText={this.handleFirstnameChange}
                onSubmitEditing={this.handleFirstnameSubmitPress}
                placeholder={Strings.FIRST_NAME}
                placeholderTextColor={Colors.GRAY_TEXT}
                autoCorrect={false}
                mandatory={true}
                keyboardType="default"
                returnKeyType="done"
                title={Strings.FIRST_NAME}
                titleStyles={styles.titleStyle}
                leftIcon={false}
                withBorder={true}
                onBlur={this.handleFirstnameBlur}
                error={fullnameError}
                blurOnSubmit={Constants.IS_IOS}
              />
              <Text style={styles.dtPickerTitleText}>{Strings.DOB}<Text style={{ color: Colors.PRIMARY }}> *</Text></Text>
              {/* <TouchableOpacity style={styles.dtPickerContainer} onPress={() => this.setState({showDtPicker: true})}>
                  {((new Date()).toLocaleString() == (this.state.dob).toLocaleString()) ? <Text></Text>:<Text style={styles.dateTxt}>{FormatDate.formatDate(this.state.dob, 'dd/mm/yyyy')}</Text>}
                </TouchableOpacity> */}
              {/* {this.state.showDtPicker && <DateTimePicker
                  value={this.state.dob}
                  mode={'date'}
                  is24Hour={false}
                  display="default"
                  maximumDate={new Date()}
                  onChange={this.setDateDOB} 
                  style={{width: 320, backgroundColor: "white"}}
                />} */}
              <DatePicker
                testID={"dateOfBirth"}
                accessibilityLabel="dateOfBirth"
                date={this.state.dob}
                mode="date"
                //display={Platform.OS === 'ios'?'spinner':'calendar'}
                placeholder={FormatDate.formatDate(this.state.dob, 'dd/mm/yyyy')}
                format="DD/MM/YYYY"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                testID={"dateOfBirth"}
                accessibilityLabel="dateOfBirth"
                style={[styles.dtPickerContainer, { justifyContent: 'center' }]}
                customStyles={{
                  dateInput: {
                    position: 'absolute',
                    left: 15,
                    marginLeft: 0,
                    borderWidth: 0,
                  },
                  datePicker: {
                    justifyContent: 'center',
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ dob: date }) }}
              />

              <Text style={styles.dtPickerTitleText}>{Strings.GENDER}<Text style={{ color: Colors.PRIMARY }}> *</Text></Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  testID={"genderMale"}
                  accessibilityLabel="genderMale"
                  style={styles.genderBtn} onPress={() => this.setState({ gender: 'M' })}>
                  {this.state.gender == 'M' ? <View style={styles.selectedRadio}>
                    <View style={styles.selectedInner}>
                    </View>
                  </View> : <View style={styles.unSelectedRadio}>
                  </View>}
                  <Text style={styles.genderTitleText}>{Strings.MALE}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID={"genderFemale"}
                  accessibilityLabel="genderFemale"
                  style={styles.genderBtn} onPress={() => this.setState({ gender: 'F' })}>
                  {this.state.gender == 'F' ? <View style={styles.selectedRadio}>
                    <View style={styles.selectedInner}>
                    </View>
                  </View> : <View style={styles.unSelectedRadio}>
                  </View>}
                  <Text style={styles.genderTitleText}>{Strings.FEMALE}</Text>
                </TouchableOpacity>
              </View>
             
              <FormTextInput
                testId={"emailId"}
                inputStyle={styles.inputStyle}
                style={styles.inputContainer}
                ref={this.emailInputRef}
                value={this.state.email}
                onChangeText={this.handleEmailChange}
                onSubmitEditing={this.handleEmailSubmitPress}
                placeholder={Strings.EMAIL}
                placeholderTextColor={Colors.GRAY_TEXT}
                autoCorrect={false}
                mandatory={true}
                keyboardType="email-address"
                returnKeyType="done"
                title={Strings.EMAIL}
                titleStyles={styles.titleStyle}
                leftIcon={false}
                withBorder={true}
                onBlur={this.handleEmailBlur}
                error={emailError}
                blurOnSubmit={Constants.IS_IOS}
              />
              <Button
                testId={"saveCustomerInfo"}
                title={Strings.SAVE}
                //disabled={!fullname || !email ||  !phcode || !phnumber}
                btnStyle={{ borderWidth: 0, width: width - 60, marginTop: 30 }}
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
