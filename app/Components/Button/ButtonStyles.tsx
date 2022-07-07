const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 selectContainer: {
	marginLeft:15,
	marginRight:15,
	width:width -30,
	flexDirection:'row',
	marginTop:15,
	height:50,
	borderRadius:50,
	borderColor:Colors.DARK_GRAY_TEXT,
	borderWidth:1,
	justifyContent:'center',
	backgroundColor:Colors.PRIMARY,
	marginBottom:15,
	},
 mainTitleStyle:{
	fontSize:14,
	margin:5,
	marginLeft:0,
	fontWeight:'normal',
	alignItems:'center',
	alignSelf:'center',
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
	textTransform: 'uppercase',
	color:Colors.WHITE,
	//textShadowColor: Colors.SILVER,
 },
 selColTitle:{
	color: Colors.DARK_GRAY_TEXT,
 },
 plusMinusIcon:{
	margin:20,
	alignItems:'center',
	alignSelf:'center',
	tintColor:Colors.DARK_GRAY_TEXT,
 },
 uploadIcon:{
	 position:'absolute',
	 right:10,
	 width:26,
	 height:18,
	 top:9
 }
})