const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	container: {
		width: width - 30,
		margin: 10,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	topLeftContainerText: {
		fontSize: 12,
		marginTop: 0,
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
		textTransform: 'uppercase',
		color: Colors.DARK_GRAY_TEXT,
	},
	topLeftContainer:{
		margin:0,
	},
	fullWidthContainer: {
		margin:0,
		marginTop: 2,
	},
	fullWidthContainerText: {
		fontSize: 16,
		textTransform: 'capitalize',
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
		color: Colors.BLACK,
		//textAlign: 'justify'
	},
	bottomRow: {
		width: width - 30,
		//marginTop: 10,
		marginBottom: 6,
		//margin:0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		//backgroundColor:Colors.RED,
	},
	bottomLeftContainer: {
		alignItems: 'flex-start',
		alignSelf: 'flex-start',
	},
	bottomLeftText: {
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
		color: Colors.PRIMARY,
	},
	discountedPriceText: {
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
		color: Colors.GRAY_TEXT,
		textDecorationLine: 'line-through',
	},
	bottomRightContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		alignSelf: 'flex-end',
	},
	bottomRightText: {
		fontSize: 14,
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
		color: Colors.PRIMARY,
		textDecorationLine: 'underline',
	},
})