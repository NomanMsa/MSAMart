import React, { Component } from 'react';
import { Button, SafeAreaView, Dimensions, ScrollView, View, Text, StatusBar, LogBox, Linking, Alert, TouchableOpacity, StyleSheet } from 'react-native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window')
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Footer, SearchBar, OfflineNotice, ROListItem, OrderItemList } from '@components';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { Colors } from '@theme';
import { FormatDate } from '@utils'
import styles from './ReturnOrderDetailsStyles';
import Toast from 'react-native-simple-toast';
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview'
import { DrawerActions, StackActions } from '@react-navigation/native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const supportedURL = "https://google.com";
const OpenURLButton = ({ url, children }) => {
    const handlePress = async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };
    return <Button style={{ height: 10, width: '50%', fontSize: 10, backGroundColor: 'pink' }} title={children} onPress={handlePress} />;
};



export default class ReturneOrderDetails extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            shipmentIdToShow: '',
            TrackingNumber: '',
            TrackingNumberUrl: '',
            ShipmentMethod: '',
            ReturnedDate: '',
            ProductName: '',
            AttributeInfo: '',
            PickupAddress: {},
            QtyReturned: '',
            shipmentId: (props.route.params).passData.Id,
            shipToEnabled: false,
            currentCountryModel: null,
        }
    }

    //-------------------------------life cycle method-----------------------------------------
    async componentDidMount() {
        console.log('-----------------------this is the screen width----------------------', SCREEN_WIDTH)
        this.setState({ loading: true });
        console.log('---------in didmount shipment dtails ---------', (this.state.shipmentId) + ' API url ----', Api.ShipmentDetails + this.state.shipmentId)
        this.setState({
            loading: false,
        }, await this._shipmentDetailsWebCall());

    }

    //-----------------------------------return shipment details webcall--------------------------
    _shipmentDetailsWebCall = async () => {
        let Service = {
            apiUrl: Api.ShipmentDetails + this.state.shipmentId,
            methodType: 'GET',
            headerData: { 'Content-Type': 'application/json' },
            onSuccessCall: this._onSuccessfetchShipmentDetails,
            onFailureAPI: this.onFailureAPI,
            onPromiseFailure: this.onPromiseFailure,
            onOffline: this.onOffline,
        };
        const serviceResponse = await ServiceCall(Service);
    }

    _onSuccessfetchShipmentDetails = (data) => {
        console.log(data);
        if(data.model && data.model.CommonShipToModel){
            this.setState({
              shipToEnabled: data.model.CommonShipToModel.IsShipToEnable,
              currentCountryModel: data.model.CommonShipToModel.CurrentCountryModel,
            });
        }
        if (data.status) {
            console.log('-----------------this is the shipment data-----------', data)
            this.setState({
                shipmentIdToShow: data.model.Order.CustomOrderNumber,
                TrackingNumber: data.model.TrackingNumber,
                TrackingNumberUrl: data.model.TrackingNumberUrl,
                ShipmentMethod: data.model.ShipmentMethod,
                ReturnedDate: data.model.ReturnedDate,
                ProductName: data.model.ReturnShipmentItemModel.ProductName,
                AttributeInfo: data.model.ReturnShipmentItemModel.AttributeInfo,
                QtyReturned: data.model.ReturnShipmentItemModel.QuantityReturned,
                PickupAddress: data.model.Order.ShippingAddress,
                loading: false
            });
        }
        else {
            if (data.errorlist[0] == 'User is not registered') {
                //StackActions.replace('Home')
                setTimeout(async () => {
                    Alert.alert(
                        'Dragon Mart',
                        'Returned request not found!', [{
                            text: 'Ok',
                            onPress: async () => {
                                this.props.navigation.pop();
                                //this.props.navigation.dispatch(
                                //  StackActions.replace('Home')
                                //);
                            }
                        },], {
                        cancelable: false
                    }
                    )
                }, 500)
            }
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

    //-------------------------------------navigate to PurchaseDetails screen--------------------
    _navToPurchaseDetails = (idToPass) => {
        this.props.navigation.push('PurchaseDetails', { passData: { data: { Id: idToPass } } })
    }

    //----------------------------------render Header-------------------------------------------
    _renderHeader = () => {
        return (
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
                countryModel={this.state.currentCountryModel}
                shipToEnabled={this.state.shipToEnabled}
                shipToButtonClick={this.handleShipToButtonClick}
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
        )
    }

    //------------------------------------- Order Block ------------------------------------------------
    _renderOrderBlock = () => {
        let idToPass = this.state.shipmentIdToShow.split('-')
        return (
            <View style={[styles.cardContainer]}>
                <View style={styles.orderBlocks}>
                    <TouchableOpacity onPress={() => this._navToPurchaseDetails(idToPass[1])} >
                        <Text style={styles.orderHeaderTxt}>Order #<Text style={styles.orderHeaderTxtPrimary}>{idToPass[1]}</Text></Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.orderBlocks, styles.orderBlockBorder]}>
                    <View style={styles.detailContainer}>

                        <View style={styles.detailBlock}>
                            <Text style={styles.detailTxt}>Shipping Method</Text>
                            <Text style={styles.detailHeaderTxt}>{this.state.ShipmentMethod}</Text>
                        </View>

                        <View style={styles.detailBlock}>
                            <Text style={styles.detailTxt}>Date Returned</Text>
                            <Text style={styles.detailHeaderTxt}>{this.state.ReturnedDate ? FormatDate.formatDate(this.state.ReturnedDate, 'dd/mm/yyyy') : null} </Text>
                        </View>

                        <View style={styles.detailBlock}>
                            <Text style={styles.detailTxt}>TrackingNumber</Text>
                            <TouchableOpacity onPress={() => { this.handleClick() }}>
                                <View style={styles.button}>
                                    <Text style={styles.linkingText}>{this.state.TrackingNumber}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    handleClick = () => {
        console.log('url.............', this.state.TrackingNumberUrl)
        if(this.state.TrackingNumberUrl !== null){
            const url = this.state.TrackingNumberUrl.replace(' ', '')
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + this.state.TrackingNumberUrl);
                }
            });
        }

    };

    handleShipToButtonClick = (data) => {
        this.props.navigation.navigate('ShipToPage');
    }

    //------------------------------------- Return Product Block ------------------------------------------------
    _renderReturnProductBlock = () => {
        console.log("returnOrderdeail attributeInfo - ",this.state.AttributeInfo)
        if(this.state.AttributeInfo !== null){
            let newStr = this.state.AttributeInfo.replace('<br />', '\n\n')
            return (
                <View style={styles.cardContainer}>

                    <View style={styles.orderBlocks}>
                        <Text style={styles.orderHeaderTxt}>Returned Product</Text>
                    </View>
                    <View style={[styles.orderBlocks, styles.orderBlockBorder]}>
                        <Text style={{ ...styles.detailTxt, marginBottom: 8 }}>{this.state.ProductName}</Text>
                        {newStr ? <Text style={{ ...styles.detailHeaderTxt, color: 'gray' }}>{newStr}</Text> :null}
                        {/* <HTMLView
                            value={this.state.AttributeInfo}
                            // stylesheet={styles}
                        /> */}
                    </View>
                    {
                        this.state.QtyReturned ?
                            <>
                                <View style={styles.line} />
                                <View style={styles.qtyView}>
                                    <Text style={{ ...styles.detailHeaderTxt, color: 'gray', marginBottom: 8 }}>Qty returned: {this.state.QtyReturned}</Text>
                                </View>
                            </>
                            :
                            null
                    }

                </View>
            )
        }
    }

    //------------------------------------- Pickup address Block ------------------------------------------------
    _renderPickUpAddress = () => {

        return (
            <View style={styles.cardContainer}>

                <View style={styles.orderBlocks}>
                    <Text style={styles.orderHeaderTxt}>Pickup Address</Text>
                </View>
                <View style={[styles.orderBlocks, styles.orderBlockBorder]}>
                    <View style={styles.detailContainer}>
                        <View style={styles.detailBlock}>
                            <Text style={styles.detailHeaderTxt}>{this.state.PickupAddress.FirstName + ' ' + this.state.PickupAddress.LastName}</Text>
                            {this.state.PickupAddress.Email ?
                                <Text style={styles.detailHeaderTxt}>{this.state.PickupAddress.Email}</Text>
                                :
                                null
                            }
                            {this.state.PickupAddress.PhoneNumber ?
                                <Text style={styles.detailHeaderTxt}>{this.state.PickupAddress.PhoneNumber ? this.state.PickupAddress.PhoneNumber : null}</Text>
                                :
                                null
                            }
                        </View>
                        <View style={styles.detailBlock}>
                            <Text style={{ ...styles.detailTxt, marginTop: 8, marginLeft: 8 }}>Pickup Address</Text>
                            <Text style={{ ...styles.detailHeaderTxt, marginLeft: 8 }}>{this.state.PickupAddress.Address1 ? this.state.PickupAddress.Address1 : null}</Text>
                            {this.state.PickupAddress.City ?
                                <Text style={{ ...styles.detailHeaderTxt, marginLeft: 8 }}>{this.state.PickupAddress.City}</Text>
                                :
                                null
                            }
                            {this.state.PickupAddress.StateProvinceName ?
                                <Text style={{ ...styles.detailHeaderTxt, marginLeft: 8 }}>{this.state.PickupAddress.StateProvinceName}</Text>
                                :
                                null
                            }
                            {this.state.PickupAddress.ZipPostalCode ?
                                <Text style={{ ...styles.detailHeaderTxt, marginLeft: 8 }}>{this.state.PickupAddress.ZipPostalCode}</Text>
                                :
                                null
                            }
                            {this.state.PickupAddress.CountryName ?
                                <Text style={{ ...styles.detailHeaderTxt, marginLeft: 8 }}>{this.state.PickupAddress.CountryName}</Text>
                                :
                                null
                            }
                        </View>
                    </View>
                </View>

            </View>

        )

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
                    {this._renderHeader()}

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
                        <View style={styles.oDetailsContainer}>
                        </View>

                        <Text style={styles.itemHeaderText}>
                            Return shipment #{this.state.shipmentId}
                        </Text>

                        {this._renderOrderBlock()}
                        {this._renderReturnProductBlock()}
                        {this._renderPickUpAddress()}

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
        )
    }
}
const stylesHtml = StyleSheet.create({
    a: {
        fontSize: 14,
        color: 'gray',
        marginTop: 8,
        marginBottom: 0,
        backgroundColor: 'pink',

        alignItems: 'center',
        justifyContent: 'center'
    },
});
