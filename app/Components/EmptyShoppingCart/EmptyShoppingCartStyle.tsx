const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

module.exports = StyleSheet.create({
  listviewContainer: {
    width: width - 30,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    //backgroundColor:Colors.AC_BTN_BLUE,
  },
  ListTitleText: {
    justifyContent: 'flex-start',
    fontSize: 22,
    padding: 15,
    paddingLeft: 0,
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
  titleText1: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 16,
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
  titleText2: {
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 16,
    paddingBottom: 10,
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
  DataContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconStyle: {
    height: 30,
    width: 30,
    margin: 30,
    tintColor: Colors.BLACK,
  },
  titleStyle: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    textAlign: 'center',
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
    fontSize: 18,
  },
  detaiTextStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    textAlign: 'center',
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
  redText: {
    color: Colors.PRIMARY,
    textDecorationLine: 'underline'
  }

});
