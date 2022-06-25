import { Dimensions, StyleSheet, PixelRatio, Platform } from 'react-native';
import { Colors } from "@theme";
const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  offlineContainer: {
    backgroundColor: Colors.PRIMARY,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    //position: 'absolute',
    //top: 30
  },
  offlineText: { 
    color: '#fff',
  ...Platform.select({
    ios: {
    fontWeight: '400',
    fontFamily: 'verdana',
    },
    android: {
    fontWeight: 'normal',
    fontFamily: 'verdana',
    },
  }),}
});