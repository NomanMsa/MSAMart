const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio, Platform} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  listviewContainer: {
    width: width - 30,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    //backgroundColor:Colors.AC_BTN_BLUE,
  },
  productRowBox: {
    // flexDirection: 'row',
    width: width-30 ,
    marginTop: 25,
    marginBottom: 4,
    borderRadius: 5,
    borderBottomColor: Colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
   
  },
 
  productImageBox: {
    //width: (width - 30) / 2.5,
    width: width / 4,
    height: width / 4,
    alignItems: 'center',
    alignSelf: 'center',
    //borderWidth: 1,
    borderRadius: 5,
    //margin: 30,
    //backgroundColor:Colors.EMAIL_GREEN,
  },
 
  productDataBox: {
flex:1,
    flexDirection: 'column',
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
    //backgroundColor: Colors.MORE_ORANGE,
  },
  productImageContainer: {
    
    resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    borderRadius: 5,
  },
  productImage: {
    resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    borderRadius: 5,
  },
  rightTopIconContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  rightTopIcon: {
    height: 25,
    width: 25,
    alignItems: 'center',
  },
  discountContainer: {
    height: 40,
    width: 40,
    backgroundColor: Colors.SECONDAY_COLOR,
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 40,
    justifyContent: 'center',
  },

  discountText: {
    flexDirection: 'column',
    alignSelf: 'center',
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
  },
  productIconsBox: {
    // width: (width - 30) / 2.5,
    width: width / 2.5,
  },
  titleBox: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    // width: width - ((width - 30) / 2.5 + 46),
    width: width / 1.8,
  },
  titleText1: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 16,
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
    fontSize: 11,
    textAlign: 'justify',
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
  rateBox: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    // width: width - ((width - 30) / 2.5 + 46),
    width: width / 2.5,
    //backgroundColor:Colors.MORE_ORANGE,
  },
  rateText1: {
    fontSize: 12,
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
  estimatedDeliveryText: {
    fontSize: 12,
    color: Colors.GRAY_TEXT,
		...Platform.select({
			ios: {
				fontWeight: '800',
				fontFamily: 'verdana',
			},
			android: {
				fontWeight: 'normal',
				fontFamily: 'verdana',
			},
		}),
  },
  prizeText:{
    fontSize: 14,
    textAlign: 'justify',
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

  ButtonText1: {
    fontSize: 13,
    color: Colors.DARK_GRAY_COLOR,
    textAlign: 'justify',
    paddingTop: 20,
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
  ButtonText11: {
    fontSize: 13,
    color: Colors.PRIMARY,
    textAlign: 'justify',
    paddingTop: 20,
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

  rateText2: {
    fontSize: 12,
    color: Colors.GRAY_TEXT,
    textDecorationLine: 'line-through',
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
  rateText3: {
    fontSize: 12,
    //textAlign: 'justify',
    lineHeight: 16,
    color: Colors.GRAY_TEXT,
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
  prizeText1: {
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
    alignSelf: 'flex-start',
    padding: 2,
    color: Colors.BG_OVERLAY,
  },
  BottonContentContainer: {
    flexDirection: 'row',
    width: width - ((width - 30) / 2.5 + 46),
    alignItems: 'flex-start',
    padding: -2,
    flex: 10,
  },
  bottomRow: {
    // flexDirection: 'row',
    //margin:3,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    // width: width - ((width - 30) / 2.5 + 46),
    width: width / 2.5,
    justifyContent: 'space-between',
    //backgroundColor:Colors.MORE_ORANGE,
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
  ViewCenter: {
   // justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width:width/1.6,
    marginBottom:10,
   // marginTop: -20,
    alignItems: 'center',
    alignContent: 'center',
  },
  PriceQuentityCenter: {
    // justifyContent: 'center',
     //alignItems: 'center',
     flexDirection: 'row',
     justifyContent: 'space-between',
     flex: 1,
     width:width/1.6,
    // marginBottom:10,
    // marginTop: -30,
     alignItems: 'center',
     alignContent: 'center',
    //  backgroundColor: 'red',
   },

  realTimer: {
    //borderWidth: 1,
    backgroundColor: Colors.SECONDAY_COLOR,
    borderRadius: 15,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    width: width/1.6,
    marginBottom: 10,
    marginTop: 10,
  },
  deliveryDateStyle: {
    textAlign: 'justify',
    marginBottom: 12,
    width: width / 1.8,
  },

  ItemQuentity: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    width: 100,
    padding: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  ListTitleText: {
    justifyContent: 'flex-start',
    fontSize: 22,
    padding: 15,
    paddingLeft: 0,
    alignSelf: 'flex-start',
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
});
