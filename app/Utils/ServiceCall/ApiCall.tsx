import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
// import crashlytics from '@react-native-firebase/crashlytics';
const ApiCall = async function (Service) {
	let data = {};
	let token = await AsyncStorage.getItem('custGuid')
	//let username = await AsyncStorage.getItem('userName');
	data.method = Service.methodType;
	data.headers = { 'Content-Type': 'application/json', 'Authorization': token };
	if ((data.method).toLowerCase() == 'post') {
		data.body = Service.bodyData;
	}
	try {
		const response = await fetch(Service.apiUrl, data);
		const responseJson = await response.json();
		console.log(responseJson)
		return responseJson;
	} catch(error){
		 console.error(error);
	}
	//try {
		/*await NetInfo.fetch().then(async state => {
			if (state.isConnected == true) {
				return await fetch(Service.apiUrl, data)
					.then(async (response) => {
						console.log(response);
						const statusCode = response.status;
						//crashlytics().log(response.status);
						if (statusCode == 200) {
							const data = response.json();
							return Promise.resolve(data);
						} else {
							var datum = {};
							datum.message = 'Unable to connect server';
							datum.status = false;
							datum.failure = true;
							const data = datum;
							return data;
						}
					})
					//.then((response) => response.json())
					.then(async(responseJson) => {
						console.log(responseJson)
						crashlytics().log(JSON.stringify(responseJson));
						if (!responseJson.failure) {
							return responseJson
						} else {
							return responseJson
						}
					})
					.catch((error) => {
						console.log(error)
						crashlytics().log(JSON.stringify(error));
						return error
					})
			} else {
				console.log('NotConnected')
				crashlytics().log('NotConnected');
				return 'NotConnected'
			}
		})*/
	//} catch (e) {
	//	console.log(e)
	//	return e
	//}
}
export default ApiCall;