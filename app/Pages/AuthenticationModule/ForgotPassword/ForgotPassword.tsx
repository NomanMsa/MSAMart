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
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import { Images, Loaders, Icons } from '@assets';
import {
  Button,
  OfflineNotice,
  FormTextInput,
} from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api } from '@config';
import Toast from 'react-native-simple-toast';
import styles from './ForgotPasswordStyles';
import { Colors } from '@theme';
interface State { email: string; password: string; emailTouched: boolean; passwordTouched: boolean; emailFormat: boolean; passwordFormat: boolean; loaderVisible: boolean; secureTextPwdLogin: boolean; }
export default class SignIn extends Component {
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

  }
  emailInputRef = React.createRef<FormTextInput>();
  passwordInputRef = React.createRef<FormTextInput>();
  buttonTriggerRef = React.createRef<Button>();
  readonly state: State = {
    email: "",
    password: "",
    emailTouched: false,
    passwordTouched: false,
    emailFormat: true,
    passwordFormat: true,
    secureTextPwdLogin: true,
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
  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
    let regPwd = Constants.IS_VALID_PASSWORD_REGEX;//^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    if (regPwd.test(password) === false) {
      console.log("Email is Not Correct");
      this.setState({ passwordFormat: false })
      return false;
    }
    else {
      this.setState({ passwordFormat: true })
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
  handleLoginPress = () => {
    console.log("Login button pressed");
  };

  togglePwdShowHide = () => {
    this.setState({ secureTextPwdLogin: !this.state.secureTextPwdLogin });
  }


  async onSuccessLogin(data) {
    console.log("reset pwd onSuccessLogin--", data)
    this.setState({ loaderVisible: false });
    if (data.status == true) {
      if(data.message && data.message.length> 0){
        setTimeout(() => {Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM)}, 500);
      }
      this.props.navigation.pop();
    }
    else {
      this.setState({
        email: '',
      });
      if (data.message) {
        setTimeout(() => {Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM)}, 500);
      }
      if (data.errorlist && data.errorlist.length > 0) {
        setTimeout(() => {Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM)}, 500);
      }
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
  onFPPress = async () => {
    if (!this.state.emailFormat) {
      Alert.alert(
        'MsaMart',
        'Please enter valid email-address.'
      );
    } else {

      let Service = {
        apiUrl: Api.ForgotPassword,
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: JSON.stringify({
          Email: this.state.email,
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
  }
  renderHeader = () => {
    return (
      <View style={[styles.headerContainer]}>
        <TouchableOpacity
          style={{ padding: 10, marginRight: -10, marginLeft: -10 }}
          onPress={() => this.props.navigation.pop()}>
          <Image
            style={styles.backAvatar}
            source={Icons.arrowBack}
          />
        </TouchableOpacity>
        <View style={[styles.loginHeaderTextContainer]}>
          <Text style={styles.headerText}>Reset Password</Text>
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
    } else if (emailTouched && !emailFormat) {
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
                  behavior="padding"
                >
                  <FormTextInput
                    inputStyle={styles.inputStyle}
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    onSubmitEditing={Keyboard.dismiss}
                    placeholder={Strings.EMAIL_PLACEHOLDER}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="done"
                    title={'Email'}
                    mandatory={true}
                    leftIcon={false}
                    withBorder={true}
                    onBlur={this.handleEmailBlur}
                    error={emailError}
                    blurOnSubmit={Constants.IS_IOS}
                  />
                  <TouchableOpacity style={styles.forgot_password_text}>
                  </TouchableOpacity>

                  <Button
                    title={Strings.RESET}
                    disabled={false}//!email || !emailFormat || !password
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
                    OnClick={(data) => this.onFPPress()}
                  />
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </>
    );
  }
}
