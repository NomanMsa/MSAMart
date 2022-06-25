import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import styles from './SearchStyles';
type WindowDimensions = { width: number; height: number };
import { Colors } from '@theme';
import { Images, Icons } from '@assets';
import { Api ,EventTags} from '@config';
import { ServiceCall } from '@utils';
import { AppEventsLogger } from "react-native-fbsdk-next";
import analytics from '@react-native-firebase/analytics';
/*import Emarsys from "react-native-emarsys-wrapper";*/
export default class MenuContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      backButtonImage: Icons.arrowBack,
      headerText: 'Your Account',
      GrettingText: 'Hello',
      CustomerName: 'Joe Bloggs',
      LogoutText: 'Log out',
      LogoutImage: Icons.arrowBack,
      dataSource: [],
      listData: [],
      drawer_menu: [],
      scrollMenuData: [],
      imgSliderData: [],
      imgCardsData: [],
      topWidget: [],
      bottomWidget: [],
      beforeNewsWidget: [],
      beforeBestSellersWidget: [],
      beforeProductsWidget: [],
      EmptyMessage: 'No result found.'
    };
    this.onSuccessCall = this.onSuccessCall.bind(this);

    this.arrayholder = [];
    this.renderHeader = this.renderHeader.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
    this.validURL = this.validURL.bind(this);
    this.onArrowClicked = this.onArrowClicked.bind(this);
    this.onclickSearch = this.onclickSearch.bind(this);
  }
  searchInputRef = React.createRef<TextInput>();

  async componentDidMount() {
    this.setState({ text: '', dataSource: [], })

    this.focusListener = await this.props.navigation.addListener('focus', async () => {
      this.setState({ text: '', dataSource: [], })

    });
  }
  onSuccessCall = async(data) => {
    console.log("on search data---", data);
    this.setState({
      dataSource: data.model,
    });
    let durationM = new Date().getTime() - this.state.startTime;

      let searchSuggestionTime = {
        item_id: durationM,
        slug_url: ' ',
        entity_name: 'searchSuggestion',
      };
      console.log("searchSuggestion duration--", this.state.startTime ," ---- ", durationM);
      await analytics().logEvent('searchSuggestionTime', searchSuggestionTime);
      AppEventsLogger.logEvent(EventTags.searchSuggestionTime, searchSuggestionTime);


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
  fetchHomeData = async (text) => {
    let startTimeM = new Date().getTime()

    await this.setState({ text: text,
      startTime : startTimeM })
    let Service = {
      apiUrl: Api.Search + text,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      // bodyData: JSON.stringify({
      //   categoryIncludeInTopMenu: 'true',
      //   showOnHomePage: true,
      //   parentSliderWidget: 'home',
      // }),
      onSuccessCall: this.onSuccessCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onArrowClicked = (item) => {
    console.log(item)
    this.setState({ text: item.ResponseText })
    this.fetchHomeData(item.ResponseText);
  }
  onclickSearch = async () => {
    if (this.state.text != '' && this.state.text != null && this.state.text != undefined && this.state.text != ' ') {
      await analytics().logEvent('search', { 'search_term': this.state.text });
      AppEventsLogger.logEvent(EventTags.SEARCH, { 'search_term': this.state.text });
      this.trackSearchTerm(this.state.text);
      await this.props.navigation.push('SearchFilterProductList', { passData: { pageName: 'search', data: { slugUrl: this.state.text, SearchName: this.state.text } }, })
    }
  }

  trackSearchTerm = async (search_term) => {

    try {
      let result = "";/*await Emarsys.predict.trackSearchTerm(search_term);*/
    } catch (e) {
      console.log(e);
    }
  }

  renderHeader = () => {
    return (
      <View style={[styles.headerContainer, this.props.headerContainerStyles]}>
        <TouchableOpacity
          style={{ padding: 5, marginRight: -10, marginLeft: -10 }}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.backAvatar}
            source={this.state.backButtonImage}
          />
        </TouchableOpacity>

        <View style={[styles.searchContainer, this.props.searchContainer]}>
          {/* <TextInput
            style={styles.searchInputs}
            value={this.state.text}
            placeholder="Search Here"
            ref={this.searchInputRef}
            autoFocus={true}
            onChangeText={(text) => this.fetchHomeData(text)}
          /> */}

          <TextInput
            testID={"searchInput"}
            accessibilityLabel={"searchInput"}
            style={styles.searchInputs}
            value={this.state.text}
            placeholder="Search Here"
            returnKeyType={'search'}
            onSubmitEditing={(text) => this.onclickSearch()}
            ref={this.searchInputRef}
            autoFocus={true}
            onChangeText={(text) => this.fetchHomeData(text)}
          />

          <TouchableOpacity
            style={[
              styles.searchClearContainer,
              this.props.searchClearContainer,
            ]}
            onPress={() =>
              this.setState({ text: '', dataSource: this.state.fullDataSource })
            }>
            <Image style={styles.SearchClearAvatar} source={Icons.search} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.searchMagnifyContainer,
            ]}
            onPress={() =>
              this.onclickSearch()
            }

          >
            <Image style={styles.SearchMagnifyAvatar} source={Icons.search}
              testID={"searchBtn"}
              accessibilityLabel={"searchBtn"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  validURL(str) {
    
    
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }
  OrderDetailsItems = ({ item, index }) => {
    console.log("--------------------------------------------render item =" + item.label);
    
    return (

      <View key={index}
        style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
        <View style={{ alignItems: 'flex-start' }}>
          {this.validURL(item.ImageURL) ? <Image style={styles.SearchAvatar} source={{ uri: item.ImageURL }} /> : <Image style={[{ ...styles.SearchAvatar, tintColor: Colors.BG_OVERLAY }]} source={Icons.search} />}
        </View>
        <TouchableOpacity style={{ flex: 8, justifyContent: 'center', }}
          onPress={async () => {
            await analytics().logEvent('search', { 'search_term': item.label });
            AppEventsLogger.logEvent(EventTags.SEARCH, { 'search_term': item.label });
            this.trackSearchTerm(item.label );
            await this.props.navigation.push('SearchFilterProductList', { passData: { pageName: 'search', data: { slugUrl: item.producturl, SearchName: item.label } }, })
          }
          }
        >
          <Text
            style={[styles.normalText, this.props.normalTextStyles]}
          >
            {item.label}
          </Text>

          <Text
            style={[styles.categoryText, this.props.categoryTextStyles]}
          >
            {item.label}
          </Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onArrowClicked(item)}>

          <View style={{ flex: 2, alignItems: 'center', alignContent: 'center', justifyContent: 'center', }}>
            <Image style={styles.logoutAvatar} source={Icons.diagonalUpArrow} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderEmptyProductList() {
    return (<Text style={styles.SerchTextStyle}>{this.state.text ? "No results found" : "Please enter a search value"}</Text>)
  }
  render() {
    return (
      <>
        <StatusBar
          backgroundColor={Colors.PRIMARY}
          barStyle="light-content"
        />
        <View style={styles.pageContainer}>

          <SafeAreaView>
            {this.renderHeader()}
            <ScrollView
              style={styles.pageStyles}
              contentInsetAdjustmentBehavior="automatic">
              <FlatList
                style={[styles.container, this.props.containerStyles]}
                data={this.state.dataSource}
                renderItem={this.OrderDetailsItems}
                ListEmptyComponent={this.renderEmptyProductList()}
                keyExtractor={(item, index) => index}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      </>
    );
  }
}