import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Footer,
} from '@components';
import AnimatedLoader from "react-native-animated-loader";
import styles from './DeliveryStyles';
type WindowDimensions = { width: number; height: number };
import { Colors } from '@theme';
import { Images, Loaders, Icons } from '@assets';
import { Api } from '@config';
import { ServiceCall } from '@utils';
import { connect } from 'react-redux';

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backButtonImage: Icons.arrowBack,
      headerText: 'Help Center',
      LogoutImage: Icons.arrowBack,
      isListHide: false,
      responceModel: false,
      listData: [],
      loading: false,
      QuestionaryData: '',
      sampleData: '',

      SelectedSection: 'Delivery'
    };
    this.fetchHelpData = this.fetchHelpData.bind(this);
    this.onSuccessFetchHelpData = this.onSuccessFetchHelpData.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
    this.DetailsItems = this.DetailsItems.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
    //this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
  }

  async componentDidMount() {

    if (this.props.DeliveryData && this.props.DeliveryData.length > 0) {
      this.setState({
        listData: this.props.DeliveryData,
        QuestionaryData: this.props.DeliveryData[0].TopicQuestions
      })
    } else {

      this.setState({ loading: true });
      await this.fetchHelpData()
      this.setState({ loading: false });
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

  fetchHelpData = async () => {
    let Service = {
      apiUrl: Api.helpData,
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

    if (data.model && data.model.length > 0) {
      this.setState({
        listData: data.model,
        QuestionaryData: data.model[0].TopicQuestions
      })
      this.props.UpdatePolicyStaticData({
        DeliveryData: data.model,
        PrivacyPolicyData: this.props.PrivacyPolicyData,
        ReturnsData: this.props.ReturnsData,
        TermsAndConditionData: this.props.TermsAndConditionData,
      })
    }
  }
  renderHeader = () => {
    return (
      <View style={[styles.headerContainer, this.props.headerContainerStyles]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.logoutAvatar}
            source={this.state.backButtonImage}
          />

          <Text style={[styles.headerText, this.props.headerTextStyle]}>
            {this.state.headerText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };



  OrderDetailsItems = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} onPress={() => this.setState({ QuestionaryData: item.TopicQuestions, SelectedSection: item.Topic, isListHide: false })}
        style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
        <Text style={[styles.normalText, this.props.normalTextStyles]}>
          {item.Topic.toString()}
        </Text>

      </TouchableOpacity>
    );
  };

  OnQuestionClick = (item, index) => {
    var ExpandListData = this.state.QuestionaryData
    ExpandListData[index] = {
      expanded: !item.expanded,
      QuestionTitle: item.QuestionTitle,
      TopicAnswers: item.TopicAnswers,
    }

    this.setState({ QuestionaryData: ExpandListData })
  }

  DetailsItems = ({ item, index }) => {
    return (
      <View key={index}>
        {item.expanded == false && <TouchableOpacity
          onPress={() => this.OnQuestionClick(item, index)}
          style={[
            styles.internalItemContainer,
            this.props.internalItemContainerStyles,
          ]}>
          <Text style={[styles.listItemText, this.props.listItemTextStyles]}>
            {item.QuestionTitle}
          </Text>
          <Image
            style={{ ...styles.ArrowAvatar, alignSelf: 'center', }}
            source={Icons.arrowDown}
          />
        </TouchableOpacity>}




        {item.expanded == true && <TouchableOpacity
          onPress={() => this.OnQuestionClick(item, index)}
          style={[
            styles.ExpandedItemContainer,
            this.props.ExpandedItemContainerStyles,
          ]}>
          <View style={{ flexDirection: 'row', }}>

            <Text style={[styles.exapndedlistItemText, this.props.exapndedlistItemTextStyles]}>
              {item.QuestionTitle}
            </Text>
            <Image
              style={{ ...styles.ArrowAvatar, alignSelf: 'center', transform: [{ rotate: '180deg' }], }}
              source={Icons.arrowDown}
            />
          </View>

          <View style={{ flexDirection: 'column', marginTop: 20, }}>
            {item.TopicAnswers.length > 0 && item.TopicAnswers.map((ansData, i) => (
              <>{ansData.AnswerTitle ? <Text style={[styles.listAnsText, this.props.listItemTextStyles]}>
                {ansData.AnswerTitle}

                <>
                  {(ansData.TopicSubAnswers && ansData.TopicSubAnswers.length > 0) && ansData.TopicSubAnswers.map((ansDatum, i) => (
                    <>{ansDatum.AnswerTitle ? <>
                      {ansDatum.IsHyperLink == true ? <Text style={[styles.listAnsTextLink, this.props.listItemTextStyles]} onPress={() => this.props.navigation.push(ansDatum.RedirectTo)}>{ansDatum.AnswerTitle} </Text> :
                        <Text style={[styles.listAnsText, this.props.listItemTextStyles]}>
                          {ansDatum.AnswerTitle}
                        </Text>}
                    </> : <></>}
                    </>))}
                </>

              </Text> : <></>}
              </>))}
          </View>
        </TouchableOpacity>}



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

          <ScrollView >

            <TouchableOpacity onPress={() => this.setState({ isListHide: !this.state.isListHide })}>
              <View style={styles.dropdownStyle}>
                <Text>{this.state.SelectedSection}</Text>
                {this.state.isListHide == false ? <Image
                  style={styles.ArrowAvatar}
                  source={Icons.arrowDown}
                /> : <></>}

                {this.state.isListHide == true ? <Image
                  style={{ ...styles.ArrowAvatar, transform: [{ rotate: '180deg' }], }}
                  source={Icons.arrowDown}
                /> : <></>}
              </View>
            </TouchableOpacity>


            {this.state.isListHide ? <FlatList
              style={[styles.container, this.props.containerStyles]}
              data={this.state.listData}
              renderItem={this.OrderDetailsItems}
              keyExtractor={(item, index) => index}
            />
              :
              <></>}
            <View style={styles.helpCenterCart}>
              <Image
                style={{ height: 30, width: 30, resizeMode: 'contain' }}
                source={Icons.helpIcon}
              />
              <Text style={{ ...styles.headerText, color: Colors.BLACK }}>
                Help Center
        </Text>
            </View>


            {true ? <FlatList
              style={[styles.container, this.props.containerStyles]}
              data={this.state.QuestionaryData}
              renderItem={this.DetailsItems}
              keyExtractor={(item, index) => index}
            />
              :
              <></>}



            <TouchableOpacity style={styles.BottomCart}
              onPress={() => this.props.navigation.navigate('AskUs')}
            >
              <Image
                style={styles.bottomCartIcon}
                source={Icons.helpIcon}
              />

              <View style={{ alignSelf: 'center', }}>
                <Text style={{ ...styles.listItemText, fontSize: 15, }}>
                  Still can't find answers?
        </Text>

                <Text style={[styles.normalText, this.props.normalTextStyles]}>
                  contact us with your Questions
        </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.BottomCart}
              onPress={() => this.props.navigation.navigate('AskUs')}
            >
              <Image
                style={styles.bottomCartIcon}
                source={Icons.helpIcon}
              />

              <View style={{ alignSelf: 'center', }}>
                <Text style={{ ...styles.listItemText, fontSize: 15, }}>
                  Help us to improve
        </Text>

                <Text style={[styles.normalText, this.props.normalTextStyles]}>
                  contact us with your Questions
        </Text>
              </View>
            </TouchableOpacity>



            <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.SILVER, }}>

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
            </View>
          </ScrollView>

          <View>

          </View>


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

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
