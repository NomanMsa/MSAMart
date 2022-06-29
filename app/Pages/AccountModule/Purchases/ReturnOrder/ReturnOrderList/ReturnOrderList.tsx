import React, { Component } from 'react';
import { SafeAreaView, Dimensions, ScrollView, View, Text, StatusBar, LogBox, TouchableOpacity, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window')
import { Images, Loaders, Icons } from '@assets';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Footer, SearchBar, OfflineNotice, ROListItem, EmptyWishList } from '@components';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { Colors } from '@theme';
import { FormatDate } from '@utils'
import styles from './ReturnOrderListStyles';
import Toast from 'react-native-simple-toast';
import { DrawerActions, StackActions } from '@react-navigation/native';


export default class ReturnOrderList extends Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            orderId: 0,
            errorLabel: '',
            orderData: [],
            Items: [],
            shipToEnabled: false,
            currentCountryModel: null,
            // Items: [

            //     {
            //         ReturnOrderNumber: '#21-184',
            //         Status: 'Pending',
            //         ReturnedItem: 'Kaled Men Fastionable Stripe T-Shirt x 1',
            //         ReturnReason: 'Received wrong product',
            //         ReturnedAction: 'Replacement',
            //         DateRequested: '06/27/2021 6:15:22 pm',
            //         OrderItemStatus: 'Complete',
            //         Comment: 'This is for test',
            //         CustomProperties: {}
            //     },
            //     {
            //         ReturnOrderNumber: '#21-183',
            //         Status: 'Authorised',
            //         ReturnedItem: 'AI Bassam Black Stamp Shemagh x 1',
            //         ReturnReason: 'Wrong size received',
            //         ReturnedAction: 'Refund',
            //         DateRequested: '06/21/2021 3:32:04 pm',
            //         OrderItemStatus: 'R T N',
            //         Comment: 'This is for test',
            //         CustomProperties: {
            //             ReturnedId: 84,
            //             TrackingNumber: '1000003761560',
            //             DateReturned: 'Monday, June 21, 2021'
            //         }
            //     },
            // ],

        }
        // this._returnOrderListWebCall = this._returnOrderListWebCall.bind(this);
        // this._onSuccessfetchROList = this._onSuccessfetchROList.bind(this);
    }

    //-------------------------------life cycle method-----------------------------------------
    async componentDidMount() {
        // this.setState({ loading: true });
        await this._returnOrderListWebCall()

    }

    //----------------------------------API call------------------------------------------------
    _returnOrderListWebCall = async () => {
        let Service = {
            apiUrl: Api.ReturnedRequestHistory,
            methodType: 'GET',
            headerData: { 'Content-Type': 'application/json' },
            onSuccessCall: this._onSuccessfetchROList,
            onFailureAPI: this.onFailureAPI,
            onPromiseFailure: this.onPromiseFailure,
            onOffline: this.onOffline,
        };
        const serviceResponse = await ServiceCall(Service);
    }

    _onSuccessfetchROList = (data) => {
        console.log(data);
        // if(data.model && data.model.CommonShipToModel){
        //     this.setState({
        //       shipToEnabled: data.model.CommonShipToModel.IsShipToEnable,
        //       currentCountryModel: data.model.CommonShipToModel.CurrentCountryModel,
        //     });
        // }
        if (data.status) {
            this.setState({
                Items: data.model.Items,
                loading: false
            }, console.log(this.state.Items));
        }
        else {
            if (data.errorlist[0] == 'User is not registered') {
                setTimeout(async () => {
                    Alert.alert(
                        'Dragon Mart',
                        'You are not registered, Please register!', [{
                            text: 'Ok',
                            onPress: async () => {
                                this.props.navigation.pop();
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

    handleShipToButtonClick = (data) => {
        this.props.navigation.navigate('ShipToPage');
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
                // countryModel={this.state.currentCountryModel}
                // shipToEnabled={this.state.shipToEnabled}
                shipToButtonClick={this.handleShipToButtonClick}
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
        )
    }


    //--------------------Empty List view ----------------------
    _emptyListView = () => {

        return (
            <View>
                {
                    this.state.loading ?
                        null
                        :
                        <EmptyWishList
                            EmptyTitle={"You haven't returned any order yet"}
                            EmptyIcon={Icons.retrunOrederItem}
                        />
                }
            </View>

        )

    }


    //----------------------------Navigate to shipment details screen -------------------------
    _navigateToDetails = (data) => {
        this.props.navigation.navigate('ReturneOrderDetails', {
            passData: { Id: data.Id }
        })
    }

    //---------------------------------Render main screen---------------------------------------
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

                        {this.state.Items.length > 0

                            ?
                            <ROListItem
                                Items={this.state.Items}
                                onProductClick={(data) => this._navigateToDetails(data)}
                            />

                            :

                            this._emptyListView()

                        }

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