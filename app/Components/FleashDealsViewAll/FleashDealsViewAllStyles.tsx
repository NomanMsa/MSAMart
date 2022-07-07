const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from "@theme";

var RESPONSIVE_FONT_LABEL   = 18;
var RESPONSIVE_ICON   = 16;

if (PixelRatio.get() <= 2) {
	RESPONSIVE_FONT_LABEL = 14;
	RESPONSIVE_ICON = 12;
}
module.exports = StyleSheet.create({
	viewMoreSection:{
	//	textAlign:'center',
		width:'100%',
		alignContent: 'center',
		alignItems: 'center',
		padding: 30,
	},
	viewMore:{
		textAlign:'center',
		borderRadius: 30,
		//width:'100%',
	display:'flex',
		flex:1,
	flexDirection:'row',
		justifyContent:'center',
		padding:10,
		borderWidth:1,
		borderColor: Colors.PRIMARY,
		alignItems: 'center',
		alignContent: 'center',
	},
	viewAll:{
		textAlign:'center',
		fontSize: 14,
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
		
	//	height:50,
		marginRight:5,
	},
	viewIcon:{
		width:RESPONSIVE_ICON,
		height:RESPONSIVE_ICON,
		textAlign:'center',
		marginTop:5,
	}
})