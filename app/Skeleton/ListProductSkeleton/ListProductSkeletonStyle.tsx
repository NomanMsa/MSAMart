const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  productImageBox: {
    // width: (width - 30) / 2.5,
    flexDirection: 'row',
    width: (width - 30) / 2.5,
    height: (width - 30) / 2.5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  middleContainer: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'space-between',
    width: width / 2,
    //flexDirection: 'row',
  },
  firsLine: {
    width: 120,
    height: 5,
    borderRadius: 4,
  },

  secondLine: {
    marginTop: 6,
    width: 120,
    height: 10,
    borderRadius: 4,
  },
  BottonRightCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: 'flex-end',
    margin: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.5,
  },
  lineContianer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
