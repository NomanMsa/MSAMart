import React, { Component } from 'react';
import { SafeAreaView, Dimensions, ScrollView, View, Text, StatusBar, Image, ImageBackground, TouchableOpacity, Easing, LogBox, Platform } from 'react-native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window')
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { Header, Footer, SearchBar, OfflineNotice, OrderCards } from '@components';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { Colors } from '@theme';
import styles from './PurchasesStyles';
import perf from '@react-native-firebase/perf';
import { DrawerActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';


const pickerStyle = {
  inputIOS: {
    alignSelf: 'flex-start',
    width: (width / 2) - 30,
    color: 'black',
    height: '100%',
    fontFamily: 'verdana',
    fontSize: 16,
    marginLeft: 15,
  },
};


export default class ThankYou extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      statusSorting: [],
      periodFilter: [],
      orderList: [],
      statusSelection: 0,
      filterSelection: 0,
      shipToEnabled: false,
      currentCountryModel: null,
    }
    this.fetchPurchases = this.fetchPurchases.bind(this);
    this.onSuccessfetchPurchases = this.onSuccessfetchPurchases.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const purchaseTrace = await perf().startTrace('custom_trace_purchases_screen');
    await this.fetchPurchases();
    await purchaseTrace.stop();
  }

  async onSuccessfetchPurchases(data) {
    console.log(data);

    await this.setState({
      loading: false,
    });

    if (data.status == true) {

      /*let ListStatusSorting = data.model.ListStatusSorting;
      ListStatusSorting = ListStatusSorting.map(item => { return { value: item.Value, label: item.Text, text: item.Text, Value: item.Value, Text: item.Text }; });

      let ListTimePeriodFilter = data.model.ListTimePeriodFilter;
      ListTimePeriodFilter = ListTimePeriodFilter.map(item => { return { value: item.Value, label: item.Text, text: item.Text, Value: item.Value, Text: item.Text }; });*/

      await this.setState({
        statusSorting: [],//ListStatusSorting,
        periodFilter: [],//ListTimePeriodFilter,
        orderList: data.model.Orders,
        statusSelection: this.state.statusSelection,
        filterSelection: this.state.filterSelection,
        loading: false,
      });
      if (this.state.statusSelection == 0 && this.state.filterSelection == 0) {
        await this.setState({
          statusSelection: "",//data.model.ListStatusSorting[0].Value,
          filterSelection:"",// data.model.ListTimePeriodFilter[0].Value,
        });

      }
      if (data.model.CommonShipToModel) {
        await this.setState({
          shipToEnabled: data.model.CommonShipToModel.IsShipToEnable,
          currentCountryModel: data.model.CommonShipToModel.CurrentCountryModel,
        });
      }
    } else {
      if (data.errorlist[0] != null && data.errorlist[0].length > 0) {
        setTimeout(() => {
          Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
        }, 100);
      }
    }
  }

  handleShipToButtonClick = (data) => {
    this.props.navigation.navigate('ShipToPage');
  }

  onFailureAPI(data) {
    console.log(data);
    this.setState({ loading: false });
  }
  onPromiseFailure(data) {
    console.log(data);
  }
  onOffline(data) {
    console.log(data);
  }
  fetchPurchases = async () => {
    let Service = {
      apiUrl: Api.orderHistory,
      methodType: 'GET',
     
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall: this.onSuccessfetchPurchases,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  updateData = async (from, value) => {
    console.log(value);
    if (from == 'status') {
      await this.setState({ statusSelection: value })
    } else {
      await this.setState({ filterSelection: value })
    }
    this.setState({ loading: true });
    await this.fetchPurchases();
    this.setState({ loading: false });
  };

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
          <OfflineNotice
            noInternetText={'No internet!'}
            offlineText={'You are offline!'}
            offlineStyle={{}}
            noInternetStyle={{ backgroundColor: Colors.SECONDAY_COLOR }}
            offlineTextStyle={{}}
            noInternetTextStyle={{}}
          />

          {/* <Header
              burgerMenuClick={(data) => {
                this.props.navigation.toggleDrawer();
              }} */}
          <Header
            burgerMenuClick={(data) => {
              //this.props.navigation.toggleDrawer();
              this.props.navigation.dispatch(DrawerActions.openDrawer());
              //this.props.navigation.openDrawer()
            }}
            countryModel={this.state.currentCountryModel}
            shipToEnabled={this.state.shipToEnabled}
            shipToButtonClick={this.handleShipToButtonClick}
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
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            stickyHeaderIndices={[1]}
            style={styles.scrollView}>
            <View>

              <View style={styles.ddHeaderContainer}>
                <View style={styles.ddContainer}>

                  {(this.state.statusSorting).length > 0 ? <>{Platform.OS == "android" ?

                    <View style={[styles.dropdownContainer]}>
                      <Picker
                        testID={"orderStatus"}
                        accessibilityLabel="orderStatus"
                        selectedValue={this.state.statusSelection}
                        style={[styles.dropdownContainerInner]}
                        onValueChange={(value, index) => this.updateData('status', value)}>
                        {this.state.statusSorting.map((item, index) => {
                          return <Picker.Item key={index} value={item.Value} label={item.Text} />
                        })}

                      </Picker>
                    </View>
                    :
                    <View style={[styles.dropdownContainerIos]}><RNPickerSelect
                      testID={"orderStatus"}
                      accessibilityLabel="orderStatus"
                      value={this.state.statusSelection}
                      placeholder={''}
                      viewContainer={{ marginTop: 10 }}
                      style={{ ...pickerStyle }}
                      onValueChange={(value, index) => this.updateData('status', value)}
                      items={this.state.statusSorting}
                    />
                    </View>}</> : <></>}
                  {(this.state.periodFilter).length > 0 ? <>{Platform.OS == "android" ?

                    <View style={[styles.dropdownContainer]}>
                      <Picker
                        testID={"orderHistory"}
                        accessibilityLabel="orderHistory"
                        selectedValue={this.state.filterSelection}
                        style={[styles.dropdownContainerInner]}
                        onValueChange={(value, index) => this.updateData('filter', value)}>
                        {this.state.periodFilter.map((item, index) => {
                          return <Picker.Item key={index} value={item.Value} label={item.Text} />
                        })}

                      </Picker>
                    </View>
                    :
                    <View style={[styles.dropdownContainerIos]}><RNPickerSelect
                      testID={"orderHistory"}
                      accessibilityLabel="orderHistory"
                      value={this.state.filterSelection}
                      placeholder={''}
                      viewContainer={{ marginTop: 10 }}
                      style={{ ...pickerStyle }}
                      onValueChange={(value, index) => this.updateData('filter', value)}
                      items={this.state.periodFilter}
                    />
                    </View>}</> : <></>}
                </View>
              </View>
              <OrderCards
                testID={"orderList"}
                orders={this.state.orderList}
                onSelect={(data) => this.props.navigation.push('PurchaseDetails', { passData: { data: { Id: data.Id } } })}
              //onSelect ={(data) => console.log(data.Id)}
              />
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

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
