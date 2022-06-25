const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';
var titleSize = 16

export default StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.WHITE,
        paddingTop: 20,
        paddingBottom: 20,
    },
    superStyles: {
        fontSize: titleSize,
    },
    titleStyle: {
        fontSize: 14
    },
    FlashDealstitle: {
        fontSize: 10,
        ...Platform.select({
            ios: {
                fontWeight: '800',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdanab',
            },
        }),
        color: Colors.DARK_GRAY_TEXT,
        // textTransform: 'uppercase',
        //width: width / 2.7,
    },
    MainTitleContainer: {
        // padding: 5,
        // paddingLeft: 5,
        paddingTop: 5,
        paddingRight: 5,
        // alignItems: 'center',
        // alignSelf: 'flex-start',
        flexDirection: 'row', justifyContent: 'space-between'
    },
    renderError: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    pageContainer: { backgroundColor: Colors.WHITE, height: height },
    headerContainer: {
        backgroundColor: Colors.PRIMARY,
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    headerText: {
        padding: 10,
        fontSize: 17,
        color: 'white',
        ...Platform.select({
            ios: {
                fontWeight: '800',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdanab',
            },
        }),
    },
    backAvatar: {
        tintColor: Colors.WHITE,
        width: 25,
        height: 25,
    },
    loginHeaderTextContainer: {
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    errorText: {
        //marginTop: 8,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        color: Colors.PRIMARY,
        ...Platform.select({
            // android: {
            //     paddingLeft: 6,

            // },
        }),
    },
    errorText1: {
        //marginTop: 8,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        color: Colors.PRIMARY,
        ...Platform.select({
            android: {
                paddingLeft: 30,
            },
            ios: {
                paddingLeft: 30,
            },
        }),
    },
    discountInformation: {
        fontSize: 16,
        ...Platform.select({
            ios: {
                fontWeight: '400',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdana',
            },
        }),
        fontWeight: 'bold',
        margin: 10,
        padding: 10,
        flex: 1,
        color: Colors.PRIMARY,
        justifyContent: 'center',
    },
    inputTitleStyle: {
        margin: 20,
        marginLeft: 35,
        marginBottom: -5,
        fontSize: 14,
        color: Colors.GRAY_TEXT,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        ...Platform.select({
            ios: {
                fontWeight: '400',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdana',
            },
        }),
    },
    title: {
        margin: 20,
        marginTop: 10,
        marginBottom: -5,
        fontSize: 14,
        color: Colors.GRAY_TEXT,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        ...Platform.select({
            ios: {
                fontWeight: '400',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdana',
            },
        }),
    },

    guideText: {
        //marginTop: 8,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        color: Colors.PRIMARY,
        ...Platform.select({
            android: {
                paddingLeft: 6,
            },
        }),
    },

    withBorderCont: {
        borderWidth: 1,
        borderColor: Colors.BLACK,
        borderRadius: 30,
        flexDirection: 'row',
        marginTop: 10,
    },

    inputContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    textInput: {
        flex: 5,
        color: Colors.DARK_GRAY_TEXT,
        ...Platform.select({
            ios: {
                fontWeight: '400',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdana',
            },
        }),
        fontSize: 14,
        ...Platform.select({
            ios: {
                padding: 16,
            },
            android: {
                paddingLeft: 6,
            },
        }),
    },
    headerText: {
        fontSize: 20,
        color: Colors.WHITE,
        ...Platform.select({
            ios: {
                fontWeight: '800',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdanab',
            },
        }),
    },
    guest_user_container: {
        marginTop: 10,
        width: width - 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:Colors.MORE_ORANGE,
    },
    inputStyle: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    forgot_password_text: {
        marginTop: 40,
    },
    forgot_password_text_style: {
        color: Colors.PRIMARY,
        ...Platform.select({
            ios: {
                fontWeight: '400',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdana',
            },
        }),
        fontSize: 14,
    },
    regLinkCont: {
        flexDirection: 'row',
        height: 100,
        marginTop: 30,
    },
    regTxt1: {
        color: Colors.DARK_GRAY,
        ...Platform.select({
            ios: {
                fontWeight: '400',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdana',
            },
        }),
        fontSize: 14,
    },
    regTxt2: {
        marginLeft: 5,
        color: Colors.PRIMARY,
        ...Platform.select({
            ios: {
                fontWeight: '400',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'normal',
                fontFamily: 'verdana',
            },
        }),
        fontSize: 14,
    },
    lottie: {
        height: 100,
        width: 100,
    },
});
