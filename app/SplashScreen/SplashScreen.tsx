import React, { Component } from 'react';
import {
  Platform, View, Image, Dimensions, StatusBar, Text,
  Linking,
} from 'react-native'
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';
import { Images, Loaders, Icons } from '@assets';
import {DeepLinkUrlOpn} from '@nav';
import styles from './SplashScreenStyles';
import App from '../../app/App'
import {Settings} from "react-native-fbsdk-next";
/*import { AdSettings } from 'react-native-fbads';*/

export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,

    }
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }

  async componentDidMount () {
    
    setTimeout(() => {
      this.Hide_Splash_Screen();
    }, 5000);
    this.checkUserTrackingPermission();
    var initialUrl = await Linking.getInitialURL();
    let data = await DeepLinkUrlOpn.getFinalUrlAndParams(initialUrl);
      console.log("splash data link --- ", data);
      if (
        data.screen != undefined &&
        data.screen != null &&
        data.screen != 'null' &&
        data.screen != 'undefined'
      ) {
        this.setState({ loading: false });
        this.props.navigation.navigate(data.screen, data.params);
      }
  }

  checkUserTrackingPermission = async () => {
    Settings.initializeSDK();
    /*if(Platform.OS === 'ios'){
      const trackingStatus = await AdSettings.requestTrackingPermission();
      if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
        AdSettings.setAdvertiserIDCollectionEnabled(true);
        AdSettings.setAdvertiserTrackingEnabled(true);
      }  
    } */ 
      

  }

  render() {


    return (
      <>
        {
          (this.state.isVisible == true) ?
            (<>
              <StatusBar
                backgroundColor={Colors.PRIMARY}
                barStyle="light-content"
              />
              <View
                style={{ width: width, height: height, backgroundColor: '#fff' }}>
                <Image style={styles.splashImg} source={Loaders.splash}></Image>
              </View>
            </>
            ) :
            <>
              <App />
            </>
        }

      </>
    );
  }
}