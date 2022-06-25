import React, { Component } from 'react';
import NetInfo from "@react-native-community/netinfo";
import Api from '../../Config/Api/Api';
//import  ServiceCall  from '../../ServiceCall/ServiceCall';
const Cart = {
	Count: function () {
		return fetch(Api.getShoppingCount)
			.then((response) => {
				const statusCode = response.status;
				if (statusCode == 200) {
					const data = response.json();
					return Promise.resolve(data);
				} else {
					var datum = {};
					datum.message = 'Error in API';
					datum.status = false;
					const data = datum;
					return data;
				}
			})
			.then((responseJson) => {
				console.log(responseJson);
				//if(responseJson.status == true){
				return responseJson.model.Items.length
				// }else{return 0 }
			})
			.catch((error) => {
				return 0;
			})
	}
}
export default Cart;