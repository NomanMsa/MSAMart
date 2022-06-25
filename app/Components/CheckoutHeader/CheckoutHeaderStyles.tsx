const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 headerContainer: {
	//flex:1,
	//height:80,
	alignItems:'center',
	//alignSelf:'center',
	//paddingTop:25,
	//paddingBottom:25,
	flexDirection:'row',
	justifyContent:'center',
	backgroundColor:Colors.WHITE,
	borderBottomWidth:StyleSheet.hairlineWidth,
	borderBottomColor: Colors.LIGHT_GRAY,
  },
  dragonIcon: {
	margin:10,
	alignItems:'center',
	alignSelf:'center',
	resizeMode: 'contain',
	height:undefined,
	width:(width-40)/2,
	aspectRatio: 350/177,
	backgroundColor:'#fff',
  },
  secureIcon: {
	margin:10,
	alignItems:'center',
	alignSelf:'center',
	resizeMode: 'contain',
	height:undefined,
	width:(width-40)/2,
	aspectRatio: 122/46,
	backgroundColor:'#fff',
  },
})