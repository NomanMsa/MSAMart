const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
var titleSize = 16
if(width <= 321){titleSize = 10}
if(width > 321 && width <= 400){titleSize = 14}
else if(width > 400){titleSize = 16}
import { Colors } from "@theme";
module.exports = StyleSheet.create({
	FlashDealsSection: {
		backgroundColor: Colors.SECONDAY_COLOR,
		width: width - 30,
		margin: 15,
		borderWidth: 0,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		padding: 10,
		paddingRight: 3,
		paddingLeft: 3,
		//flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 0,
		justifyContent:'space-between',
	},
	IcoContainer: {
		alignItems: 'center',
		alignSelf: 'center',
	},
	FlashDealsIcon: {
		width: 20,
		height: 20,
	},
	MainTitleContainer: {
		padding: 5,
		paddingLeft: 5,
		paddingRight: 5,
		alignItems: 'center',
		alignSelf: 'flex-start',
	},
	FlashDealstitle: {
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
		color: Colors.black,
		textTransform: 'uppercase',
		//width: width / 2.7,
	},
	FlashDealstitle1: {
		fontSize: titleSize,
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
		color: Colors.black,
		textTransform: 'uppercase',
	},
	superStyles:{
		fontSize:titleSize,
	},
	RightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
	},
	FlashDealstitlesmall: {
		fontSize: 10,
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
		color: Colors.black,
	},
})