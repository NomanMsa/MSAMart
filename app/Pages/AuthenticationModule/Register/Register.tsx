import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import jwt_decode from "jwt-decode";
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
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import { Button, OfflineNotice, FormTextInput } from '@components';
import AnimatedLoader from 'react-native-animated-loader';
import { Images, Loaders, Icons } from '@assets';
import Toast from 'react-native-simple-toast';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api, EventTags, EmarsysEvents } from '@config';
import styles from './RegisterStyles';
import { Colors } from '@theme';
import { AppEventsLogger } from "react-native-fbsdk-next";
import analytics from '@react-native-firebase/analytics';
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
import { StackActions } from '@react-navigation/routers';
import RegisterStyles from './RegisterStyles';
import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';
/*import { AppleButton, AppleButtonStyle, AppleButtonType, appleAuth } from '@invertase/react-native-apple-authentication';*/
//interface State { email: string; password: string; emailTouched: boolean; passwordTouched: boolean; emailFormat: boolean; passwordFormat: boolean; }
interface State {
  name: string;
  email: string;
  password: string;
  phnumber:string;
  confirmpassword: string;
  nameTouched: boolean;
  emailTouched: boolean;
  passwordTouched: boolean;
  emailFormat: boolean;
  confirmpasswordTouched: boolean;
  confirmPasswordMatch: boolean;
  passwordFormat: boolean;
  loaderVisible: boolean;
  phnumberTouched:boolean

}
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: false,
      secureTextPwdLogin: true,
      secureTextConfirmPassword: true,
      name: '',
      email: '',
      phnumber:'',
      password: '',
      confirmpassword: '',
      secureText: true,
      errorMessage: '',
      emailFormat: true,
      confirmPasswordMatch: true,
      RegisterType: '',
      phnumberTouched:false

    };
    this.onRegisterPress = this.onRegisterPress.bind(this);
    this.onSuccessRegister = this.onSuccessRegister.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }

  componentDidMount() {
    // alert('mounted');
  }
  emailInputRef = React.createRef<FormTextInput>();
  passwordInputRef = React.createRef<FormTextInput>();
  confirmpasswordInputRef = React.createRef<FormTextInput>();
  buttonTriggerRef = React.createRef<Button>();
  phnumberInputRef = React.createRef<FormTextInput>();
  readonly state: State = {
    name: '',
    email: '',
    phnumber:'',
    password: '',
    confirmpassword: '',
    nameTouched: false,
    emailTouched: false,
    passwordTouched: false,
    confirmpasswordTouched: false,
    emailFormat: true,
    passwordFormat: true,
    phnumberTouched:false

  };
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
  
  extractGooglInfo = (googleInfo, token) => {
    
    this.setState({
      email: googleInfo.user.email,
      SocialIdentifier: googleInfo.user.id,
      name: googleInfo.user.name,
      RegisterType: 'google',
      password: googleInfo.user.givenName+'ms@123',
      confirmpassword:googleInfo.user.givenName+'ms@123'
    });
    console.log(googleInfo.user);
    
    return false;
     this.registerUserOnBackend(token);
    //this.onRegisterPress('');
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
          // this.setState({userInfo: user});
          this.setState({
            email: user.email,
            SocialIdentifier: user.id,
            name: user.name,
            RegisterType: 'facebook',
            password: user.first_name+'ms@123',
            confirmpassword:user.first_name+'ms@123',
          });
          console.log('result:',user );
          this.registerUserOnBackend(token);
          //this.registerUserOnBackend('');
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  registerUserOnBackend = async (token) => {
    console.log(this.state.userInfo);
    let Service = {
      apiUrl: Api.Register,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        FirstName: this.state.name,
        Email: this.state.email,
        Password: this.state.password,
        ConfirmPassword: this.state.password,
        Phone:this.state.phnumber
      }),

      onSuccessCall: this.onSuccessRegister,
      onFailureAPI: this.onSocialFailure,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    console.log(Service.apiUrl);
    console.log(Service.bodyData);
    const serviceResponse = await ServiceCall(Service);
  };
  onSocialFailure = async () => {
    console.log('request failed');
  };
  onSuccessRegister = async (data) => {
    console.log('on success register');
    console.log('register type', this.state.RegisterType);


    if (this.state.RegisterType == '' || this.state.RegisterType == undefined) {
      //For Normal Registration 
      console.log("Normal Registration")
      if (data.status == true) {
        await analytics().logEvent('Register', { method: 'Native  ' });
        EmarsysEvents.trackEmarsys('Register', { method: 'Native  ' });
        AppEventsLogger.logEvent(EventTags.EVENT_REGISTER, { method: 'Native  ' });

        if (data.message != null && data.message.length > 0) {
          setTimeout(() => {
            Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
          }, 500);
        }
        this.props.navigation.pop();
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
    else {
      //For Google And FaceBook registration
      console.log("Google & FB Registration")

      this.onLoginPress();
      this.props.navigation.dispatch(StackActions.replace('Home'));
      console.log('DATA', data);
      if (data.status == true) {
        // if (
        //   this.state.RegisterType !== '' ||
        //   this.state.RegisterType !== undefined
        // ) {
        //   await analytics().logEvent('Register', {
        //     method: this.state.RegisterType,
        //   });
        //   EmarsysEvents.trackEmarsys('Register', { method: this.state.RegisterType });
        // } else {
        //   await analytics().logEvent('Register', { method: 'Native  ' });
        //   EmarsysEvents.trackEmarsys('Register', { method: 'Native  ' });
        // }
        // await AsyncStorage.setItem('loginStatus', 'true');
        // await this.props.UpdateAuthStatus({ loginStatus: 'true' });
        // var name = '';
        // console.log('checking customer name', data.model.CustomerName);
        // if (
        //   data.model.CustomerName === null ||
        //   data.model.CustomerName === undefined ||
        //   data.model.CustomerName === ''
        // ) {
        //   name = this.state.SocialFullName;
        //   console.log('setting name from social');
        // } else {
        //   console.log('setting name from local');
        //   name = data.model.CustomerName;
        // }
        // await AsyncStorage.setItem('userName', name);
        // console.log('customer name', this.state.SocialFullName);
        // await AsyncStorage.setItem('custGuid', data.model.customer_guid);
        // if (data.message != null && data.message.length > 0) {
        //   setTimeout(() => {
        //     Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
        //   }, 500);
        // }
        // this.props.navigation.pop();
        // StackActions.replace('Home');
      
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
    // console.log('user registered successfully');
    // console.log('user return data', data);
    // if (data.errorlist.count > 0) {
    //   alert('something went wrong!');
    // } else {
    //   alert(data.message);
    // }
  };
  onLoginPress = async () => {
    let Service = {
            apiUrl: Api.Login,
            methodType: 'POST',
            headerData: { 'Content-Type': 'application/json' },
            bodyData: JSON.stringify({
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
        
      };
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
  onAppleButtonPressed = async () => {
    // Toast.showWithGravity('Apple button pressed',Toast.LONG,Toast.BOTTOM);
    const appleAuthRequestResponse =""; /*await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });*/

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState ="";/* await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);*/

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
          console.log('saving apple token', appleAuthRequestResponse.identityToken);
          await AsyncStorage.setItem('appleUserName', fullname);
          await AsyncStorage.setItem('appletoken', appleToken);
          console.log('printing apple token', await AsyncStorage.getItem('appletoken'))
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
  handleLoginPress = async () => {
    console.log('Login button pressed');
    LoginManager.logOut();

    try {
      const result = await LoginManager.logInWithPermissions([
        'email',
      ]).then((login) => {
        //if (login.isCancelled) {
          // //display toast here
          // Toast.showWithGravity(
          //   'User has cancelled login',
          //   Toast.LONG,
          //   Toast.BOTTOM
          // );
          // alert('');
        //} else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        //}
        });
    } catch (err) {
      console.log(err);
    }
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
      await AsyncStorage.setItem('userName', data.model.FullName);
      await AsyncStorage.setItem('custGuid', data.model.Id.toString());
      AppEventsLogger.logEvent(EventTags.LOGIN, { method: this.state.SignInType });
      /*await analytics().logEvent('login', { method: this.state.SignInType });*/
      // this.registerUserOnBackend(appleAuthRequestResponse.identityToken);
      // setTimeout(() => {
      //   Toast.showWithGravity(Strings.LOGINMESSAGE, Toast.LONG, Toast.BOTTOM);
      // }, 500);
      this.props.updateCartCount();
      this.props.updateShoppingCall();
      this.props.updateWishlist();
      this.props.navigation.dispatch(StackActions.replace('Home'));

    }
  }
  handleNameChange = (name: string) => {
    this.setState({ name: name });
  };

  handleEmailChange = (email: string) => {
    let reg = Constants.IS_VALID_EMAIL_REGEX; //^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (reg.test(email.trim()) === false) {
      console.log('Email is Not Correct');
      this.setState({ emailFormat: false });
      return false;
    } else {
      this.setState({ email: email });
      this.setState({ emailFormat: true });
    }
  };
  handlePasswordChange = (password: string) => {
    let regPwd = Constants.IS_VALID_PASSWORD_REGEX; //^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    if (regPwd.test(password) === false) {
      console.log('password is Not Correct');
      this.setState({ passwordFormat: false });
      return false;
    } else {
      this.setState({ password: password });
      this.setState({ passwordFormat: true });
    }
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
  handleNameSubmitPress = () => {
    if (this.emailInputRef.current) {
      this.emailInputRef.current.focus();
    }
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };
  handlePasswordSubmitPress = () => {
    if (this.confirmpasswordInputRef.current) {
      this.confirmpasswordInputRef.current.focus();
    }
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
  handleNameBlur = () => {
    this.setState({ nameTouched: true });
  };
  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };
  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };
  handleConfirmpasswordBlur = () => {
    this.setState({ confirmpasswordTouched: true });
  };

  togglePwdShowHide = () => {
    this.setState({ secureTextPwdLogin: !this.state.secureTextPwdLogin });
  };

  toggleConfirmPwdShowHide = () => {
    this.setState({
      secureTextConfirmPassword: !this.state.secureTextConfirmPassword,
    });
  };

  // onSuccessRegister = async (data) => {
  //   if (data.status == true) {
  //     await analytics().logEvent('Register', { method: 'Native  ' });

  //     setTimeout(() => {
  //       Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
  //     }, 500);
  //     this.props.navigation.pop();
  //     console.log(data);
  //   } else {
  //     setTimeout(() => {
  //       Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
  //     }, 500);
  //   }
  // };
  onFailureAPI(data) {
    console.log(data);
  }
  onPromiseFailure(data) {
    console.log(data);
  }
  onOffline(data) {
    console.log(data);
  }
  onRegisterPress = async (confirmpasswordError) => {

    // console.log("IN Register");
    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.confirmpassword ||
      !this.state.emailFormat ||
      !this.state.passwordFormat
      
    ) {
      Alert.alert(
        'MsaMart',
        'Please fill all mandatory fields in correct Format',
      );
    }
    else if (confirmpasswordError == Strings.CONFIRMPASSWORD_DO_NOT_MATCH) {

      console.log("IN Register")
      Alert.alert('MsaMart', 'Confirm password do not match');
    }
    else if (this.state.password !== this.state.confirmpassword) {

      console.log("IN PASS DONT MATCh")
      Alert.alert('MsaMart', ' password do not  match with confirm password');

    }
    else {
      console.log(
        JSON.stringify({
          FirstName: this.state.name,
          Email: this.state.email,
          Password: this.state.password,
          ConfirmPassword: this.state.password,
        }),
      );
      let Service = {
        apiUrl: Api.Register,
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: JSON.stringify({
          FirstName: this.state.name,
          Email: this.state.email,
          Password: this.state.password,
          ConfirmPassword: this.state.password,
          Phone:this.state.phnumber
        }),
        onSuccessCall: this.onSuccessRegister,
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
          onPress={() => this.props.navigation.goBack()}

        >
          <Image style={styles.backAvatar} source={Icons.arrowBack} />
        </TouchableOpacity>
        <View style={[styles.loginHeaderTextContainer]}>
          <Text style={styles.headerText}
            testID="registerTitle"
            accessibilityLabel="registerTitle"
          >{Strings.REGISTER}</Text>
        </View>
      </View>
    );
  };
  render() {
    const {
      name,
      email,
      phnumber,
      password,
      confirmpassword,
      nameTouched,
      emailTouched,
      passwordTouched,
      confirmpasswordTouched,
      emailFormat,
      passwordFormat,
      phnumberTouched,
      confirmPasswordMatch,
    } = this.state;
    var nameError = undefined;
    if (!name && nameTouched) {


      nameError = Strings.NAME_REQUIRED;
    } else {

      nameError = undefined;
    }
    var emailError = undefined;
    if (!email && emailTouched) {

      emailError = Strings.EMAIL_REQUIRED;
    } else if (emailTouched && !emailFormat) {

      emailError = Strings.EMAIL_WRONG_FORMAT;
    } else {

      emailError = undefined;
    }

    var passwordError = undefined;
    if (!password && passwordTouched) {
      passwordError = Strings.PASSWORD_REQUIRED;
    } else if (passwordTouched && !passwordFormat) {
      // passwordError = Strings.PASSWORD_WRONG_FORMAT;
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
                    error_testId={"fullNameError"}
                    testID="fullName"
                    accessibilityLabel="FirstName"
                    inputStyle={styles.inputStyle}
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                    onSubmitEditing={this.handleNameSubmitPress}
                    placeholder={Strings.FULL_NAME}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    title={Strings.FULL_NAME}
                    mandatory={true}
                    leftIcon={false}
                    withBorder={true}
                    onBlur={this.handleNameBlur}
                    error={nameError}
                    blurOnSubmit={Constants.IS_IOS}
                  />
                  <FormTextInput
                    error_testId={"reg_emailError"}
                    testID="Email"
                    accessibilityLabel="Email"
                    inputStyle={styles.inputStyle}
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
                    leftIcon={false}
                    withBorder={true}
                    onBlur={this.handleEmailBlur}
                    error={emailError}
                    blurOnSubmit={Constants.IS_IOS}
                  />
                
                      
                 
                    <FormTextInput
                      title={Strings.PHONE_NUMBER}
                      error_testId={"phoneNumberError"}
                      inputStyle={styles.inputStyle}
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
                      mandatory={false}
                      withBorder={true}
                      onBlur={this.handlePhnumberBlur}
                      //error={phnumberError}
                      blurOnSubmit={Constants.IS_IOS}
                    />
                

                  
                  
                  <FormTextInput
                    error_testId={"reg_PasswordError"}
                    testID="Password"
                    accessibilityLabel="Password"
                    inputStyle={styles.inputStyle}
                    ref={this.passwordInputRef}
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    onSubmitEditing={this.handlePasswordSubmitPress}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    placeholder={Strings.PASSWORD}
                    secureTextEntry={this.state.secureTextPwdLogin}
                    returnKeyType="next"
                    title={Strings.PASSWORD}
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
                  <FormTextInput
                    error_testId={"reg_confirmPasswordError"}
                    testID="ConfirmPassword"
                    accessibilityLabel="ConfirmPassword"
                    inputStyle={styles.inputStyle}
                    ref={this.confirmpasswordInputRef}
                    value={this.state.confirmpassword}
                    onChangeText={this.handleConfirmpasswordChange}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    placeholder={Strings.CONFIRM_PASSWORD}
                    secureTextEntry={this.state.secureTextConfirmPassword}
                    returnKeyType="done"
                    title={Strings.CONFIRM_PASSWORD}
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
                  <View style={styles.regLinkCont}></View>
                  {/*<View style={styles.regLinkCont}><Text style={styles.regTxt1}>I agree with</Text><Text style={[styles.regTxt2, styles.link]} onPress={ ()=>{ Linking.openURL('https://www.dragonmart.ae/conditions-of-use')}}>Terms and Conditions</Text></View>*/}

                  {/* <Button
                  label={Strings.LOGIN}
                  btnStyle={styles.login_btn}
                  btnTxtStyle={styles.btnName}
                  onPress={this.handleLoginPress}
                  disabled={!email || !password || !emailFormat}
                /> */}
                  <Button
                    testId="login-ForRegister"
                    title={Strings.REGISTER}
                    disabled={false} //{!name || !email || !password || !confirmpassword || !emailFormat || !passwordFormat}
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
                      this.onRegisterPress(confirmpasswordError)
                    }
                  />
                  {Platform.OS == "ios" && parseInt(Platform.Version) < 13 ?
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

                  {/* <View style={{width: '95%', flexDirection: 'column'}}></View> */}
                  <View style={styles.regLinkCont}>
                    <Text style={styles.regTxt1}>Already have an account?</Text>
                    <Text
                      style={styles.regTxt2}
                      onPress={() => this.props.navigation.pop()}>
                      Sign In
                    </Text>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
