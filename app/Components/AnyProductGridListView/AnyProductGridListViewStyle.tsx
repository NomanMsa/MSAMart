const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio, Platform} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  listviewContainer: {
    width: width-20,
    alignSelf: 'center',
    borderBottomColor: Colors.SILVER,
    borderBottomWidth: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor:Colors.SILVER,
    paddingTop:8,
    marginTop:30,
  },
  ListTitleText: {
    justifyContent: 'flex-start',
    fontSize: 22,
    fontWeight: "800",
    alignSelf: 'flex-start',
  },
  productRowBox: {
    flexDirection: 'column',
    width: (width-60) / 2,
    margin:10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: Colors.SILVER,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.WHITE,
  },
  PTitle:{
    justifyContent: 'flex-start',
    fontSize: 15,
    fontWeight: '200',
    textAlign:'center',
    color:'gray',
    margin:4
  },
  productImageBox: {
    flex:1,
    alignItems: 'center',
    alignSelf: 'center',
    width: (width-30) / 2,
    height: (width-30) / 2,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:Colors.SILVER,
  },
  productDataBox: {
    flexDirection: 'column',
    padding:10,
    paddingBottom:15,
    height:130,
    //backgroundColor:Colors.AC_BTN_BLUE,
  },
  productImageContainer: {
    flex: 1,
    width: (width-60) / 2,
    height: (width-60) / 2,
	  overflow: 'hidden',
  },
  productImage: {
    flex:1,
    
    overflow: 'hidden',
    resizeMode: 'contain',
    alignSelf:'stretch',
    aspectRatio: 1,
    //maxHeight:200,
    //maxWidth:undefined,
  },
  rightTopIconContainer: {

    position: 'absolute',
    top: 10,
    right: 0,
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 10,
    justifyContent: 'center',
  },
  rightTopIcon: {
    height: 25,
    width: 25,
    resizeMode:'contain',
    alignItems: 'center',
    tintColor:Colors.GRAY
    },
    rightTopIcon2: {
      height: 25,
      width: 25,
      resizeMode:'contain',
      alignItems: 'center',
      tintColor:Colors.PRIMARY
      },
  discountContainer: {
    position: 'absolute',
    // height: 40,
    // width: 40,
    padding: 5,
    backgroundColor: Colors.SECONDAY_COLOR,
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 40,
    justifyContent: 'center',
  },

  discountText: {
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
    flexDirection: 'column',
    alignSelf: 'center',
    fontSize: 10,
    //fontWeight: "800",
  },
  productIconsBox: {
    width: (width-66) / 2,
  },
  titleBox: {
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
  titleText1: {
    fontSize: 14,
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
  titleText2: {
    fontSize: 12,
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
  rateText1: {
    fontSize: 14,
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
    textAlign: 'justify',
  },
  rateText2: {
    fontSize: 14,
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
    textAlign: 'justify',
    lineHeight: 16,
    color: Colors.GRAY_TEXT,
    textDecorationLine: 'line-through',
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop:8,
    marginBottom: 16,
    width: width / 2.5,
    justifyContent: 'space-between',
  },
  leftBottomIconContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    borderRadius: 40,
  },
  leftBottomIcon: {
    height: 55,
    width: 55,
  },
  ratingStar: {
    textAlign: 'center',
  },
  starRatingBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  FlashDealstitleQty:{
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
    color:Colors.PRIMARY,
    fontSize:12,
  },
});
