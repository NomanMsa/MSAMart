import React, { Component } from 'react';
import { SafeAreaView, Alert, ScrollView, View, Text, StatusBar, Image, TouchableOpacity, LogBox, Platform, } from 'react-native';
LogBox.ignoreAllLogs();

import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Footer, SearchBar, OfflineNotice, Button, FormTextInput, ButtonWithIcon } from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api } from '@config';
import { Colors } from '@theme';
import styles from './EmailFriendStyles';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

interface State { comment: string; userEmail: string; friendEmail: string; commentTouched: boolean; userEmailTouched: boolean; friendEmailTouched: boolean; UserEmailFormat: boolean; FriendsEmailFormat: boolean; confirmPasswordMatch: boolean; passwordFormat: boolean; loaderVisible: boolean; }

class ThankYou extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      headerText: 'Email Wishlist',
      backButtonImage: Icons.arrowBack,
      loading: false,
      userEmail: '',
      friendEmail: '',
      UserEmailFormat: true,
      FriendsEmailFormat: true,
      comment: '',
      OrderTotal: '',
      CartCount: 0,
      wishListCount: 0,
      errorList: [],
    }
    this.fetchEmailDetails = this.fetchEmailDetails.bind(this);
    this.onSuccessfetchOrderDetails = this.onSuccessfetchOrderDetails.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.renderHeader = this.renderHeader.bind(this);

  }


  async componentDidMount() {

    if (await AsyncStorage.getItem('loginStatus') == 'true') {
      this.setState({ loading: true });
      await this.fetchEmailDetails()
       await this.getCartCountData();   
      this.setState({ loading: false });
    } else {
      //  await this.getCartCountData();
    }

    this.focusListener = await this.props.navigation.addListener('focus', async () => {
      //this.startData();
      this.setState({ loading: true });

      if (await AsyncStorage.getItem('loginStatus') == 'true') {
        this.fetchEmailDetails()
         await this.getCartCountData();      
      } else {
         await this.getCartCountData();
      }

      this.setState({ loading: false });

      //Put your Data loading function here instead of my this.LoadData()
    });

  }

  friendInputRef = React.createRef<FormTextInput>();
  emailInputRef = React.createRef<FormTextInput>();
  commentInputRef = React.createRef<FormTextInput>();

  readonly state: State = {
    comment: "",
    userEmail: "",
    friendEmail: "",
    password: "",
    confirmpassword: "",
    commentTouched: false,
    userEmailTouched: false,
    friendEmailTouched: false,
    passwordTouched: false,
    confirmpasswordTouched: false,
    emailFormat: true,
    passwordFormat: true,
    FriendsEmailFormat: true,
  };

  handleFriendEmailChange = (friendEmail: string) => {
    this.setState({ friendEmail: friendEmail });
    let reg = Constants.IS_VALID_EMAIL_REGEX;//^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (reg.test(friendEmail) === false) {
      this.setState({ FriendsEmailFormat: false })
      return false;
    }
    else {
      this.setState({ FriendsEmailFormat: true })
    }
  };

  handleUserEmailChange = (userEmail: string) => {
    this.setState({ userEmail: userEmail });
    let reg = Constants.IS_VALID_EMAIL_REGEX;//^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (reg.test(userEmail) === false) {
      this.setState({ UserEmailFormat: false })
      return false;
    }
    else {
      this.setState({ UserEmailFormat: true })
    }
  };

  handleFriendEmailSubmitPress = () => {
    // if (this.friendInputRef.current) {
    //   this.friendInputRef.current.focus();
    // }

    if (this.emailInputRef.current) {
      this.emailInputRef.current.focus();
    }
  };

  handleUserEmailSubmitPress = () => {
    // if (this.emailInputRef.current) {
    //   this.emailInputRef.current.focus();
    // }
    if (this.commentInputRef.current) {
      this.commentInputRef.current.focus();
    }
  };


  handleFriendEmailBlur = () => {
    this.setState({ friendEmailTouched: true });
  };
  handleUserEmailBlur = () => {
    this.setState({ userEmailTouched: true });
  };


  handlecommentChange = (comment: string) => {
    this.setState({ comment: comment });
  };

  handlecommentSubmitPress = () => {
    // if (this.emailInputRef.current) {
    //   this.emailInputRef.current.focus();
    // }
  };

  handlecommentBlur = () => {
    this.setState({ commentTouched: true });
  };


  onSuccessfetchOrderDetails = async (data) => {
    if (data.status == true) {
      this.setState({
        userEmail: data.model.YourEmailAddress,

      });
    } else {
      if( data.errorlist[0]!=null && data.errorlist[0].length > 0 ){
        Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
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
  fetchEmailDetails = async () => {
    let Service = {
      apiUrl: Api.userEmailDetailAPI,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchOrderDetails,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  getCartCountData = async () => {
    let authToken = await AsyncStorage.getItem('custToken');
		if(authToken != null){
    let Service = {
      apiUrl: Api.getShoppingCount,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessGetCountCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }
  };

  onSuccessGetCountCall = (data) => {

    this.setState({
      CartCount: data.model.Items.length,
      wishListCount: data.model.Items.length
    })

    this.props.addCountToCart({ cartCount: data.model.Items.length, wishListCount: data.model.Items.length })
  }

  onSendEmailPress = async () => {

    if (!this.state.friendEmail || !this.state.userEmail || !this.state.UserEmailFormat || !this.state.FriendsEmailFormat) {
      Alert.alert(
        'MsaMart',
        'Please fill all mandatory fields in correct Format'
      );
    } else {
      let Service = {
        apiUrl: Api.sendEmailAPI,
        methodType: 'POST',
        headerData: { 'Content-Type': 'application/json' },
        bodyData: JSON.stringify({
          FriendEmail: this.state.friendEmail,
          YourEmailAddress: this.state.userEmail,
          PersonalMessage: this.state.comment,
        }),
        onSuccessCall: this.onSuccessSendEmail,
        onFailureAPI: this.onFailureAPI,
        onPromiseFailure: this.onPromiseFailure,
        onOffline: this.onOffline,
      };
      this.setState({ loaderVisible: true });
      const serviceResponse = await ServiceCall(Service);
      this.setState({ loaderVisible: false });
    }
  }

  onSuccessSendEmail = (data) => {
    if (data.status == true) {

      Alert.alert(
        'MsaMart',
        data.message, [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'Ok',
          //onPress: () => this.props.navigation.pop()
          onPress: () => this.setState({
            friendEmail: '',
            comment: '',
            nameTouched: false,
            emailTouched: false,
            friendEmailTouched: false,
            // subjectTouched: false,
            enquiryTouched: false,
            emailFormat: true,
            FriendsEmailFormat: true,

          })

        },], {
        cancelable: false
      }
      )
      console.log(data)
    } else {
      this.setState({ errorList: data.errorlist })
    }
  }


  EmailSend = async () => {
    if (await AsyncStorage.getItem('loginStatus') == 'true') {
      await this.onSendEmailPress()
    } else {
      Toast.showWithGravity("Only registered customers can use email a friend feature", Toast.LONG, Toast.BOTTOM);
      this.props.navigation.navigate('SignIn')
    }

  }

  renderHeader = () => {
    return (
      <View style={[styles.headerContainer, this.props.headerContainerStyles]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.props.navigation.pop()}>
          <Image
            style={styles.backBtnIcon}
            source={this.state.backButtonImage}
          />

          <Text style={[styles.headerText, this.props.headerTextStyle]}>
            {this.state.headerText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      comment,
      UserEmail,
      friendEmail,
      password,
      confirmpassword,
      commentTouched,
      friendEmailTouched,
      userEmailTouched,
      passwordTouched,
      confirmpasswordTouched,
      FriendsEmailFormat,
      emailFormat,
      passwordFormat,
      confirmPasswordMatch,
    } = this.state;

    var FriendEmailError = undefined;
    if (!friendEmail && friendEmailTouched) {
      FriendEmailError = Strings.EMAIL_REQUIRED;
    } else if (friendEmailTouched && !FriendsEmailFormat) {
      FriendEmailError = Strings.EMAIL_WRONG_FORMAT;
    } else {
      FriendEmailError = undefined;
    }

    var UserEmailError = undefined;
    if (!UserEmail && userEmailTouched) {
      UserEmailError = Strings.EMAIL_REQUIRED;
    } else if (userEmailTouched && !emailFormat) {
      UserEmailError = Strings.EMAIL_WRONG_FORMAT;
    } else {
      UserEmailError = undefined;
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
          {this.renderHeader()}

          <OfflineNotice
            noInternetText={'No internet!'}
            offlineText={'You are offline!'}
            offlineStyle={{}}
            noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
            offlineTextStyle={{}}
            noInternetTextStyle={{}}
          />
          <View>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Text style={{ ...styles.headerText, color: 'black', }}
                testID="emailProductToFriendTitle"
                accessibilityLabel="emailProductToFriendTitle"
              >Email your wishlist to a friend</Text>
              {this.state.errorList.length > 0 ?
                <View style={styles.errrorCard}>
                  <View style={styles.ErrorHeader}>
                    {/* <Text style={styles.errorText}>A confirmation email has been sent to:<Text style={styles.emailText}>{this.state.userEmail}</Text></Text> */}
                    {this.state.errorList.map((item, index) => {
                      return <Text key={index} style={styles.errorText} >{item}</Text>
                    })}
                  </View>
                </View>
                :
                <View></View>}
              <View style={styles.formContainer}>
                <FormTextInput
                  testID={"friendEmail"}
                  accessibilityLabel={"friendEmail"}
                  inputStyle={styles.inputStyle}
                  ref={this.friendInputRef}
                  value={this.state.friendEmail}
                  onChangeText={this.handleFriendEmailChange}
                  onSubmitEditing={this.handleFriendEmailSubmitPress}
                  placeholder={Strings.ENTER + Strings.FRIENDS_EMAIL}
                  placeholderTextColor={Colors.GRAY_TEXT}
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  title={Strings.FRIENDS_EMAIL}
                  mandatory={true}
                  leftIcon={false}
                  withBorder={true}
                  onBlur={this.handleFriendEmailBlur}
                  error={FriendEmailError}
                  blurOnSubmit={Constants.IS_IOS}
                />


                <FormTextInput
                  testID={"selfEmailId"}
                  accessibilityLabel={"selfEmailId"}
                  inputStyle={styles.inputStyle}
                  ref={this.emailInputRef}
                  value={this.state.userEmail}
                  onChangeText={this.handleUserEmailChange}
                  onSubmitEditing={this.handleUserEmailSubmitPress}
                  placeholder={Strings.ENTER + Strings.YOUR_EMAIL_ADDRESS}
                  placeholderTextColor={Colors.GRAY_TEXT}
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  title={Strings.YOUR_EMAIL_ADDRESS}
                  mandatory={true}
                  leftIcon={false}
                  withBorder={true}
                  onBlur={this.handleUserEmailBlur}
                  error={UserEmailError}
                  blurOnSubmit={Constants.IS_IOS}
                />

                <FormTextInput
                  testID={"personalMesg"}
                  accessibilityLabel={"personalMesg"}
                  inputStyle={styles.inputStyle}
                  value={this.state.comment}
                  ref={this.commentInputRef}
                  onChangeText={this.handlecommentChange}
                  onSubmitEditing={this.handlecommentSubmitPress}
                  placeholder={Strings.ENTER + Strings.PERSONAL_MESSAGE}
                  placeholderTextColor={Colors.GRAY_TEXT}
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  title={Strings.PERSONAL_MESSAGE}
                  // mandatory={true}
                  leftIcon={false}
                  withBorder={true}
                  onBlur={this.handlecommentBlur}
                  // error={commentError}
                  blurOnSubmit={Constants.IS_IOS}
                />
                <View style={{ padding: 10, alignItems: 'flex-end', }}>
                  <ButtonWithIcon
                    testId={"sendEmail"}
                    mainContainerStyles={{
                      padding: 0, margin: 10, alignItems: 'center',
                      justifyContent: 'center', marginLeft: 10,
                      backgroundColor: Colors.PRIMARY, borderRadius: 30,
                      height: 50, width: 180,
                    }}
                    imageAvtarStyle={{
                      height: 0,
                      width: 0,
                      margin: 5,
                    }}
                    text={"Send email"}
                    titleStyle={{
                      color: Colors.WHITE,
                      fontSize: 16,
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
                      alignSelf: 'center',
                    }}

                    userClick={() => this.EmailSend()}
                  />

                </View>
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
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCountToCart: (newCount) => dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount })
  }
}

const mapStateToProps = (state) => {
  let Store_data = state.Count
  let LoginStatus = state.Login_Status

  return {
    CarCount: Store_data.shoppingCartCount,
    loginStatus: LoginStatus.loginStatus
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou)