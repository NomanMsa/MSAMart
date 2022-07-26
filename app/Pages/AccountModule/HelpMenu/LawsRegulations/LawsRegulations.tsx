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
  FlatList,
  Linking,
} from 'react-native';
LogBox.ignoreAllLogs();
import AnimatedLoader from "react-native-animated-loader";
import { Loaders, Icons } from '@assets';
import Toast from 'react-native-simple-toast';
import {
  OfflineNotice,
  Footer,
} from '@components';
import { ServiceCall } from '@utils';
import { Strings, Api } from '@config';
import styles from './LawsRegulationsStyles';
import { Colors } from '@theme';
import { connect } from 'react-redux';
import { RenderHTML } from 'react-native-render-html';
import AsyncStorage from '@react-native-community/async-storage';
var html;

class LawsRegulations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      email: '',
      subject: '',
      enquiry: '',
      emailFormat: true,
      sEmail:'',
      QuestionaryData: [
        {
          "QuestionTitle": "Laws and Regulations",
          "TopicAnswers": [
            {
              "AnswerTitle": "By using this website you represent, warrant and agree that you shall fully comply and will at all times continue to fully comply with all applicable laws and regulations of the United Arab Emirates, including but not limited to all of the following federal laws:",
              "IsHyperLink": false,
              "RedirectTo": 0,
              "TopicSubAnswers": [
                {
                  "AnswerTitle": "1. The Federal Law No. 24 of 2006 on Consumer Protection",
                  "IsHyperLink": true,
                  "RedirectTo": 'https://elaws.moj.gov.ae/UAE-MOJ_LC-En/00_CONSUMER/UAE-LC-En_2006-08-13_00024_Kait.html',
                  "Redirect": 0
                },
                {
                  "AnswerTitle": "2. Federal Law No. 7 of 2002 Concerning copyrights and related rights",
                  "IsHyperLink": true,
                  "RedirectTo": 'https://elaws.moj.gov.ae/UAE-MOJ_LC-En/00_INTELLECTUAL%20PROPERTY/UAE-LC-En_2002-07-01_00007_Kait.html',
                  "Redirect": 0
                },
                {
                  "AnswerTitle": "3. Federal Act No. 18 of 1981 Concerning Organizing Trade Agencies.",
                  "IsHyperLink": true,
                  "RedirectTo": 'https://elaws.moj.gov.ae/UAE-MOJ_LC-En/00_COMMERCE/UAE-LC-En_1981-08-11_00018_Kait.html',
                  "Redirect": 0
                },
                {
                  "AnswerTitle": "4. Federal Law No. (37) of 1992 Concerning Trademarks as amended by Law No. 19 of 2000 and Law No. 8 of 2002",
                  "IsHyperLink": true,
                  "RedirectTo": 'https://elaws.moj.gov.ae/UAE-MOJ_LC-En/00_INTELLECTUAL%20PROPERTY/UAE-LC-En_1992-09-28_00037_Kait.html',
                  "Redirect": 0
                },
                {
                  "AnswerTitle": "5. Federal Law no. (19) of 2016 on Combating Commercial Fraud",
                  "IsHyperLink": true,
                  "RedirectTo": 'https://elaws.moj.gov.ae/UAE-MOJ_LC-En/00_COMMERCE/UAE-LC-En_2016-12-12_00019_Kait.html',
                  "Redirect": 0
                },

              ],
            },

          ],
          "expanded": false
        }
      ]

    };
    AsyncStorage.getItem("semail").then(response => {
      this.setState({
          sEmail:response
        });

      });
    this.onSuccessSubmit = this.onSuccessSubmit.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }

  async componentDidMount() {


    // if (this.props.ReturnsData && this.props.ReturnsData.length > 0) {
    //   this.setState({
    //     listData: this.props.ReturnsData,
    //     QuestionaryData: this.props.ReturnsData[0].TopicQuestions
    //   })
    // } else {
    //   await this.setState({ loading: true })
    //   await this.fetchHelpData();
    //   await this.setState({ loading: false })
    // }

  }

  handleClick = (ulr) => {
    console.log(ulr)
    Linking.canOpenURL(ulr).then(supported => {
      if (supported) {
        Linking.openURL(ulr);
      } else {
        console.log("Don't know how to open URI: " + ulr);
      }
    });
  };
  handleSupportClick = () => {
    Linking.openURL('mailto:'+this.state.sEmail)
  };

  fetchHelpData = async () => {
    let Service = {
      apiUrl: Api.returnPolicyAPI+'?systemName=ShippingInfo',
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
    html = data.model.Body;
    if (data.model && data.model.length > 0) {
      this.setState({
        listData: data.model,
        QuestionaryData: data.model.Body
      })

      this.props.UpdatePolicyStaticData({
        DeliveryData: this.props.DeliveryData,
        PrivacyPolicyData: this.props.PrivacyPolicyData,
        ReturnsData: data.model,
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
          <Text style={styles.headerText}>{Strings.LawsRegulations}</Text>
        </View>
      </View>
    );
  };

  onSuccessSubmit(data) {
    if( data.message!=null && data.message.length > 0 ){
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
      <View>

        {item.QuestionTitle.length > 0 ?
          <Text style={[styles.TitleText, this.props.TitleTextStyles]}>
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
      <View
        style={{ ...styles.internalItemContainer, flexDirection: 'row', paddingLeft: 35, marginRight: 20, }}>

        {item.IsHyperLink ? <Text style={[styles.HyperlinkText, this.props.HyperlinkTextStyles]} onPress={() => this.handleClick(item.RedirectTo)}>
          {item.AnswerTitle}
        </Text>
          :
          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {item.AnswerTitle}
          </Text>}
      </View>
    );
  };

  render() {
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
                  <RenderHTML source={{ html }} baseStyle={styles.normalText}/>
                  
                <View >
                  {/* <FlatList
                    style={[styles.container, this.props.containerStyles]}
                    data={this.state.QuestionaryData}
                    renderItem={this.nestedListRenderer}
                    keyExtractor={(item, index) => index}
                  /> */}

                  <View
                    style={{ ...styles.internalItemContainer, flexDirection: 'row', marginRight: 20, }}>

                    <Text>For any queries please contact us at  <Text style={[styles.HyperlinkText, this.props.HyperlinkTextStyles]} onPress={() => this.handleSupportClick()}>
                      {this.state.sEmail}
        </Text>
                    </Text>

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
        </View>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    //UpdatePolicyStaticData: (data) => dispatch({ type: 'ADD_ALL_POLICY_STATIC_DATA', paylod: data }),

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

export default connect(mapStateToProps, mapDispatchToProps)(LawsRegulations);
