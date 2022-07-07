import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  NestedList
} from '@components';
import styles from './MenuStyles';
//import NestedListView, { NestedRow } from 'react-native-nested-listview';NestedList
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
type WindowDimensions = { width: number; height: number };
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { AppEventsLogger } from "react-native-fbsdk-next";
import analytics from '@react-native-firebase/analytics';
import { Colors } from '@theme';
import { Images, Loaders, Icons } from '@assets';
import { Api,EventTags,EmarsysEvents } from '@config';
import { ServiceCall } from '@utils';
import { connect } from 'react-redux';

const getTextColor = (level, node) => {

  switch (parseInt(level)) {
    case 1:
      return styles.nodeTextStyle;
    case 2:
      // return styles.semiNodeTextStyle;
      return [node.IsBrowseAllLink ? styles.semiNodeRedTextStyle : styles.semiNodeTextStyle]
    case 3:
      // return styles.childNodeTextStyle;
      //return styles.semiNodeTextStyle;
      return [node.IsBrowseAllLink ? styles.ChildNodeRedTextStyle : styles.ChildNodeTextStyle]
    case 4:
      return styles.semiNodeStyle;
  }
  return " ";
};

const getViewColor = (level) => {

  switch (parseInt(level)) {
    case 1:
      return styles.nodeStyle;
    case 2:
      return styles.semiNodeStyle;
    case 3:
      // return styles.childNodeTextStyle;
      return { ...styles.semiNodeStyle, paddingLeft: 50 };
    case 4:
      return styles.semiNodeStyle;
  }
  return " ";
};


class Menu extends Component {
  static defaultProps = {
    onBackBtnClick: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      backButtonImage: Icons.arrowBack,
      headerText: 'All Categories',
      GrettingText: 'Hello',
      CustomerName: 'Joe Bloggs',
      LogoutText: 'Log out',
      LogoutImage: Icons.logout,
      // FileterCount: 2,
      drawer_menu: [],
      scrollMenuData: [],
      imgSliderData: [],
      imgCardsData: [],
      topWidget: [],
      bottomWidget: [],
      beforeNewsWidget: [],
      beforeBestSellersWidget: [],
      beforeProductsWidget: [],
      CartCount: 0,
      wishListCount: 0,
    };
    this.onSuccessCall = this.onSuccessCall.bind(this);
    this.getIndicator = this.getIndicator.bind(this);
    this.getTopMenu = this.getTopMenu.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.onSuccessTopMenuCall = this.onSuccessTopMenuCall.bind(this);
  }

  async componentDidMount() {

    this.onRenderCall()
    let durationM = new Date().getTime() - this.state.startTime
    let categoryScreen_Time = {
      item_id: durationM,
      slug_url: ' ',
      entity_name: 'Menu',
    };
    console.log("categoryScreen_Time duration--", this.state.startTime ," ---- ", durationM);
    await analytics().logEvent('categoryScreen_Time', categoryScreen_Time);
    AppEventsLogger.logEvent(EventTags.categoryScreen_Time, categoryScreen_Time);
  }

  componentWillMount() {
    let startTimeM = new Date().getTime()
    this.setState({ startTime : startTimeM });
   }

  onRenderCall = async () => {
    console.log("addCategoryMenu...........", this.props.MenuData);
    //await this.setState({ loading: true });
    await this.getTopMenu();
    // if (this.props.MenuData.length > 0) {
    //   await this.setState({
    //     //scrollMenuData: data.flat_menu,
    //     drawer_menu: this.props.MenuData
    //   });
    // } else {
      //await this.fetchHomeData();
    //   await this.getTopMenu();

    // }
    // this.getCartCountData();
    // this.ShowAlertWithDelay
    // setTimeout(() => {

    //   //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    //   this.setState({ loading: false });

    // }, 2000);



  }



  getIndicator(node, level, nodeActive) {

    if (level == 1) {
      if (node.listsubcategory != []) {
        return (nodeActive !=null )? '-': '+';
      } else {
        return '';
      }
    } else if (level == 2) {
      if (node.listsubcategory != []) {
        return (nodeActive !=null )? '-': '+';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  onSuccessCall(data) {
    this.setState({
      scrollMenuData: data.model.flat_menu,
      drawer_menu: data.model.drawer_menu
    });
    this.props.addCategoryMenu({ MenuData: data.drawer_menu })

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

  fetchHomeData = async () => {
    let Service = {
      apiUrl: Api.Home,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        categoryIncludeInTopMenu: 'true',
        showOnHomePage: true,
        parentSliderWidget: 'home',
      }),
      onSuccessCall: this.onSuccessCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
    this.renderLastRight = this.renderLastRight.bind(this);
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
      CartCount: data.cartCount,
      wishListCount: data.wishListCount
    })
    this.props.addCountToCart({ cartCount: data.cartCount, wishListCount: data.wishListCount })

  }

  getTopMenu = async() =>{
    let Service = {
      apiUrl: "https://mobcms.msainfotech.in/api/v1/Header/GetTopMenu"+ "?customerSiteId=0",//Api.Categories+ "?customerSiteId=0",
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      // bodyData: JSON.stringify({
      //   categoryIncludeInTopMenu: 'true',
      //   showOnHomePage: true,
      //   parentSliderWidget: 'home',
      // }),
      onSuccessCall: this.onSuccessTopMenuCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
    this.renderLastRight = this.renderLastRight.bind(this);
  }

  onSuccessTopMenuCall(data) {
    console.log("shhsygs////=====",data);
    
    this.setState({
      scrollMenuData: data.flat_menu,
      drawer_menu: data.model.Categories
    });
    this.props.addCategoryMenu({ MenuData: data.model.Categories })

  }

  OnNodePress = async (node) => {
    console.log("OnNodePress....", node)
    await analytics().logEvent('navigation_menu', { 'item_id': node.Id, 'item_list_name': node.Name });
    AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'item_id': node.Id, 'item_list_name': node.Name });
    EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'item_id': node.Id, 'item_list_name': node.Name });
    await this.props.navigation.push('FilterProductList', { passData: { pageName: 'menu', data: node }, })

  }


  renderHeader = () => {
    return (
      <View style={[styles.headerContainer, this.props.headerContainerStyles]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'center' }}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.backBtnIcon}
            source={this.state.backButtonImage}
          />

          <Text style={[styles.headerText, this.props.headerTextStyle]}>
            {this.state.headerText}
          </Text>
        </TouchableOpacity>
        <View style={{ ...styles.catHeaderContainer, paddingLeft: 20 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Help')}>
            <Image style={styles.backIcoStyle} source={Icons.helpIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(data) => this.props.navigation.navigate('WishListPage', {
              passData: data,
            })}>
            {this.renderLastRight()}
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderLastRight = () => {
    return (
      <View
        style={[
          styles.LastRightContainer,
          this.props.LastRightContainerStyles,
        ]}>
        {this.props && this.props.WishlistCount > 0 && <View
          style={[
            styles.LastRightCountContainer,
            this.props.LastRightCountContainerStyle,
          ]}>
          <Text
            style={[
              styles.LastRightCountText,
              this.props.LastRightCountTextStyle,
            ]}>
            {' '}
            {this.props.WishlistCount}{' '}
          </Text>
        </View>}


        <Image
          style={[
            styles.backIcoStyle,
            this.props.backIcoStyleStyle,
          ]}
          source={Icons.heartTransparent}
        />
      </View>
    );
  };



  render() {
    console.log('this.props.MenuData..........', this.props.MenuData)
    return (
      <>

        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.8)"
          source={Loaders.rings}
          animationStyle={styles.lottie}
          speed={1}
        />
        <StatusBar
          backgroundColor={Colors.PRIMARY}
          barStyle="light-content"
        />
        {/* <View style={{ backgroundColor: Colors.PRIMARY }}> */}
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            {/* <View style={styles.pageStyles}> */}
              {this.renderHeader()}
              <ScrollView
                style={styles.scrollStyles}
              //contentInsetAdjustmentBehavior="automatic"
              >
                {/* <View style={styles.menuContainerBox}> */}
                {/* <NestedListView
                    style={{ flex: 1 }}
                    // onNodePressed={(node) => this.OnNodePress(node)}
                    data={this.props.MenuData}
                    getChildrenName={(node) => 'SubCategories'}
                    renderNode={(node, level, isExpanded, hasChildrenNodes) => (
                      <NestedRow level={level}>
                        { level == 1 ? <View
                          style={styles.nodeStyle}>
                          <TouchableOpacity onPress={() => this.OnNodePress(node)}>
                            <Text
                              style={styles.nodeTextStyle}>
                              {node.Name}
                            </Text>
                          </TouchableOpacity>
                          <Text
                            style={styles.nodeSignStyle}>
                            {node.SubCategories.length != 0 ?
                              <>
                                {this.getIndicator(
                                  node,
                                  level,
                                  isExpanded,
                                  hasChildrenNodes,
                                )}
                              </>
                              :
                              <></>
                            }
                          </Text>

                        </View>
                          :
                          <View
                            style={styles.semiNodeStyle}>
                            <TouchableOpacity onPress={() => this.OnNodePress(node)}>
                              <Text
                                style={[node.IsBrowseAllLink ? styles.semiNodeRedTextStyle : styles.semiNodeTextStyle]}>
                                {node.Name}
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={styles.nodeSignStyle}>
                              {node.SubCategories.length != 0 ?
                                <>
                                  {this.getIndicator(
                                    node,
                                    level,
                                    isExpanded,
                                    hasChildrenNodes,
                                  )}
                                </>
                                :
                                <></>
                              }
                            </Text>

                          </View>}
                      </NestedRow>
                    )}
                  /> */}
                <NestedList
                  listItems={this.state.drawer_menu}
                  //listWrapperStyle={{ flex: 1, backgroundColor: 'yellow', }}
                  childrenPath={"SubCategories"}
                  opacity={0.8}
                  itemKey={(item) => item.Id}
                  onItemPressed={(item) => {
                    console.log("AN ELEMENT WAS PRESSED", item);
                  }}
                  onLastItemPressed={(item) => {
                    console.log("LAST ELEMENT", item);
                  }}
                  itemContent={(item, nodeActive) => (

                    <View style={getViewColor(item.CustomProperties.Level)}>
                      {/* <View style={styles.nodeStyle}> */}
                      {/* <Text style={styles.nodeTextStyle} onPress={() => this.OnNodePress(item)}>{item.Name}</Text> */}
                      <Text style={getTextColor(item.CustomProperties.Level, item)} onPress={() => this.OnNodePress(item)}
                      >{item.Name}</Text>
                      <Text style={styles.nodeSignStyle}>
                        {item.SubCategories.length != 0 &&
                          <>
                            {this.getIndicator(item, item.CustomProperties.Level,nodeActive)}
                          </>}
                      </Text>
                    </View>
                  )}
                />
                {/* </View> */}
              </ScrollView>
            {/* </View> */}
          </SafeAreaView>
        {/* </View> */}
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCategoryMenu: (newCount) => dispatch({ type: 'ADD_CATEGORY_DATA', paylod: newCount }),
    addCountToCart: (newCount) => dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount }),

  }
}

const mapStateToProps = (state) => {

  let Store_data = state.Count
  let Menu_data = state.Menu_Data
  return {
    WishlistCount: Store_data.wishlistCount,
    loginStatus: Store_data.loginStatus,
    MenuData: Menu_data.MenuData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

