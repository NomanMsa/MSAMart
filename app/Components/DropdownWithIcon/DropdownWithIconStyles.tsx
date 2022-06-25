const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 selectContainer: {
	marginLeft:15,
	marginRight:15,
	width:width -30,
	//paddingBottom:15,
	borderBottomColor:Colors.SILVER,
	//borderBottomWidth: StyleSheet.hairlineWidth,
  },
//   pickerStyle:{
// 	width:width-30,
// 	justifyContent: 'center',
//   },
 selectBox: {
	flexDirection:'row',
	//marginTop:15,
	width:width -30,
	height:50,
	borderRadius:50,
	borderColor:Colors.DARK_GRAY_TEXT,
	borderWidth:1,
	justifyContent:'space-between',
	alignContent: 'center',
	alignItems: 'center',
  },
 mainTitleStyle:{
	fontSize:15,
	height:40,
	margin:5,
	marginLeft:0,
	fontWeight:'normal',
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
	alignItems:'center',
	alignSelf:'center',
	color: Colors.DARK_GRAY_TEXT,
	textShadowColor: Colors.SILVER,
 },
 selColTitle:{
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
	color: Colors.DARK_GRAY_TEXT,
 },
 plusMinusIcon:{
	margin:10,
	alignItems:'center',
	alignSelf:'center',
	tintColor:Colors.DARK_GRAY_TEXT,
 },
 titleText:{
	margin:5,
	marginLeft:30,
	marginTop:10,
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
	color:Colors.GRAY_TEXT,
 },
 InStockText:{
	margin:5,
	marginLeft:30,
	marginTop:15,
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
 },

//  pickerStyle:{
//     width:((width/12)*5) - 6,
//   },
  pickerStyle:{
	width:width-30,
	justifyContent: 'center',
  },
  ddLabelStyle:{
    marginLeft:8, 
    fontSize:14, 
    color:Colors.GRAY_TEXT, 
    alignItems:'center', 
    alignSelf:'center', 
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
  dropdownContainerIos:{

    width:'100%',
    height:50,
    //width: width-60,
    alignSelf:'flex-start',
    alignItems:'flex-start',
    borderWidth:1,
    borderColor:Colors.BLACK,
    borderRadius:30,
    flexDirection: 'row',
    justifyContent:'center',
    marginTop:10,
    paddingTop:10,
  },
  dropdownContainer:{
    width:'100%',
    height:50,
   // width: width-60,
    alignSelf:'center',
    borderWidth:1,
    borderColor:Colors.BLACK,
    borderRadius:30,
    flexDirection: 'row',
    justifyContent:'center',
    marginTop:10,
  },
  dropdownContainerInner:{
    height:50,
    marginLeft:0,
    width: width-90,
    alignSelf:'center',
    //borderWidth:1,
    //borderColor:Colors.BLACK,
    //borderRadius:30,
    flexDirection: 'row',
    //marginTop:10,
  },
})