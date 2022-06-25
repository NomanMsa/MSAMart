const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	cardContainer: {
	width: width-30,
	alignItems:'center',
	padding:15,
	margin:10,
	flexDirection:'column',
	justifyContent:'space-between',
	backgroundColor:Colors.WHITE,
	borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
	borderColor: Colors.GRAY_TEXT,
  },
  cardSelected:{
	borderColor: Colors.PRIMARY,
  },
  cardUnSelected:{
	borderColor: Colors.GRAY_TEXT,
  },
  titleRow:{
	flexDirection:'row',
	justifyContent:'center',
	alignItems:'center',
	alignSelf:'flex-start',
  },
  chkBoxOuter:{
	  height:25,
	  width:25,
	  borderRadius:25,
	  justifyContent:'center',
	  alignItems:'center',
	  borderColor:Colors.DARK_GRAY_TEXT,
	  borderWidth:1,
  },
  chkBoxOuterSelected:{
	borderColor:Colors.PRIMARY,
  },
  chkBoxInner:{
	height:15,
	width:15,
	backgroundColor:Colors.PRIMARY,
	borderRadius:20,
	borderWidth:0,
  },
  titleContainer:{
	flex:10,
	marginLeft:10,
	alignSelf:'center',
	alignItems:'flex-start',
  },
  titleText:{
	  fontSize:15,
	  ...Platform.select({
		  ios: {
			  fontWeight: '800',
			  fontFamily: 'verdana',
		  },
		  android: {
			  fontWeight: 'bold',
			  fontFamily: 'verdanab',
		  },
	  }),
	  color:Colors.BLACK,
  },
  titleSelected:{
	  color:Colors.PRIMARY,
  },
  titleUnSelected:{
	  color:Colors.BLACK,
  },
  addressContainer:{
	  alignItems:'flex-start',
	  alignSelf:'flex-start',
	  justifyContent:'space-between',
  },
  addressRow:{
	marginLeft:10,
	alignItems:'flex-start',
	alignSelf:'flex-start',
	flexDirection:'column',
	marginBottom:10,
	marginTop:10,
  },
  addressTitleText:{
	  fontSize:14,
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
  addressText:{
	  fontSize:14,
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
  buttonRow:{
	flexDirection:'row',
	alignSelf:'flex-end',
	alignItems:'flex-end',
  },
  btnTxt:{
	  padding:10,
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
	  color:Colors.PRIMARY,
  },
  btnBorder:{
	borderLeftWidth:1,
	borderLeftColor:Colors.GRAY_TEXT,
  },
})