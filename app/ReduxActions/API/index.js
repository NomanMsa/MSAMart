import React, { Component } from 'react';
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
} from 'react-native';
import { Api } from '@config';
import { ServiceCall } from '@utils';
import Toast from 'react-native-simple-toast';
// import { setCount } from '../Actions'

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
//  import crashlytics from '@react-native-firebase/crashlytics';


///////////////////////////////////////////////////// count API ////////////////////////////////
const getCartCountData = async () => {
    let datas = {};
    let bodyData = JSON.stringify({
    })
    let token = await AsyncStorage.getItem('custGuid')
    let username = await AsyncStorage.getItem('userName');
    datas.method = 'GET';
    //data.headers = Service.headerData;
    datas.headers = { 'Content-Type': 'application/json', 'Authorization': token };
    //datas.body = bodyData;
    const responce = await fetch(Api.getShoppingCount, datas)
    const data = await responce.json();
    if (responce.status > 200) {
        throw new Error(data.error);
    }
    console.log("Count API call........", data)
    return data;

};

/////////////////////////////////////////////////// HOME PAGE ///////////////////////////////////
const getHomeDataCountData = async () => {

    let datas = {};
    let bodyData = JSON.stringify({
        categoryIncludeInTopMenu: 'true',
        showOnHomePage: true,
        parentSliderWidget: 'home',
    })
    let token = await AsyncStorage.getItem('custGuid')
    let username = await AsyncStorage.getItem('userName');
    datas.method = 'POST';
    //data.headers = Service.headerData;
    datas.headers = { 'Content-Type': 'application/json', 'Authorization': token };
    datas.body = bodyData;

    const responce = await fetch(Api.Home, datas)
    const data = await responce.json();
    if (responce.status > 200) {
        throw new Error(data.error);
    }
    console.log("getHomeDataCountData API call........", data)
    return data;

};

const getWidgitData = async () => {

    let datas = {};
    let bodyData = JSON.stringify({
        widget: 'home'
    })
    let token = await AsyncStorage.getItem('custGuid')
    let username = await AsyncStorage.getItem('userName');
    datas.method = 'POST';
    //data.headers = Service.headerData;
    datas.headers = { 'Content-Type': 'application/json', 'Authorization': token };
    datas.body = bodyData;

    const responce = await fetch(Api.Widget, datas)
    const data = await responce.json();
    if (responce.status > 200) {
        throw new Error(data.error);
    }
    console.log("getWidgitData API call........", data)
    return data;
};


/////////////////////////////////////////////////// WishList page /////////////////////////////////////
const getWishlistData = async () => {

    let datas = {};
    let bodyData = JSON.stringify({
    })
    let token = await AsyncStorage.getItem('custGuid')
    let username = await AsyncStorage.getItem('userName');
    datas.method = 'GET';
    //data.headers = Service.headerData;
    datas.headers = { 'Content-Type': 'application/json', 'Authorization': token };
    //datas.body = bodyData;

    const responce = await fetch(Api.getWishlist, datas)
    const data = await responce.json();
    if (responce.status > 200) {
        throw new Error(data.error);
    }
    console.log("getWishlist API call........", data)
    return data;
};




//////////////////////////////////////////////////////////// shopping cart /////////////////////////////////
const getShoppingCartData = async () => {

    let datas = {};
    let bodyData = JSON.stringify({

    })
    let token = await AsyncStorage.getItem('custGuid')
    let username = await AsyncStorage.getItem('userName');
    datas.method = 'GET';
    //data.headers = Service.headerData;
    datas.headers = { 'Content-Type': 'application/json', 'Authorization': token };
    //  datas.body = bodyData;

    const responce = await fetch(Api.getShoppingCartList, datas)
    const data = await responce.json();
    if (responce.status > 200) {
        throw new Error(data.error);
    }
    console.log("getShoppingCartList API call........", data)
    return data;
};


//////////////////////////////////////////////////////////// HelpCenter /////////////////////////////////
const getHelpCenterData = async () => {

    const responce = await fetch(Api.HelpCenterAllInOneAPI)
    const data = await responce.json();
    if (responce.status > 200) {
        throw new Error(data.error);
    }
    console.log("HelpCenterAllInOneAPI API call........", data)
    return data;

};


export { getCartCountData, getHomeDataCountData, getWidgitData, getWishlistData, getShoppingCartData, getHelpCenterData }