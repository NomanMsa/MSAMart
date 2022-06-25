const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
  listviewContainer: {
    width: width - 30,
    alignSelf: 'center',
    borderBottomColor: Colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.SILVER,
    paddingTop: 8,
    marginTop: 30,
  },
  productRowBox: {
    flexDirection: 'row',
    width: width - 30,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: Colors.SILVER,
    borderWidth: StyleSheet.hairlineWidth,
  },
  productImageBox: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  productDataBox: {
    //height:100,
    justifyContent: 'space-between',
    flexDirection: 'column',
    //padding:10,
    //borderWidth: StyleSheet.hairlineWidth,
    //borderColor: Colors.SILVER,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: Colors.SILVER,
    width: width - (((width - 30) / 2.5) + 30),
    padding: 10,
    //backgroundColor:Colors.MORE_ORANGE,
  },
  productImageContainer: {
    flex: 1,
    width: (width - 30) / 2.5,
    height: (width - 30) / 2.5,
    overflow: 'hidden',
  },
  productImage: {
    flex: 1,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  rightTopIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  //  rightTopIcon: {
  // 	height:25,
  // 	width:25,
  // 	resizeMode:'contain',
  // 	alignItems:'center',
  //   },
  discountContainer: {
    position: 'absolute',
    // height:40,
    // width:40,
    padding: 5,
    backgroundColor: Colors.MORE_ORANGE,
    alignSelf: 'flex-start',
    margin: 2,
    borderRadius: 40,
    justifyContent: 'center',
  },
  discountText: {
    flexDirection: 'column',
    alignSelf: 'center',
    fontSize: 10,
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
    width: (width - 30) / 2.5,
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
    margin: 5,
  },
  titleText1: {
    fontSize: 12,
    fontWeight: 'normal',
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
    lineHeight: 16,
  },
  titleText2: {
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
    lineHeight: 16,
  },
  rateBox: {
    //marginLeft:8,
    //marginRight:8,
    //marginTop:4,
    margin: 5,
    //width: width - (((width - 30)/2.5) + 46),
    //backgroundColor:Colors.MORE_ORANGE,
  },
  rateText1: {
    fontSize: 16,
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
    lineHeight: 16,
    color: Colors.GRAY_TEXT,
    textDecorationLine: 'line-through',
  },
  bottomRow: {
    flexDirection: 'row',
    //margin:3,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    width: width - (((width - 30) / 2.5) + 46),
    justifyContent: 'space-between',
  },
  leftBottomIconContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  },
  leftBottomIcon: {
    height: 45,
    width: 45,
  },
  ratingStar: {
    textAlign: 'center',
  },
  starRatingBox: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  rightTopIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignItems: 'center',
    tintColor: Colors.GRAY
  },
  rightTopIcon2: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignItems: 'center',
    tintColor: Colors.PRIMARY
  },
  FlashDealstitleQty: {
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
    color: Colors.PRIMARY,
    fontSize: 12,
  },
})