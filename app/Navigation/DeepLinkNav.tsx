
import React, { Component } from 'react';
import { ApiCall } from '@utils';
import { Api } from '@config';
import AsyncStorage from '@react-native-community/async-storage';
const DeepLinkUrlOpn = {
  getScreenFromPath: function (url) {
    if (url.indexOf('orderdetails') > -1) {
      return 'orderdetails';
    } else {
      return url.substring(url.lastIndexOf('/') + 1);
    }
  },
  redirectionRequired: function (url) {
    if (
      url == null ||
      url == undefined ||
      url == 'null' ||
      url == 'undefined'
    ) {
      return false;
    } else {
      let currentScreen = this.getScreenFromPath(url);
      const noRedirectionPaths = [
        'null',
        null,
        undefined,
        'undefined',
        // 'dm-preprod.dpworld.com',
        // 'www.dragonmart.ae',
        // 'dmtest.dpworld.com',
        // 'http://dmtest.dpworld.com',
        // 'https://www.dragonmart.ae/',
        // 'https://www.dragonmart.ae',
        // 'http://www.dragonmart.ae/',
        // 'http://www.dragonmart.ae',
        // 'www.dragonmart.ae/',
        // 'dragonmart.ae',
      ];
      if (noRedirectionPaths.includes(currentScreen)) {
        return false;
      } else {
        return true;
      }
    }
  },
  checkAuthRequired: function (url) {
    let currentScreen = this.getScreenFromPath(url);
    let authReqScreens = ['wishlist', 'cart', 'orderdetails', 'info'];
    if (authReqScreens.includes(currentScreen)) {
      return true;
    } else {
      return false;
    }
  },
  checkAuthStatus: async function () {
    if ((await AsyncStorage.getItem('loginStatus')) == 'true') {
      return true;
    } else {
      return false;
    }
  },
  checkParamsRequired: function (url) {
    let currentScreen = this.getScreenFromPath(url);
    let paramsReqScreens = [
      'contactus',
      'privacy-notice',
      'conditions-of-use',
      'laws-and-regulations',
      'returns',
      'wishlist',
      'cart',
      'CustomerInfo',
      'GuestManageOrder',
    ];
    if (paramsReqScreens.includes(currentScreen)) {
      return false;
    } else {
      return true;
    }
  },
  checkIfSeoUrl: function (url) {
    let currentScreen = this.getScreenFromPath(url);
    let directUrlScreens = [
      'contactus',
      'privacy-notice',
      'conditions-of-use',
      'laws-and-regulations',
      'returns',
      'wishlist',
      'cart',
      'register',
    ];
    if (directUrlScreens.includes(currentScreen)) {
      return false;
    } else {
      return true;
    }
  },
  convertSeoUrl: async function (url) {
    let Service = {
      apiUrl: Api.GetPage,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({ url: url }),
      onSuccessCall: this.onSuccessBannerFetch,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    console.log('get page api call---', Service);
    const response = await ApiCall(Service);
    return response;
  },
  getFinalUrlAndParams: async function (url) {
    let navigationScreen = this.getScreenFromPath(url);
    let allScreens = {
      CustomerPassword: 'CustomerPassword',
      contactus: 'ContactUs',
      'privacy-notice': 'PrivacyPolicy',
      'conditions-of-use': 'TermsConditions',
      'laws-and-regulations': 'LawsRegulations',
      returns: 'Returns',
      WishList: 'WishListPage',
      cart: 'ShoppingCart',
      Product: 'ProductDetails',
      Category: 'FilterProductList',
      Vendor: 'VendorFilterProductList',
      Manufacturer: 'ManufacturerFilterProductList',
      ExternalSearch: 'SearchFilterProductList',
      OrderDetails: 'PurchaseDetails',
      register: 'Register',
      CustomerInfo: 'CustomerInfo',
      GuestManageOrder: 'GuestUser',
    };
    let screenName = allScreens[navigationScreen];
    let params = {};
    if (this.checkParamsRequired(url)) {
    }
    if (this.checkIfSeoUrl(url)) {
      console.log('url---', url);
      let navURL = await this.convertSeoUrl(url);
      console.log('navurl - ', navURL);
      screenName = allScreens[navURL.model.EntityName];
      let passData = {};

      if (navURL.model.EntityName == 'Product') {
        passData = { Id: navURL.model.EntityId };
      }
      if (navURL.model.EntityName == 'Vendor') {
        passData = { pageName: 'Home', data: { Id: navURL.model.EntityId } };
      }
      if (navURL.model.EntityName == 'Category') {
        passData = { pageName: 'Home', data: { Id: navURL.model.EntityId } };
      }
      if (navURL.model.EntityName == 'Manufacturer') {
        passData = { pageName: 'Home', data: { Id: navURL.model.EntityId } };
      }
      if(navURL.model.EntityName == 'WishList'){
        passData = {pageName: 'WishListPage', data: {slugUrl: navURL.model.Slug}};
      }
      if (navURL.model.EntityName == 'ExternalSearch') {
        passData = {
          pageName: 'Home',
          data: { slugUrl: navURL.model.Slug, SearchName: ' ' },
        };
      }
      if (navigationScreen == 'orderdetails') {
        passData = { screen: screenName, data: { Id: navURL.model.EntityId } };
      }
      if (navURL.model.EntityName == 'CustomerPassword') {
        passData = {
          pageName: 'CustomerPassword',
          data: { slugUrl: navURL.model.Slug },
          originalUrl: url,
        };
      }
      if (navURL.model.EntityName == 'CustomerInfo') {
        passData = {
          pageName: 'CustomerInfo',
          data: { slugUrl: navURL.model.Slug },
          originalUrl: url,
        };
      }
      if (navURL.model.EntityName == 'GuestManageOrder') {
        passData = {
          pageName: 'GuestUser',
          data: { slugUrl: navURL.model.Slug },
          originalUrl: url,
        };
      }
      console.log('custom para', passData);
      params = { passData };
      if (this.checkAuthRequired(url)) {
        if ((await this.checkAuthStatus()) == true) {
          return { screen: screenName, params: params };
        } else if (screenName == 'CustomerPassword') {
          return { screen: screenName, params: params };
        } else {
          return { screen: 'SignIn', params: params };
        }
      } else {
        console.log('12121----', screenName, '---', params);
        return { screen: screenName, params: params };
      }
    } else {
      let passData = { screen: screenName };
      params = { passData };
      if (this.checkAuthRequired(url)) {
        if ((await this.checkAuthStatus()) == true) {
          return { screen: screenName, params: params };
        } else {
          return { screen: 'SignIn', params: params };
        }
      } else {
        return { screen: screenName, params: params };
      }
    }
  },
};

export default DeepLinkUrlOpn;
