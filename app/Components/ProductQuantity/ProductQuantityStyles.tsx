const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

module.exports = StyleSheet.create({
  searchContainer: {
    width: width,
    backgroundColor: Colors.PRIMARY,
  },
  searchInputContainer: {
    margin: 15,
    borderRadius: 50,
    //color:Colors.WHITE,
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    marginBottom: 0,
    borderColor: Colors.DARK_GRAY_TEXT,
    borderWidth: StyleSheet.hairlineWidth,
  },
  inputStyle: {
    //marginLeft: 20,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    color: Colors.DARK_GRAY_TEXT,
    flex: 10,
  },
  listColIcon: {
    height: 40,
    width: 40,
    marginTop: 0,
    alignItems: 'center',
    alignSelf: 'center',
    tintColor: Colors.BLACK,
    //backgroundColor: Colors.PRIMARY,
  },
  searchLeftComponent: {
    width: 85,
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 50,
    //backgroundColor: Colors.MORE_ORANGE,
    justifyContent: 'center',
  },



  redText: {
    color: Colors.PRIMARY,
    fontSize: 11,
    marginLeft: 5,
    alignSelf: 'center',
    // marginTop: -10,
    marginBottom: 10,
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
  redMark: {
    color: Colors.PRIMARY,
    fontSize: 13,
    marginLeft: 5,
    alignSelf: 'center',
    // marginTop: -10,
    //marginBottom: 10,
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
  btnCircle: {
    height: 38,
    width: 25,
    //	borderRadius:20,
    //backgroundColor:Colors.SECONDAY_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    //margin:5,
  },
  OperatorText: {
    marginTop: -2,
    fontSize: 17,
  },

  searchInputs: {
    height: 40,
    width: 40,
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 10,
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
  ItemQuentity: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    width: 100,
    //padding: 15,
    height: 40,
  },
  ItemQuentityRed: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    width: 100,
    height: 40,
    //padding: 15,
    //marginTop: 10,
    //marginBottom: 15,
    borderColor: Colors.PRIMARY,
  },
});
