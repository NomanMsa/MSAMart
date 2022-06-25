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
const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();
import AnimatedLoader from "react-native-animated-loader";
import { Loaders, Icons } from '@assets';
import {
  Button,
  OfflineNotice,
  Footer,
  FormTextInput,
} from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api } from '@config';
import styles from './ContactUsStyles';
import { Colors } from '@theme';
interface State { name: string; email: string; subject: string; enquiry: string; nameTouched: boolean; emailTouched: boolean; subjectTouched: boolean; emailFormat: boolean; enquiryTouched: boolean; loaderVisible: boolean; }
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: false,
      name: '',
      email: '',
      subject: '',
      enquiry: '',
      emailFormat: true,
    };
    this.onSubmitPress = this.onSubmitPress.bind(this);
    this.onSuccessSubmit = this.onSuccessSubmit.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }

  componentDidMount() {

  }
  emailInputRef = React.createRef<FormTextInput>();
  subjectInputRef = React.createRef<FormTextInput>();
  EnquiryInputRef = React.createRef<FormTextInput>();
  buttonTriggerRef = React.createRef<Button>();
  readonly state: State = {
    name: "",
    email: "",
    subject: "",
    enquiry: "",
    nameTouched: false,
    emailTouched: false,
    subjectTouched: false,
    enquiryTouched: false,
    emailFormat: true,
  };


  handleNameChange = (name: string) => {
    this.setState({ name: name });
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
  handleSubjectChange = (subject: string) => {
    this.setState({ subject: subject });
  };
  handleEnquiryChange = (enquiry: string) => {
    this.setState({ enquiry: enquiry });
  };
  handleNameSubmitPress = () => {
    if (this.emailInputRef.current) {
      this.emailInputRef.current.focus();
    }
  };

  handleEmailSubmitPress = () => {
    if (this.subjectInputRef.current) {
      this.subjectInputRef.current.focus();
    }
  };
  handleSubjectSubmitPress = () => {
    if (this.EnquiryInputRef.current) {
      this.EnquiryInputRef.current.focus();
    }
  };

  handleNameBlur = () => {
    this.setState({ nameTouched: true });
  };
  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };
  handleSubjectBlur = () => {
    this.setState({ subjectTouched: true });
  };
  handleEnquiryBlur = () => {
    this.setState({ enquiryTouched: true });
  };

  onSuccessSubmit(data) {
    if (data.message) {
      Alert.alert('MsaMart', data.message);
    }
    else if (data.errorlist && data.errorlist > 0) {
      Alert.alert('MsaMart', data.message);
    }
    this.setState({
      email: '',
      subject: '',
      enquiry: '',
      name: '',
      nameTouched: false,
      emailTouched: false,
      subjectTouched: false,
      enquiryTouched: false,
      emailFormat: true,
    });
    console.log(data)
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
  onSubmitPress = async () => {

    if (!this.state.name || !this.state.email || !this.state.subject || !this.state.enquiry) {
      Alert.alert(
        'MsaMart',
        'Please fill all mandatory fields in correct Format'
      );
    } else {
      let Service = {
        apiUrl: Api.contactUs,
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: JSON.stringify({
          Email: this.state.email,
          Subject: this.state.subject,
          Enquiry: this.state.enquiry,
          FullName: this.state.name,
          TelePhone: ""
        }),
        onSuccessCall: this.onSuccessSubmit,
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
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.backAvatar}
            source={Icons.arrowBack}
          />
        </TouchableOpacity>
        <View style={[styles.loginHeaderTextContainer]}>
          <Text style={styles.headerText}>{Strings.ContactUs}</Text>
        </View>
      </View>
    );
  };
  render() {
    const {
      name,
      email,
      subject,
      enquiry,
      nameTouched,
      emailTouched,
      subjectTouched,
      enquiryTouched,
      emailFormat,
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

    var subjectError = undefined;
    if (!subject && subjectTouched) {
      subjectError = Strings.SUBJECT_REQUIRED;
    } else {
      subjectError = undefined;
    }
    var enquiryError = undefined;
    if (!enquiry && enquiryTouched) {
      enquiryError = Strings.ENQUIRY_REQUIRED;
    } else {
      enquiryError = undefined;
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
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                    onSubmitEditing={this.handleNameSubmitPress}
                    placeholder={Strings.YOUR_NAME}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    title={Strings.YOUR_NAME}
                    mandatory={true}
                    leftIcon={false}
                    withBorder={true}
                    onBlur={this.handleNameBlur}
                    error={nameError}
                    blurOnSubmit={Constants.IS_IOS}
                  />
                  <FormTextInput
                    inputStyle={styles.inputStyle}
                    ref={this.emailInputRef}
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    onSubmitEditing={this.handleEmailSubmitPress}
                    placeholder={Strings.YOUR_EMAIL}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    title={Strings.YOUR_EMAIL}
                    mandatory={true}
                    leftIcon={false}
                    withBorder={true}
                    onBlur={this.handleEmailBlur}
                    error={emailError}
                    blurOnSubmit={Constants.IS_IOS}
                  />
                  <FormTextInput
                    inputStyle={styles.inputStyle}
                    ref={this.subjectInputRef}
                    value={this.state.subject}
                    onChangeText={this.handleSubjectChange}
                    onSubmitEditing={this.handleSubjectSubmitPress}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    placeholder={Strings.SUBJECT}
                    returnKeyType="next"
                    title={Strings.SUBJECT}
                    mandatory={true}
                    withBorder={true}
                    onBlur={this.handleSubjectBlur}
                    error={subjectError}
                  />
                  <FormTextInput
                    inputStyle={styles.inputStyle}
                    ref={this.EnquiryInputRef}
                    value={this.state.enquiry}
                    multiline
                    numberOfLines={6}
                    inputStyle={{ textAlignVertical: 'top', margin: 12 }}
                    onChangeText={this.handleEnquiryChange}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    placeholder={Strings.ENQUIRY}
                    returnKeyType="done"
                    title={Strings.ENQUIRY}
                    mandatory={true}
                    withBorder={true}
                    onBlur={this.handleEnquiryBlur}
                    error={enquiryError}
                  />
                  <Button
                    title={Strings.SUBMIT}
                    disabled={false}//{!name || !email || !subject || !enquiry || !emailFormat || !passwordFormat}
                    // btnStyle={{ borderWidth: 0, width: width - 60 }} 
                    btnStyle={{ width: width / 2.5, alignSelf: 'flex-end', borderWidth: 0 }}
                    titleStyle={{
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
                    OnClick={(data) =>
                      this.onSubmitPress()
                    }
                  />


                </KeyboardAvoidingView>
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

            </View>
          </SafeAreaView>
        </View>
      </>
    );
  }
}
