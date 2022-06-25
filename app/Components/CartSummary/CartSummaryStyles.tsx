const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';
import colors from '../../Theme/Colors';

module.exports = StyleSheet.create({
  container: {
    width: width - 30,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.DARK_GRAY_COLOR,
    borderRadius: 10,

    padding: 30,
  },
  ValueList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  addressContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  CoupenListContainer: {
    flexDirection: 'row',
    width: width - 120,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  boldGrayText: {
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
    color: Colors.DARK_GRAY_COLOR,
  },
  paymentIcons: {
    width: 55,
    height: 20,
    marginLeft: 40,
    justifyContent: 'space-between',
    flex: 1,
  },
  CoupenCancelIcons: {
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  CoupenCancelContainer: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Colors.LIGHT_GRAY_COLOR_UPLOAD,
  },

  simpleGrayText: {
    color: Colors.DARK_GRAY_COLOR,
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

  giftCartContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.DARK_GRAY_COLOR,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
    padding: 7,
  },

  giftCartResponceContainer: {
    borderWidth: 1,
    borderColor: Colors.COUPEN_GREEN,
    backgroundColor: Colors.MSG_GREEN,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    alignContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 7,
  },

  cgiftCartResponceText: {
    alignSelf: 'center',
    color: Colors.COUPEN_GREEN
  },


  deliveryContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,

    marginTop: 15,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomColor: Colors.DARK_GRAY_COLOR,
  },
  colomViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },

  titleContainer: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
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

  boldText: {
    fontSize: 15,
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
    width: 170,
    alignItems: 'flex-end',
    textAlign: 'justify',
    paddingBottom: 40,
  },

  NormalText: {
    fontSize: 13,
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
    alignItems: 'flex-end',
    textAlign: 'justify',
    paddingBottom: 40,
  },
});
