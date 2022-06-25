const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 menuStyle:{
	marginTop:20,
	marginBottom:20,
	margin:10, 
 },
 listItemContainer:{
	marginLeft:5,
	marginRight:5,
	flexDirection:'column',
	alignItems:'flex-end',
	alignSelf:'flex-end',
 },
 itemTitleContainerStyle:{
	marginRight:5,
	paddingLeft: 2,
	paddingRight: 2,
	borderRadius:10,
	backgroundColor:Colors.MORE_ORANGE,
 },
 menuTitleTextStyle:{
	fontSize:12,
	marginLeft:5, 
	marginRight:5, 
	fontWeight:'bold',
	color: Colors.BLACK,
	letterSpacing: 0,
 },
 menuTextStyle:{
	fontSize:14,
	fontWeight:'normal',
	color: Colors.DARK_GRAY_TEXT,
	textShadowColor: Colors.LIGHT_GRAY,
	textShadowOffset: {width: -1, height: 1},
	textShadowRadius: 3,
	letterSpacing: 0,
 },
})