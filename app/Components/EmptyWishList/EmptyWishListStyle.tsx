const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';
import { Title } from 'react-native-paper';

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

  dataContianer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignItems: 'center',
    margin: 30
  },

  titleTextStyle: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
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
    fontSize: 16,
  }

});
