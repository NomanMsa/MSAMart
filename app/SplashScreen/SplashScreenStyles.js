const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

export default StyleSheet.create({
  splashImg:{
    resizeMode:'contain',
    width:width,
    height:height,
  },
 
});
