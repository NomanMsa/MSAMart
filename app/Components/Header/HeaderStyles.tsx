const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	headerContainer: {
		backgroundColor: Colors.PRIMARY,
		//borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.PRIMARY_BORDER,
		shadowColor: Colors.LIGHT_GRAY,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 3,
	},
	fullRowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		alignSelf: 'flex-start'
	},
	burgerMenuContainer: {
		margin: 10,
		alignItems: 'flex-end',
		alignSelf: 'flex-end'
	},
	burgerMenuIcon: {
		resizeMode: 'contain',
		width: 25,
		height: 25,
		tintColor: Colors.BLACK
	},
	dragonIcon: {
		margin: 5,
		marginLeft: 15,
		resizeMode: 'contain',
		height: undefined, width: 100,
		aspectRatio: 350 / 177,
		//backgroundColor:'#fff',
	},
	rightContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		alignSelf: 'flex-end'
	},
	userContainer: {
		margin: 10,
		alignItems: 'flex-end',
		alignSelf: 'flex-end'
	},
	userIcon: {
		resizeMode: 'contain',
		width: 25,
		height: 25,
		tintColor: Colors.BLACK
	},
	flagContainer: {
		margin: 10,
		alignItems: 'flex-end',
		alignSelf: 'flex-end'
	},
	flagIcon: {
		resizeMode: 'cover',
		width: 25,
		height: 25,
		backgroundColor: 'transparent',
	},
	cartContainer: {
		margin: 10,
		marginLeft: 0,
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	cartIcon: {
		resizeMode: 'contain',
		width: 25,
		height: 25,
		tintColor: Colors.BLACK
	},
	cartCountBox: {
		//height:18, 
		//width:18,
		padding: 2,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 30,
		backgroundColor: Colors.SECONDAY_COLOR,
		alignContent: 'center',
	},
	cartCount: {
		alignItems: 'center',
		alignSelf: 'center',
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
		fontSize: 10
	},
})