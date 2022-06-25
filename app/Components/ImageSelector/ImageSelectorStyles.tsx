const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 selectContainer: {
	marginLeft:15,
	marginRight:15,
	width:width -30,
	paddingBottom:15,
	borderBottomColor:Colors.SILVER,
	borderBottomWidth: StyleSheet.hairlineWidth,
  },
 selectBox: {
	flexDirection:'column',
  },
 colorBlock: {
	alignItems:'center',
	alignSelf:'center',
	justifyContent:'center',
	width:(width/5)-10,
	height:((width/5)-10)*2/3,
	marginRight:10,
	borderColor:Colors.SILVER,
	borderWidth: StyleSheet.hairlineWidth,
  },
 colorTitle:{
	fontSize:14,
	//margin:5,
	marginTop:5,
	fontWeight:'normal',
	alignSelf:'center',
	alignItems:'center',
	color: Colors.DARK_GRAY_TEXT,
	textShadowColor: Colors.LIGHT_GRAY,
	textShadowOffset: {width: 0, height: 1},
	textShadowRadius: 2,
	letterSpacing: 0,
 },
 mainTitleStyle:{
	fontSize:16,
	margin:5,
	marginLeft:0,
	marginBottom:10,
	fontWeight:'normal',
	alignSelf:'flex-start',
	alignItems:'flex-start',
	color: Colors.GRAY_TEXT,
	textShadowColor: Colors.LIGHT_GRAY,
	textShadowOffset: {width: 0, height: 1},
	textShadowRadius: 2,
	letterSpacing: 0,
 },
 selColTitle:{
	color: Colors.DARK_GRAY_TEXT,
 },
 colorSelectedIcon:{
	height:20,
	width:20,
	resizeMode:'contain',
	alignItems:'center',
	alignSelf:'center',
	tintColor:Colors.WHITE,
 },
})