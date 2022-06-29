import React, { Component } from 'react';
import { View, Image, Linking, Platform, SafeAreaView, Alert } from 'react-native';

import {
    Drawer,
    Text,
} from 'react-native-paper';
import HomeStack from '../../Navigation/HomeStack'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icons, Images, Loaders } from '@assets';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '@theme';
import styles from './DrawerContentStyle';
import { ServiceCall } from '@utils';
import { Api, EventTags, EmarsysEvents } from '@config';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";
/*import Emarsys from "react-native-emarsys-wrapper";*/
import DeviceInfo from 'react-native-device-info';




class DrawerContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pData: {},
        }
    }

    async componentDidMount() {

        if (await AsyncStorage.getItem('loginStatus') == 'true') {
            this.props.UpdateAuthStatus({ loginStatus: 'true' })
        } else {
            this.props.UpdateAuthStatus({ loginStatus: 'false' })

        }


    }

    dialCall = () => {
        try {


            let phone = '045563988';
            let phoneNumber = phone;
            if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:${phone}`;
            }
            else {
                phoneNumber = `tel:${phone}`;
            }
            Linking.canOpenURL(phoneNumber)
                .then(supported => {
                    if (!supported) {
                        Alert.alert('Phone number is not available');
                    } else {
                        return Linking.openURL(phoneNumber);
                    }
                })
                .catch(err => console.log(err));
        } catch (error) {
            Toast.showWithGravity('Service not available', Toast.LONG, Toast.BOTTOM);

        }
    };


    onLogoutPress = async () => {
        let Service = {
            apiUrl: Api.Logout,
            methodType: 'GET',
            headerData: { 'Content-Type': 'application/json' },
            onSuccessCall: this.onSuccessLogout,
            onFailureAPI: this.onFailureAPI,
            onPromiseFailure: this.onPromiseFailure,
            onOffline: this.onOffline,
        };
        this.setState({ loading: true });
        await ServiceCall(Service);
        this.setState({ loading: false });
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Home')
    }
    onSuccessLogout = async (data) => {
        console.log(data)
        if (data.status == true) {
            console.log("-----------------true start");
            this.clearContact();
            await AsyncStorage.setItem('loginStatus', 'false');
            await AsyncStorage.setItem('custGuid', '');
            await AsyncStorage.setItem('custToken', '');
            //Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
            this.props.UpdateAuthStatus({ loginStatus: 'false' });
            console.log("-----------------true end");
        }
        else {
            console.log("-----------------in false");
            // if (data.message != null && data.message.length > 0) {
            //     Toast.showWithGravity(data.message, Toast.LONG, Toast.BOTTOM);
            // }
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


    render() {

        console.log("AuthStatus............", this.props.AuthStatus)

        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', }}>

                            <Image
                                testID={"mobilelogo"}
                                accessibilityLabel="mobilelogo"
                                style={styles.dragonIcon} source={Icons.logo} />


                        </View>


                    </View>
                    <DrawerContentScrollView {...this.props}>
                        <ScrollView>
                            <View>


                                <View style={styles.drawerContent}>

                                    <Drawer.Section style={styles.drawerSection}>
                                        <DrawerItem
                                            icon={({ color, size }) => (
                                                <Image style={styles.rightTopIcon2} source={Icons.HomeIco} />
                                            )}
                                            label="Home"
                                            //onPress={() => { this.props.navigation.navigate('Home') }}
                                            onPress={async () => {
                                                await analytics().logEvent('hamburger_menu', { 'navigate': 'Home' });
                                                AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Home' });
                                                EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Home' });
                                                await this.props.navigation.navigate('HomeStack', { screen: 'Home' })
                                            }}

                                        />
                                        <DrawerItem
                                            testID={"mobileMenuCategory"}
                                            accessibilityLabel="mobileMenuCategory"
                                            icon={({ color, size }) => (
                                                <Image
                                                    testID={"featureCategories"}
                                                    accessibilityLabel="featureCategories"
                                                    style={styles.rightTopIcon2} source={Icons.list} />
                                            )}
                                            label="Category"
                                            onPress={async () => {
                                                analytics().logEvent('hamburger_menu', { 'navigate': 'Category' });
                                                AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Category' });
                                                EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Category' });
                                                this.props.navigation.navigate('Menu')
                                            }}
                                        />
                                        {
                                            this.props.AuthStatus == 'true' ?

                                                <DrawerItem
                                                    testID={"purchases"}
                                                    accessibilityLabel="purchases"
                                                    icon={({ color, size }) => (
                                                        <Image style={styles.rightTopIcon2} source={Icons.cart} />
                                                    )}
                                                    label="My Purchase"
                                                    onPress={async () => {
                                                        if (this.props.AuthStatus == 'true') {
                                                            await analytics().logEvent('hamburger_menu', { 'navigate': 'My Purchase' });
                                                            AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'My Purchase' });
                                                            EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'My Purchase' });
                                                            await this.props.navigation.navigate('Purchases')

                                                        } else {
                                                            this.props.navigation.navigate('SignIn', { passData: { screen: 'Purchases' } })
                                                        }
                                                    }}
                                                />
                                                :

                                                <DrawerItem
                                                    icon={({ color, size }) => (
                                                        <Image style={styles.rightTopIcon2} source={Icons.cart} />)}
                                                    label="My Purchase"
                                                    testID={"mobileWishList"}
                                                    accessibilityLabel="mobileWishList"
                                                    onPress={async () => {


                                                        await analytics().logEvent('hamburger_menu', { 'navigate': 'GuestUser' });
                                                        AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'GuestUser' });
                                                        EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'GuestUser' });
                                                        await this.props.navigation.navigate('GuestUser')

                                                    }
                                                    }
                                                />
                                        }


                                        <DrawerItem
                                            icon={({ color, size }) => (
                                                <Image style={{ ...styles.rightTopIcon2, tintColor: 'none', height: 25, width: 25, margin: -2, }} source={Icons.heart} />
                                            )}
                                            label="My WishList"
                                            testID={"mobileWishList"}
                                            accessibilityLabel="mobileWishList"
                                            onPress={async () => {
                                                await analytics().logEvent('hamburger_menu', { 'navigate': 'My WishList' });
                                                AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'My WishList' });
                                                EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'My WishList' });
                                                await this.props.navigation.navigate('WishListPage')

                                            }}
                                        />






                                        <DrawerItem
                                            icon={({ color, size }) => (
                                                <Image style={styles.rightTopIcon2} source={Icons.user} />
                                            )}
                                            label="My Account"
                                            testID={"myAccountMobile"}
                                            accessibilityLabel="myAccountMobile"
                                            onPress={async () => {
                                                if (this.props.AuthStatus == 'true') {
                                                    await analytics().logEvent('hamburger_menu', { 'navigate': 'My Account' });
                                                    AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'My Account' });
                                                    EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'My Account' });
                                                    await this.props.navigation.navigate('CustomerInfo')

                                                } else { this.props.navigation.navigate('SignIn', { passData: { screen: 'CustomerInfo' } }) }
                                            }}
                                        />

                                        <DrawerItem
                                            icon={({ color, size }) => (
                                                <Image style={styles.rightTopIcon2} source={Icons.addressIco} />
                                            )}
                                            testID="Saved addresses"
                                            accessibilityLabel="Saved addresses"
                                            label="Saved Address"
                                            testID={"savedAddress"}
                                            accessibilityLabel="savedAddress"
                                            onPress={async () => {
                                                if (this.props.AuthStatus == 'true') {
                                                    await analytics().logEvent('hamburger_menu', { 'navigate': 'Saved Address' });
                                                    AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Saved Address' });
                                                    EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Saved Address' });
                                                    await this.props.navigation.navigate('Address')

                                                } else { this.props.navigation.navigate('SignIn', { passData: { screen: 'Address' } }) }
                                            }}
                                        />




                                    </Drawer.Section>



                                </View>

                                <Drawer.Section style={styles.drawerSection}>
                                    <TouchableOpacity onPress={async () => {
                                        try {

                                            await analytics().logEvent('hamburger_menu', { 'navigate': 'Call customer support' });
                                            AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Call customer support' });
                                            EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Call customer support' });
                                            await this.dialCall()
                                        } catch (e) {
                                            Toast.showWithGravity('Service not available', Toast.LONG, Toast.BOTTOM);

                                        }
                                    }}
                                        activeOpacity={0.7} style={styles.listRowContainer} >
                                        <Image style={styles.listRowIcon} source={Icons.phone} />
                                        <Text style={styles.listRowText}>04 5563988</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={async () => {
                                        try {

                                            await analytics().logEvent('hamburger_menu', { 'navigate': 'Email customer support' });
                                            AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Email customer support' });
                                            EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Email customer support' });
                                            await Linking.openURL('mailto:support@msainfotech.in')
                                        } catch (e) {
                                            Toast.showWithGravity('Service not available', Toast.LONG, Toast.BOTTOM);

                                        }

                                    }}
                                        activeOpacity={0.7} style={styles.listRowContainer} >
                                        <Image style={styles.listRowIcon} source={Icons.email} />
                                        <Text style={styles.listRowText}>msamart@support</Text>
                                    </TouchableOpacity>
                                </Drawer.Section>
                            </View>
                        </ScrollView>
                    </DrawerContentScrollView>
                    <Drawer.Section style={{ ...styles.bottomDrawerSection, marginBottom: -7, }}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Image style={styles.rightTopIcon2} source={Icons.helpIcon} />
                            )}
                            label="Help"
                            testID={"helpBtn"}
                            accessibilityLabel="helpBtn"
                            onPress={async () => {
                                await analytics().logEvent('hamburger_menu', { 'navigate': 'Email customer support' });
                                AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Help Menu' });
                                EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Help Menu' });
                                await this.props.navigation.navigate('HelpMenu')

                            }}
                        />
                    </Drawer.Section>
                    {this.props.AuthStatus == 'true' && <Drawer.Section style={{ ...styles.bottomDrawerSection, borderTopWidth: 0, marginBottom: 0, }}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Image style={styles.rightTopIcon2} source={Icons.logout} />
                            )}
                            label="Log Out"
                            testID={"logoutBtn"}
                            accessibilityLabel="logoutBtn"
                            onPress={async () => {
                                await analytics().logEvent('hamburger_menu', { 'navigate': 'Log Out' });
                                AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Logout' });
                                EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Logout' });
                                await this.onLogoutPress()
                            }}

                        />
                    </Drawer.Section>}
                    {this.props.AuthStatus == 'false' && <Drawer.Section style={{ ...styles.bottomDrawerSection, borderTopWidth: 0, marginBottom: 0, }}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Image
                                    testID={"loginBtn"}
                                    accessibilityLabel="loginBtn"
                                    style={styles.rightTopIcon2} source={Icons.logout} />
                            )}
                            label="Log In"
                            testID={"loginMobileBtn"}
                            accessibilityLabel="loginMobileBtn"
                            onPress={async () => {
                                await analytics().logEvent('hamburger_menu', { 'navigate': 'Log In' });
                                AppEventsLogger.logEvent(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Log In' });
                                EmarsysEvents.trackEmarsys(EventTags.HAMBURGER_MENU_NAVIGATION, { 'navigate': 'Log In' });
                                await this.props.navigation.navigate('SignIn', { passData: { screen: 'Home' } })
                                //this.props.navigation.closeDrawer();
                            }}
                        />
                    </Drawer.Section>}
                    <View style={{ margin: 15, marginLeft: 5, flexDirection: 'row', }}>
                        <Text style={{ marginLeft: 20, color: '#696969' }} >Version</Text>
                        <Text style={{ marginLeft: 20, color: '#696969' }}>{DeviceInfo.getVersion()}</Text>
                    </View>
                </SafeAreaView></>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateAuthStatus: (status) => dispatch({ type: 'AUTH_STATUS', paylod: status })
    }
}

const mapStateToProps = (state) => {
    console.log("state............", state)

    let LoginStatus = state.Login_Status
    return {

        AuthStatus: LoginStatus.loginStatus
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

