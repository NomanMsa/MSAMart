import React, { Component } from 'react';
import { SafeAreaView, Dimensions, ScrollView, View, Text, StatusBar, Image, LogBox, TouchableOpacity, Linking, Alert, TextInput, } from 'react-native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window')
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Footer, SearchBar, OfflineNotice, Button, OrderItemList, ROItem, DropdownWithIcon } from '@components';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { Colors } from '@theme';
import { FormatDate } from '@utils'
import styles from './RORequestStyles';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import { DrawerActions, StackActions } from '@react-navigation/native';

var returnItemArray = [];
export default class ThankYou extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      productQuantity: 0,
      uploadFileName: '',
      uploadFileURL: '',
      showfileUpload: false,
      returnReasons: [{ Name: '', Id: 0 }],
      returnActions: [{ Name: '', Id: 0 }],
      returnItemList: [],
      selectedReasonId: 0,
      selectedActionId: 0,
      comment: '',
    }
    this.pickUploadFile = this.pickUploadFile.bind(this);
    this.fetchReturnOrderDetails = this.fetchReturnOrderDetails.bind(this);
    this.onSuccessfetchReturnOrderDetails = this.onSuccessfetchReturnOrderDetails.bind(this);
    this.submitReturnDetails = this.submitReturnDetails.bind(this);
    this.onSuccesssubmitReturnDetails = this.onSuccesssubmitReturnDetails.bind(this);
    this.updateItemData = this.updateItemData.bind(this);
    this.uploadSelectedFile = this.uploadSelectedFile.bind(this);
    this.uploadBegin = this.uploadBegin.bind(this);
    this.uploadProgress = this.uploadProgress.bind(this);
    this.totalItems = this.totalItems.bind(this);
    this.GuestUserStatuscall = this.GuestUserStatuscall.bind(this);
    this.onSuccessLookUpOder = this.onSuccessLookUpOder.bind(this);
  }

  async componentDidMount() {
    let orderId = (this.props.route.params).passData.orderId
    let itemId = (this.props.route.params).passData.itemId

    await this.fetchReturnOrderDetails(orderId, itemId)
  }

  onFailureAPI(data) {
    console.log(data);
  }
  onPromiseFailure(data) {
    console.log(data);
  }
  onOffline(data) {
    console.log(data);
  }
  fetchReturnOrderDetails = async (orderId, itemId) => {
    let finalApi = Api.returnReqDetails + '?orderId=' + orderId   //+ '&orderItemId=' + itemId;
    if (itemId == 0 || itemId == '0' || itemId == undefined || itemId == null) {
      finalApi = Api.returnReqDetails + '?orderId=' + orderId;
    }
    console.log(finalApi)
    let Service = {
      apiUrl: finalApi,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchReturnOrderDetails,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessfetchReturnOrderDetails = async (data) => {
    console.log(data)
    this.setState({
      returnReasons: data.model.AvailableReturnReasons,
      returnActions: data.model.AvailableReturnActions,
      returnItemList: data.model.Items,
      showfileUpload: data.model.AllowFiles,
      selectedReasonId: data.model.AvailableReturnReasons[0].Id,
      selectedActionId: data.model.AvailableReturnActions[0].Id,
    })
    returnItemArray = (data.model.Items).map(({ Id, Quantity }) => ({ ['Quantity']: Quantity, ['Id']: Id }))
  };



  uploadBegin = (response) => {
    console.log(response)
    const jobId = response.jobId;
    console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
  };

  uploadProgress = (response) => {
    console.log(response)
    const percentage = Math.floor(
      (response.totalBytesSent / response.totalBytesExpectedToSend) * 100
    );
    console.log('UPLOAD IS ' + percentage + '% DONE!');
  };
  uploadSelectedFile = async () => {
    let urlToUpload = this.state.uploadFileURL.replace(' ', '')
    const realPath = Platform.OS === 'ios' ? urlToUpload.replace('file://', '') : urlToUpload;
    RNFetchBlob.fetch('POST', Api.uploadReturnFile, {
      'Content-Type': 'multipart/form-data',
    }, [
      // append field data from file path
      {
        name: 'avatar',
        filename: 'avatar.png',
        data: RNFetchBlob.wrap(realPath)
      }
    ]).then((resp) => {
      // console.log("RESPONCE DATA", resp.data)
      console.log(JSON.parse(resp.data))
      let data = JSON.parse(resp.data);
      if (data.success == true) {
        this.submitReturnDetails(data.downloadGuid);
      }
    }).catch((err) => {
      console.log(err)
    })
    /*let url = this.state.uploadFileURL; //The url you received from the DocumentPicker
    const split = url.split('/');
    const name = split.pop();
    const inbox = split.pop();
    const realPath = `file:/${RNFS.TemporaryDirectoryPath}/${inbox}/${name}`;

console.log(name)

console.log(this.state.uploadFileURL)
console.log(this.state.uploadFileName)
console.log(realPath)
    RNFS.uploadFiles({
      toUrl: Api.uploadReturnFile,
      files: [
        {
          name,
          filename: name,
          filepath: realPath,
          filetype: 'application/json',
        },
      ],
      method: 'POST',
      begin: this.uploadBegin,
      beginCallback: this.uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
      progressCallback: this.uploadProgress,
      progress: this.uploadProgress,
    }).promise.then((response) => {
      if (response.statusCode == 200) {
        console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      } else {
        console.log('SERVER ERROR');
      }
    })
    .catch((err) => {
      if(err.description === "cancelled") {
        // cancelled by user
      }
      console.log(err);
    });*/
    /*let data = new FormData()
    data.append('image', {uri: 'content://path/to/content', type: 'image/png', name: 'name'})
    const response = await fetch(Api.uploadReturnFile, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data
    })*/
    /*let orderId = (this.props.route.params).passData.orderId
    let itemId = (this.props.route.params).passData.itemId
    let Service = {
      apiUrl: Api.uploadReturnFile,
      methodType: 'GET',
      bodyData: JSON.stringify({
        "orderId": orderId,
        "orderItemId": itemId,
        "model": {
          "UploadedFileGuid": "00000000-0000-0000-0000-000000000000",
          "Items": returnItemArray,
          "ReturnRequestReasonId": this.state.selectedReasonId,
          "ReturnRequestActionId": this.state.selectedActionId,
          "Comments": this.state.comment,
        }
      }),
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccesssubmitReturnDetails,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    console.log(Service)*/
    //const serviceResponse = await ServiceCall(Service);
  };
  totalItems = (items, prop) => {
    return items.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  };
  submitReturnDetails = async (downloadGuid) => {
    let orderId = (this.props.route.params).passData.orderId
    let itemId = (this.props.route.params).passData.itemId

    let totalItemCount = this.totalItems(returnItemArray, 'Quantity');
    //alert(totalItemCount)
    if (totalItemCount < 1) {
      setTimeout(async () => {
        Alert.alert(
          'MsaMart',
          'Minimum one item quantity must be greater than 0', [{
            text: 'Ok',
            onPress: async () => { console.log('Okay') }
          },], {
          cancelable: true
        }
        )
      }, 500)
    }
    else {
      var a='{'
      for (let i = 0; i < returnItemArray.length; i++) {
        var keyName = "quantity" + returnItemArray[i].Id;
      const value = returnItemArray[i].Quantity;
      a = a + '"' + keyName +'"'+ ":" +'"'+ value+'"';
      if(i != returnItemArray.length - 1){
        a = a + ",";
        
      }
    }
    a = a + '}';
  var custom=   JSON.parse(a);
  var resonid= this.state.selectedReasonId
  var actionid =this.state.selectedActionId
  var comment =  this.state.comment
      let Service = {
        apiUrl: Api.submitReturnDetails+'?orderId='+orderId,
        methodType: 'POST',
        bodyData: JSON.stringify({
          // "orderId": orderId,
          // "orderItemId": itemId,
          
            //"UploadedFileGuid": downloadGuid,
            "UploadedFileGuid": "00000000-0000-0000-0000-000000000000",
            "Items": returnItemArray,
            "ReturnRequestReasonId": resonid,
            "ReturnRequestActionId": actionid,
            "Comments": comment,
            "CustomProperties":custom
        }),
        headerData: { 'Content-Type': 'application/json' },
        onSuccessCall: this.onSuccesssubmitReturnDetails,
        onFailureAPI: this.onFailureAPI,
        onPromiseFailure: this.onPromiseFailure,
        onOffline: this.onOffline,
      };
      console.log(Service)
      const serviceResponse = await ServiceCall(Service);
    }
  };

  GuestUserStatuscall = async () => {

    let Service = {
      apiUrl: Api.GuestUser,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        email: (this.props.route.params).passData.passData.BillingAddress.Email,
        orderId: (this.props.route.params).passData.passData.CustomOrderNumber,
      }),
      onSuccessCall: this.onSuccessLookUpOder,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };

    this.setState({ loading: true });
    const serviceResponse = await ServiceCall(Service);
    this.setState({ loading: false });
  }
  onSuccessLookUpOder = async (data) => {
    var d1 = data.model;

    if (data.errorlist && data.errorlist.length > 0) {
      setTimeout(() => {
        Alert.alert('MsaMart', data.errorlist[0]);
      }, 500);
    }
    else {
      this.props.route.params.onReturnOrderSuccess({ passData: { data: d1 } });
    }
  }

  onSuccesssubmitReturnDetails = async (data) => {
    console.log("++---///",data)
    if (data.status) {


      if (await AsyncStorage.getItem('loginStatus') == 'true') {
        setTimeout(async () => {
          Alert.alert(
            data.message,
            data.Result, [{
              text: 'Ok',
              onPress: async () => { this.props.navigation.pop() }
            },], {
            cancelable: false
          }
          )
        }, 500)
      } else {
        setTimeout(async () => {
          Alert.alert(
            data.message,
            data.Result, [{
              text: 'Ok',
              onPress: async () => { this.props.navigation.pop() }
            },], {
            cancelable: false
          }
          )
        }, 500)
        this.GuestUserStatuscall();
      }



    } else {
      if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
        setTimeout(async () => {
          Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM)
        }, 500)
      }
    }
  };

  onSuccessfetchCancelOrder = async (data) => {

  }

  // Pick a single file
  updateItemData = (Id, Quantity) => {
    // console.log("ITEM ID", Id, Quantity)
    this.setState({ productQuantity: Quantity })
    var item = { "Id": Id, "Quantity": parseInt(Quantity) }
    returnItemArray[returnItemArray.findIndex(el => el.Id === item.Id)] = item;
    //items[foundIndex] = item;
    // if (Quantity < 1) {
    //   setTimeout(async () => {
    //     Alert.alert(
    //       'MsaMart',
    //       'Your return request has not been submitted because you havent choosen any items.', [{
    //         text: 'Ok',
    //         onPress: async () => {

    //         }
    //       },], {
    //       cancelable: false
    //     }
    //     )
    //   }, 500)
    // }
    console.log(returnItemArray);
  }

  pickUploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]//images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      if (res.size && res.size > 2097152) {
        setTimeout(async () => {
          Alert.alert(
            'MsaMart',
            'File size must be less than 2MB', [{
              text: 'Ok',
              onPress: async () => {
                this.setState({
                  uploadFileName: '',
                  uploadFileURL: '',
                })
              }
            },], {
            cancelable: false
          }
          )
        }, 500)
      } else {
        this.setState({
          uploadFileName: res.name,
          uploadFileURL: res.uri,
        })

      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker, exit any dialogs or menus and move on')
      } else {
        throw err;
      }
    }
  }

  render() {
    return (
      <>
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.8)"
          source={Loaders.rings}
          animationStyle={styles.lottie}
          speed={1}
        />
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <Header
            burgerMenuClick={(data) => {
              this.props.navigation.dispatch(DrawerActions.openDrawer());
            }}
            backButtonClick={() => this.props.navigation.pop()}
            NavButton={true}
            userIcoStyles={{ tintColor: Colors.WHITE }}
            cartIcoStyles={{ tintColor: Colors.WHITE }}
            menuIcoStyles={{ tintColor: Colors.WHITE }}
            logoStyles={{ tintColor: Colors.WHITE }}
            fullRowBottom={
              <SearchBar
                onFocus={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                editable={false}
                onSearchContainer={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                onTextChange={(data) => console.log(data)}
                onSearch={(data) =>
                  this.props.navigation.navigate('Search', { passData: data })
                }
                isEnabled={false}
                styles={{ borderWidth: 0 }}
                iconColor={Colors.BLACK}
                iconContainerStyles={{
                  backgroundColor: Colors.SECONDAY_COLOR,
                }}
                placeholderStyles={{}}
              />
            }
            fullRowTop={<></>}
            styles={{
              backgroundColor: Colors.PRIMARY,
              borderBottomColor: Colors.SILVER,
            }}
            userClick={async (data) => { if (await AsyncStorage.getItem('loginStatus') == 'true') { this.props.navigation.navigate('Account', { passData: data, }) } else { this.props.navigation.navigate('SignIn', { passData: data, }) } }}
            cartClick={(data) =>
              this.props.navigation.navigate('ShoppingCart', {
                passData: data,
              })
            }
            logoClick={(data) => this.props.navigation.navigate('Home')}
          />
          <OfflineNotice
            noInternetText={'No internet!'}
            offlineText={'You are offline!'}
            offlineStyle={{}}
            noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
            offlineTextStyle={{}}
            noInternetTextStyle={{}}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.screenContainer}>
              <View style={styles.screenTitleContainer}>
                <View style={styles.screenTitleBlock}>
                  <Text style={styles.screenTitleText}>Returns item(s) from</Text>
                  <Text style={[styles.screenTitleText, styles.screenTitleTextRed]}>order #{(this.props.route.params).passData.orderId}</Text>
                </View>
                <View style={styles.screenSubTitleBlock}>
                  <Text style={styles.screenSubTitleText}>Which items do you want to retrun?</Text>
                </View>
              </View>
              <ROItem
                data={this.state.returnItemList}
                onQtySelection={(Id, Quantity) => this.updateItemData(Id, Quantity)}
              />
              <View style={styles.returnInputBlock}>
                <View style={styles.screenInputBlock}>
                  <Text style={[styles.screenQuestionText, styles.txtSettings]}>Why are you returning these items?</Text>
                  <DropdownWithIcon
                    containerStyles={{ width: width - 60, marginBottom: 8 }}
                    ddStyles={{ height: 40 }}
                    title={'Return Reason:'}
                    titleStyle={{ marginBottom: 0 }}
                    Id={1}
                    data={this.state.returnReasons}
                    onItemSelection={(data, Id) => console.log(data)} />
                  <DropdownWithIcon
                    containerStyles={{ width: width - 60, marginBottom: 8 }}
                    ddStyles={{ height: 40 }}
                    title={'Return Action:'}
                    titleStyle={{ marginBottom: 0 }}
                    Id={2}
                    data={this.state.returnActions}
                    onItemSelection={(data, Id) => console.log(data)} />
                  <Text style={[styles.screenQuestionText]}>Upload (any additonal document, scan, etc):</Text>

                  {this.state.showfileUpload && <TouchableOpacity style={styles.fileUploadBlock} onPress={() => this.pickUploadFile()}>
                    <Text style={styles.fileNameTxt}>{this.state.uploadFileName}</Text>
                    <View style={styles.uploadIcoBlock}>
                      <Image style={styles.uploadFileIcon} source={Icons.uploadFile} />
                    </View>
                  </TouchableOpacity>}
                  <View style={styles.commentContainer}>
                    <Text style={styles.titleText}>Comments:</Text>
                    <View style={styles.returnCommentBlock}>
                      <TextInput
                        {...this.props}
                        multiline={true}
                        onChange={(event) => {
                          this.setState({
                            comment: event.nativeEvent.text,
                          });
                        }}
                        style={{ minHeight: 150, textAlignVertical: 'top' }}
                        value={this.state.comment}
                      />
                    </View>
                  </View>
                </View>
                <Button
                  title={'Submit Return Request'}
                  disabled={false}
                  btnStyle={{ borderWidth: 0, width: width - 60, alignSelf: 'center', marginTop: 10, marginBottom: 10 }}
                  titleStyle={{
                    ...Platform.select({
                      ios: {
                        fontWeight: '800',
                        fontFamily: 'verdana',
                      },
                      android: {
                        fontWeight: 'normal',
                        fontFamily: 'verdanab',
                      },
                    }), textTransform: 'uppercase', fontSize: 15,
                  }}
                  //OnClick={(data) => this.submitReturnDetails()}
                  OnClick={(data) => {
                    if (this.state.showfileUpload == true && this.state.uploadFileName != '') {
                      this.uploadSelectedFile()
                    }
                    else if (this.state.productQuantity < 1) {
                      setTimeout(async () => {
                        Alert.alert(
                          'MsaMart',
                          'Your return request has not been submitted because you havent choosen any items.', [{
                            text: 'Ok',
                          },], {
                          cancelable: false
                        }
                        )
                      }, 500)

                    }

                    else {
                      this.submitReturnDetails('')
                    }
                  }}
                />
              </View>
            </View>
            <Footer
              footerLinksList={[
                { text: 'Privacy Policy', url: 'PrivacyPolicy' },
                { text: 'Returns', url: 'Returns' },
                { text: 'Terms and Conditions', url: 'TermsConditions' },
                { text: 'Contact Us', url: 'ContactUs' },
                { text: 'Delivery', url: 'Delivery' },
                { text: 'Laws and Regulations', url: 'LawsRegulations' },
              ]}
              onNavLink={(data) => this.props.navigation.navigate(data.url)}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
