import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { DeepLinkUrlOpn } from '@nav';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { setPushNav } from '../../ReduxActions/Actions';
// import Emarsys from "react-native-emarsys-wrapper";


const RemotePushController = () => {
  useEffect(() => {
    const unsubscribemsg = messaging().setBackgroundMessageHandler(async (data) => {
      console.log("************************************** REMOTE PUSHCONTROLLER *****************************", data);
    });
    return unsubscribemsg;
  }, []);
  
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if(remoteMessage !=null && remoteMessage.notification!=null ){
        PushNotification.localNotification({
          channelId: "channel-id",
          channelName: "My channel",
          message: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          bigPictureUrl: remoteMessage.notification.bigPictureUrl,
          smallIcon: remoteMessage.notification.largeIconUrl,
        });
  
      }
    });
    return unsubscribe;
  }, []);

  const sendFCMToken = (fcmToken) => {
    let DeviceType = 1;
    let DeviceId = DeviceInfo.getUniqueId();
    if (Platform.OS === 'ios') { DeviceType = 2 }
    let Service = {
      apiUrl: Api.Home,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        "Token": fcmToken,
        "DeviceId": DeviceId,
        "DeviceType": DeviceType
      }),
      onSuccessCall: onSuccessFCMToken,
      onFailureAPI: onFailureAPI,
      onPromiseFailure: onPromiseFailure,
      onOffline: onOffline,
    };
    ServiceCall(Service);
  }

  const convertAPNs = async (APNs) => {

    fetch(Api.ReturnFCMToken,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAlQQGilg:APA91bFTI736vLbkxr4LK9d2i4tOYy_QMDl18ABRq6saU4v2i8n2OqDZ2VXO5PBSESvDUajk26gIChERFozLakl0chQlUauR03gfvlz1IhbQVN_pTlxKEn5lIdk5iFc6llfDSWVvbkM3',
        },
        body: JSON.stringify({
          "application": 'MsaMart',
          "sandbox": true,
          "apns_tokens": [APNs.token],
        })
      })
      .then((response) => response.json())
      .then((json) =>{
          AsyncStorage.setItem('fcmToken', json.results[0].registration_token);
          console.log("Converted FCM token is ", json.results[0].registration_token);
          sendFCMToken(json.results[0].registration_token)
        }
      )
      .catch((error) => console.log(error))
  }


  const onSuccessFCMTokenReceived = (data) => {
    console.log('valid fcm token', data);
  }
  const onFailFCMTokenGenerated = (data) => {
    console.log('error generating fcm token', data);
  }
  const onSuccessFCMToken = (data) => {
    console.log('----------------push controller onSuccessFCMToken------------------')
    console.log(data)
  }
  const onFailureAPI = (data) => {
    console.log('onFailureAPI')
    console.log(data)
  }
  const onPromiseFailure = (data) => {
    console.log('onPromiseFailure')
    console.log(data)
  }
  const onOffline = (data) => {
    console.log('onOffline')
    console.log(data)
  }
  const getNavigated = async (initialUrl) => {
  }
  
  useEffect(() => {
    PushNotification.configure({

      onRegister: async function (token) {
        console.log('-------------on register TOKEN:', token);
        console.log('token.token', token.token);
        if (Platform.OS === 'ios') {
          await convertAPNs(token)
        } else {
          await AsyncStorage.setItem('fcmToken', token.token);
          sendFCMToken(token.token)
        }
      },
      onNotification: function (notification) {
        console.log("notification:", notification);
        if (notification.data.targetType == 'OnDownload' && notification.title != null && notification.title.length > 0) {
          Toast.showWithGravity(notification.title, Toast.LONG, Toast.BOTTOM);
        }
        console.log('NOTIFICATION:', notification);
        console.log('NOTIFICATION.userInteraction:', notification.userInteraction);
        if (notification.foreground) {
          PushNotification.localNotification({
            channelId: "my-channel-id2",
            channelName: "My channel2",
            title: notification.title,
            message: notification.message,
            bigPictureUrl: notification.bigPictureUrl,
            smallIcon: "ic_notification",
            invokeApp: false,
          });
        }
        if(notification.data.ems_msg!=null && notification.data.ems_msg === "true") {
          PushNotification.localNotification({
            channelId: "10001",
            channelName: "DMNotificationChannel",
            title: notification.data.title,
            message: notification.data.body,
            bigPictureUrl: notification.data.image_url,
            smallIcon: notification.data.image_url,
            invokeApp: false,
          });
        }
        if (notification.userInteraction) {
          console.log("notif userinteraction---- ", notification)
          if (notification.data && notification.data.slug) {
            global.scrToNav = notification.data.slug;
          }
        }
      },
      onAction: function (notification) {
        console.log("ACTION:");
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },

      senderID: "640017664600",

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  }, []);

  return null;
}
export default RemotePushController