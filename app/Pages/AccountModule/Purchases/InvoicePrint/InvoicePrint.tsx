import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Alert,
  Dimensions,
  Share,
  PermissionsAndroid,
  Platform
} from 'react-native';
import {
  OfflineNotice,
} from '@components';
import AnimatedLoader from "react-native-animated-loader";
import { CommonActions } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import styles from './InvoicePrintStyles';
import { Constants } from '@config';
import { Images, Loaders, Icons } from '@assets';
import { Colors } from '@theme';
import { ServiceCall } from '@utils';
import { Api } from '@config';
// import PDFView from 'react-native-view-pdf';
import RNFetchBlob from 'rn-fetch-blob'

const base64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAMSURBVBhXY/jPYAwAAzQBM849AKsAAAAASUVORK5CYII=';
export default class InvoicePrint extends Component {
  // static defaultProps = {
  //   onBackBtnClick: () => { },
  // };
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: true,

      session: false,
      Id: '',
      token: '',
      pdfData: '',
    }
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.fetchSession = this.fetchSession.bind(this);
    this.onSuccessfetchSession = this.onSuccessfetchSession.bind(this);

  }
  async componentWillUnmount() {
    //token = await AsyncStorage.getItem('custGuid')
    //console.log(token);
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  onFailureAPI(data) {
    this.setState({ loading: false });
    console.log(data);
  }
  onPromiseFailure(data) {
    this.setState({ loading: false });
    console.log(data);
  }
  onOffline(data) {
    this.setState({ loading: false });
    console.log(data);
  }
  fetchSession = async () => {
    let token = (this.props.route.params).passData
    let Service = {
      apiUrl: Api.getSession,
      methodType: 'POST',
      bodyData: JSON.stringify({ "identity": token }),
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchSession,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  async onSuccessfetchSession(data) {
    this.setState({ loading: false });
    //Alert.alert('session regenerated')
    this.setState({ session: true })
  }
  handleBackButtonClick = () => {
    //this.props.navigation.goBack(null);
    return true;
    //Alert.alert("alert", "alert")
    //this.props.navigation.navigate('ShoppingCart')
    //return true;
  };

  async componentDidMount() {

    let paraData = (this.props.route.params).passData
    console.log((this.props.route.params).passData);

    await this.setState({ Id: paraData.Id })
    this.fetchProductDetialsData(paraData.Id)
  }

  fetchProductDetialsData = async (prodId) => {

    let Service = {
      apiUrl: Api.InvoiceAPI + prodId,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccessCall = async (data) => {
    this.setState({ loaderVisible: false });
    console.log("fetchProductDetialsData.............", data)
    let pdfDataModel = data.model
    this.setState({ pdfData: pdfDataModel });
  }

  // async printRemotePDF() {
  //   await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
  // }


  //------------------- Download invoice ----------------------------------------
  _downloadInvoice = () => {
    if (Platform.OS === 'ios') {
      let base64Str = this.state.pdfData.FileContents;
      let pdfLocation = RNFetchBlob.fs.dirs.DownloadDir + '/' + this.state.pdfData.FileDownloadName;
      console.log("pdf.................", pdfLocation)
      RNFetchBlob.fs.writeFile(pdfLocation, base64Str, 'base64');
      RNFetchBlob.ios.previewDocument(pdfLocation);
      // Alert.alert('MsaMart', 'Invoice downloaded successfully');
    } else{
      this.downloadPDF()
    }
  }


  downloadPDF = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Dragon Mart storage permission',
          message:
            'Your .xlsx will be saved at' +
            '/Download/test.pdf',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let base64Str = this.state.pdfData.FileContents;
        let pdfLocation = RNFetchBlob.fs.dirs.DownloadDir + '/' + this.state.pdfData.FileDownloadName;
        console.log("pdf.................", pdfLocation)

        RNFetchBlob.fs.writeFile(pdfLocation, base64Str, 'base64');
        Alert.alert('MsaMart', 'Invoice downloaded successfully');

      } else {
        this.setState({
          loaderVisible: false
        });
        //Toast.showWithGravity('You denied storage permission, Contacts won\t be saved', Toast.LONG, Toast.CENTER);
        Alert.alert('MsaMart', 'storage permission denied');
        console.log('download permission denied');
      }
    } catch (e) {
      this.setState({
        loaderVisible: false
      });
      // Toast.showWithGravity('Error in exporting data.', Toast.LONG, Toast.CENTER);
      Alert.alert('MsaMart', 'Error in exporting data.');

    }


  }


  renderHeader = () => {
    return (
      <View style={[styles.headerContainer]}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
          <TouchableOpacity
            style={{ padding: 10, marginRight: -10, marginLeft: -10 }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={styles.backAvatar}
              source={Icons.arrowBack}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginHeaderTextContainer]}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.headerText}>{'Print Invoice'}</Text>
          </TouchableOpacity>
        </View>
        {this.state.pdfData && this.state.pdfData.FileContents ?

          <TouchableOpacity style={[styles.loginHeaderTextContainer]}
            onPress={() => this._downloadInvoice()}
          >
            <Text style={styles.headerText}>{'Print'}</Text>
          </TouchableOpacity>
          :
          <></>

        }
      </View>
    );
  };
  render() {
    const resourceType = 'base64';
    return (
      <>
        <AnimatedLoader
          visible={this.state.loaderVisible}
          overlayColor="rgba(255,255,255,0.8)"
          source={Loaders.rings}
          animationStyle={styles.lottie}
          speed={1}
        />
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <View style={styles.pageContainer}>
            {this.renderHeader()}
            <OfflineNotice
              noInternetText={'No internet!'}
              offlineText={'You are offline!'}
              offlineStyle={{}}
              noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
              offlineTextStyle={{}}
              noInternetTextStyle={{}}
            />
            {this.state.pdfData && this.state.pdfData.FileContents ?
              <View style={styles.container}>
                {/* <PDFView
                  fadeInDuration={250.0}
                  style={{ flex: 1 }}
                  resource={this.state.pdfData.FileContents}
                  resourceType={'base64'}
                  onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                  onError={(error) => console.log('Cannot render PDF', error)}
                /> */}

              </View>
              :
              <View style={styles.containerError}>
                <Text style={{ alignSelf: 'center', }}>No data found</Text>
              </View>
            }
          </View>
        </SafeAreaView>
      </>

    );
  }
}
