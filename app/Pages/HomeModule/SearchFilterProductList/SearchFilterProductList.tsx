import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';
import {
  CategoryCircles,
  ImageSlider,
  ProductListFilter,
  ProductGridListView,
  ProductListView,
  Header,
  Footer,
  SearchBar,
  OfflineNotice,
  ScreenTitle,
  EmptyProductList,
  Linking,
} from '@components';
import analytics from '@react-native-firebase/analytics';
import perf from '@react-native-firebase/perf';
//import Emarsys from "react-native-emarsys-wrapper";
import { AppEventsLogger } from "react-native-fbsdk-next";
import styles from './SearchFilterProductListStyles';
import { ServiceCall } from '@utils';
import AsyncStorage from '@react-native-community/async-storage';
import { Api ,EventTags,EmarsysEvents} from '@config';
import { Colors } from '@theme';


import { connect } from 'react-redux'

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};


class SearchFilterProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      loading: false,
      loadingMore: false,
      ISGrid: false,
      imgSliderData: [],
      subCategories: [],
      catProducts: [],
      titleText: '',
      FilterCount: 0,
      listData: [],
      customeProperties: '',
      categoryNavigation: '',
      VendorFilterData: '',
      manufacturarFilterData: '',
      otherFilterData: '',
      SpecificationFilterData: '',
      filterData: '',
      LoadMore: false,
      sortByFilterData: [

        {
          id: 0,
          value: 'Sort by',
          testID: "sortTitle",
          accessibilityLabel: "sortTitle"
        },
        {
          id: 15,
          value: 'Newest',
          testID: "sortNewest",
          accessibilityLabel: "sortNewest"

        },
        {
          id: 10,
          value: 'Low Price',
          testID: "sortLowPrice",
          accessibilityLabel: "sortLowPrice"
        },
        {
          id: 11,
          value: 'Max Price',
          testID: "sortMaxPrice",
          accessibilityLabel: "sortMaxPrice"
        }

      ],
      AttributeArrayData: [],
      SpecificationArrayData: [],
      SpecificationBodyData: [],
      AttributeFilter_Id: 0,
      AttributeFilter_VariantIds: [],
      maxPrize: 0,
      minPrize: 0,
      manufacturarFilterIDsData: [],
      VendorFilterIDsData: [],
      categoryBannerData: [],
      CartCount: 0,
      wishListCount: 0,
      cData: '',
      orderby: 0,
      IsSearchPage: false,
      categoryId: 0,
      slugUrl: '',
      hasScrolled: false,
      PageNumber: 1,
      inStockChecked: false,
      onSaleChecked: false,
      shipToEnabled: false,
      currentCountryModel: null,

    };
    this.onSuccessCategoryViewCall = this.onSuccessCategoryViewCall.bind(this);
    this.fetchCategoriesData = this.fetchCategoriesData.bind(this);
  }
  async componentDidMount() {
    const searchProductsTrace =  await perf().startTrace('custom_trace_search_products_screen');
    this.setState({ loading: true });
    this.getCartCountData();
    let passData = (this.props.route.params).passData;
    await this.setState({ slugUrl: Number(passData.data.slugUrl) })
    console.log("PARAMDATA##############################################", passData)
    console.log("this.props.FilterData##############################################", this.props.Filterdata)

    await this.setState({ titleText: passData.data.SearchName })

    if (passData.pageName == 'searchPage') {

      let data = passData.data

      await this.setState({
        subCategories: this.props.Filterdata.subCategories,
        titleText: this.props.Filterdata.titleText,
        categoryBannerData: this.props.Filterdata.categoryBannerData,
        categoryId: this.props.Filterdata.categoryId,
        FilterCount: Number(data.filterCount),
        manufacturerId: 0,
        vendorId: 0,
        orderby: 0,
        pagesize: 15,
        minPrize: data.minPrize,
        maxPrize: data.maxPrize,
        onSaleChecked: data.onSaleChecked,
        inStockChecked: data.inStockChecked,
        SpecificationBodyData: data.SpecificationBodyData,
        AttributeArrayData: data.AttributeArrayData,
        manufacturarFilterIDsData: data.manufacturarFilterIDsData,
        VendorFilterIDsData: data.VendorFilterIDsData,
        PageNumber: 1
      })

    }

    await this.UpdateFilterData(passData.data.slugUrl);
    await this.setState({ loading: false });
    searchProductsTrace.putAttribute('occurrence', 'firstVisit');
    await searchProductsTrace.stop();

  }
  onSuccessCategoryViewCall = (data) => {
    this.setState({ loading: false });


    this.setState({
      subCategories: data.SubCategories,
      titleText: data.Name,
      categoryBannerData: data.CustomProperties.Banner,

    });
  }
  onFailureAPI(data) {
    console.log("suush------------------------------------------------ksoasooskokokso");
    
    if (data.message != null && data.message.length > 0) {
      Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
    }
    console.log(data);
  }
  onPromiseFailure(data) {
    console.log(data);
  }
  onOffline(data) {
    console.log(data);
  }
  fetchCategoriesData = async (catId) => {
    this.setState({ isOpen: false, loading: true, categoryId: catId });

    let Service = {
      apiUrl: Api.CategoryProduct + '?categoryId=' + catId,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        categoryIncludeInTopMenu: 'true',
        showOnHomePage: true,
        parentSliderWidget: 'home',
      }),
      onSuccessCall: this.onSuccessCategoryViewCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
    this.setState({ isOpen: false, loading: false });

  };

  UpdateWishlistDatas = (data) => {
    this.setState({ catProducts: data })
  }

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  UpdateWishlistData = async (data) => {
    let jdata ={
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
    let Service = {
      apiUrl: Api.AddToCart + '?productId=' +  data.Id + '&shoppingCartTypeId=2',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        jdata
      }),
      onSuccessCall: this.onSuccesswidgetWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccesswidgetWishlistCall(data) {
    this.setState({ loading: false });

    console.log("onsuccess.......onSuccessWishlistCall........", data)
  }


  renderIsGrid = () => {
    this.setState({ ISGrid: !this.state.ISGrid });
  };
  toggleFilter = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  UpdateFilterData = async (slugUrl) => {
    this.setState({ isOpen: false, slugUrl: slugUrl });
    // let bodyParameters = {
    //   categoryId: 0,
    //   manufacturerId: 0,
    //   vendorId: 0,
    //   orderby: this.state.orderby,
    //   pagesize: 15,
    //   ShouldNotStartFromFirstPage: true,
    //   PageNumber: Number(this.state.PageNumber),
    //   priceFrom: this.state.minPrize,
    //   priceTo: this.state.maxPrize,
    //   OnSale: this.state.onSaleChecked,
    //   InStock: this.state.inStockChecked,
    //   SpecifiationFilterModelDTO: {
    //     "SpecificationFilterDTOs": this.state.SpecificationBodyData
    //   },
    //   AttributeFilterModelDTO: {
    //     "AttributeFilterDTOs": this.state.AttributeArrayData
    //   },
    //   ManufacturerFilterModelDTO: {
    //     "SelectedFilterIds": this.state.manufacturarFilterIDsData

    //   },
    //   VendorFilterModelDTO: {
    //     "SelectedFilterIds": this.state.VendorFilterIDsData
    //   }

    let bodyParameters = {
      model: {
        "customProperties": {
          
        },
        "warning": "",
        "noResults": true,
        "q": slugUrl,
        "cid": 0,
        "isc": true,
        "mid": 0,
        "vid": 0,
        "pf": "",
        "pt": "",
        "sid": true,
        "adv": true,
        "asv": true,
        "availableCategories": [
          
        ],
        "availableManufacturers": [
          
        ],
        "availableVendors": [
          
        ],
        "pagingFilteringContext": {
          "pageNumber": 0,
          "pageSize": 15,
          "totalItems": 0,
          "totalPages": 0,
          "firstItem": 0,
          "lastItem": 0,
          "hasPreviousPage": true,
          "hasNextPage": true,
          "priceRangeFilter": {
            "customProperties": {
              "additionalProp1": "",
              "additionalProp2": "",
              "additionalProp3": ""
            },
            "enabled": true,
            "items": [
              
            ],
            "removeFilterUrl": ""
          },
          "specificationFilter": {
            "customProperties": {
              "additionalProp1": "",
              "additionalProp2": "",
              "additionalProp3": ""
            },
            "enabled": true,
            "alreadyFilteredItems": [
              
            ],
            "notFilteredItems": [
              
            ],
            "removeFilterUrl": ""
          },
          "allowProductSorting": true,
          "availableSortOptions": [
            
          ],
          "allowProductViewModeChanging": true,
          "availableViewModes": [
            
          ],
          "allowCustomersToSelectPageSize": true,
          "pageSizeOptions": [
            
          ],
          "orderBy": 0,
          "viewMode": ""
        },
        "products": [
          
        ]
      },
      "command": {
        "pageNumber": 0,
        "pageSize": 0,
        "totalItems": 0,
        "totalPages": 0,
        "firstItem": 0,
        "lastItem": 0,
        "hasPreviousPage": true,
        "hasNextPage": true,
        "priceRangeFilter": {
          "customProperties": {
            "additionalProp1": "",
            "additionalProp2": "",
            "additionalProp3": ""
          },
          "enabled": true,
          "items": [
            
          ],
          "removeFilterUrl": ""
        },
        "specificationFilter": {
          "customProperties": {
            "additionalProp1": "",
            "additionalProp2": "",
            "additionalProp3": ""
          },
          "enabled": true,
          "alreadyFilteredItems": [
            
          ],
          "notFilteredItems": [
            
          ],
          "removeFilterUrl": ""
        },
        "allowProductSorting": true,
        "availableSortOptions": [
          
        ],
        "allowProductViewModeChanging": true,
        "availableViewModes": [
          
        ],
        "allowCustomersToSelectPageSize": true,
        "pageSizeOptions": [
          
        ],
        "orderBy": this.state.orderby,
        "viewMode": ""
      }
  }
    

    
 
    console.log("bodyParameters", bodyParameters);
    let Service = {
      apiUrl: Api.externalSearchAPI,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify(bodyParameters),
      onSuccessCall: this.onSuccessUpdateFilterDataCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    const serviceResponse = await ServiceCall(Service);
  };


  onSuccessUpdateFilterDataCall = async (datas) => {
    console.log("--------------------------------------------------render");
    
    this.setState({ loading: false });
    console.log("onSuccessUpdateFilterDataCall**************", datas.model)
    if (this.state.PageNumber == 1) {
      let data = datas.model;
      await this.setState({
        catProducts: data.Products,
        titleText: datas.SearchTitle,
        cData: datas,
        // filterData: datas.ajaxFilter,
        // LoadMore: datas.LoadMore,
        // categoryNavigation: datas.categoryNavigation,
        // PrizeRangeFilterData: datas.ajaxFilter.PriceRangeFilterModel7Spikes,
        // VendorFilterData: datas.ajaxFilter.VendorFilterModel7Spikes,
        // manufacturarFilterData: datas.ajaxFilter.ManufacturerFilterModel7Spikes,
        // otherFilterData: datas.ajaxFilter.AttributeFilterModel7Spikes,
        // SpecificationFilterData: datas.ajaxFilter.SpecificationFilterModel7Spikes,

      });
      // if (datas.commonShipToModel) {
      //   await this.setState({
      //     shipToEnabled: datas.commonShipToModel.IsShipToEnable,
      //     currentCountryModel: datas.commonShipToModel.CurrentCountryModel,
      //   });
      // }
      await this.props.UpdateCategoryFilter({
        // filterData: datas.ajaxFilter,
        // category: datas.categoryNavigation,
        // subCategories: this.state.subCategories,
        titleText: this.state.titleText,
        // categoryBannerData: this.state.categoryBannerData,
        // categoryId: 0,
        // titleImageUrl: this.state.TitleImageUrl,
        slugUrl: this.state.slugUrl,
      })


      let items = []

      for (let i = 0; data.length > i; i++) {
        items.push(data[i].Id)
      }
      let viewItemListEventTag = { 'itemList': (items).toString(), 'item_list_name': this.state.titleText, 'item_list_id': this.state.categoryId, 'item_list_type': 'External_Search' };

      await analytics().logEvent('view_item_list', viewItemListEventTag);
      AppEventsLogger.logEvent(EventTags.VIEW_ITEM_LIST, viewItemListEventTag);
      this.trackCategoryView(this.state.titleText);

    } else {
      let newData = this.state.catProducts
      await this.setState({ catProducts: [...this.state.catProducts, ...datas.productsModel] })
    }
  }


  trackCategoryView = async(categoryPath) => {  
    try {
      let result = "";/*await Emarsys.predict.trackCategoryView(categoryPath);*/
    } catch (e) {
      console.log(e);
    }
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
    this.setState({ loading: false });

  }

  SortBySelection = async (data) => {
    console.log("SortBySelection..............", data)
    await this.setState({ orderby: data, loading: true, PageNumber: 1 })
    await this.UpdateFilterData(this.state.slugUrl)
    await this.setState({ loading: false })

  }

  onLoadMore = async () => {
    await this.setState({ loadingMore: true, PageNumber: this.state.PageNumber + 1 })
    // await this.UpdateFilterData()
    await this.UpdateFilterData(this.state.slugUrl);
    await this.setState({ loadingMore: false })
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
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>

          <Header
            burgerMenuClick={(data) => {
              this.props.navigation.toggleDrawer();
            }}
            backButtonClick={() => this.props.navigation.pop()}
            NavButton={true}
            userIcoStyles={{ tintColor: Colors.WHITE }}
            cartIcoStyles={{ tintColor: Colors.WHITE }}
            menuIcoStyles={{ tintColor: Colors.WHITE }}
            logoStyles={{ tintColor: Colors.WHITE }}
            countryModel={this.state.currentCountryModel}
            shipToEnabled={this.state.shipToEnabled}
            shipToButtonClick={this.handleShipToButtonClick}
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
            userClick={async (data) => { if (await AsyncStorage.getItem('loginStatus') == 'true') { this.props.navigation.navigate('Account', { passData: data, }) } else { this.props.navigation.navigate('SignIn', { passData: data, }) } }}
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
          <ProductListFilter
            testID={"productList"}
            accessibilityLabel={"productList"}
            DropDownData={this.state.sortByFilterData}
            ContainerStyle={{}}
            socialMediaList={[]}
            userClick={() => this.renderIsGrid()}
            onFilterClick={
              () => {
                this.setState({ PageNumber: 1 });
                let passdata = {
                  pageName: 'searchPage',
                  slugUrl: this.state.slugUrl,
                  categoryName: this.state.titleText,
                  filterCount: this.state.FilterCount,
                  // ajaxFilter: this.state.filterData,
                  // categoryNavigation: this.state.categoryNavigation
                }
                this.props.navigation.push('ApplyFilterPage', { passData: passdata })
              }
            }
            gridIcon={Icons.list}
            listIcon={Icons.grid}
            filterIcon={Icons.filter}
            isGrid={this.state.ISGrid}
            footerLinksList={[
              {
                label: 'UK',
                value: 'uk',
                icon: () => <Icon name="flag" size={18} color="#900" />,
              },
              {
                label: 'France',
                value: 'france',
                icon: () => <Icon name="flag" size={18} color="#900" />,
              },
            ]}
            FileterCount={this.state.FilterCount}
            onNavLink={(data) => console.log('common   ' + data.text)}
            onSortByClick={(data) => this.SortBySelection(data)}
          />
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent) && this.state.LoadMore && !this.state.loadingMore) {
                console.log("nativeEvent.................", nativeEvent)

                this.onLoadMore()
              }
            }}
            scrollEventThrottle={400}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <ScreenTitle
              ImageURL={Icons.HomeIco}
              titleText={this.state.titleText}
              titleClick={(data) => console.log('common   ' + data.text)}
              icoClick={(data) => this.props.navigation.navigate('Home')}
            />

            {this.state.categoryBannerData && this.state.categoryBannerData.length > 0 && <>
              {this.state.categoryBannerData.map((item, i) => (

                <View key={i} style={{ marginTop: 5 }}>
                  <ImageSlider
                    data={item.SliderImages}
                    slideInterval={
                      item.NivoSettings
                        ? item.NivoSettings.AutoSlideInterval
                        : 10000
                    }
                    onSlideClick={async (data) => {
                      await this.setState({ categoryId: data.Id, loading: true });
                      await this.fetchCategoriesData(data.slugUrl)
                      await this.UpdateFilterData(data.slugUrl);
                      await this.setState({ loading: false });


                    }
                    }
                  />
                </View>
              ))}</>


            }

            {(this.state.subCategories && this.state.subCategories.length > 0) && (<CategoryCircles
              data={this.state.subCategories}
              emptyMsg={'No categories found..'}
              newTagFlag={true}
              newTagText={'New'}
              onTap={async (data) => {
                await this.setState({ categoryId: data.Id, loading: true });
                await this.fetchCategoriesData(data.slugUrl)
                await this.UpdateFilterData(data.slugUrl);
                await this.setState({ loading: false });
              }
              }
              titleBlockStyle={{}}
              titleTextStyle={{}}
              itemStyle={{}}
              itemTextStyle={{}}
            />)}

            {this.state.catProducts && this.state.catProducts.length > 0 ? <>
              {this.state.ISGrid == false ? (
                <ProductListView
                  testID="productList"
                  accessibilityLabel="productList"
                  ListTitleTextStyle={{}}
                  imgTopRtIcon={Icons.heartClear}
                  isBottomRightIcon={true}
                  listData={this.state.catProducts}
                  bottomRightIcon={Icons.cartBtn}
                  onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                  onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                  onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                  onImgTopRtIcon={(data) => this.UpdateWishlistDatas(data)}
                  onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                  OnWishlistClick={(data) => this.UpdateWishlistData(data)}
                />
              ) : (<ProductGridListView
                testID="productList"
                accessibilityLabel="productList"
                ListTitleTextStyle={{}}
                imgTopRtIcon={Icons.heartClear}
                isBottomRightIcon={true}
                listData={this.state.catProducts}
                bottomRightIcon={Icons.cartBtn}
                onProductClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                onImageClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                onTitleClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                onImgTopRtIcon={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                onCartClick={(data) => this.props.navigation.push('ProductDetails', { passData: data, })}
                OnWishlistClick={(data) => this.UpdateWishlistData(data)}
              />
              )}
            </>
              :
              <>

                {this.state.loading === false && <EmptyProductList
                  testId={"errorBanner"}
                  EmptyTitle={"This product list is empty. Don't worry, please visit our Homepage and get inspired"}
                  EmptyIcon={Icons.heartClear}
                />}
              </>}

            {this.state.loadingMore == true ?
              <View >

                <ActivityIndicator animating={this.state.loadingMore} size="large" color={Colors.PRIMARY} />

              </View>
              : <></>}

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
        </SafeAreaView>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCountToCart: (newCount) => dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount }),
    // UpdateFilterParamenters: (newCount) => dispatch({ type: 'UPDATE_PARAMETER', paylod: newCount }),
    //ClearParameterData: () => dispatch({ type: 'Clear_Parameter' }),
    UpdateFilter: (newCount) => dispatch({ type: 'UPDATE_FILTER_DATA', paylod: newCount }),
    UpdateCategoryFilter: (newCount) => dispatch({ type: 'UPDATE_CATEGORY_DATA', paylod: newCount }),
    // ClearFilterData: () => dispatch({ type: 'CLEAR_FILTERDATA' })
  }
}

const mapStateToProps = (state) => {
  let Store_data = state.Count
  let Parameter_data = state.Parameter
  let Filter_Data = state.Filter_Data
  return {
    CarCount: Store_data.shoppingCartCount,
    Parameterdata: Parameter_data,
    Filterdata: Filter_Data,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterProductList)