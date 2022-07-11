import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import DeviceInfo from 'react-native-device-info';
const ServiceCall = async function (Service) {
	let data ={};
	let token = await AsyncStorage.getItem('custGuid');
	let authToken = await AsyncStorage.getItem('custToken');
	let username = await AsyncStorage.getItem('userName');
	let DeviceId = DeviceInfo.getUniqueId();
	data.method = Service.methodType;
	//data.headers = Service.headerData;
	console.log("auth token " + authToken);
	if(Service.apiUrl.indexOf("mobcms") > -1){
		data.headers = { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + authToken, 'DeviceId':DeviceId};
	}else{
		data.headers = { 'Content-Type': 'application/json', 'Authorization' : token };
	}
	if((data.method).toLowerCase() == 'post'){
		data.body = Service.bodyData;
	}
    console.log("---------------- API SERVICE -----------------------------");
	console.log(Service);
	console.log("service call data ----- ",data);
    //console.log(crashlytics);
	crashlytics().log(username);
	crashlytics().log('API called');
	crashlytics().log(Service.apiUrl);
	crashlytics().log(JSON.stringify(data));
  return new Promise(resolve => {
	try {
	    NetInfo.fetch().then(state  => {
	        if (state.isConnected == true) {
				//if (state.isInternetReachable == true) {
					fetch(Service.apiUrl, data)
						.then((response) => {
							console.log("---------- api response ------------",response);
							const statusCode = response.status;
							//crashlytics().log(response.status);
							if(statusCode == 200){
								const data = response.json();
								return Promise.resolve(data);
							}else{
								var datum = {};
								datum.message = 'Unable to connect server';
								datum.status = false;
								datum.failure = true;
								const data = datum;
								return data;
							}
						})
						.then((responseJson) => {
							//crashlytics().log(JSON.stringify(responseJson));
							if (!responseJson.failure) {
								resolve(Service.onSuccessCall(responseJson))
							} else {
								resolve(Service.onFailureAPI(responseJson));
							}
							//crashlytics().crash()
						})
						.catch((error) => {
							//crashlytics().log(JSON.stringify(error));
							resolve(Service.onFailureAPI(error));
						})
				//} else {
				//	resolve(Service.onOffline('NetNotReachable'));
				//}
			} else {
				//crashlytics().log('NotConnected');
				resolve(Service.onOffline('NotConnected'));
	        }
	    })
	} catch (e) {
		//crashlytics().log(JSON.stringify(e));
		resolve(Service.onPromiseFailure(e));
	}
  });
}
export default ServiceCall;