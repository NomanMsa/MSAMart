/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
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
  Linking,
  Modal,
  Dimensions,
} from 'react-native';
import {DeepLinkUrlOpn} from '@nav';
/*import Emarsys from "react-native-emarsys-wrapper";*/

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PushNotification from "react-native-push-notification";

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import store from './ReduxActions/Store';
import { ShoppingCartCount } from '@reducers';
import {Images, Icons} from '@assets';


import {
  Home,
  Menu,
  ShoppingCart,
  ShoppingSummary,
  AccountMenu,
  HelpMenu,
  ProductDetails
  ,
   Search
} from '@pages';
import {Colors} from '@theme';
import {HomeStack} from '@nav';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {enableScreens} from 'react-native-screens';
/*import {RemotePushController} from '@utils';*/
import DrawerContent from './Components/DrawerContent/DrawerContent.tsx';
enableScreens();
// const Stack = createStackNavigator();
// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       {/* <DrawerItem
//         label="Help"
//         onPress={() => Linking.openURL('https://mywebsite.com/help')}
//       /> */}
//     </DrawerContentScrollView>
//   );
// }
const Drawer = createDrawerNavigator();

/*const emarsyFunctionHandler = function (eventName, payload) {
  console.log("EMARSYS ---");
  console.log("Pushnotification Event "+ eventName);
};

const getPushToken= async () =>{107
  
	try {
		let pushToken = await Emarsys.push.pushToken();
    console.log("Emarsys *****");
    console.log("Push notification token is ", pushToken);
	} catch (e) {
		console.log(e);
	}
}*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    global.count = '3';
    global.scrToNav = '';
    global.splashToShow = true;
    /*Emarsys.setEventHandler(emarsyFunctionHandler);
    getPushToken();*/
  }
  render() {
    return (
      <Provider store={store}>
        {/* <RemotePushController /> */}

         <NavigationContainer>
          <Drawer.Navigator
            drawerContentOptions={{
              activeTintColor: Colors.PRIMARY_DARK_BTN,
              itemStyle: { marginVertical: 30 },
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
            >
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{headerShown: false, hidden: true}} />
            <Drawer.Screen name="Home" component={Home}  options={{headerShown: false, hidden: true}} />
            <Drawer.Screen name="Category " component={Menu}  options={{headerShown: false, hidden: true}}/>
            <Drawer.Screen name="Shopping Cart" component={ShoppingCart}  options={{headerShown: false, hidden: true}}/>
            <Drawer.Screen name="Search" component={Search}  options={{headerShown: false, hidden: true}}/>
            <Drawer.Screen name="Help" component={HelpMenu}  options={{headerShown: false, hidden: true}} /> 
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
