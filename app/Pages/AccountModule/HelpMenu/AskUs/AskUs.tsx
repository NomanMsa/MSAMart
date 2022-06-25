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
import { Images, Loaders, Icons } from '@assets';
import Toast from 'react-native-simple-toast';
import {
  Button,
  OfflineNotice,
  FormTextInput,
  ButtonWithIcon,
} from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api } from '@config';
import styles from './AskUsStyles';
import { Colors } from '@theme';
import { FlatList } from 'react-native-gesture-handler';
interface State { name: string; email: string; subject: string; enquiry: string; nameTouched: boolean; emailTouched: boolean; subjectTouched: boolean; emailFormat: boolean; enquiryTouched: boolean; loaderVisible: boolean; }
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: false,
      name: '',
      email: '',
      subject: 'Shipping',
      enquiry: '',
      emailFormat: true,
      pBreadcrumb: [
        { Name: "Shipping", color: Colors.PRIMARY },
        { Name: "Aftersales", color: 'black' },
        { Name: "Account", color: 'black' },
        { Name: "Sellers", color: 'black' },
        { Name: "Website", color: 'black' },
      ],
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
  //subjectInputRef = React.createRef<FormTextInput>();
  EnquiryInputRef = React.createRef<FormTextInput>();
  buttonTriggerRef = React.createRef<Button>();
  readonly state: State = {
    name: "",
    email: "",
    //subject: "",
    enquiry: "",
    nameTouched: false,
    emailTouched: false,
    //subjectTouched: false,
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

  handleEnquiryChange = (enquiry: string) => {
    this.setState({ enquiry: enquiry });
  };
  handleNameSubmitPress = () => {
    if (this.emailInputRef.current) {
      this.emailInputRef.current.focus();
    }
  };

  handleEmailSubmitPress = () => {
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

  handleEnquiryBlur = () => {
    this.setState({ enquiryTouched: true });
  };

  onSuccessSubmit(data) {
    if( data.message!=null && data.message.length > 0 ){
      Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
    }
    this.setState({
      email: '',
      // subject: '',
      enquiry: '',
      name: '',
      nameTouched: false,
      emailTouched: false,
      // subjectTouched: false,
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

    if (!this.state.name || !this.state.email || !this.state.subject || !this.state.enquiry || !this.state.emailFormat) {
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
          <Text style={styles.headerText}>{Strings.AskUs}</Text>
        </View>
      </View>
    );
  };


  renderOptionList = ({ item, index }) => {
    return (
      <View key={index} style={{ justifyContent: 'space-between', }}>

        <ButtonWithIcon
          mainContainerStyles={{ padding: 0, margin: 0, }}
          // icon={Icons.notify}
          imageAvtarStyle={{
            height: 0,
            width: 0,
            margin: 5,
            marginRight: 20,
          }}
          // text={i == 0 ? '' : '/'}
          titleStyle={{
            fontWeight: "400",
            //  fontSize: 13,
            color: item.color,

          }}
          text={item.Name}
          secondaryTitleStyle={{
            //color: Colors.GRAY,
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
          userClick={(data) => {
            let optionData = this.state.pBreadcrumb


            for (let i = 0; optionData.length > i; i++) {
              if (index == i) {
                optionData[i].Name = optionData[i].Name,
                  optionData[i].color = Colors.PRIMARY
                this.setState({ subject: item.Name })
              } else {
                optionData[i].Name = optionData[i].Name,
                  optionData[i].color = 'black'
              }
            }



            this.setState({ pBreadcrumb: optionData })
          }
          }
        />

      </View>

    )
  }
  render() {
    const {
      name,
      email,
      // subject,
      enquiry,
      nameTouched,
      emailTouched,
      //subjectTouched,
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
                  <Text style={styles.listItemText}>
                    Still can't find answers?
        </Text>

                  <View
                    style={{ flex: 1, width: width, marginTop: 15, marginLeft: 20, }}
                  >
                    <FlatList
                      data={this.state.pBreadcrumb}
                      renderItem={this.renderOptionList}
                      keyExtractor={(item, index) => index}
                      numColumns={3}
                    />
                  </View>

                  <FormTextInput
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
                    ref={this.EnquiryInputRef}
                    value={this.state.enquiry}
                    multiline
                    numberOfLines={6}
                    inputStyle={{ textAlignVertical: 'top', margin: 12 }}
                    onChangeText={this.handleEnquiryChange}
                    placeholderTextColor={Colors.GRAY_TEXT}
                    // placeholder={Strings.YOUR_QUESTION}
                    returnKeyType="done"
                    title={Strings.YOUR_QUESTION}
                    mandatory={true}
                    withBorder={true}
                    onBlur={this.handleEnquiryBlur}
                    error={enquiryError}
                  />
                  <Button
                    title={Strings.SUBMIT}
                    disabled={false}
                    btnStyle={{ width: width / 2, alignSelf: 'flex-end', borderWidth: 0 }}
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
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </>
    );
  }
}
