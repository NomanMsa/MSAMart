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
  useWindowDimensions,
  FlatList,
} from 'react-native';
LogBox.ignoreAllLogs();
import AnimatedLoader from "react-native-animated-loader";
import { Images, Loaders, Icons } from '@assets';
import Toast from 'react-native-simple-toast';
import {
  OfflineNotice,
  Footer,
} from '@components';
import { ServiceCall } from '@utils';
import { Constants, Strings, Api } from '@config';
import styles from './PrivacyPolicyStyles';
import { Colors } from '@theme';
import { connect } from 'react-redux';
import { RenderHTML } from 'react-native-render-html'
import { WebView } from 'react-native-webview';
var html;
class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      email: '',
      subject: '',
      enquiry: '',
      emailFormat: true,
      QuestionaryData: [],
      datahtml: '<p></p>'
    };
    this.onSuccessSubmit = this.onSuccessSubmit.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }

  async componentDidMount() {

    if (this.props.PrivacyPolicyData && this.props.PrivacyPolicyData.length > 0) {
      this.setState({
        listData: this.props.PrivacyPolicyData,
        QuestionaryData: this.props.PrivacyPolicyData[0].TopicQuestions
      })
    } else {
      await this.setState({ loading: true })
      await this.fetchHelpData();
      await this.setState({ loading: false })
    }
  }

  fetchHelpData = async () => {
    let Service = {
      apiUrl: Api.PrivacyPolicyAPI + '?systemName=PrivacyInfo',
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessFetchHelpData,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccessFetchHelpData = (data) => {
    console.log("ghbsh//////////////////////////", data.model);
    html = data.model.Body;
    if (data.model && data.model.length > 0) {
      this.setState({
        listData: data.model,
        QuestionaryData: data.model,
        datahtml: data.model.Body
      })
      this.props.UpdatePolicyStaticData({
        DeliveryData: this.props.DeliveryData,
        PrivacyPolicyData: data.model.Body,
        ReturnsData: this.props.ReturnsData,
        TermsAndConditionData: this.props.TermsAndConditionData,
      })
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
          <Text style={styles.headerText}>{Strings.PrivacyPolicy}</Text>
        </View>
      </View>
    );
  };


  onSuccessSubmit(data) {
    if (data.message != null && data.message.length > 0) {
      Toast.showWithGravity(data.message, Toast.LONG, Toast.CENTER);
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
      loading: false,
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

  nestedListRenderer = ({ item, index }) => {
    return (
      <View key={index}>

        {item.QuestionTitle.length > 0 ?
          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {item.QuestionTitle}
          </Text>
          :
          <></>}
        <FlatList
          style={[styles.container, this.props.containerStyles]}
          data={item.TopicAnswers}
          renderItem={this.DetailsItems}
          keyExtractor={(items, index) => index}
        />
      </View>

    )
  }

  DetailsItems = ({ item, index }) => {

    return (
      <View key={index}>
        <View
          style={[
            styles.internalItemContainer,
            this.props.internalItemContainerStyles,
          ]}>
          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {item.AnswerTitle}
          </Text>

        </View>

        {item.opicSubAnswers != [] && <FlatList
          style={[styles.container, this.props.containerStyles]}
          data={item.TopicSubAnswers}
          renderItem={this.PointedDetailsItems}
          keyExtractor={(item, index) => index}
        />}
      </View>
    );
  };

  PointedDetailsItems = ({ item, index }) => {
    return (
      <View key={index}
        style={{ ...styles.internalItemContainer, flexDirection: 'row', paddingLeft: 35, marginRight: 20, }}>

        <Text style={[styles.normalText, this.props.normalTextStyles]}>
          {item.AnswerTitle}
        </Text>
      </View>
    );
  };

  render() {
    // const contentWidth = useWindowDimensions();
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
                <RenderHTML  source={{ html }}baseStyle={styles.normalText} />
                
                

                {/* <FlatList
                    style={[styles.container, this.props.containerStyles]}
                    data={this.state.QuestionaryData}
                    renderItem={this.nestedListRenderer}
                    keyExtractor={(item, index) => index}
                  /> */}


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

const mapDispatchToProps = (dispatch) => {
  return {
    UpdatePolicyStaticData: (data) => dispatch({ type: 'ADD_ALL_POLICY_STATIC_DATA', paylod: data }),

  }
}

const mapStateToProps = (state) => {

  let Store_data = state.Policy_Data
  return {
    DeliveryData: Store_data.DeliveryData,
    PrivacyPolicyData: Store_data.PrivacyPolicyData,
    ReturnsData: Store_data.ReturnsData,
    TermsAndConditionData: Store_data.TermsAndConditionData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);