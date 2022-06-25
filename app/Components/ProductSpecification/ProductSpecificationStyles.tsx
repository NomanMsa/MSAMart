const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 descContainer: {
	width:width - 30,
	justifyContent:'center',
	alignSelf:'center',
	borderBottomWidth: StyleSheet.hairlineWidth,
  },
 titleBlock: {
	width:width - 30,
	margin:15,
  marginLeft:0,
  marginTop:0,
  marginBottom:0,
  },
 productTitle: {
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
	color: Colors.BLACK,
  },
 descriptionBlock: {
	width:width - 30,
	margin:15,
	marginLeft:0,
  },
 descPtBlock: {
	width:width - 30,
	margin:15,
	marginLeft:0,
  },
 descriptionText: {
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
	fontWeight:'normal',
	lineHeight:22,
	color: Colors.BLACK,
	textAlign: 'justify'
  },
 descPtBlock: {
	width:width - 30,
	margin:15,
	marginLeft:0,
  },
 pointContainer: {
	 flexDirection:'row',
	 alignItems:'center',
  },
  bullet:{
	  height:6,
	  width:6,
	  backgroundColor: Colors.GRAY_TEXT,
	  borderRadius:8,
	  marginRight:8,
  },
  pointText:{
	margin:5,
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
	color: Colors.BLACK,
  },
})