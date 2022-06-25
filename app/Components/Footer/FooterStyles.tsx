const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	footerContainer: {
	},
	listRowBox: {
		borderBottomWidth: 2,
		borderBottomColor: Colors.PRIMARY_BORDER,
		backgroundColor: Colors.PRIMARY,
		width: width,
		padding: 8,
	},
	listRowContainer: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		color: Colors.WHITE,
		justifyContent: 'flex-start',
		margin: 5,
		width: '100%',
		shadowColor: Colors.DARK_GRAY_TEXT,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 5,
	},
	listRowIcon: {
		margin: 5,
		height: 35,
		width: 35,
		resizeMode: 'contain',
		tintColor: Colors.WHITE,
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
	},
	listRowText: {
		marginLeft: 11,
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
		alignSelf: 'center',
		color: Colors.WHITE,
		alignItems: 'flex-start',
	},
	listColBox: {
		//flex:1,
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderBottomColor: Colors.WHITE,
		backgroundColor: Colors.PRIMARY,
	},
	listColContainer: {
		color: Colors.WHITE,
		backgroundColor: Colors.PRIMARY,
	},
	listColIcon: {
		height: 20,
		width: width * 0.25,
		//margin:25,
		marginTop: 25,
		marginBottom: 25,
		resizeMode: 'contain',
		tintColor: Colors.WHITE,
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: Colors.PRIMARY,
	},
	listClearColBox: {
		marginBottom: 8,
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderWidth: 1,
		borderColor: Colors.LIGHT_GRAY,
		paddingBottom: 15,
		paddingTop: 15,
	},
	listClearColContainer: {
		backgroundColor: 'transparent',
	},
	listClearColIcon: {
		height: 35,
		width: 35,
		tintColor: Colors.PRIMARY,
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: Colors.transparent,
	},
	footerLogoStyle: {
		flex: 1,
		margin: 15,
		height: undefined,
		width: width / 2,
		resizeMode: 'contain',
		aspectRatio: 5 / 2,
		//backgroundColor:Colors.MORE_ORANGE,
	},
	menuTextStyle: {
		fontSize: 13,
		margin: 15,
		marginTop: 8,
		marginBottom: 18,
		paddingBottom: 5,
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
		color: Colors.DARK_GRAY_TEXT,
	},
	footerLinksBox: {
		width: width,
		padding: 10,
	},
	footerLinkContainer: {
		width: (width / 2),
	},
	footerLinkText: {
		margin: 9,
		fontSize: 13,
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
	CopyrightStyle: {
		borderTopWidth: 1,
		borderColor: Colors.LIGHT_GRAY,
	}
})