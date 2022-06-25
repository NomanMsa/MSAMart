const React = require('react-native');
const { Dimensions, StyleSheet, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	cardContainer: {
		width: width - 70,
		alignItems: 'center',
		margin: 20,
		padding: 20,
		flexDirection: 'column',
		backgroundColor: Colors.WHITE,
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.GRAY_TEXT,
	},
	cardSelected: {
		borderColor: Colors.PRIMARY,
	},
	cardUnSelected: {
		borderColor: Colors.GRAY_TEXT,
	},
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-start',
	},
	chkBoxOuter: {
		height: 20,
		width: 20,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors.DARK_GRAY_TEXT,
		borderWidth: 1,
	},
	chkBoxInner: {
		height: 15,
		width: 15,
		backgroundColor: Colors.PRIMARY,
		borderRadius: 20,
		borderWidth: 0,
	},
	titleContainer: {
		marginLeft: 10,
	},
	titleText: {
		fontSize: 20,
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
		color: Colors.BLACK,
	},
	titleSelected: {
		color: Colors.PRIMARY,
	},
	titleUnSelected: {
		color: Colors.BLACK,
	},
	addressRow: {
		flexDirection: 'column',
		marginBottom: 20,
		marginTop: 20,
	},
	addressText: {
		fontSize: 13,
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
	buttonRow: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	btnTxt: {
		margin: 5,
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
		color: Colors.GRAY_TEXT,
	},
})