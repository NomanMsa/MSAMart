const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from "@theme";
module.exports = StyleSheet.create({
	FlashDealsTimer:{
		color: Colors.black,
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
		textAlign:'left',
	},
	CounterContainer:{
		//width:115,
		alignSelf:'center',
		alignItems:'flex-start',
		backgroundColor: Colors.WHITE,
		borderRadius:5,
		marginRight:0,
		padding:8,
		paddingLeft:2,
		paddingRight:2,
	},
})