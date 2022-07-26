import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import styles from './AccountMenuStyles';
import { CommonActions } from '@react-navigation/native';
type WindowDimensions = { width: number; height: number };
import { Colors } from '@theme';
import { Api } from '@config';
import { ServiceCall } from '@utils';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { Icons } from '@assets';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
import SafeAreaView from 'react-native-safe-area-view';
/*import Emarsys from "react-native-emarsys-wrapper";*/
import DeviceInfo from 'react-native-device-info';

class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backButtonImage: Icons.arrowBack,
      headerText: 'Your Account',
      GrettingText: 'Hello',
      CustomerName: '',
      isShipToEnable: '',
      LogoutText: 'Log out',
      navarr:[],
      orderTitle:'',
      wishlistTitle:'',
      acDetailTitle:'',
      saddTitle:'',
      returrTitle:'',
      LogoutImage: Icons.logout,
      listData: [
        {
          id: 1,
          Listitem: 'Purchase',
          page: 'Purchases',
          testID: 'purchaseSection',
          accessibilityLabel: "purchaseSection",
        },
        {
          id: 1,
          Listitem: 'Wishlist',
          page: 'WishListPage',
          testID: 'wishListSection',
          accessibilityLabel: "wishListSection",
        },
        {
          id: 1,
          Listitem: 'Account Details',
          page: 'CustomerInfo',
          testID: 'accountDetailsSection',
          accessibilityLabel: "accountDetailsSection",
        },
        // {
        //   id: 1,
        //   Listitem: 'Security & log in',
        //   page:'SignIn',
        // },
        {
          id: 1,
          Listitem: 'Saved address',
          page: 'Address',
          testID: 'savedAddressSection',
          accessibilityLabel: "savedAddressSection",
        },

        {
          id: 1,
          Listitem: 'Return requests',
          page: 'ReturnOrderList',
          testID: 'returnRequestsHeader',
          accessibilityLabel: "returnRequestsHeader",
        },
        // {
        //   id: 1,
        //   Listitem: 'Saved payment options',
        //   page:'ThankYou',
        // },
        // {
        //   id: 1,
        //   Listitem: 'Language & currency',
        //   page:'',
        // },
      ],
    };
    AsyncStorage.getItem("navmodel").then(response=>{
      this.setState({
        navarr:JSON.parse(response)
      })
      this.state.navarr.map((nav,i)=>{
        if(nav.LinkName=="wishlist"){
          this.setState({
            wishlistTitle:nav.Link
          })
        }
        if(nav.LinkName=="order"){
          this.setState({
            orderTitle:nav.Link
          })
        }
        if(nav.LinkName=="accountdetail"){
          this.setState({
            acDetailTitle:nav.Link
          })
        }
        if(nav.LinkName=="savedaddress"){
          this.setState({
            saddTitle:nav.Link
          })
        }
        if(nav.LinkName=="returnrequest"){
          this.setState({
            returrTitle:nav.Link
          })
        }
        
      })
    
      
    })
    this.renderHeader = this.renderHeader.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.onSuccessLogout = this.onSuccessLogout.bind(this);
    this.onFailureAPI = this.onFailureAPI.bind(this);
    this.onPromiseFailure = this.onPromiseFailure.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }
  async componentDidMount() {
    let shipToValue = await AsyncStorage.getItem('IsShipToEnable');
    console.log("isshiptoenabl value -- -- ", shipToValue);
    let userName = await AsyncStorage.getItem('userName');
    console.log('customer name', userName);
    this.setState({
      CustomerName: userName,
      isShipToEnable: shipToValue,
    });
    if (shipToValue == 'true') {
      this.setState({
        listData: [
          {
            id: 1,
            Listitem: 'Ship To',
            page: 'ShipToPage',
          },
          {
            id: 1,
            Listitem: 'Purchases',
            page: 'Purchases',
          },
          {
            id: 1,
            Listitem: 'Wishlist',
            page: 'WishListPage',
          },
          {
            id: 1,
            Listitem: 'Account Details',
            page: 'CustomerInfo',
          },
          // {
          //   id: 1,
          //   Listitem: 'Security & log in',
          //   page:'SignIn',
          // },
          {
            id: 1,
            Listitem: 'Saved addresses',
            page: 'Address',
          },

          {
            id: 1,
            Listitem: 'Return requests',
            page: 'ReturnOrderList',
          },
          // {
          //   id: 1,
          //   Listitem: 'Saved payment options',
          //   page:'ThankYou',
          // },
          // {
          //   id: 1,
          //   Listitem: 'Language & currency',
          //   page:'',
          // },
        ],
      })
    } else {
      this.setState({
        listData: [
          {
            id: 1,
            Listitem: this.state.orderTitle,
            page: 'Purchases',
          },
          {
            id: 1,
            Listitem: this.state.wishlistTitle,
            page: 'WishListPage',
          },
          {
            id: 1,
            Listitem: this.state.acDetailTitle,
            page: 'CustomerInfo',
          },
          {
            id: 1,
            Listitem:  this.state.saddTitle,
            page: 'Address',
          },

          {
            id: 1,
            Listitem: this.state.returrTitle,
            page: 'ReturnOrderList',
          },
        ],
      })
    }
  }
  async onSuccessLogout(data) {
    
    
    if (data.status == true) {
      await AsyncStorage.setItem('loginStatus', 'false');
      await AsyncStorage.setItem('custGuid', '');
      await AsyncStorage.setItem('userName','');
      // await AsyncStorage.removeItem('userName');
      // await AsyncStorage.removeItem('appleUserName');
      // await AsyncStorage.removeItem('appletoken');
      //this.props.navigation.pop();
      this.props.navigation.navigate('Home');
      /*this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Home' },
          ],
        })
      );*/
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
      this.clearContact();
      this.props.UpdateAuthStatus({ loginStatus: 'false' });
      this.props.updateCartCount();
      this.props.updateShoppingCall();
      this.props.updateWishlist();
    } else {
      if (data.message != null && data.message.length > 0) {
        Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
      }
    }
  }

  async clearContact() {
    try {
        let result = "";/*await Emarsys.clearContact();*/
    } catch (e) {
        console.log(e);
    }
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
  onLogoutPress = async () => {
    let Service = {
      apiUrl: Api.Logout +"?deviceId="+DeviceInfo.getUniqueId().toString(),
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json', },
      onSuccessCall: this.onSuccessLogout,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    this.setState({ loaderVisible: true });
    await ServiceCall(Service);
    this.setState({ loaderVisible: false });
  };
  renderHeader = () => {
    return (
      <View style={[styles.headerContainer, this.props.headerContainerStyles]}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}

          onPress={() => this.props.navigation.pop()}>
          <Image
            style={styles.backBtnIcon}
            source={this.state.backButtonImage}
          />

          <Text testID={"myAccount"} accessibilityLabel="myAccount" style={[styles.headerText, this.props.headerTextStyle]}>
            {this.state.headerText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderTitle = () => {
    return (
      <View
        testID={"loggedInAccount"} accessibilityLabel="loggedInAccount"
        style={[styles.TitleContainer, this.props.TitleContainerStyle]}>
        <Text
          testID={"myAccountMobileAfterLogin"} accessibilityLabel="myAccountMobileAfterLogin"
          style={[styles.titleText, this.props.titleTextStyle]}>
          {this.state.GrettingText} {this.state.CustomerName}
        </Text>
        <TouchableOpacity
          testID={"logoutBtn"} accessibilityLabel="logoutBtn"
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.onLogoutPress()}>
          <Image style={styles.logoutAvatar} source={this.state.LogoutImage}
            testID="Logout"
            accessibilityLabel="Logout" />

          <Text style={[styles.logOutText, this.props.logOutTextStyles]}
            testID="Logout"
            accessibilityLabel="Logout"
          >
            {this.state.LogoutText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  OrderDetailsItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        testID={item.testID}
        accessibilityLabel={item.accessibilityLabel}
        key={index}
        testID={item.testID}
        accessibilityLabel={item.accessibilityLabel}
        onPress={() => {
          if (item.page != '') {
            this.props.navigation.push(item.page);
          }
        }}
        style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
        <Text style={[styles.listItemText, this.props.listItemTextStyles]}>
          {item.Listitem}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <>
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
          <View style={styles.pageContainer}>
            {this.renderHeader()}
            <ScrollView>
              {this.renderTitle()}
              <FlatList
                style={[styles.container, this.props.containerStyles]}
                data={this.state.listData}
                renderItem={this.OrderDetailsItems}
                keyExtractor={(item, index) => index}
              />
            </ScrollView>
          </View>
        </SafeAreaView>

      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateAuthStatus: (status) =>
      dispatch({ type: 'AUTH_STATUS', paylod: status }),
    updateShoppingCall: () => dispatch({ type: 'SHOPPING_CALL' }),
    updateCartCount: () => dispatch({ type: 'COUNT_CALL' }),
    updateWishlist: () => dispatch({ type: 'WISHLIST_CALL' }),
  };
};

const mapStateToProps = (state) => {
  let LoginStatus = state.Login_Status;

  return {
    AuthStatus: LoginStatus.loginStatus,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
