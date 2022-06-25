const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	cardContainer: {
	width: width-30,
	alignItems:'center',
	alignSelf:'center',
	//padding:15,
	margin:15,
	flexDirection:'column',
	justifyContent:'space-between',
	backgroundColor:Colors.WHITE,
	borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
	borderColor: Colors.GRAY_TEXT,
  },
  orderBlocks:{
	  width: width-30,
	  padding:15,
	  paddingLeft:25,
	  paddingRight:25,
	  alignSelf:'flex-start',
  },
  orderBlockBorder:{
    borderTopWidth:StyleSheet.hairlineWidth,
	borderTopColor: Colors.GRAY_TEXT,
    borderBottomWidth:StyleSheet.hairlineWidth,
	borderBottomColor: Colors.GRAY_TEXT,
  },
  orderHeaderTxt:{
	fontSize:18,
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
  orderHeaderTxtPrimary:{
	  color:Colors.PRIMARY,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  detailBlock: {
	paddingTop:10,
	paddingBottom:10,
    width: '50%' // is 50% of container width
  },
  detailHeaderTxt:{
    ...Platform.select({
      ios: {
      fontWeight: '400',
      fontFamily: 'verdana',
      },
      android: {
      fontWeight: 'bold',
      fontFamily: 'verdana',
      },
    }),
  },
  detailTxt:{
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
  bottomBox:{
	color: Colors.ASH,
	flexDirection:'row',
	borderWidth:1,
	borderColor:Colors.ASH,
	borderRadius:5,
	width:'100%',
	height:80,
  },
  bottomBellImage:{
	height:20,
	width:20,
	resizeMode:'contain',
  },
  bellContainer:{
	width:'25%',
	height:'100%',
	justifyContent:'center',
	alignSelf:'flex-start',
	alignItems:'center',
  },
  btmTxtContainer:{
	padding:10,
	alignItems:'center',
	justifyContent:'center',
	width:'75%',
  },
  multiSellerText:{
	color: Colors.ASH,
	fontSize:13,
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
})