const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 menuStyle:{
	marginTop:15,
	//marginBottom:20,
	margin:15,
	marginBottom:10,
	//paddingBottom:30,
	//borderBottomWidth:StyleSheet.hairlineWidth,
	//borderBottomColor:Colors.SILVER,
 },
 listItemContainer:{
	marginLeft:5,
	marginRight:5,
	flexDirection:'column',
	alignItems:'center',
 },
 itemTitleContainerStyle:{
	marginRight:5,
	paddingLeft: 2,
	paddingRight: 2,
	borderRadius:10,
	backgroundColor:Colors.MORE_ORANGE,
 },
 catCircle:{
	width:width/5,
	height:width/5,
	borderRadius:50,
	borderWidth:2,
	borderColor:Colors.PRIMARY,
	alignItems:'center',
	alignSelf:'center',
	justifyContent:'center',
	backgroundColor:Colors.WHITE,
 },
 imgStyles:{
	width:(width/5)-6,
	height:(width/5)-6,
	borderRadius:50,
	borderColor:Colors.PRIMARY,
 },
 menuTextStyle:{
	fontSize:12,
	fontWeight:'normal',
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
    textAlign: 'center',
	alignItems:'center',
	alignSelf:'center',
	letterSpacing: 0,
 },
 textContainer:{
	flexDirection:'row',
	width:width/4.5,
	marginTop:10,
	flexWrap: 'wrap',
    textAlign: 'center',
	alignItems:'center',
	alignSelf:'center',
	justifyContent:'center',
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