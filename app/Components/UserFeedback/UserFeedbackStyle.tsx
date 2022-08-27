const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  container: {
    width: width - 30,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  reviewItem: {
    fontSize: 16,
    marginTop: 25,
    textTransform: 'uppercase',
    color: Colors.GRAY_TEXT,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },

  middleRightText: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    justifyContent: 'center',
    textAlign: 'left',
  },
  bottomText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    justifyContent: 'center',
  },

  bottomsText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.GRAY_TEXT,
    justifyContent: 'center',
  },

  readMore: {
    fontSize: 15,
    paddingTop: 10,
  },

  fullWidthContainer: {
    marginTop: 10,
  },
  slideImg: {
    width: 100,
    alignItems: 'center',
    height: 100,
    backgroundColor: 'transparent',
    borderRadius: 5,
    margin: 10,
    marginLeft: 0,
    marginRight: 15,
  },
  fullWidthContainerText: {
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: "800",
    color: Colors.BLACK,
    textAlign: 'justify',
  },
  topLeft: {
    width: width - 30,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    //backgroundColor:Colors.RED,
  },
  bottomRow: {
    width: width - 30,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    //backgroundColor:Colors.RED,
  },
  bottomLeftContainer: {
	paddingTop:10,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width: width,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  StarContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width: width - 30,
    paddingTop: 25,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  bottomLeftText: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.BLACK,
  },

  submitRating: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  ListTitleText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.BLACK,
    paddingTop: 10,
  },
  netPrice: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.PRIMARY,
    paddingLeft: 15,
  },
  discountedPriceText: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.GRAY_TEXT,
    textDecorationLine: 'line-through',
  },
  bottomRightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  TopCenterText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.GRAY_TEXT,
    alignSelf: 'center',
  },
  bottomRightText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.GRAY_TEXT,
    paddingBottom: 20,
    // alignSelf: 'center',
  },
});
