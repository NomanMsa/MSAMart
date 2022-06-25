const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  productImageBox: {
    //width: (width - 30) / 2.5,
    width: width / 2.27,
    height: width / 2.27,
    alignItems: 'center',
    alignSelf: 'center',
  },
  middleContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  firsLine: {
    width: 120,
    height: 5,
    borderRadius: 4,
  },

  secondLine: {
    marginTop: 6,
    width: 120,
    height: 5,
    borderRadius: 4,
  },
  BottonRightCircle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'flex-end',
    margin: 15,
  },
});
