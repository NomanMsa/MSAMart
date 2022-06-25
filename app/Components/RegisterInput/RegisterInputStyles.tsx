const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  ValidContainer: {},
  InvalidContainer: {},

  ValidInputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.5,
    alignSelf: 'center',
  },
  InValideInputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.5,
    alignSelf: 'center',
  },
  ValidTitle: {
    color: Colors.GRAY,
  },
  InvalidTitle: {
    color: Colors.PRIMARY_LIGHT_BTN,
  },
  ValidationText: {
    color: Colors.PRIMARY_LIGHT_BTN,
    fontSize: 12,
  },
  SuggestionText: {
    color: Colors.GRAY,
    fontSize: 12,
  },

  ValidInputContainer: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 30,
    margin: 20,
    marginTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InvalidInputContainer: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT_BTN,
    borderRadius: 30,
    margin: 20,
    marginTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ValidAvatar: {
    width: 20,
    height: 20,
  },
  InValidAvatar: {
    width: 20,
    height: 20,
    tintColor: Colors.PRIMARY_LIGHT_BTN,
  },
});
