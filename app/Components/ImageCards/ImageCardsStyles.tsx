const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	slide: {
		//flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
	},
	slideImgCont: {
		width: width - 30,
		//margin:5,
		alignItems: 'center',
		//height: (width-30)*0.43,
		backgroundColor: 'transparent',
		//borderRadius:5,
	},
	slideImg: {
		width: width - 30,
		alignItems: 'center',
		height: undefined,
		backgroundColor: 'transparent',
		resizeMode: 'contain',
		borderRadius: 5,
	},
	imgStyles: {
		flex: 1,
		resizeMode: 'contain',
	},
	slideImgBg: {
		width: width - 30,
		alignItems: 'center',
		height: (width - 30) * 0.43,
		backgroundColor: 'transparent',
		borderRadius: 5,
	},
	slideImgBg2: {
		width: width - 30,
		alignItems: 'center',
		height: (width - 30) * 0.43,
		marginTop: -(width / 2.5),
		backgroundColor: 'transparent',
		borderColor: Colors.SILVER,
		borderWidth: 1,
		borderRadius: 5,
	},
	slideImg2: {
		//width: width-30,
		height: 50,
		width: 50,
		alignItems: 'center',
		alignSelf: 'center',
		//height: width/2.5,
		//marginTop: -(width/2.5),
		backgroundColor: 'transparent',
		borderColor: Colors.SILVER,
		borderWidth: 1,
		borderRadius: 5,
	},
	titleTxt: {
		width: width / 4 * 3,
		color: Colors.WHITE,
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
		fontSize: 20,
		lineHeight: 20,
		textTransform: 'uppercase',
	},
	descTxt: {
		width: width / 4 * 3,

		color: Colors.WHITE,
		lineHeight: 16,
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
	btnStyle: {
		marginLeft: 0,
		marginTop: 5,
		borderWidth: 1,
		width: 130,
		height: 35,
		backgroundColor: Colors.WHITE,
	},
	titleStyle: {
		color: Colors.BLACK,
		textTransform: 'none',
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
		fontSize: 11,
		margin: 5,
	},
	maskContainer: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	textContainer: {
		flex: 5,
		backgroundColor: 'transparent',
		padding: 15, alignSelf: 'center',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
})