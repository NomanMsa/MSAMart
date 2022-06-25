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
  LogBox,
  Platform,
  Alert,
  Linking,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { Images, Loaders, Icons } from '@assets';
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import { Button, OfflineNotice, FormTextInput } from '@components';
import Home from '../../HomeModule/Home/Home';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api } from '@config';
import Toast from 'react-native-simple-toast';
import styles from './PasswordRecoveryStyles';
import { Colors } from '@theme';
import url from 'url';


var token;
var emailString;
// interface State { email: string; password: string; emailTouched: boolean; passwordTouched: boolean; emailFormat: boolean; passwordFormat: boolean; loaderVisible: boolean; secureTextPwd: boolean; }
export default class PasswordRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextConfirmPassword: true,
      secureTextPwd: true,
      password: '',
      confirmpassword: '',
      secureText: true,
      errorMessage: '',
      emailFormat: true,
      confirmPasswordMatch: true,
      token1: '',
      // loaderVisible: true,
    };
  }
  onReceiveURL = async (link) => {
    console.log('link333333-----', link);
    var completeHtmlLink = link.hasOwnProperty("url")? link.url: link;

    // console.log("------initial url ----", link);
    var queryParamHtmlString = completeHtmlLink.split('?')[1];
    var queryParams = queryParamHtmlString.replace('?', '').split('&').map(param => param.split('='))
                    .reduce((values, [ key, value ]) => {
                      values[ key ] = value
                      return values
                    }, {});
    token = queryParams['token'].trim();
    emailString = queryParams['email'].trim();

    console.log("------Token ----", token);
    console.log("------Email String ----", emailString);
    console.log("Parsed url --" +url);
    console.log('initial url on pwd refcovery ---', url);
    let Service = {
      apiUrl: Api.PasswordRecoveryUserValidation + queryParamHtmlString, //token + '&email=' + email,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessUserValidation,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    console.log('service---', Service);
    const serviceResponse = await ServiceCall(Service);
  };
  async componentDidMount() {
    var initialUrl = await Linking.getInitialURL();
    if (initialUrl) {
      this.onReceiveURL(initialUrl);
      console.log("------initial url  ----", initialUrl);
    } else if ( this.props.route.params.passData !=null && this.props.route.params.passData.originalUrl!=null) { 
      this.onReceiveURL(this.props.route.params.passData.originalUrl);
      console.log("------Url passed from home page  ----", this.props.route.params.originalUrl);
    }
    Linking.addEventListener('url', this.onReceiveURL);
  }
  onSuccessUserValidation = async (data) => {
    const j = JSON.parse(JSON.stringify(data));

    console.log('json data status--------------- ', j.status);
    if (j.status === true) {
      this.setState({ userStatus: true, loaderVisible: false });
    } else {
      this.setState({ userStatus: false });
    }
  };
  onFailureAPI(data) {
    console.log('onFailureAPI--', data);
    if( data.message!=null && data.message.length > 0 ){
      Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
    }
  }
  onPromiseFailure(data) {
    console.log('onPromiseFailure--', data);
    if( data.message!=null && data.message.length > 0 ){
      Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
    }
  }
  onOffline(data) {
    console.log('onOffline--', data);
  }
  toggleConfirmPwdShowHide = () => {
    this.setState({
      secureTextConfirmPassword: !this.state.secureTextConfirmPassword,
    });
  };
  togglePwdShowHide = () => {
    this.setState({ secureTextPwd: !this.state.secureTextPwd });
  };

  renderHeader = () => {
    return (
      <View style={[styles.headerContainer]}>
        <TouchableOpacity
          style={{ padding: 10, marginRight: -10, marginLeft: -10 }}
          onPress={() => this.props.navigation.pop()}>
          <Image style={styles.backAvatar} source={Icons.arrowBack} />
        </TouchableOpacity>
        <View style={[styles.loginHeaderTextContainer]}>
          <Text style={styles.headerText}> Set New Password </Text>
        </View>
      </View>
    );
  };
  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
    let regPwd = Constants.IS_VALID_PASSWORD_REGEX; //^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    if (regPwd.test(password) === false) {
      console.log('new pwd is Not Correct');
      this.setState({ passwordFormat: false });
      return false;
    } else {
      this.setState({ passwordFormat: true });
    }
  };
  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };
  handleConfirmpasswordChange = (confirmpassword: string) => {
    console.log('confrm pwd -', this.state.password, '--', confirmpassword);
    this.setState({ confirmpassword: confirmpassword });
    if (this.state.password !== confirmpassword) {
      console.log('if cnfrm pwd not match.');
      this.setState({ confirmPasswordMatch: false });
    } else {
      this.setState({ confirmPasswordMatch: true });
    }
  };
  handleConfirmpasswordBlur = () => {
    this.setState({ confirmpasswordTouched: true });
  };

  _onSavePassword = async (confirmpasswordError) => {
    if (!this.state.password || !this.state.confirmpassword) {
      Toast.showWithGravity(
        'Please fill all mandatory fields in correct Format',
        Toast.LONG,
        Toast.BOTTOM,
      );
      // Alert.alert(
      //   'MsaMart',
      //   'Please fill all mandatory fields in correct Format'
      // );
    } else if (confirmpasswordError == Strings.CONFIRMPASSWORD_DO_NOT_MATCH) {
      Alert.alert('MsaMart', 'Confirm password do not match');
    } else {

      let Service = {
        apiUrl: Api.SubmitRecoveredPassword + 'token=' + token + '&email=' + emailString + '',
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: JSON.stringify({
          passwordRecoveryConfirmModel: {
            NewPassword: this.state.password,
            ConfirmNewPassword: this.state.ConfirmPassword,
            DisablePasswordChanging: false,
            Result: null,
            CustomProperties: {},
          },
        }),
        onSuccessCall: this.onSuccessSubmitPassword,
        onFailureAPI: this.onFailureAPI,
        onPromiseFailure: this.onPromiseFailure,
        onOffline: this.onOffline,
      };
      console.log("Calling api ----"+ Service.apiUrl);
      // this.setState({ loaderVisible: true });
      const serviceResponse = await ServiceCall(Service);
      // this.setState({ loaderVisible: false });
    }
  };
  onSuccessSubmitPassword = async (data) => {
    const response = JSON.parse(JSON.stringify(data));
    console.log('******** response *****', response);
    if (response.status === true) {
      if( data.message!=null && data.message.length > 0 ){
        setTimeout(() => {
          Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
        }, 500);
      }
      this.props.navigation.pop(); // navigate('Home')
      // Alert.alert('MsaMart', data.message);
    } else {
      if( data.errorlist[0]!=null && data.errorlist[0].length > 0 ){
        setTimeout(() => {
          Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
        });
      }
      this.props.navigation.pop();
      token = null;

    }
  };
  render() {
    const {
      password,
      confirmpassword,
      passwordTouched,
      confirmpasswordTouched,
      passwordFormat,
      confirmPasswordMatch,
    } = this.state;

    var passwordError = undefined;
    if (!password && passwordTouched) {
      passwordError = Strings.PASSWORD_REQUIRED;
    } else if (passwordTouched && !passwordFormat) {
      passwordError = Strings.REGISTRATION_PASSWORD_WRONG_FORMAT;
    } else {
      passwordError = undefined;
    }
    var confirmpasswordError = undefined;
    if (!confirmpassword && confirmpasswordTouched) {
      confirmpasswordError = Strings.CONFIRMPASSWORD_REQUIRED;
    } else if (confirmpasswordTouched && !confirmPasswordMatch) {
      confirmpasswordError = Strings.CONFIRMPASSWORD_DO_NOT_MATCH;
    } else {
      confirmpasswordError = undefined;
    }
    return (
      <>
        {/* {
          (this.state.userStatus === true && this.state.loaderVisible == false) ?  */}

        <>
          <AnimatedLoader
            visible={this.state.loaderVisible}
            overlayColor="rgba(255,255,255,0.8)"
            source={Loaders.rings}
            animationStyle={styles.lottie}
            speed={1}
          />
          <StatusBar
            backgroundColor={Colors.PRIMARY}
            barStyle="light-content"
          />
          <View style={{ backgroundColor: Colors.PRIMARY }}>
            <SafeAreaView
              style={{ height: '100%', backgroundColor: Colors.White }}>
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
                  <KeyboardAvoidingView
                    style={styles.signin_container}
                    behavior="padding">
                    <FormTextInput
                      inputStyle={styles.inputStyle}
                      value={this.state.password}
                      onChangeText={this.handlePasswordChange}
                      onSubmitEditing={Keyboard.dismiss}
                      placeholder={Strings.NEW_PASSWORD_PLACEHOLDER}
                      placeholderTextColor={Colors.GRAY_TEXT}
                      secureTextEntry={this.state.secureTextPwd}
                      autoCorrect={false}
                      returnKeyType="done"
                      title={'New Password'}
                      mandatory={true}
                      leftIcon={true}
                      withBorder={true}
                      leftIconImg={
                        this.state.secureTextPwd ? Icons.eye : Icons.eyeClose
                      }
                      onBlur={this.handlePasswordBlur}
                      leftIconClick={() => this.togglePwdShowHide()}
                      error={passwordError}
                      blurOnSubmit={Constants.IS_IOS}
                    />
                    <FormTextInput
                      inputStyle={styles.inputStyle}
                      value={this.state.confirmpassword}
                      onChangeText={this.handleConfirmpasswordChange}
                      placeholderTextColor={Colors.GRAY_TEXT}
                      placeholder={Strings.CONFIRM_PASSWORD}
                      secureTextEntry={this.state.secureTextConfirmPassword}
                      returnKeyType="done"
                      title={Strings.CONFIRM_PASSWORD}
                      mandatory={true}
                      leftIcon={true}
                      withBorder={true}
                      leftIconImg={
                        this.state.secureTextConfirmPassword
                          ? Icons.eye
                          : Icons.eyeClose
                      }
                      leftIconClick={() => this.toggleConfirmPwdShowHide()}
                      onBlur={this.handleConfirmpasswordBlur}
                      error={confirmpasswordError}
                    />
                    <Button
                      title={'Update Password'}
                      disabled={false}
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
                      OnClick={(data) =>
                        this._onSavePassword(confirmpasswordError)
                      }
                    />
                    <View />
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </SafeAreaView>
          </View>
        </>
        {/* : 
           //this.props.navigation.navigate('Home')
           <Home/>
         }  */}
      </>
    );
  }
}
