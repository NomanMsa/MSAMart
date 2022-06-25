const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
	stepContainer: {
	margin:10,
	padding:20,
	flexDirection:'column',
	backgroundColor:Colors.WHITE,
	alignItems:'center',
	borderRadius:10,
	borderWidth:StyleSheet.hairlineWidth,
	borderColor: Colors.LIGHT_GRAY,
  },
  headerCont:{
	flexDirection:'row',
	width:width-60,
	alignItems:'flex-start',
  },
  numContainer:{
	alignItems:'center',
	alignSelf:'flex-start',
	justifyContent:'center',
	height:50,
	width:50,
	borderColor:Colors.BLACK,
	borderWidth:2,
	borderRadius:30,
  },
  numText:{
	fontSize:24,
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
  titleContainer:{
	marginLeft:20,
	alignItems:'flex-start',
	alignSelf:'center',
	justifyContent:'center',
  },
  titleText:{
	fontSize:22,
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
  subtitleText:{
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
	color:Colors.GRAY_TEXT,
  },
})