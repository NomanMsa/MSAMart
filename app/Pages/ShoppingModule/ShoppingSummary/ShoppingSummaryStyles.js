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

    mainContainer: {
        width: width - 30,
        alignSelf: 'center',
        backgroundColor: Colors.WHITE,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "800",
        paddingTop: 15,
    },
    NormalText: {
        fontSize: 12,
        paddingTop: 20,
        paddingBottom: 20,
    },
    titleTextContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.DARK_GRAY_COLOR,
        padding: 20,
    },
    HeaderText: {
        justifyContent: 'flex-start',
        fontSize: 25,
        fontWeight: "800",
        alignSelf: 'flex-start',
    },
    ListTitleText: {
        justifyContent: 'flex-start',
        fontSize: 22,
        padding: 25,
        fontWeight: "800",
        alignSelf: 'flex-start',
    }


});
