const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	selectContainer: {
		//marginLeft:15,
		//marginRight:15,
		//width:width -30,
		height: 45,
		//paddingTop:5,
		//paddingBottom:5,
		//paddingBottom:15,
		//borderBottomColor:Colors.SILVER,
		//borderBottomWidth: StyleSheet.hairlineWidth,
	},
	selectBox: {
		flex: 1,
		flexDirection: 'row',
		margin: 5,
		width: width * 0.30,
		height: 35,
		borderRadius: 10,
		borderColor: Colors.DARK_GRAY_TEXT,
		borderWidth: 1,
		justifyContent: 'space-between',
		alignContent: 'center',
	},
	mainTitleStyle: {
		flex: 2,
		fontSize: 15,
		height: 35,
		//margin:5,
		marginTop: 0,
		//marginLeft:0,
		//backgroundColor:Colors.MORE_ORANGE,
		justifyContent: 'center',
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
		alignItems: 'center',
		alignSelf: 'center',
		color: Colors.DARK_GRAY_TEXT,
		textShadowColor: Colors.SILVER,
	},
	mainTitleStyle2: {
		flex: 3,
		fontSize: 15,
		height: 35,
		//margin:1,
		marginTop: 0,
		padding: 0,
		borderColor: Colors.SILVER,
		borderWidth: StyleSheet.hairlineWidth,
		//marginLeft:0,
		//backgroundColor:Colors.MORE_ORANGE,
		justifyContent: 'center',
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
		alignItems: 'center',
		alignSelf: 'center',
		textAlign: 'center',
		color: Colors.DARK_GRAY_TEXT,
		textShadowColor: Colors.SILVER,
	},
	selColTitle: {
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
	plusMinusIcon: {
		//margin:10,
		//padding:10,
		fontSize: 18,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		tintColor: Colors.DARK_GRAY_TEXT,
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
	titleText: {
		margin: 5,
		//marginLeft:30,
		//marginTop:20,
		marginRight: 0,
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
	},
	InStockText: {
		margin: 5,
		marginRight: 0,
		marginTop: 10,
		fontSize: 12,
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
})