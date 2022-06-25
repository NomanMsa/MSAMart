const React = require('react-native');
const {  Dimensions,  StyleSheet,  PixelRatio} = React;
const {  width,  height} = Dimensions.get('window');
import {  Colors} from '@theme';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE,
  },
  pageContainer: {
    margin: 15,
    alignItems:'center',
    alignSelf:'center',
  },
  lottie: {
    height: 100,
    width: 100,
  },
});