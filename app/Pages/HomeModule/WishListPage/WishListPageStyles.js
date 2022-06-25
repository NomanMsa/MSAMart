const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
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
        fontWeight: 'bold'
    },
    titleTextContainer: {
        //borderBottomWidth: 1,
        borderColor: Colors.DARK_GRAY_COLOR,
        padding: 20,
        paddingBottom: 0,
    },
    HeaderText: {
        justifyContent: 'flex-start',
        fontSize: 20,
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
    ListTitleText: {
        justifyContent: 'flex-start',
        fontSize: 22,
        padding: 25,
        fontWeight: "800",
        alignSelf: 'flex-start',
    },
    lottie: {
        height: 100,
        width: 100,
    },



});
