import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Header,
  Footer,
  Button,
  SearchBar,
  ProductGridListView,
  OfflineNotice,
  ImageCards,
  FleashDealsCount,
  AddToWishList,
  EmptyWishList,
  EmptyShoppingCart,
} from '@components';

import styles from './WishListPageStyles';
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
import { Colors } from '@theme';
import { DrawerActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";



type WindowDimensions = { width: number; height: number };

//import library for the TreeView
import { ServiceCall } from '@utils';
import { Api ,EventTags,EmarsysEvents} from '@config';

import { connect } from 'react-redux'

class WishListPage extends Component {
  static defaultProps = {
    onImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      Title: 'Wishlist',
      loading: false,
      CartCount: 0,
      wishListCount: 0,
      totalText: 'Total',
      // totalValue: '16,576.91',
      totalValue: 'calculated during checkout',

      totalCurrancy: 'AED',
      scrollMenuData: [],
      imgSliderData: [],
      imgCardsData: [],
      topWidget: [],
      bottomWidget: [],
      beforeNewsWidget: [],
      beforeBestSellersWidget: [],
      beforeProductsWidget: [],
      wishlistResponce: '',
      wishListData: [],
      DeleteWishlistItem: [],
      UpdatedQuentityItemData: '',
      shipToEnabled: false,
      currentCountryModel: null,
      userWishListFlag: false,
      userWishList: { },
      
      
    };
    this.onSuccessWidgetCall = this.onSuccessWidgetCall.bind(this);
    this.renderTotalPrize = this.renderTotalPrize.bind(this);
    this.onSuccessUpdatedWishlistCall = this.onSuccessUpdatedWishlistCall.bind(this);
    this.onAddToCartClick = this.onAddToCartClick.bind(this);

  }
  async componentDidMount() {
    await this.setState({ loading: true })
   this.fetchWishlistData();
    await this.onSuccessWishlistCall(this.props.WishListData.WishlistData);

    // let data = ;
    // console.log("navigation data--", data);
    if(this.props.route.params != null && this.props.route.params.passData!= null && this.props.route.params.passData.pageName == "WishListPage"){
      let guid = this.props.route.params.passData.data.slugUrl.split("/")[1];
      this.setState({ userWishListFlag: true })
      await this.getUserWishListData(guid);   
      await this.setState({ loading: false }); 
    }else{
      await this.setState({ loading: false });
      await this.fetchWishlistData();
    }
   
    
    //await this.props.updateWishlist();
    //await this.onSuccessWishlistCall(this.props.WishListData.WishlistData)
    this.props.updateCartCount();

    this.fetchWidgitData();

    this.focusListener = await this.props.navigation.addListener('focus', async () => {

      await this.props.updateWishlist();
      await this.onSuccessWishlistCall(this.props.WishListData.WishlistData)
      this.props.updateCartCount();

      await this.fetchWishlistData();
      await this.fetchWidgitData();
      // await this.getCartCountData();
    });
  }

  getUserWishListData = async(guid) => {
    let Service = {
      apiUrl: Api.getuserWishlist,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({ customerGuid: guid }),
      onSuccessCall: this.onSuccessUserWishlistData,
      onFailureAPI: this.onFailureUserWishlistAPI,
      onPromiseFailure: this.onPromiseUserWishlistFailure,
      onOffline: this.onUserWishListOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  }

  onSuccessUserWishlistData = (data) =>{
    if(data.status !== true){
      Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
    }else{
      this.setState({ 
        userWishListFlag: true,
        userWishList : data.model,
        wishListData: data.model.Items,
      });
      console.log("wishlist flag---", this.state.userWishListFlag);
    }
    

  }
  onFailureUserWishlistAPI = (data) => {
    console.log('error called user wishlist .................', data);
    if (data.errorlist) {
      // Alert.alert('DragonMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  onPromiseUserWishlistFailure = (data) => {
    console.log('on promise failure --', data);
    if (data.errorlist) {
      // Alert.alert('DragonMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };

  onUserWishListOffline = (data) => {
    this.setState({ loading: false });
    console.log('on offline data -- ', data);
    if (data.errorlist) {
      // Alert.alert('DragonMart', data.errorlist[0]);
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  };
  onSuccessWidgetCall = async (data) => {
    console.log('widgit data................................', data);
    let topWidget = [];
    let bottomWidget = [];
    let beforeNewsWidget = [];
    let beforeBestSellersWidget = [];
    let beforeProductsWidget = [];
    for (var i = 0; i < data.length; i++) {
      //if (data[i].WidgetZoneName == 'home_page_top') { topWidget.push(data[i]); }
      // if (data[i].WidgetZoneName == 'home_page_top') {
      //   topWidget.push(data[i]);
      // }
      if (data[i].WidgetZoneName == 'empty_wishlist') {
        beforeNewsWidget.push(data[i]);
      }
      // if (data[i].WidgetZoneName == 'home_page_before_best_sellers') {
      //   beforeBestSellersWidget.push(data[i]);
      // }
      // if (data[i].WidgetZoneName == 'home_page_before_products') {
      //   beforeProductsWidget.push(data[i]);
      // }
      if (data[i].WidgetZoneName == 'wishlist_with_items') {
        bottomWidget.push(data[i]);
      }
    }
    await this.setState({
      topWidget: topWidget,
      bottomWidget: bottomWidget,
      beforeNewsWidget: beforeNewsWidget,
      beforeBestSellersWidget: beforeBestSellersWidget,
      beforeProductsWidget: beforeProductsWidget,
    });
  }

  onSuccessWishlistCall = async (data) => {
    console.log("wishlistItem........................", data)

    //let DATA = data
    await this.setState({
      // wishlistResponce:DATA.model,
      loading:false,
      wishListData: data.model.Items,
    });
    if(data.model && data.model.CommonShipToModel){
      await this.setState({
        
        shipToEnabled: data.model.CommonShipToModel.IsShipToEnable,
        currentCountryModel: data.model.CommonShipToModel.CurrentCountryModel,
      });
    }
    this.props.updateWishlist();

  }

  onSuccessUpdatedWishlistCall = async (data) => {

    console.log("onSuccessUpdatedWishlistCall...................", data);
    if (data.errorlist > 0) {
      await this.setState({ loading: false });
      Alert.alert('DragonMart', data.errorlist[0])
    } else {
      this.props.UpdateWishlistData({ WishlistData: data.model })

      var DATA = data.model;

      await this.setState({
        loading: false,
        wishListData: DATA.Items,
        DeletedItemData: [], 
        
        //  wishlistResponce:DATA.model,
      });

      await this.fetchWidgitData();
      //await this.getCartCountData()
      await this.props.updateCartCount();
      if( data.message!=null && data.message.length > 0 ){
        await Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  }


  onSuccessupdateCartCall = async (data) => {

    if (data.status == true) {
      this.props.UpdateWishlistData({ WishlistData: data })
      console.log("onSuccessupdateCartCall........................", data)
      //let DATA = data
      await this.setState({
        // wishlistResponce:data.model,
        wishListData: data.model.Items,
        UpdatedQuentityItemData: '', 
        loading: false ,
      });

      await this.props.updateCartCount()
      await this.getCartCountData()
      if( data.message!=null && data.message.length > 0 ){
        await Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    } else {
      if (data.errorlist.length > 0) {
        Alert.alert('DragonMart', data.errorlist[0],
        [
          {text: 'OK', onPress: ()=>{
            this.setState({loading: false});
          }},
        ])
      }
    }




  }


  onQuentityUpdateShoppingItem = async (data) => {
    console.log("3/3/3/3/3/3/3/3/3/3/3/3", data)

    //     var QuentityArray=[]
    //     QuentityArray.push(data.Quantity)
    //     var dict = {};
    // dict.key1 = "'"+data[0].Id+"'";
    // dict.key2 = QuentityArray;

    //     this.setState({UpdatedQuentityItemData:dict})

    var QuentityArray = {}
    // QuentityArray.push(data.Quantity)
    var dict = {};
    dict.key1 = data.Id.toString()
    dict.key2 = data.Quantity.toString();
    QuentityArray[dict.key1] = dict.key2
    await this.setState({ UpdatedQuentityItemData: QuentityArray })

    await this.UpdateWishlistData()
    this.setState({ UpdatedQuentityItemData: '' })


  }

  onFailureAPI(data) {
    console.log(data);
    this.setState({ loading: false });
  }
  onPromiseFailure(data) {
    console.log(data);
  }
  onOffline(data) {
    console.log(data);
  }

  fetchWidgitData = async () => {
    let Service = {
      apiUrl: Api.Widget,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({ widget: 'Wishlist' }),
      onSuccessCall: this.onSuccessWidgetCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  fetchWishlistData = async () => {
    let Service = {
      //  apiUrl:"https://dmtest.dpworld.com/api/v1/shoppingcart/wishlist/get",
      apiUrl: Api.getWishlist,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },

      onSuccessCall: this.onSuccessWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onDeleteWishListItem = async (data) => {
    console.log("deleted item", data)
    var DeleteArray = []
    DeleteArray = this.state.DeleteWishlistItem;
    DeleteArray.push(data.Id)
    await this.setState({ DeletedItemData: DeleteArray })

    await this.setState({ loading: true })
    await this.UpdateWishlistData(data.Id)
  }


  onAddToCartClick = async (data) => {
    console.log("After item added to cart", data)

    var QuentityArray = []
    QuentityArray.push(Number(data.Id))
    await this.setState({ UpdatedQuentityItemData: QuentityArray, loading: true })
console.log("/////",UpdatedQuentityItemData);

    await this.UpdateCartData()

    const value = await AsyncStorage.getItem('@currencysymbol')
    console.log("value.......", value)
    if (value !== null) {

      let addToCartEventParams = { 'currency': value, 'item_id': data.Id, 'value': data.SubTotal }

      await analytics().logEvent('add_to_cart', addToCartEventParams);
      AppEventsLogger.logEvent(EventTags.ADD_TO_CART, addToCartEventParams);
      EmarsysEvents.trackEmarsys(EventTags.ADD_TO_CART, addToCartEventParams);
    } else {

      let addToCartEventParams = { 'currency': ' ', 'item_id': data.Id, 'value': data.SubTotal }; 

      await analytics().logEvent('add_to_cart', addToCartEventParams);
      AppEventsLogger.logEvent(EventTags.ADD_TO_CART, addToCartEventParams);
      EmarsysEvents.trackEmarsys(EventTags.ADD_TO_CART, addToCartEventParams);
    }

    // this.props.updateCartCount()
    // this.props.updateWishlist();

  }

  AddToWishlistChange = (data) => {
    this.onAddToWishList(data.Id);
  }

  onQuentityChange = (data) => {
    console.log("shdgd****////*****//*/**//****/**");
    
    var QuentityArray = {}
    // QuentityArray.push(data.Quantity)
    var dict = {};
    dict.key1 = data.Id.toString()
    dict.key2 = data.Quantity.toString();
    QuentityArray[dict.key1] = dict.key2
    this.setState({ allIdsToRemove: [], UpdatedQuentityItemData: QuentityArray })

    this.UpdateCartData()
    this.setState({ UpdatedQuentityItemData: '' })


  }

  UpdateWishlistData = async (Id) => {
  
    let Service = {
      apiUrl: Api.UpdateButtonWishlist,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        "removefromcart":Id

      }),
      onSuccessCall: this.onSuccessUpdatedWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  UpdateCartData = async () => {
    let Service = {
      apiUrl: Api.AddToCart,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        allIdsToAdd: this.state.UpdatedQuentityItemData
      }),
      onSuccessCall: this.onSuccessupdateCartCall,
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
      CartCount: data.model.cartCount,
      //wishListCount: data.wishListCount
    })

    this.props.addCountToCart({ cartCount: data.model.cartCount})

  }

  onWishIconClick = async () => {
    this.props.updateWishlist()
    await this.setState({ loading: true })
    // this.props.UpdateWishlistData({ WishlistData: data })

    await this.fetchWishlistData();
    await this.fetchWidgitData();

    await this.setState({ loading: false })
    this.props.updateCartCount();
  }

  OnViewAllPress = async (item) => {
    console.log("OnViewAllPress...", item)

    if (item.CustomProperties) {
      var navigationData = item.CustomProperties.UrlRecord
      if (navigationData) {
        if (navigationData.EntityName == "Vendor") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Vendor' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Vendor' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Vendor' });
          this.props.navigation.push('VendorFilterProductList', { passData: { pageName: 'Home', data: { Id: navigationData.EntityId } }, })
        }
        if (navigationData.EntityName == "Category") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Category' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Category' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Category' });

          this.props.navigation.push('FilterProductList', { passData: { pageName: 'Home', data: { Id: navigationData.EntityId } }, })
        }
        if (navigationData.EntityName == "Manufacturer") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Manufacturer' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Manufacturer' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Manufacturer' });
          this.props.navigation.push('ManufacturerFilterProductList', { passData: { pageName: 'Home', data: { Id: navigationData.EntityId } } })
        }
        if (navigationData.EntityName == "ExternalSearch") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'ExternalSearch' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'ExternalSearch' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'ExternalSearch' });
          this.props.navigation.push('SearchFilterProductList', { passData: { pageName: 'Home', data: { slugUrl: navigationData.Slug, SearchName: ' ' } } })
        }
        if (navigationData.EntityName == "Register") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Register' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Register' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': ' ', 'entity_name': 'Register' });
          this.props.navigation.push('Register')
        }
        if (navigationData.EntityName == "Mailto") {
          await analytics().logEvent('banner_click', { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'Mailto' });
          AppEventsLogger.logEvent(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'Mailto' });
          EmarsysEvents.trackEmarsys(EventTags.BANNER_CLICK, { 'item_id': navigationData.EntityId, 'slug_url': navigationData.Slug, 'entity_name': 'Mailto' });
          Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')

        }
      }
    }
  }


  renderTotalPrize = () => {
    return (
      <View
        style={[styles.totalPrizeContainer, this.props.totalPrizeContainer]}>
        <View>
          <Text>{this.state.totalText}</Text>
          <Text style={[styles.titleText, this.props.titleText]}>
            {this.state.totalCurrancy} {this.state.totalValue}
          </Text>
        </View>
        <Button
          title={'Proceed'}
          OnClick={(data) =>
            this.props.navigation.navigate('ShoppingSummary', {
              passData: data,
            })
          }
          btnStyle={{
            borderWidth: 0,
            width: 200,
            backgroundColor: Colors.PRIMARY_DARK_BTN,
          }}
          titleStyle={{ color: Colors.WHITE, textTransform: 'none' }}
        />
      </View>
    );
  };

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

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
        <StatusBar backgroundColor={Colors.PRIMARY} />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          {/* <Header
            burgerMenuClick={(data) => {
              this.props.navigation.toggleDrawer();
            }} */}
          <Header
            burgerMenuClick={(data) => {
              //this.props.navigation.toggleDrawer();
              this.props.navigation.dispatch(DrawerActions.openDrawer());
              //this.props.navigation.openDrawer()
            }}
            backButtonClick={() => this.props.navigation.pop()}
            NavButton={true}
            countryModel={this.state.currentCountryModel}
            shipToEnabled={this.state.shipToEnabled}
            shipToButtonClick={this.handleShipToButtonClick}
            userIcoStyles={{ tintColor: Colors.WHITE }}
            cartIcoStyles={{ tintColor: Colors.WHITE }}
            menuIcoStyles={{ tintColor: Colors.WHITE }}
            logoStyles={{ tintColor: Colors.WHITE }}
            fullRowBottom={
              <SearchBar
                onFocus={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                editable={false}
                onSearchContainer={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                onTextChange={(data) => console.log(data)}
                onSearch={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                isEnabled={false}
                styles={{ borderWidth: 0 }}
                iconColor={Colors.BLACK}
                iconContainerStyles={{
                  backgroundColor: Colors.SECONDAY_COLOR,
                }}
                placeholderStyles={{}}
              />
            }
            fullRowTop={<></>}
            styles={{
              backgroundColor: Colors.PRIMARY,
              borderBottomColor: Colors.SILVER,
            }}
            userClick={async (data) => { if (await AsyncStorage.getItem('loginStatus') == 'true') { this.props.navigation.navigate('Account', { passData: data, }) } else { this.props.navigation.navigate('SignIn', { passData: { screen: 'WishListPage' }, }) } }}
            cartClick={(data) =>
              this.props.navigation.navigate('ShoppingCart', {
                passData: data,
              })
            }
            logoClick={(data) => this.props.navigation.navigate('Home')}
          />
          <OfflineNotice
            noInternetText={'No internet!'}
            offlineText={'You are offline!'}
            offlineStyle={{}}
            noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
            offlineTextStyle={{}}
            noInternetTextStyle={{}}
          />
          <ScrollView
            style={styles.pageStyles}
            contentInsetAdjustmentBehavior="automatic">
            <View>
              {this.state.wishListData.length > 0 ?

                <>
                  <View
                    style={[
                      styles.titleTextContainer,
                      this.props.titleTextContainer,
                    ]}>
                      { this.state.userWishListFlag == true && this.state.userWishList.CustomerFullname !== null? 
                        <Text style={[styles.HeaderText, this.props.HeaderText]}
                          testID="userWishListTitle"
                          accessibilityLabel="userWishListTitle" >
                        {this.state.Title} of {this.state.userWishList.CustomerFullname} 
                        </Text> :
                        <Text style={[styles.HeaderText, this.props.HeaderText]}
                          testID="wishListTitle"
                          accessibilityLabel="wishListTitle" >
                          {this.state.Title}
                        </Text> 
                      }
                    
                  </View>

                  <AddToWishList
                    ListTitle={''}
                    wishListData={this.state.wishListData}
                    SoldBy={""}
                    isImgTopRtIcon={true}
                    imgTopRtIcon={Icons.heartClear}
                    isBottomRightIcon={true}
                    bottomRightIcon={Icons.addCart}
                    flag={this.state.userWishListFlag}
                    // onCartClick={(data) => console.log('common   ' + data.text)}
                    UpdateWishlistClick={(data) => console.log('common   ' + data)}
                    EmailClick={(data) => this.props.navigation.navigate('EmailFriend')}
                    AddToCartClick={(data) => this.onAddToCartClick(data)}
                    onAddToCartClick={(data) => this.onAddToCartClick(data)}
                    onRemoveClick={(data) => this.onDeleteWishListItem(data)}
                    QuentityUpdate={(data) => this.onQuentityUpdateShoppingItem(data)}
                    onItemClick={(data) => this.props.navigation.push('ProductDetails', { passData: { Id: data.ProductId } })}

                  />
                </>
                :
                <EmptyWishList
                  testId={"wishListEmptyMesg"}
                  EmptyTitle={"Your wishlist is empty. Don't worry, please visit our Homepage and get inspired"}
                  EmptyIcon={Icons.heartClear}
                />
              }

              {/* beforeNewsWidget Widget */}
              {this.state.beforeNewsWidget.length > 0 && this.state.wishListData.length < 1 && (
                <>
                  {this.state.beforeNewsWidget.map((item, i) => (
                    <>
                      {item.LayoutType == 'Grid_WithTimer' ? (
                        <>
                          <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}
                            FromDate={item.FromDate}
                            ToDate={item.ToDate}
                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={2}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}
                            SubTitle={'Ending In'}
                          />
                          <ProductGridListView key={i}
                            showAllButton={item.ViewAllURL}
                            ViewAllClick={() => this.OnViewAllPress(item)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={item.DPWProductOverviewModel}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}
                          />
                        </>
                      ) : (
                        <>
                          <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}

                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={1}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}

                          />
                          <ProductGridListView key={i}
                            showAllButton={item.ViewAllURL}
                            ViewAllClick={() => this.OnViewAllPress(item)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={item.DPWProductOverviewModel}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}
                          />
                        </>
                      )}
                    </>
                  ))}
                </>
              )}
              {this.state.bottomWidget.length > 0 && this.state.wishListData.length > 0 && (
                <>
                  {this.state.bottomWidget.map((item, i) => (
                    <>
                      {item.LayoutType == 'Grid_WithTimer' ? (
                        <>
                          <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}
                            FromDate={item.FromDate}
                            ToDate={item.ToDate}
                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={2}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}
                            SubTitle={'Ending In'}
                          />
                          <ProductGridListView key={i}
                            showAllButton={item.ViewAllURL}
                            ViewAllClick={() => this.OnViewAllPress(item)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={item.DPWProductOverviewModel}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}
                          />
                        </>
                      ) : (
                        <>
                          <FleashDealsCount key={i}
                            IconPictureURL={item.IconPictureURL}

                            blockStyle={{ backgroundColor: item.BackgroundColor }}
                            LayoutTypeId={1}
                            Title={item.Title}
                            titleStyle={{ fontSize: 14 }}

                          />
                          <ProductGridListView key={i}
                            showAllButton={item.ViewAllURL}
                            ViewAllClick={() => this.OnViewAllPress(item)}
                            listViewContainerStyle={{ borderTopWidth: 0, marginTop: 0, }}

                            ListTitleTextStyle={{}}
                            imgTopRtIcon={Icons.heartClear}
                            isBottomRightIcon={true}
                            listData={item.DPWProductOverviewModel}
                            bottomRightIcon={Icons.cartBtn}
                            onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                            OnWishlistClick={(data) => this.onWishIconClick()}
                          />
                        </>
                      )}
                    </>
                  ))}
                </>
              )}
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
        </SafeAreaView>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCountToCart: (newCount) => dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount }),
    UpdateWishlistData: (newCount) => dispatch({ type: 'ADD_WISHLIST_DATA', paylod: newCount }),

    updateWishlist: () => dispatch({ type: 'WISHLIST_CALL' }),
    updateCartCount: () => dispatch({ type: 'COUNT_CALL' })



  }
}

const mapStateToProps = (state) => {
  let Store_data = state.Count
  let Menu_data = state.Menu_Data
  let wishlistData = state.Wishlist_Data
  return {
    CarCount: Store_data.shoppingCartCount,
    MenuData: Menu_data.MenuData,
    WishListData: wishlistData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListPage)