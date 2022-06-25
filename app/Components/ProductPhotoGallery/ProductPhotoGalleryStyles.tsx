const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	contanierView:{
		borderColor:Colors.SILVER,
		borderWidth:StyleSheet.hairlineWidth,
		marginLeft:15,
		marginRight:15,
		borderRadius:5,
		paddingBottom:5,
	},
 wrapper: {
    backgroundColor: 'transparent',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
	borderRadius:5,
  },
  slideImgCont:{
	width: width-30,
	alignItems:'center',
	height: width-30,
	//borderColor:Colors.SILVER,
	//borderWidth:StyleSheet.hairlineWidth,
	//padding:5,
	backgroundColor:'transparent',
	borderRadius:5,
  },
  slideImg:{
	width: width-40,
	alignItems:'center',
	height: width-40,
	resizeMode:'contain',
	backgroundColor:'transparent',
	borderRadius:5,
  },
//   dotStyle:{
// 	alignSelf:'flex-start',
// 	backgroundColor:Colors.WHITE,
// 	width: 7,
// 	height: 7,
// 	borderRadius: 4,
// 	marginLeft: 5,
// 	marginRight: 5,
//   },
//   activeDotStyle:{
// 	alignSelf:'flex-start',
// 	backgroundColor:Colors.MORE_ORANGE,
// 	width: 7,
// 	height: 7,
// 	borderRadius: 4,
// 	marginLeft: 5,
// 	marginRight: 5,
//   },
  paginationStyle: {
	  marginBottom:-25,
	  //width: width-30,
	  //marginLeft:15,
	  //marginTop:20,
  },
  sliderImgStyle: {
	alignItems:'center',
  },
  modalBackdrop:{
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor:Colors.BG_OVERLAY,
  },
  zoomImageContainer:{
	  borderRadius:20,
	  backgroundColor:Colors.WHITE,
	  height: width-20,
	   width: width-20,
	   overflow: 'hidden',

	}, 
	zoomContainer:{
		//borderRadius:20,
		backgroundColor:Colors.WHITE,
		height: width-60,
		width: width-60,
		 overflow: 'hidden',
		 alignSelf: 'center',
  
	  }, 
	zoomImage:{
		height: width-60,
		width: width-60,
		borderRadius:40,
		justifyContent: 'center',
backgroundColor:Colors.WHITE,
flex:1,
padding: 20,
overflow: 'hidden',
resizeMode: 'contain',
alignSelf:'stretch',
aspectRatio: 1,


	  },
	  dotStyle:{
		alignSelf:'flex-start',
		backgroundColor:Colors.SILVER,
		width: 7,
		height: 7,
		borderRadius: 4,
		marginLeft: 3,
		marginRight: 3,
	  },
	  activeDotStyle:{
		alignSelf:'flex-start',
		backgroundColor:Colors.GRAY_TEXT,
		width: 14,
		height: 7,
		borderRadius: 4,
		marginLeft: 3,
		marginRight: 3,
	  },
})