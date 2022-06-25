import {StyleSheet, Dimensions, Platform} from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE,
    //paddingTop:20,
    paddingBottom:20,
  },
  WebContainer: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  lottie:{
    height:100,
    width:100,
  },
  thankyouCard:{
    alignItems:'center',
    margin:15,
    padding:15,
    flexDirection:'column',
    backgroundColor:Colors.WHITE,
    borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  thankyouHeader:{
    margin:15,
    alignItems:'flex-start',
    alignSelf:'flex-start',
  },
  thankyouHeaderText:{
    alignItems:'flex-start',
    alignSelf:'flex-start',
    fontSize:24,
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
  confirmationText:{
    marginTop:10,
    marginBottom:10,
    alignItems:'flex-start',
    alignSelf:'flex-start',
    fontSize:18,
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
  confirmationEmailText:{
    marginTop:10,
    marginBottom:20,
    alignItems:'flex-start',
    alignSelf:'flex-start',
    fontSize:14,
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
  emailText:{
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
  cardContainer:{
    width:width-90,
    marginTop:10,
    marginBottom:10,
    paddingTop:15,
    paddingBottom:15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.GRAY_TEXT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.GRAY_TEXT,
  },
  cardBox:{
    width:width-90,
    alignItems:'flex-start',
    alignSelf:'flex-start',
    padding:15,
    marginTop:5,
    marginBottom:5,
    flexDirection:'column',
    backgroundColor:Colors.WHITE,
    borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  headerTxt:{
    marginTop:10,
    marginBottom:10,
    fontSize:18,
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
  titleTxt:{
    marginTop:4,
    marginBottom:4,
    fontSize:14,
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
  primaryTxt:{
    color: Colors.PRIMARY,
  },
  descTxt:{
    marginTop:4,
    marginBottom:4,
    fontSize:14,
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
  amtTxt:{
    marginTop:4,
    marginBottom:4,
    alignSelf:'flex-end',
    alignItems:'flex-end',
    textAlign: 'right',
    fontSize:18,
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
  amountRow:{
    width: width-120,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  ordItmsViewTxt:{
    alignSelf:'center',
    alignItems:'center',
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
    color:Colors.PRIMARY,
    textDecorationLine: 'underline',
  },
  nextShareContainer:{
    margin:15,
    padding:15,
    flexDirection:'column',
    backgroundColor:Colors.WHITE,
    borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  whtNxtCont:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  whtNxtBox:{
    flexDirection:'column',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  imageStyle:{
    width:(width-200)/3,
    height:(width-200)/3,
    resizeMode:'contain',
    tintColor:Colors.PRIMARY,
  },
  shpStyles:{
    fontSize:14,
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
    color: Colors.PRIMARY,
  },
  ddContainer:{
    padding:15,
    //width:(width-30)/2,
    backgroundColor:Colors.WHITE,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  dropdownContainer:{
    //margin:10,
    alignItems:'center',
    alignSelf:'center',
    height:50,
    borderWidth:1,
    padding:0,
    borderColor:Colors.BLACK,
    borderRadius:30,
  },
  ddHeaderContainer:{
    width:width,
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center',
    flexDirection:'row',
  },
  dropdownContainerInner:{
    height:50,
    marginLeft:0,
    width: (width/2)-20,
    alignSelf:'center',
    flexDirection: 'row',
  },
  dropdownContainerIos:{
    height:50,
    width: (width/2)-20,
    alignSelf:'flex-start',
    alignItems:'flex-start',
    borderWidth:1,
    borderColor:Colors.BLACK,
    borderRadius:30,
    flexDirection: 'row',
    marginTop:10,
  },
});
