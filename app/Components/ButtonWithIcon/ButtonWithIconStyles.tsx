const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

module.exports = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  imageAvtar: {
    height: 20,
    width: 20,
    margin: 5,
  },
  SeCondaryTitleViewStyle: {

  },
  mainTitleStyle: {
    fontSize: 13,
    margin: 5,
    marginLeft: 0,
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
    alignItems: 'center',
    alignSelf: 'center',
  },
  SeCondaryTitleStyle: {
    fontSize: 13,
    margin: 5,
    marginLeft: 0,
    fontWeight: "400",
    alignItems: 'center',
    alignSelf: 'center',
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
  menuTextStyle: {
    fontSize: 12,
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
});
