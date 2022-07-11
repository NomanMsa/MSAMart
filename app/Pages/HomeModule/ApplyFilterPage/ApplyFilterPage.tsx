import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  FilterMenu,
  ButtonWithIcon,
} from '@components';
import styles from './ApplyFilterPageStyles';
import AnimatedLoader from "react-native-animated-loader";
type WindowDimensions = { width: number; height: number };
import { Colors } from '@theme';
import { Constants, Strings, Api } from '@config';
import { ServiceCall } from '@utils';
import { Images, Loaders, Icons } from '@assets';
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window');
// var maxPrize = 0
// var minPrize = 0


class ApplyFilterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      backButtonImage: Icons.arrowBack,
      headerText: 'Filters',
      customeProperties: '',
      categoryNavigation: '',
      categorieName: '',
      VendorFilterData: '',
      manufacturarFilterData: '',
      otherFilterData: '',
      AttributeData: [],
      SpecificationFilterData: '',
      filterData: '',
      AttributeArrayData: [],
      SpecificationArrayData: [],
      SpecificationData: [],
      SpecificationBodyData: [],
      AttributeFilter_Id: 0,
      AttributeFilter_VariantIds: [],
      maxPrize: 0,
      minPrize: 0,
      TotalfilterCount: 0,
      manufacturarFilterIDsData: [],
      VendorFilterIDsData: [],
      categoryBannerData: [],
      CartCount: 0,
      wishListCount: 0,
      cData: '',
      InStockData: '',
      OnSaleData: '',
      onSaleChecked: false,
      inStockChecked: false,
      filterPageId: 0,
      manufacturerId: 0,
      vendorId: 0,
      PageName: 'FilterProductList',
      slugUrl: '',
      PrizeRangeUpdatedMin: 0,
      PrizeRangeUpdatedMax: 0,
      isAllFilterCollapcible: false,
    }

    // this.renderHeader = this.renderHeader.bind(this);
    // this.onFailureAPI = this.onFailureAPI.bind(this);
    // this.onPromiseFailure = this.onPromiseFailure.bind(this);
    // this.onOffline = this.onOffline.bind(this);

  };



  async componentDidMount() {
    // this.passDataCall();
    await this.onAgainFilterApplyCall();
  }

  passDataCall = async () => {
    this.onAgainFilterApplyCall();
  }

  onAgainFilterApplyCall = async () => {
    let passData = (this.props.route.params).passData;
    // await this.setState({ loading: true, PageName: passData.pageName, });
    console.log("PARAMDATA##############################################", passData)
    console.log("this.props.Filterdata##############################################", this.props.Filterdata)
    if (passData.pageName == 'filterPage') {

      await this.setState({ filterPageId: this.props.Filterdata.categoryId, loading: true, PageName: passData.pageName, })
      console.log('filterPage.........', passData.pageName)
      //await this.onAgainFilterApplyCall(passData);
    }

    if (passData.pageName == 'VendorProductList') {

      await this.setState({ vendorId: this.props.Filterdata.categoryId, categorieName: passData.categoryName, loading: true, PageName: passData.pageName, })
      console.log('VendorProductList.........', passData.pageName)
      //await this.onAgainFilterApplyCall(passData);
    }
    if (passData.pageName == 'ManufacturerProductList') {

      await this.setState({ manufacturerId: this.props.Filterdata.categoryId, categorieName: passData.categoryName, loading: true, PageName: passData.pageName, })
      console.log('ManufacturerProductList.........', passData.pageName)
      // await this.onAgainFilterApplyCall(passData);
    }

    if (passData.pageName == 'searchPage') {

      await this.setState({ slugUrl: passData.slugUrl, categorieName: passData.categoryName, loading: true, PageName: passData.pageName, })
      console.log('searchPage.........', passData.pageName)
    }
    var Searchdata = this.props.Filterdata
    var ajaxFilters = Searchdata.filterData
    await this.setState({
      filterPageId: this.props.Filterdata.categoryId,
      // slugUrl: this.state.slugUrl,
      // categorieName: Searchdata.categoryName,
      categoryNavigation: Searchdata.category,
      PrizeRangeFilterData: ajaxFilters.PriceRangeFilterModel7Spikes,
      OnSaleData: ajaxFilters.OnSaleFilterModel7Spikes,
      InStockData: ajaxFilters.InStockFilterModel7Spikes,
      VendorFilterData: ajaxFilters.VendorFilterModel7Spikes,
      manufacturarFilterData: ajaxFilters.ManufacturerFilterModel7Spikes,
      otherFilterData: ajaxFilters.AttributeFilterModel7Spikes,
      SpecificationFilterData: ajaxFilters.SpecificationFilterModel7Spikes,

    });

    if (ajaxFilters.PriceRangeFilterModel7Spikes && ajaxFilters.PriceRangeFilterModel7Spikes.SelectedPriceRange) {
      let prizeRange = ajaxFilters.PriceRangeFilterModel7Spikes
      let SelectedPriceRange = prizeRange.SelectedPriceRange
      await this.setState({
        updatedPrizeRangeFilterData: SelectedPriceRange,
        PrizeRangeUpdatedMin: SelectedPriceRange.From,
        PrizeRangeUpdatedMax: SelectedPriceRange.To,
      })
    }
    if (this.state.manufacturarFilterData && this.state.manufacturarFilterData.ManufacturerFilterItems) {
      await this.setState({
        manufacturarFilterIDsData: this.state.manufacturarFilterData.ManufacturerFilterItems
      })
    }
    if (this.state.VendorFilterData && this.state.VendorFilterData.VendorFilterItems) {
      await this.setState({
        VendorFilterIDsData: this.state.VendorFilterData.VendorFilterItems
      })
    }

    if (this.state.OnSaleData && this.state.OnSaleData.FilterItemState == 1) {
      await this.setState({
        onSaleChecked: true
      })
    }

    if (this.state.InStockData && this.state.InStockData.FilterItemState == 1) {
      await this.setState({
        inStockChecked: true
      })
    }
    await this.setState({ loading: false });
  }


  onSuccessCategoryViewCall = (data) => {
    console.log("onSuccessCategoryViewCall......", data)
    if (data.CustomProperties) {
      var CustomPropertiesData = data.CustomProperties
      var ajaxFilters = CustomPropertiesData.NopAjaxFilters

      this.setState({
        filterData: data,
        categoryId: data.Id,
        customeProperties: CustomPropertiesData,
        categoryBannerData: CustomPropertiesData.Banner,
        categoryNavigation: CustomPropertiesData.CategoryNavigation,

      });

      if (ajaxFilters && ajaxFilters.PriceRangeFilterModel7Spikes && ajaxFilters.PriceRangeFilterModel7Spikes.SelectedPriceRange) {
        let prizeRange = ajaxFilters.PriceRangeFilterModel7Spikes

        this.setState({
          PrizeRangeFilterData: ajaxFilters.PriceRangeFilterModel7Spikes,
          maxPrize: 0,
          minPrize: 0,
          PrizeRangeUpdatedMin: prizeRange.SelectedPriceRange.From,
          PrizeRangeUpdatedMax: prizeRange.SelectedPriceRange.To,

        })
      }

      if (this.state.OnSaleData && ajaxFilters.OnSaleFilterModel7Spikes && ajaxFilters.OnSaleFilterModel7Spikes.FilterItemState && this.state.OnSaleData.FilterItemState == 1) {
        this.setState({
          OnSaleData: ajaxFilters.OnSaleFilterModel7Spikes,
          onSaleChecked: true
        })
      }


      if (this.state.InStockData && ajaxFilters.InStockFilterModel7Spikes && ajaxFilters.InStockFilterModel7Spikes.FilterItemState && this.state.InStockData.FilterItemState == 1) {
        this.setState({
          InStockData: ajaxFilters.InStockFilterModel7Spikes,

          inStockChecked: true
        })
      }

      if (CustomPropertiesData && CustomPropertiesData.NopAjaxFilters && CustomPropertiesData.NopAjaxFilters.VendorFilterModel7Spikes) {
        this.setState({ VendorFilterData: CustomPropertiesData.NopAjaxFilters.VendorFilterModel7Spikes, })
      }

      if (CustomPropertiesData && CustomPropertiesData.NopAjaxFilters && CustomPropertiesData.NopAjaxFilters.ManufacturerFilterModel7Spikes) {
        this.setState({ manufacturarFilterData: CustomPropertiesData.NopAjaxFilters.ManufacturerFilterModel7Spikes, })
      }
      if (CustomPropertiesData && CustomPropertiesData.NopAjaxFilters && CustomPropertiesData.NopAjaxFilters.AttributeFilterModel7Spikes) {
        this.setState({ otherFilterData: CustomPropertiesData.NopAjaxFilters.AttributeFilterModel7Spikes, })
      }
      if (CustomPropertiesData && CustomPropertiesData.NopAjaxFilters && CustomPropertiesData.NopAjaxFilters.SpecificationFilterModel7Spikes) {
        this.setState({ SpecificationFilterData: CustomPropertiesData.NopAjaxFilters.SpecificationFilterModel7Spikes, })
      }
      this.props.UpdateCategoryFilter({
        filterData: ajaxFilters,
        category: this.state.categoryNavigation,
        subCategories: data.SubCategories,
        titleText: data.Name,
        categoryBannerData: CustomPropertiesData.Banner,
        categoryId: data.Id,
        slugUrl: '',
        titleImageUrl: ''
      })
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
  fetchCategoriesData = async (catId) => {
    this.setState({ isOpen: false, loading: true });
    let FinalURL = Api.CategoryProduct + '?categoryId=' + catId
      await this.setState({ loading: true, filterPageId: this.props.Filterdata.categoryId, manufacturerId: 0, vendorId: 0, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });
      //FinalURL = Api.CategoryProduct + '?id=' + catId
    /*let FinalURL = ''
    if (this.state.PageName === 'filterPage') {
      await this.setState({ loading: true, filterPageId: this.props.Filterdata.categoryId, manufacturerId: 0, vendorId: 0, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });

      FinalURL = Api.CategoryProduct + '?id=' + catId
    }
    if (this.state.PageName === 'ManufacturerProductList') {
      await this.setState({ loading: true, filterPageId: 0, manufacturerId: this.props.Filterdata.categoryId, vendorId: 0, PageName: 'ManufacturerProductList', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });

      FinalURL = Api.ManufacturerFilterAPI + '?manufacturerId=' + catId
    }
    if (this.state.PageName === 'VendorProductList') {
      await this.setState({ loading: true, filterPageId: 0, manufacturerId: 0, vendorId: this.props.Filterdata.categoryId, PageName: 'VendorProductList', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });

      FinalURL = Api.vendorFilterAPI + '?vendorId=' + catId
    }*/

    let Service = {
      apiUrl: FinalURL + '&loadFilters=true',

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





  OnNodePress = async (node) => {
    console.log("node..................................", node)
    //await this.setState({ loading: true, filterPageId: node.Id, manufacturerId: 0, vendorId: 0, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });
    await this.fetchCategoriesData(node.Id);
    await this.setState({ isAllFilterCollapcible: true });

  }


  OnPrizeSliderChange = (low, high) => {

    console.log("OnPrizeSliderChange...........", low, high)
    this.setState({ maxPrize: high, minPrize: low, PrizeRangeUpdatedMax: high, PrizeRangeUpdatedMin: low })
  }

  onSpecificationChanged = (datas) => {
    var data = datas.parent
    var SpecificationDataArray = []
    SpecificationDataArray = this.state.SpecificationFilterData.SpecificationFilterGroups
    SpecificationDataArray[datas.dataIndex] = {
      DisplayOrder: data.DisplayOrder,
      FilterItems: data.FilterItems,
      Id: data.Id,
      IsMain: data.IsMain,
      Name: data.Name,
    }

    this.setState({ SpecificationData: SpecificationDataArray })

  }


  onAttributeCheckboxDataChange = (datas) => {
    console.log('onAttributeCheckboxDataChange................', datas)
    var data = datas.parent
    var AttributeArray = []
    AttributeArray = this.state.otherFilterData.AttributeFilterGroups
    AttributeArray[datas.dataIndex] = {
      Id: data.Id,
      Name: data.Name,
      IsMain: data.IsMain,
      FilterItems: data.FilterItems,
    }
    this.setState({ AttributeData: AttributeArray })
  }


  onManufacturerdataChange = (datas) => {
    this.setState({ manufacturarFilterIDsData: datas.child })
  }


  onVendordataChange = async (datas) => {
    await this.setState({ VendorFilterIDsData: datas.child })
  }

  onApplyButtonClick = () => {
    //this.setState({ loading: true })
    var filterCount = 0
    var PrizeFlag = 0
    let MinPrize = 0
    let MaxPrize = 0
    if (this.state.PrizeRangeUpdatedMin != this.state.PrizeRangeFilterData.MinPrice) {
      MinPrize = this.state.PrizeRangeUpdatedMin
      PrizeFlag = 1
    } else {
      MinPrize = this.state.minPrize

    }
    if (this.state.PrizeRangeUpdatedMax != this.state.PrizeRangeFilterData.MaxPrice) {
      MaxPrize = this.state.PrizeRangeUpdatedMax
      PrizeFlag = 1
    } else {
      MaxPrize = this.state.maxPrize

    }
    // var maxPrizeFlag = 0

    var onSaleflag = 0
    var inStock = 0
    let ManufacturerArray = []
    let ManufacturerIDArray = []
    let VendorArray = []
    let VendorIDArray = []
    let AttributeArrayData = []
    let AttributeArrayIDs = []
    let SpecificationArrayData = []
    let SpecificationArrayIDs = []

    if (this.state.manufacturarFilterIDsData.length) {
      ManufacturerArray = this.state.manufacturarFilterIDsData
      for (let i = 0; ManufacturerArray.length > i; i++) {
        if (ManufacturerArray[i].FilterItemState == 1) {

          ManufacturerIDArray.push(ManufacturerArray[i].Id)
        }
      }
    }

    if (this.state.VendorFilterIDsData.length) {
      VendorArray = this.state.VendorFilterIDsData
      for (let i = 0; VendorArray.length > i; i++) {
        if (VendorArray[i].FilterItemState == 1) {

          VendorIDArray.push(VendorArray[i].Id)
        }
      }
    }

    if (this.state.otherFilterData && this.state.otherFilterData.AttributeFilterGroups) {
      AttributeArrayData = this.state.otherFilterData.AttributeFilterGroups

      for (let i = 0; AttributeArrayData.length > i; i++) {
        for (let j = 0; AttributeArrayData[i].FilterItems.length > j; j++) {
          if (AttributeArrayData[i].FilterItems[j].FilterItemState == 1)
            AttributeArrayIDs.push({ Id: AttributeArrayData[i].FilterItems[j].ValueId, SelectedProductVariantIds: AttributeArrayData[i].FilterItems[j].ProductVariantAttributeIds })
        }
      }
      console.log("AttributeArrayIDs............", AttributeArrayIDs)

    }


    if (this.state.SpecificationFilterData && this.state.SpecificationFilterData.SpecificationFilterGroups) {
      SpecificationArrayData = this.state.SpecificationFilterData.SpecificationFilterGroups
      let k = 0;
      let IdArray = []
      for (let i = 0; SpecificationArrayData.length > i; i++) {
        for (let j = 0; SpecificationArrayData[i].FilterItems.length > j; j++) {
          if (SpecificationArrayData[i].FilterItems[j].FilterItemState == 1)
            if (k == i) {
              IdArray.push(SpecificationArrayData[i].FilterItems[j].Id)
              SpecificationArrayIDs.push({ Id: SpecificationArrayData[i].Id, SelectedFilterIds: IdArray })
            } else {
              IdArray = []
              IdArray.push(SpecificationArrayData[i].FilterItems[j].Id)
              SpecificationArrayIDs.push({ Id: SpecificationArrayData[i].Id, SelectedFilterIds: IdArray })

            }
        }
        k = i;
      }
    }



    // if (MinPrize > 0) {
    //   PrizeFlag = 1
    // }

    // if (MaxPrize > 0) {
    //   PrizeFlag = 1
    // }

    if (this.state.onSaleChecked == true) {
      onSaleflag = 1
    }

    if (this.state.inStockChecked == true) {
      inStock = 1
    }

    console.log(
      "...PrizeFlag:" + PrizeFlag +
      "...onSaleflag:" + onSaleflag +
      "...inStock:" + inStock +
      "...SpecificationArrayIDs:" + SpecificationArrayIDs.length +
      "...AttributeArrayIDs:" + AttributeArrayIDs.length +
      "...ManufacturerIDArray:" + ManufacturerIDArray.length +
      "...VendorIDArray:" + VendorIDArray.length
    )

    filterCount = PrizeFlag + onSaleflag + inStock +
      SpecificationArrayIDs.length + AttributeArrayIDs.length +
      ManufacturerIDArray.length + VendorIDArray.length
    this.setState({ loading: false, TotalfilterCount: filterCount })



    if (this.state.PageName == 'searchPage') {
      this.onSearchDataPass(filterCount, ManufacturerIDArray, VendorIDArray, AttributeArrayIDs, SpecificationArrayIDs, MaxPrize, MinPrize)
    }
    else {
      this.passCategoryData(filterCount, ManufacturerIDArray, VendorIDArray, AttributeArrayIDs, SpecificationArrayIDs, MaxPrize, MinPrize);
    }

  }


  passCategoryData = async (filterCount, ManufacturerIDArray, VendorIDArray, AttributeArrayIDs, SpecificationArrayIDs, MaxPrize, MinPrize) => {



    this.setState({ loading: false })

    let categoryPassdata = {
      Id: this.props.Filterdata.categoryId,
      filterCount: filterCount,
      categoryId: this.state.filterPageId,
      categoryName: this.state.categoryName,
      manufacturerId: this.state.manufacturerId,
      vendorId: this.state.vendorId,
      orderby: 0,
      pagesize: 15,
      minPrize: MinPrize,
      maxPrize: MaxPrize,
      onSaleChecked: this.state.onSaleChecked,
      inStockChecked: this.state.inStockChecked,
      SpecificationBodyData: SpecificationArrayIDs,
      AttributeArrayData: AttributeArrayIDs,
      manufacturarFilterIDsData: ManufacturerIDArray,
      VendorFilterIDsData: VendorIDArray,
    }


    if (this.state.PageName === 'filterPage') {

      this.props.navigation.push('FilterProductList', { passData: { pageName: 'filterPage', data: categoryPassdata } })
    }
    if (this.state.PageName === 'ManufacturerProductList') {
      this.props.navigation.push('ManufacturerFilterProductList', { passData: { pageName: 'filterPage', data: categoryPassdata } })
    }
    if (this.state.PageName === 'VendorProductList') {
      this.props.navigation.push('VendorFilterProductList', { passData: { pageName: 'filterPage', data: categoryPassdata } })
    }


  }

  onSearchDataPass = (filterCount, ManufacturerIDArray, VendorIDArray, AttributeArrayIDs, SpecificationArrayIDs, MaxPrize, MinPrize) => {
    this.setState({ loading: false })

    let Searchpassdata = {
      slugUrl: this.state.slugUrl,
      SearchName: this.state.categoryName,
      filterCount: filterCount,
      categoryId: this.state.filterPageId,
      manufacturerId: this.state.manufacturerId,
      vendorId: this.state.vendorId,
      orderby: 0,
      pagesize: 15,
      minPrize: MinPrize,
      maxPrize: MaxPrize,
      onSaleChecked: this.state.onSaleChecked,
      inStockChecked: this.state.inStockChecked,
      SpecificationBodyData: SpecificationArrayIDs,
      AttributeArrayData: AttributeArrayIDs,
      manufacturarFilterIDsData: ManufacturerIDArray,
      VendorFilterIDsData: VendorIDArray,
    }

    console.log("Search***********", Searchpassdata)


    this.props.navigation.push('SearchFilterProductList', { passData: { pageName: 'searchPage', data: Searchpassdata } })


  }

  OnClearPress = async () => {

    // console.log("node..................................",)
    await this.setState({ isAllFilterCollapcible: true, loading: true, manufacturarFilterIDsData: [], VendorFilterIDsData: [], })
    console.log(this.state.PageName)
    if (this.state.PageName == 'searchPage') {
      await this.setState({ filterPageId: 0, manufacturerId: 0, vendorId: 0, PageName: 'searchPage', });
      await this.fetchFilterData(this.state.slugUrl);
      // await this.setState({ isAllFilterCollapcible: true });
    }
    if (this.state.PageName == 'filterPage') {
      //await this.fetchCategoriesData(this.props.Filterdata.categoryId);
      await this.setState({ filterPageId: this.props.Filterdata.categoryId, manufacturerId: 0, vendorId: 0, PageName: 'filterPage', });
      await this.ClearManufacturerVendorData();

    }
    if (this.state.PageName == 'ManufacturerProductList') {
      await this.setState({ filterPageId: 0, manufacturerId: this.props.Filterdata.categoryId, vendorId: 0, PageName: 'ManufacturerProductList', });
      await this.ClearManufacturerVendorData();
    }
    if (this.state.PageName == 'VendorProductList') {
      await this.setState({ filterPageId: 0, manufacturerId: 0, vendorId: this.props.Filterdata.categoryId, PageName: 'VendorProductList', });

      await this.ClearManufacturerVendorData();
    }
    await this.setState({ isAllFilterCollapcible: false, loading: false })


    // await this.setState({ isAllFilterCollapcible: true });


    // await this.setState({ isAllFilterCollapcible: true });
    // if (this.state.PageName == 'filterPage') {
    //   await this.setState({ loading: true, filterPageId: this.props.Filterdata.categoryId, manufacturerId: 0, vendorId: 0, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });
    //   await this.fetchFilterData(this.props.Filterdata.categoryId, this.state.PageName);
    //   // await this.setState({ isAllFilterCollapcible: true });
    // }
    // if (this.state.PageName == 'ManufacturerProductList') {
    //   await this.setState({ loading: true, filterPageId: 0, manufacturerId: this.props.Filterdata.categoryId, vendorId: 0, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });
    //   await this.fetchFilterData(this.props.Filterdata.categoryId, this.state.PageName);
    //   // await this.setState({ isAllFilterCollapcible: true });
    // }
    // if (this.state.PageName == 'VendorProductList') {
    //   await this.setState({ loading: true, filterPageId: 0, manufacturerId: 0, vendorId: this.props.Filterdata.categoryId, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });
    //   await this.fetchFilterData(this.props.Filterdata.categoryId, this.state.PageName);
    //   // await this.setState({ isAllFilterCollapcible: true });
    // }
    // if (this.state.PageName == 'searchPage') {
    //   await this.setState({ loading: true, filterPageId: 0, manufacturerId: 0, vendorId: 0, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });
    //   await this.fetchFilterData(this.state.slugUrl, this.state.PageName);
    //   // await this.setState({ isAllFilterCollapcible: true });
    // }
    // await this.setState({ isAllFilterCollapcible: false, loading: false });

  }

  fetchFilterData = async (Id) => {
    this.setState({ isOpen: false, });
    // let FinalURL = ''
    // if (this.state.PageName === 'searchPage') {
    //   await this.setState({ loading: true, slugUrl: Id, filterPageId: 0, manufacturerId: 0, vendorId: 0, PageName: 'filterPage', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });

    //   FinalURL = 
    // }
    // if (this.state.PageName === 'ManufacturerProductList') {
    //   await this.setState({ loading: true, filterPageId: 0, manufacturerId: this.props.Filterdata.categoryId, vendorId: 0, PageName: 'ManufacturerProductList', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });

    //   FinalURL = Api.filterMenuAPI
    // }
    // if (this.state.PageName === 'VendorProductList') {
    //   await this.setState({ loading: true, filterPageId: 0, manufacturerId: 0, vendorId: this.props.Filterdata.categoryId, PageName: 'VendorProductList', manufacturarFilterIDsData: [], VendorFilterIDsData: [], });

    //   FinalURL = Api.filterMenuAPI
    // }
    let bodyParameters = {
      categoryId: 0,
      manufacturerId: 0,
      vendorId: 0,
      orderby: 0,
      pagesize: 15,
      priceFrom:  0 ,
      priceTo:  0 ,
      ShouldNotStartFromFirstPage: true,
      PageNumber: 1,

      SpecifiationFilterModelDTO: {
        "SpecificationFilterDTOs": []
      },
      AttributeFilterModelDTO: {
        "AttributeFilterDTOs": []
      },
      ManufacturerFilterModelDTO: {
        "SelectedFilterIds": []

      },
      VendorFilterModelDTO: {
        "SelectedFilterIds": []
      }
    }
    console.log("bodyParameters", bodyParameters)
    let Service = {
      apiUrl: Api.externalSearchAPI + Id,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify(bodyParameters),
      onSuccessCall: this.onSuccessUpdateFilterDataCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    const serviceResponse = await ServiceCall(Service);

  }

  onSuccessUpdateFilterDataCall = async (datas) => {
    console.log("onSuccessUpdateFilterDataCall..........", datas)

    // var ajaxFilters = datas.ajaxFilter
    // await this.props.UpdateCategoryFilter({
    //   filterData: datas.ajaxFilter,
    //   category: datas.categoryNavigation,
    //   //  subCategories: this.state.subCategories,
    //   titleText: this.state.titleText,
    //   categoryBannerData: this.state.categoryBannerData,
    //   categoryId: 0,
    //   titleImageUrl: this.state.TitleImageUrl,
    //   slugUrl: this.state.slugUrl,
    // })



    var Searchdata = datas
    var ajaxFilters = datas.ajaxFilter
    //var categoryList = datas.categoryNavigation
    await this.setState({
      filterPageId: this.props.Filterdata.categoryId,
      // slugUrl: this.state.slugUrl,
      // categorieName: Searchdata.categoryName,
      categoryNavigation: Searchdata.categoryNavigation,
      PrizeRangeFilterData: ajaxFilters.PriceRangeFilterModel7Spikes,
      OnSaleData: ajaxFilters.OnSaleFilterModel7Spikes,
      InStockData: ajaxFilters.InStockFilterModel7Spikes,
      VendorFilterData: ajaxFilters.VendorFilterModel7Spikes,
      manufacturarFilterData: ajaxFilters.ManufacturerFilterModel7Spikes,
      otherFilterData: ajaxFilters.AttributeFilterModel7Spikes,
      SpecificationFilterData: ajaxFilters.SpecificationFilterModel7Spikes,

    });

    if (ajaxFilters.PriceRangeFilterModel7Spikes && ajaxFilters.PriceRangeFilterModel7Spikes.SelectedPriceRange) {
      let prizeRange = ajaxFilters.PriceRangeFilterModel7Spikes
      let SelectedPriceRange = prizeRange.SelectedPriceRange
      await this.setState({
        updatedPrizeRangeFilterData: SelectedPriceRange,
        PrizeRangeUpdatedMin: SelectedPriceRange.From,
        PrizeRangeUpdatedMax: SelectedPriceRange.To,
      })
    }
    if (this.state.manufacturarFilterData && this.state.manufacturarFilterData.ManufacturerFilterItems) {
      await this.setState({
        manufacturarFilterIDsData: this.state.manufacturarFilterData.ManufacturerFilterItems
      })
    }
    if (this.state.VendorFilterData && this.state.VendorFilterData.VendorFilterItems) {
      await this.setState({
        VendorFilterIDsData: this.state.VendorFilterData.VendorFilterItems
      })
    }

    if (this.state.OnSaleData && this.state.OnSaleData.FilterItemState == 1) {
      await this.setState({
        onSaleChecked: true
      })
    }

    if (this.state.InStockData && this.state.InStockData.FilterItemState == 1) {
      await this.setState({
        inStockChecked: true
      })
    }


    // if (this.state.PageName == 'filterPage') {
    //   this.props.UpdateCategoryFilter({
    //     filterData: ajaxFilters,
    //     category: Searchdata.categoryNavigation,
    //     // subCategories: '',
    //     // titleText: this.state.categoryName,
    //     // categoryBannerData: '',
    //     //  categoryId: this.props.Filterdata.categoryId,
    //     // slugUrl: '',
    //     // titleImageUrl: '',
    //   })
    // }
    // if (this.state.PageName == 'ManufacturerProductList') {
    //   this.props.UpdateCategoryFilter({
    //     filterData: ajaxFilters,
    //     category: Searchdata.categoryNavigation,
    //     // subCategories: '',
    //     titleText: this.state.categoryName,
    //     // categoryBannerData: '',
    //     // categoryId: this.props.Filterdata.categoryId,
    //     // slugUrl: '',
    //     // titleImageUrl: this.state.titleImageUrl,
    //   })
    // }
    // if (this.state.PageName == 'VendorProductList') {
    //   this.props.UpdateCategoryFilter({
    //     filterData: ajaxFilters,
    //     category: Searchdata.categoryNavigation,
    //     // subCategories: '',
    //     titleText: this.state.categoryName,
    //     // categoryBannerData: '',
    //     // categoryId: this.props.Filterdata.categoryId,
    //     // slugUrl: '',
    //     // titleImageUrl: this.state.titleImageUrl,
    //   })
    // }
    this.props.ClearCategoryFilter({
      filterData: ajaxFilters,
      category: Searchdata.categoryNavigation,
      subCategories: '',
      titleText: this.state.titleText,
      categoryBannerData: '',
      categoryId: this.state.filterPageId,
      slugUrl: this.state.slugUrl,
      titleImageUrl: this.state.titleImageUrl,
    })
  }


  ClearManufacturerVendorData = async () => {
    let Service = {
      apiUrl: Api.filterMenuAPI,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        categoryId: this.state.filterPageId,
        manufacturerId: this.state.manufacturerId,
        vendorId: this.state.vendorId,
        orderby: 0,
        pagesize: 15,
        priceFrom: 0,
        priceTo: 0,
        ShouldNotStartFromFirstPage: true,
        PageNumber: 1,
        SpecifiationFilterModelDTO: {
          "SpecificationFilterDTOs": []
        },
        AttributeFilterModelDTO: {
          "AttributeFilterDTOs": []
        },
        ManufacturerFilterModelDTO: {
          "SelectedFilterIds": []

        },
        VendorFilterModelDTO: {
          "SelectedFilterIds": []
        }
      }),
      onSuccessCall: this.onSuccessUpdateFilterDataCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    const serviceResponse = await ServiceCall(Service);
  };


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
            {Strings.FILTERS}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => this.OnClearPress()}>
          <Text style={[styles.clearText, this.props.headerTextStyle]}>
            {Strings.CLEAR}
          </Text>
        </TouchableOpacity>
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
        <StatusBar
          backgroundColor={Colors.PRIMARY}
          barStyle="light-content"
        />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <View style={styles.pageContainer}>
            {this.renderHeader()}

            {(this.state.categoryNavigation
              || this.state.PrizeRangeFilterData
              || this.state.OnSaleData
              || this.state.InStockData
              || this.state.SpecificationFilterData
              || this.state.otherFilterData
              || this.state.manufacturarFilterData
              || this.state.VendorFilterData)
              ?
              <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
                <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>

                  <FilterMenu
                    CategoryData={this.state.categoryNavigation && this.state.categoryNavigation.Categories}
                    OnClick={(node) => this.OnNodePress(node)}
                    PrizeRangeDate={this.state.PrizeRangeFilterData}
                    PrizeRangeUpdatedMin={this.state.PrizeRangeUpdatedMin}
                    PrizeRangeUpdatedMax={this.state.PrizeRangeUpdatedMax}
                    OnSaleData={this.state.OnSaleData}
                    OnSaleClicked={(data) => this.setState({ onSaleChecked: data })}
                    InStockData={this.state.InStockData}
                    InStockClicked={(data) => this.setState({ inStockChecked: data })}
                    inStockChecked={this.state.inStockChecked}
                    onSaleChecked={this.state.onSaleChecked}
                    OnPrizeSliderChange={(low, high, fromUser) => this.OnPrizeSliderChange(low, high)}
                    SpecificationData={this.state.SpecificationFilterData}
                    onSpecificationCategoriesSelected={(data) => this.onSpecificationChanged(data)}
                    OtherFilterData={this.state.otherFilterData}
                    onOtherCategoriesSelected={(data) => this.onAttributeCheckboxDataChange(data)}
                    Manufacturerdata={this.state.manufacturarFilterData}
                    onManufacturerdataChange={(data) => this.onManufacturerdataChange(data)}
                    Vendordata={this.state.VendorFilterData}
                    onVendordataChange={(data) => this.onVendordataChange(data)}
                    isAllFilterCollapcible={this.state.isAllFilterCollapcible}
                  />
                </View>



                <View style={{ padding: 10, alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.GRAY, }}>

                  <ButtonWithIcon
                    mainContainerStyles={{
                      padding: 0, alignItems: 'center',
                      justifyContent: 'center', marginLeft: 10,
                      backgroundColor: Colors.PRIMARY, borderRadius: 30,
                      height: 50, width: width / 1.9,
                    }}
                    imageAvtarStyle={{
                      height: 0,
                      width: 0,
                      margin: 5,
                    }}
                    text={"Apply Filter"}
                    titleStyle={{
                      color: Colors.WHITE,
                      fontSize: 12,
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

                    userClick={(data) => this.onApplyButtonClick()}
                  />
                </View>
              </View>
              :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
                <Text>No filters found....</Text>
              </View>
            }
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addCountToCart: (newCount) => dispatch({ type: 'CART_COUNT_CHANGE', paylod: newCount }),
    //UpdateFilterParamenters: (newCount) => dispatch({ type: 'UPDATE_PARAMETER', paylod: newCount }),
    // ClearParameterData: () => dispatch({ type: 'Clear_Parameter' }),
    // UpdateFilterData: (newCount) => dispatch({ type: 'UPDATE_FILTER_DATA', paylod: newCount }),
    // ClearFilterData: () => dispatch({ type: 'CLEAR_FILTERDATA' })
    UpdateCategoryFilter: (newCount) => dispatch({ type: 'UPDATE_CATEGORY_DATA', paylod: newCount }),
    ClearCategoryFilter: (newCount) => dispatch({ type: 'CLEAR_CATEGORY_DATA', paylod: newCount }),


  }
}

const mapStateToProps = (state) => {
  console.log("=============== state.Filter_Data ======================");
  console.log(state);
  let Store_data = state.Count
  let Parameter_data = state.Parameter
  let Filter_Data = state.Filter_Data
  return {
    CarCount: Store_data.shoppingCartCount,
    // loginStatus: Store_data.loginStatus,
    Parameterdata: Parameter_data,
    Filterdata: Filter_Data,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyFilterPage)