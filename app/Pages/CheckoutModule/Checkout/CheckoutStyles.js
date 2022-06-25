const React = require('react-native');
const {
  Dimensions,
  StyleSheet,
  PixelRatio,
  Platform,
} = React;
const {
  width,
  height
} = Dimensions.get('window');
import {
  Colors
} from '@theme';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE,
    paddingTop: 20,
    paddingBottom: 40,
    height: height - 125,
  },
  container: {
    marginBottom: 140,
  },
  lottie: {
    height: 100,
    width: 100,
  },
  invalidAddTxt: {
    fontSize: 16,
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
    marginTop: 20,
    marginBottom: -10,
    alignItems: 'center',
    alignSelf: 'center',
    //marginLeft:25,
  },
  outerBottomBox: {
    //position:'absolute',
    //height:undefined,
    //width:width,
    //bottom:0,
  },
  animatedBox1: {
    position: 'absolute',
    bottom: 0,
  },
  animatedBox: {
    position: 'absolute',
    height: undefined,
    width: width,
    bottom: 0,
    marginTop: 20,
    width: width,
    height: 120,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  bottomContainer: {
    flexDirection: 'column',
    padding: 10,
    paddingLeft:15,
    paddingRight:15,
  },
  bottomTitleContainer: {
    marginLeft:15,
    marginRight:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    //position:'absolute',
    bottom: 10,
    //alignSelf:'flex-end',
  },
  bottomTitleTxt: {
    fontSize: 20,
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
  upArrowCont: {
    //height:30,
    //width:30,
    //backgroundColor:Colors.PRIMARY,
    //marginRight:10,
    padding: 10,
  },
  upArrowIco: {
    //alignSelf:'flex-end',
    //alignItems:'flex-end',
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  addAddBtnStyle: {
    flexDirection: 'row',
    height: 50,
    borderColor: Colors.GRAY_TEXT,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    borderRadius: 5,
    width: width - 70,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE
  },
  addNewAddTxt: {
    marginLeft: 15,
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
    alignItems: 'flex-start',
  },
  addAddIco: {
    marginLeft: 10,
    tintColor: Colors.BLACK,
    height: 30,
    width: 30,
  },
  chkBoxCircle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderColor: Colors.DARK_GRAY_TEXT,
    borderWidth: 1,
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  shipAddrChk: {
    margin: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shipAddrChkTxtStyle: {
    fontSize: 18,
    marginLeft: 10,
    color: Colors.DARK_GRAY_TEXT,
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
  chkTick:{
    backgroundColor:Colors.PRIMARY,
    height: 20,
    width: 20,
    borderRadius: 20,
    //borderColor: Colors.DARK_GRAY_TEXT,
    //borderWidth: 1,
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center',
    tintColor:Colors.PRIMARY,
  },
  scrollContainer:{
    //alignItems:'center',
    alignSelf:'center',
    width:width-60,
    height:(height/2)-120,
    //backgroundColor:Colors.PRIMARY,
  },
  scrollDetails:{
    width:width,
    height:(height/2)-120,
    alignSelf:'center',
  },
});