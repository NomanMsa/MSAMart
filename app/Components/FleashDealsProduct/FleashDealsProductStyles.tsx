const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from "@theme";


//var React = require('react-native');

//var {StyleSheet, PixelRatio} = React;

var RESPONSIVE_FONT_LABEL   = 16;

if (PixelRatio.get() <= 2) {
	RESPONSIVE_FONT_LABEL = 14;
}
module.exports = StyleSheet.create({
	productImgBoxContentMargin:{
		margin:13,
		marginTop:5,
		marginBottom:5,
	},
	productImgBoxContent:{
		padding:0,
		margin:3,
		width: (width - 42)/3,
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		flexWrap:'wrap',
		flexDirection: 'row',
	},
	productImgBox:{
		padding:0,
		margin:3,
		width: (width - 42)/3,
		borderWidth:1,
		borderRadius:5,
		borderColor:Colors.LIGHT_GRAY,
		backgroundColor: Colors.WHITE,
		shadowColor: Colors.LIGHT_GRAY,
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
		borderTopLeftRadius:5,
		borderTopRightRadius:5,
		height:undefined,
		aspectRatio:5/4,
		overflow: "hidden",
		borderColor:Colors.LIGHT_GRAY,
		borderWidth:StyleSheet.hairlineWidth,
	},
	priceBox:{
		padding:10,
	},
	FlashDealsPrice:{
		fontSize: RESPONSIVE_FONT_LABEL,
		fontWeight: "800",
		color: Colors.black,
		textTransform:'uppercase',
	},
	FlashDealstitleMainPrice:{
		fontSize: RESPONSIVE_FONT_LABEL,
		fontWeight: '400',
		color: Colors.DARK_GRAY_COLOR,
		textTransform:'uppercase',
		textDecorationLine:'line-through',
		marginBottom:2,
	},
	FlashDealstitleQty:{
		fontSize: RESPONSIVE_FONT_LABEL,
		fontWeight: '400',
		color: Colors.PRIMARY_COLOR,
		marginBottom:5,
	},
	leftLine:{
		width:'80%',
		height:3,
		backgroundColor:Colors.PRIMARY_COLOR,
	},
})