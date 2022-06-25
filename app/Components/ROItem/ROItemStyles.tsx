const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from "@theme";

var RESPONSIVE_FONT_LABEL   = 15;
var RESPONSIVE_FONT_LABELM_P   = 13;
var RESPONSIVE_FONT_DES   = 11;
var RESPONSIVE_IMG   = 200;

if (PixelRatio.get() <= 2) {
	RESPONSIVE_FONT_LABEL = 13;
	var RESPONSIVE_FONT_LABELM_P   = 11;
	var RESPONSIVE_FONT_DES   = 10;
	var RESPONSIVE_IMG   = 150;
}
module.exports = StyleSheet.create({
	productImgBoxContentMargin:{
		paddingLeft:13,
		paddingRight:13,
		marginTop:5,
	},
	priceBoxItem:{
		display: 'flex',
		alignItems: 'stretch',
		flex: 1,
		flexDirection: 'row',
		height:70,
		flexGrow: 1,
		flexShrink: 2,
		flexBasis: 'auto',
	},
	productImgBoxContent:{
		padding:0,
		margin:3,
		width:'100%',
		display: 'flex',
		flex: 1,
		flexWrap:'wrap',
		flexDirection: 'column',
		height:'100%',
		alignItems: 'stretch',
		flexGrow: 2,
		flexShrink: 2,
		flexBasis: 'auto',
	},
	productImgBox:{
		borderWidth:1,
		width:'100%',
		borderRadius:5,
		borderColor:Colors.LIGHT_GRAY,
		padding:0,
		backgroundColor: Colors.WHITE,
		shadowColor: Colors.LIGHT_GRAY,
		alignItems: 'stretch',
		shadowOffset: {
		  width: 0,
		  height: 0.1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 0.1,
		elevation: 0.1,
	},
	productImg:{
		width:'100%',
		height:RESPONSIVE_IMG,
		margin:0,
		padding:0,
		borderColor:Colors.LIGHT_GRAY,
		borderWidth:1,
		alignItems: 'stretch',
	},
	ProductDes:{
		fontSize: RESPONSIVE_FONT_DES,
	},
	priceBox:{
		padding:10,
		display: 'flex',
		flex: 2,
		flexWrap:'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row',
	},
	carBtn:{
		display: 'flex',
		alignItems: 'flex-end',
		flex: 1,
		flexWrap:'wrap',
		flexDirection: 'row-reverse',
	},
	ProductTitle:{
		padding:10,
		paddingBottom:0,
		width: '100%',
	},
	ProductPrice:{
		fontSize: RESPONSIVE_FONT_LABEL,
		fontWeight: "800",
		color: Colors.black,
		textTransform:'uppercase',
	},
	ProductMainPrice:{
		fontSize: RESPONSIVE_FONT_LABELM_P,
		fontWeight: '400',
		color: Colors.DARK_GRAY_COLOR,
		textTransform:'uppercase',
		textDecorationLine:'line-through',
		marginBottom:2,
	},
	productBoxImg:{
		position:'relative',
	},
	ProductDescount:{
		position:'absolute',
		width:34,
		height:34,
		textAlign:'center',
		lineHeight:32,
		fontWeight:'bold',
		borderRadius:100,
		left:5,
		top:5,
		zIndex:999,
		backgroundColor: Colors.SECONDAY_COLOR,
		fontSize:12,
	},
	ProductWish:{
		position:'absolute',
		right:5,
		top:5,
		zIndex:999,
	},
	fireBtnIcon:{
		width:26,
		height:26,
	},
	starYellow:{
		flexDirection: 'row',
	},
	starYellowIcon:{
		width:18,
		height:18,
	},
	starYellowText:{
		fontSize:11,
		paddingLeft:3,
		paddingTop:2,
	},


	itemsContainer:{
		alignSelf:'center',
	},
	itemContainer:{
		marginTop:10,
		width:width-30,
		borderRadius:5,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.GRAY_TEXT,
	},
	itemCountContainer:{
		width:width-30,
		borderBottomWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.GRAY_TEXT,
		alignItems:'center',
	},
	countTextStyle:{
		margin:12,
		fontSize:16,
		/*...Platform.select({
			ios: {
				fontWeight: '800',
				fontFamily: 'verdana',
			},
			android: {
				fontWeight: 'normal',
				fontFamily: 'verdanab',
			},
		}),*/
	},
	detailTextStyle:{
		margin:12,
		fontSize:14,
	},
	unitPriceTitle:{
		margin:12,
		fontSize:16,
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
	unitPriceValue:{
		margin:12,
		fontSize:14,
		color:Colors.GRAY_TEXT,
	},
	itemDetailContainer:{
		width:width-30,
		alignItems:'center',
	},
	itemQuantityContainer:{
		width:width-30,
		borderTopWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.GRAY_TEXT,
		alignItems:'center',
	},
	qtyReturnTextStyle:{
		margin:12,
		fontSize:16,
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
})