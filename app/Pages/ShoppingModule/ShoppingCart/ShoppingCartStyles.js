const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

const absoluteStretch = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};


export default StyleSheet.create({
    listviewContainer: {
        width: width - 30,
        alignSelf: 'center',
    },
    modelcontainer: {
        flex: 1,
        flexDirection: 'row',
        width: width,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        //alignSelf: 'center'
    },
    pageStyles: {
        backgroundColor: Colors.WHITE,
        //alignSelf: 'center'
    },

    totalPrizeContainer: {
        borderTopWidth: 2,
        borderTopColor: Colors.DARK_GRAY_COLOR,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 30,
    },
    titleText: {
        fontSize: 20,
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
    titleTextContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.DARK_GRAY_COLOR,
        padding: 20,
    },
    HeaderText: {
        justifyContent: 'flex-start',
        fontSize: 20,
        //alignSelf: 'flex-start',
        textAlign:'center',
        ...Platform.select({
            ios: {
                fontWeight: '800',
                fontFamily: 'verdana',
            },
            android: {
                fontWeight: 'bold',
                fontFamily: 'verdanab',
            },
        }),
    },
    ListTitleText: {
        justifyContent: 'flex-start',
        fontSize: 22,
        padding: 25,
        alignSelf: 'flex-start',
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
    rateText3: {
        fontSize: 12,
        //textAlign: 'justify',
        lineHeight: 16,
        color: Colors.GRAY_TEXT,
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
    SpredCrumbcontainer: {
        flexDirection: 'row',
        height: 60,
        borderWidth: 0,

        backgroundColor: Colors.WHITE,
        shadowColor: Colors.LIGHT_GRAY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 15,
    },
    rateText1: {
        fontSize: 13,
        textAlign: 'justify',
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
    lottie: {
        height: 100,
        width: 100,
    },
    prizeText: {
        fontSize: 19,
        textAlign: 'justify',
        
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
        marginLeft: 10,
        width: width - 70
    },
    IcoContainer: {
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    FlashDealsIcon: {
        width: 30,
        height: 30,
    },
    PTitle:{
    
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0069d1',
        textAlign:'center',
        fontFamily: 'verdana',
        
      },
});
