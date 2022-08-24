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
  KeyboardAvoidingView,
} from 'react-native';
import jwt_decode from "jwt-decode";
import AnimatedLoader from 'react-native-animated-loader';
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import { Images, Loaders, Icons } from '@assets';
import { Button, OfflineNotice, FormTextInput } from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api, EventTags, EmarsysEvents } from '@config';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import styles from './SignInStyles';
import { Colors } from '@theme';
import Toast from 'react-native-simple-toast';
import { StackActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";
import DeviceInfo from 'react-native-device-info';
/*import { AppleButton, AppleButtonStyle, AppleButtonType, appleAuth } from '@invertase/react-native-apple-authentication';
import Emarsys from "react-native-emarsys-wrapper";*/

import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from "react-native-fbsdk-next";
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { SocialIcon } from 'react-native-elements';
interface State {
  email: string;
  password: string;
  emailTouched: boolean;
  passwordTouched: boolean;
  emailFormat: boolean;
  passwordFormat: boolean;
  loaderVisible: boolean;
  secureTextPwdLogin: boolean;
}
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loaderVisible: false,
      secureTextPwdLogin: true,
    };
    this.onSuccessLogin = this.onSuccessLogin.bind(this);
  }

  componentDidMount() {
    // GoogleSignin.configure({      //Android QA
    //   webClientId:
    //     '1009681139029-f50tvon0lmi2qrecbsil0sk57ruu45k6.apps.googleusercontent.com',
    // });
    // GoogleSignin.configure({  // IOS QA
    // webClientId:
    // '640017664600-s40kr8dqjup09e4t92ppbv7aqaltnd4m.apps.googleusercontent.com'
    // });
    // PROD RELEASE
    GoogleSignin.configure({
      androidClientId:'319978758827-tu5ldsopso3ftknm2lmmmknnuosjdhui.apps.googleusercontent.com',
      //webClientId: '377145119231-nmidjhh53pqvmrqftkied075l5u2gsp1.apps.googleusercontent.com',
      
    });

  }
  emailInputRef = React.createRef<FormTextInput>();
  passwordInputRef = React.createRef<FormTextInput>();
  buttonTriggerRef = React.createRef<Button>();
  readonly state: State = {
    email: '',
    password: '',
    emailTouched: false,
    passwordTouched: false,
    emailFormat: true,
    passwordFormat: true,
    secureTextPwdLogin: true,
  };
  onAppleButtonPressed = async () => {
    // Toast.showWithGravity('Apple button pressed',Toast.LONG,Toast.BOTTOM);
    const appleAuthRequestResponse = "";/*await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });*/

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = "";/*await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);*/

    // use credentialState response to ensure the user is authenticated
    console.log('authorisation states', credentialState);
   /* if (credentialState === appleAuth.State.AUTHORIZED) {
      if (credentialState == 1) {
        if (appleAuthRequestResponse.fullName.givenName == null) {
          // check for existing token
          console.log('return user')
          var response = jwt_decode(appleAuthRequestResponse.identityToken);
          if (response !== null) {
            console.log('existing user data', response.email);

            // call api here to get user details
            let Service = {
              apiUrl: Api.CheckAppleUser,
              methodType: 'POST',
              headerData: { 'Content-Type': 'application/json' },
              bodyData: JSON.stringify({
                customerEmail: response.email
              }),
              onSuccessCall: this.onSuccessEmail,
            };
            const serviceResponse = await ServiceCall(Service);
            this.registerUserOnBackend(appleAuthRequestResponse.identityToken);


          }
        } else {
          console.log('first time user')
          const fullname = appleAuthRequestResponse.fullName.givenName + " " + appleAuthRequestResponse.fullName.familyName;
          const appleToken = appleAuthRequestResponse.identityToken;
          const appleEmail = appleAuthRequestResponse.email;
          await AsyncStorage.setItem('appleUserName', fullname);
          await AsyncStorage.setItem('appletoken', appleToken);
          this.setState({
            SocialEmail: appleEmail,
            SocialIdentifier: appleAuthRequestResponse.authorizationCode,
            SocialFullName: fullname,
            RegisterType: 'apple',
          });
          this.registerUserOnBackend(appleAuthRequestResponse.identityToken);
        }
      } else if (credentialState == 2) {
        // assume that it's new user and store data in async storage
      }

      // console.log('credentials from apple',appleAuthRequestResponse);
      // user is authenticated
    }*/
  }
  handleGoogleLogin = async () => {
    console.log('google login pressed');
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('google user info', userInfo);
      const gToken = userInfo.idToken;
      const familyName = userInfo.user.familyName;

      console.log('token' + gToken + 'familyname' + familyName);
      this.extractGooglInfo(userInfo, gToken);
    } catch (error) {
      console.log(error);
    }
  };
  handleEmailChange = (email: string) => {
    this.setState({ email: email });
    let reg = Constants.IS_VALID_EMAIL_REGEX; //^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (reg.test(email.trim()) === false) {
      this.setState({ emailFormat: false });
      return false;
    } else {
      this.setState({ emailFormat: true });
    }
  };
  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
    let regPwd = Constants.IS_VALID_PASSWORD_REGEX; //^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    if (regPwd.test(password) === false) {
      this.setState({ passwordFormat: false });
      return false;
    } else {
      this.setState({ passwordFormat: true });
    }
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };
  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };
  getInfoFromToken = (token) => {
    console.log(token);
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          // call an API to register user on backend
          this.setState({ userInfo: user });
          console.log('result:', user);
          this.setState({
            SocialEmail: user.email,
            SocialIdentifier: user.id,
            SocialFullName: user.name,
            socialPassword: user.first_name+'ms@123',
            SignInType: 'facebook',
          });
          this.registerUserOnBackend(token);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  extractGooglInfo = (googleInfo, token) => {
    this.setState({
      SocialEmail: googleInfo.user.email,
      SocialIdentifier: googleInfo.user.id,
      SocialFullName: googleInfo.user.name,
      SignInType: 'google',
      socialPassword: googleInfo.user.givenName+'ms@123'
    });
    console.log(this.state.userInfo);
     this.registerUserOnBackend(token);
  };
  registerUserOnBackend = async (token) => {
    console.log(this.state.userInfo);
    let Service = {
      apiUrl: Api.Register,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        FirstName:  this.state.SocialFullName,
        Email: this.state.SocialEmail,
        Password: this.state.socialPassword,
        ConfirmPassword: this.state.socialPassword,
        
      }),

      onSuccessCall: this.onSuccessRegister,      
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    console.log(Service.apiUrl);
    console.log(Service.bodyData);
    const serviceResponse = await ServiceCall(Service);
  };

  handleLoginPress = async () => {
    console.log('Login button pressed');
    LoginManager.logOut();

    try {
      const result = await LoginManager.logInWithPermissions([
        // 'public_profile',
        'email',
      ]).then((login) => {
        if (login.isCancelled) {
          // alert('User has cancelled login');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  togglePwdShowHide = () => {
    this.setState({ secureTextPwdLogin: !this.state.secureTextPwdLogin });
  };
  onSuccessEmail = async (data) => {
    console.log('Email Data', data)
    if (data.model !== null) {
      this.setState({
        SocialEmail: data.model.Email,
        // SocialIdentifier: appleAuthRequestResponse.authorizationCode,
        SocialFullName: data.model.FullName,
        RegisterType: 'apple',
      });
      await AsyncStorage.setItem('loginStatus', 'true');
      await this.props.UpdateAuthStatus({ loginStatus: 'true' });
      await AsyncStorage.setItem('userName', data.model.Username);
      await AsyncStorage.setItem('custGuid', data.model.Id.toString());
      await AsyncStorage.setItem('custToken', data.model.token.toString());
      await analytics().logEvent('login', { method: this.state.SignInType });
      AppEventsLogger.logEvent(EventTags.LOGIN, { method: this.state.SignInType });
      // this.registerUserOnBackend(appleAuthRequestResponse.identityToken);
      // setTimeout(() => {
      //   Toast.showWithGravity(Strings.LOGINMESSAGE, Toast.LONG, Toast.BOTTOM);
      // }, 500);
      this.initEmarsysSDK(data.model.Id);
      this.props.updateCartCount();
      this.props.updateShoppingCall();
      this.props.updateWishlist();
      this.props.navigation.dispatch(StackActions.replace('Home'));
    }
  }
  initEmarsysSDK = async (id) => {

    try {
      let result = "";/*await Emarsys.setContact(Constants.EMARSYS_CUSTOMER_ID_FIELD_PROD, id.toString());*/
    } catch (e) {
      console.log("EMARSYS Set Contact----")
      console.log(e);
    }
  }
  onSuccessRegister = async (data) => {
    console.log('on success register');
      //For Normal Registration 
      console.log("Normal Registration")
      if (data.status == true) {
        await analytics().logEvent('Register', { method: 'Native  ' });
        EmarsysEvents.trackEmarsys('Register', { method: 'Native  ' });
        AppEventsLogger.logEvent(EventTags.EVENT_REGISTER, { method: 'Native  ' });
        this.setState({
          email:this.state.SocialEmail,
          password:this.state.socialPassword
        })
        
        this.onLoginPress()

        if (data.message != null && data.message.length > 0) {
          setTimeout(() => {
            Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
          }, 500);
        }
        
        console.log(data);
      }
      else {
        if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
          setTimeout(() => {
            Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
          }, 500);
        }
      }

    }

  onSuccessLogin = async (data) => {
    console.log(data);
    console.log("....................................... data.status = " + data.status + "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    if (data.status == true) {
      console.log("....................................... after data.status = " + data.status + "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      await AsyncStorage.setItem('loginStatus', 'true');
      

      var name = '';
      console.log('checking customer name', data.model.CustomerName);
      if (
        data.model.CustomerName === null ||
        data.model.CustomerName === undefined ||
        data.model.CustomerName === ''
      ) {
        name = this.state.SocialFullName;
        console.log('setting name from social');
      } else {
        console.log('setting name from local');
        name = data.model.CustomerName;
      }
      //this.initEmarsysSDK(data.model.id);
      await AsyncStorage.setItem('userName', data.model.Username);
      await AsyncStorage.setItem('custGuid', "data.model.customer_guid");
      if(data.model.Token){
        await AsyncStorage.setItem('custToken', data.model.Token);
      }
      console.log("-------------------------------------------"+data.model.Token+"////////////////////////////////////////////");
      let token1 = await AsyncStorage.getItem('custToken');
      console.log("-------------------------------------------Token1"+token1 +"////////////////////////////////////////////");
      //Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      await this.props.UpdateAuthStatus({ loginStatus: 'true' });
      if (data.message) {
        // Alert.alert(data.message);
        this.props.UpdateAuthStatus({ loginStatus: 'true' });
        setTimeout(async () => {
          /*Alert.alert(
            'MsaMart',
            data.message, [{
              text: 'Ok',
              onPress: async () => {
                this.setState({
                  loaderVisible: false
                });
                await analytics().logEvent('login', { 'method': "Native" });

                this.props.navigation.pop();
              }
            },], {
            cancelable: false
          }
          )*/
          if (data.message != null && data.message.length > 0) {
            Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
          }
        }, 500);
        if (
          this.state.SignInType !== '' ||
          this.state.SignInType !== undefined
        ) {
          await analytics().logEvent('login', { method: this.state.SignInType });
          AppEventsLogger.logEvent(EventTags.LOGIN, { method: this.state.SignInType });
          EmarsysEvents.trackEmarsys(EventTags.LOGIN, { method: this.state.SignInType });
        } else {
          await analytics().logEvent('login', { method: 'Native' });
          EmarsysEvents.trackEmarsys(EventTags.LOGIN, { method: 'Native' });
          AppEventsLogger.logEvent(EventTags.LOGIN, { method: 'Native' });
        }
        if (this.props.route.params == undefined ||
          !this.props.route.params.passData ||
          !this.props.route.params.passData.screen ||
          this.props.route.params.passData.screen == undefined ||
          this.props.route.params.passData.screen == 'undefined' ||
          this.props.route.params.passData.screen == null ||
          this.props.route.params.passData.screen == 'null'
        ) {
          this.props.navigation.pop();
        } else {
          console.log('screen name', this.props.route.params.passData.screen);
          var passParams = this.props.route.params.passData;
          if (this.props.route.params.passData.screen === 'PayNow') {
            /*passParams = data.model.customer_guid;*/
            passParams = data.model.Token;
          }
          this.props.navigation.dispatch(
            StackActions.replace(this.props.route.params.passData.screen, { passData: passParams }),
          );
        }
        this.props.updateCartCount();
        this.props.updateShoppingCall();
        this.props.updateWishlist();
      }
      let durationM = new Date().getTime() - this.state.startTime

      let loginTime = {
        item_id: durationM.toString(),
        slug_url: '',
        entity_name: 'Login',
      };
      await analytics().logEvent('loginTime', loginTime);
      AppEventsLogger.logEvent(EventTags.loginTime, loginTime);

    } else {
      this.setState({
        email: '',
        password: '',
      });
      //Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);

      if (data.errorlist && data.errorlist.length > 0) {
        setTimeout(() => {
          Alert.alert(data.errorlist[0]);
        }, 500);
      }
    }
  };
  onFailureAPI(data) {
    console.log(data);
  }
  onPromiseFailure(data) {
    console.log(data);
  }
  onOffline(data) {
    console.log(data);
  }
  onFbLogin = async () => {
    console.log('login press from facebook');
  };
  onLoginPress = async () => {
    let startTimeM = new Date().getTime()
    this.setState({ startTime: startTimeM });

    if (!this.state.email || !this.state.password) {
      Alert.alert('MsaMart', 'Please fill all mandatory fields');
    } else {
      console.log(
        JSON.stringify({
          Email: this.state.email,
          Password: this.state.password,
        }),
      );
      let Service = {
        apiUrl: Api.Login,
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: JSON.stringify({
          Username: this.state.email,
          Email: this.state.email,
          Password: this.state.password,
          DeviceId: DeviceInfo.getUniqueId().toString()
        }),
        onSuccessCall: this.onSuccessLogin,
        onFailureAPI: this.onFailureAPI,
        onPromiseFailure: this.onPromiseFailure,
        onOffline: this.onOffline,
      };
      this.setState({ loaderVisible: true });
      const serviceResponse = await ServiceCall(Service);
      this.setState({ loaderVisible: false });
    }
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
          <Text style={styles.headerText}>Log in</Text>
        </View>
      </View>
    );
  };
  render() {
    const {
      email,
      password,
      emailTouched,
      passwordTouched,
      emailFormat,
      passwordFormat,
    } = this.state;
    
    var emailError = undefined;
    if (!email && emailTouched) {
      emailError = Strings.EMAIL_REQUIRED;
    } else if (emailTouched && emailFormat==false) {
      emailError = Strings.EMAIL_WRONG_FORMAT;
    } else {
      emailError = undefined;
    }

    var passwordError = undefined;
    if (!password && passwordTouched) {
      passwordError = Strings.PASSWORD_REQUIRED;
    } else if (passwordTouched && !passwordFormat) {
      passwordError = Strings.PASSWORD_WRONG_FORMAT;
    } else {
      passwordError = undefined;
    }
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

        <View style={{ backgroundColor: Colors.PRIMARY }}>
          <SafeAreaView style={{ height: '100%', backgroundColor: Colors.White }}>
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
                    error_testId={"login_email_error"}
                    accessible={false}
                    testID="login-user-email-address"
                    accessibilityLabel="login-user-email-address"
                    inputStyle={styles.inputStyle}
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    onSubmitEditing={this.handleEmailSubmitPress}
                    placeholder={Strings.EMAIL_PLACEHOLDER}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    title={'Email'}
                    mandatory={true}
                    leftIcon={false}
                    withBorder={true}
                    onBlur={this.handleEmailBlur}
                    error={emailError}
                    blurOnSubmit={Constants.IS_IOS}
                  />
                  <FormTextInput
                    accessible={false}
                    error_testId={"login_password_error"}
                    testID="login-user-password"
                    accessibilityLabel="login-user-password"
                    inputStyle={styles.inputStyle}
                    ref={this.passwordInputRef}
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    placeholder={Strings.PASSWORD_PLACEHOLDER}
                    secureTextEntry={this.state.secureTextPwdLogin}
                    returnKeyType="done"
                    title={'Password'}
                    mandatory={true}
                    leftIcon={true}
                    withBorder={true}
                    leftIconImg={
                      this.state.secureTextPwdLogin ? Icons.eye : Icons.eyeClose
                    }
                    leftIconClick={() => this.togglePwdShowHide()}
                    onBlur={this.handlePasswordBlur}
                    error={passwordError}
                  />
                  <TouchableOpacity style={styles.forgot_password_text}>
                    <Text
                      style={styles.forgot_password_text_style}
                      onPress={() =>
                        this.props.navigation.navigate('ForgotPassword')
                      }>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  {/* <Button
                  label={Strings.LOGIN}
                  btnStyle={styles.login_btn}
                  btnTxtStyle={styles.btnName}
                  onPress={this.handleLoginPress}
                  disabled={!email || !password || !emailFormat}
                /> */}

                  <Button
                    accessible={false}
                    testId="btnlogin"

                    title={Strings.LOGIN}
                    disabled={false} //!email || !emailFormat || !password
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
                    OnClick={(data) => this.onLoginPress()}
                  //   this.props.navigation.navigate('ShoppingCart', {
                  //     passData: 'data',
                  //   })
                  // }
                  />

                  {
                    Platform.OS == "ios" && parseInt(Platform.Version) < 13 ?
                      <></>
                      :
                      <>
                        <Text style={{ textAlign: 'center', paddingBottom: 10 }}>
                          OR Continue With
                        </Text>

                        <View
                          style={{
                            width: '100%',
                            justifyContent: 'space-evenly',
                            flex: 1,
                            flexDirection: 'row',
                          }}>
                          <SocialIcon
                            style={{ width: '40%' }}
                            title="Google"
                            button
                            type="google"
                            onPress={(data) => this.handleGoogleLogin()}
                          />
                          <SocialIcon
                            style={{ width: '40%' }}
                            title="Facebook"
                            button
                            type="facebook"
                            onPress={(data) => this.handleLoginPress()}
                          />
                        </View>
                        {Platform.OS == "ios" 
                          // &&<AppleButton
                          //   buttonStyle={AppleButton.Style.BLACK}
                          //   buttonType={AppleButton.Type.SIGN_IN}
                          //   style={{
                          //     top: 20,
                          //     marginBottom: 15,
                          //     width: '90%', // You must specify a width
                          //     height: 55, // You must specify a height
                          //   }}
                          //   onPress={() => this.onAppleButtonPressed()}
                          // />
                        }
                      </>
                  }
                  <View style={styles.regLinkCont}>
                    <Text style={styles.regTxt1}>Dont have an account?</Text>
                    <Text
                      style={styles.regTxt2}
                      onPress={() =>
                        this.props.navigation.navigate('Register')
                      }
                      testID="registerBtn"
                      accessibilityLabel="registerBtn"
                    >
                      Register here
                    </Text>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView >
            </View >
          </SafeAreaView >
        </View >
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('status updated');
  return {
    UpdateAuthStatus: (status) =>
      dispatch({ type: 'AUTH_STATUS', paylod: status }),
    updateShoppingCall: () => dispatch({ type: 'SHOPPING_CALL' }),
    updateCartCount: () => dispatch({ type: 'COUNT_CALL' }),
    updateWishlist: () => dispatch({ type: 'WISHLIST_CALL' }),
  };
};

const mapStateToProps = (state) => {
  console.log('status updated', state);
  let LoginStatus = state.Login_Status;

  return {
    AuthStatus: LoginStatus.loginStatus,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
