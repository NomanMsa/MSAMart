const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
  listviewContainer: {
    width: width - 70,
    alignSelf: 'center',
    flexDirection: 'row',
    //height:50,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.SILVER,
    paddingTop: 20,
    paddingBottom: 20,
    //backgroundColor:Colors.EMAIL_GREEN,
  },
  leftContainer: {
    width: '30%',
    backgroundColor: Colors.AC_BTN_BLUE,
  },
  imageContainer: {
    //margin:20,
    //width:'100%',
    //height:100,
    padding: 5,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
    alignSelf: 'center',
    alignItems: 'center',
    //backgroundColor:Colors.SILVER,
  },
  imageStyle: {
    width: (width - 30) / 4,
    height: (width - 30) / 4,
    resizeMode: 'contain',
  },
  rightContainer: {
    width: '70%',
    flexDirection: 'column',
    //marginLeft:10,
    //marginRight:10,
    //padding:10,
  },
  txtContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    width: (width / 3) * 1.8,
    //backgroundColor:Colors.PRIMARY,
  },
  productTitleTxt: {
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
    fontSize: 14,
  },
  productStatusTitleTxt: {
    marginTop: 8,
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
    fontSize: 14,
  },
  productStatusTxt: {
    marginTop: 8,
    color: Colors.PRIMARY,
  },
  productStatusTxtBold: {
    marginTop: 8,
    color: Colors.PRIMARY,
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
  amountTxt: {
    marginTop: 8,
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
    fontSize: 16,
    color: Colors.ASH,
  },
  quantityTxt: {
    marginTop: 8,
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
    fontSize: 14,
    color: Colors.GRAY_TEXT,
  },
  RIStyles:{
    color:Colors.PRIMARY,
  },
})