const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from "@theme";
module.exports = StyleSheet.create({
	TitleContainer:{
		margin:15,
		marginTop:20,
		flexDirection:'row',
		alignItems:'center',
		alignSelf:'flex-start',
	},
	ImageContainer:{
	},
	homeIco:{
		height:30,
		width:30,
	},
	TitleTextContainer:{
		marginLeft:15,
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
	},
	TitleText:{
		marginLeft:18,
		fontSize:15,
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
		textTransform:'uppercase',
	},
})