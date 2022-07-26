/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  LogBox,
  BackHandler,
  Alert,
  Platform,
  Image,
} from 'react-native';

import {
  Home,
  Menu,
  AccountMenu,
  ShoppingCart,
  HelpMenu,
  Search,
  ShoppingSummary,
  ProductDetails,
  FilterProductList,
  PayNow,
  SignIn,
  Register,
  AddAddress,
  Address,
  WishListPage,
  ShipToPage,
  Checkout,
  VendorFilterProductList,
  ManufacturerFilterProductList,
  SearchFilterProductList,
  ThankYou,
  Purchases,
  PurchaseDetails,
  CustomerInfo,
  ApplyFilterPage,
  ContactUs,
  Delivery,
  ForgotPassword,
  PasswordRecovery,
  EmailFriend,
  ShippingDetails,
  AskUs,
  Returns,
  TermsConditions,
  PrivacyPolicy,
  LawsRegulations,
  InvoicePrint,
  RORequest,
  ReturnOrderList,
  ReturneOrderDetails,
  CancelOrderDetails,
  GuestUser

} from '@pages';

import { Icons, Images, Loaders } from '@assets';
import { Colors } from "@theme";

import { ServiceCall } from '@utils';
import { Api } from '@config';
import { enableScreens } from 'react-native-screens';
enableScreens();
const Stack = createStackNavigator();
var appimage='';
function splashScreen({ navigation }) {
GetConfiguration();
  setTimeout(() => {
    navigation.replace('Home')
  }, 2000);
  return (
    <View style={{
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      flex: 1,
      justifyContent: 'center',
    }}>

      <Image style={{
        resizeMode: 'contain',
        height: undefined, width: 100,
        aspectRatio: 350 / 177,
        //backgroundColor:'#fff',
        tintColor: Colors.PRIMARY
      }} source={{uri:appimage}} />
    </View>
  )
}
function GetConfiguration(){
  let Service = {
    apiUrl:'https://localhost:44328/api/v1/AppConfiguration/AppConfiguration?clientId=1',
    methodType: 'GET',
    headerData: { 'Content-Type': 'application/json' },
    onSuccessCall: Success
  }
   ServiceCall(Service);
}
function Success(data){
console.log("configurationsuccess---------------===//*//*///*/**/");
var appdata = data.model.AppImageConfiguration[0];
appimage =appdata.ImgBinary;
appimage=  "data:image/png;base64,"+appimage
console.log(appimage);

}
export default class HomeStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    return (
      <Stack.Navigator
        headerMode="float"
        initialRouteName="Home"
        detachInactiveScreens="true"
      >

        <Stack.Screen
          name="splash"
          component={splashScreen}
          options={{
            title: 'splash',
            headerShown: false,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'My home',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            title: 'Product Details',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card'
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: 'Search',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            drawerLockMode: 'locked-closed',
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="ShoppingSummary"
          component={ShoppingSummary}
          options={{
            title: 'Order Summary',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Account"
          component={AccountMenu}
          options={{
            title: 'Account',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="HelpMenu"
          component={HelpMenu}
          options={{
            title: 'Help',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCart}
          options={{
            title: 'ShoppingCart',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: 'My Menu',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />

        <Stack.Screen
          name="FilterProductList"
          component={FilterProductList}
          options={{
            title: 'Filter Product List',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="PayNow"
          component={PayNow}
          options={{
            title: 'PayNow',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Log In',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            title: 'Add Address',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            title: 'Address',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="WishListPage"
          component={WishListPage}
          options={{
            title: 'WishListPage',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="ShipToPage"
          component={ShipToPage}
          options={{
            title: 'Ship To',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            title: 'Check Out',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="VendorFilterProductList"
          component={VendorFilterProductList}
          options={{
            title: 'Vendor Filter ProductList',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="ManufacturerFilterProductList"
          component={ManufacturerFilterProductList}
          options={{
            title: 'Manufacturer Filter ProductList',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="SearchFilterProductList"
          component={SearchFilterProductList}
          options={{
            title: 'Search Filter ProductList',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYou}
          options={{
            title: 'Thank You',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Purchases"
          component={Purchases}
          options={{
            title: 'Purchases',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="PurchaseDetails"
          component={PurchaseDetails}
          options={{
            title: 'Purchase Details',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="InvoicePrint"
          component={InvoicePrint}
          options={{
            title: 'Invoice Print',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="CustomerInfo"
          component={CustomerInfo}
          options={{
            title: 'Customer Info',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="ApplyFilterPage"
          component={ApplyFilterPage}
          options={{
            title: 'ApplyFilterPage',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            title: 'Contact Us',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />

        <Stack.Screen
          name="Delivery"
          component={Delivery}
          options={{
            title: 'Delivery',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="CustomerPassword"
          component={PasswordRecovery}
          options={{
            title: 'Reset Recovery',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}

        />
        <Stack.Screen
          name="EmailFriend"
          component={EmailFriend}
          options={{
            title: 'Email a friend',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="ShippingDetails"
          component={ShippingDetails}
          options={{
            title: 'Shipment Details',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />

        <Stack.Screen
          name="AskUs"
          component={AskUs}
          options={{
            title: 'Ask Us',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="Returns"
          component={Returns}
          options={{
            title: 'Returns',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            title: 'PrivacyPolicy',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            title: 'TermsConditions',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="LawsRegulations"
          component={LawsRegulations}
          options={{
            title: 'LawsRegulations',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="RORequest"
          component={RORequest}
          options={{
            title: 'Return Request',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />

        <Stack.Screen
          name="ReturnOrderList"
          component={ReturnOrderList}
          options={{
            title: 'ReturnOrderList',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />

        <Stack.Screen
          name="ReturneOrderDetails"
          component={ReturneOrderDetails}
          options={{
            title: 'ReturneOrderDetails',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />

        <Stack.Screen
          name="CancelOrderDetails"
          component={CancelOrderDetails}
          options={{
            title: 'CancelOrderDetails',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />
        <Stack.Screen
          name="GuestUser"
          component={GuestUser}
          options={{
            title: 'GuestUser',
            headerShown: false,
            keyboardHandlingEnabled: true,
            gestureEnabled: false,
            mode: 'card',
          }}
        />

      </Stack.Navigator>
    );
  }
}
