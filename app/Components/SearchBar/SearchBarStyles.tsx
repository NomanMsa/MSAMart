const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
 searchContainer: {
	width:width,
	backgroundColor:Colors.PRIMARY
  },
  searchInputContainer:{
	  margin: 15,
	  borderRadius:50,
	  height:40, 
	  //color:Colors.WHITE,
	  flexDirection:'row',
	  backgroundColor:Colors.WHITE,
	  marginTop:5,
	  marginBottom:10,
	  justifyContent:'center',
	  borderColor:Colors.DARK_GRAY_TEXT,
	  borderWidth:StyleSheet.hairlineWidth,
  },
  inputStyle:{
	  marginLeft:20,
	  alignSelf:'center',
	  alignItems:'flex-start',
	  justifyContent:'center',
	  color:Colors.DARK_GRAY_TEXT,
	  flex:10,
  },
 listColIcon: {
    height:40,
	width:40,
	marginTop:0,
	alignItems:'center',
	alignSelf:'center',
	tintColor:Colors.BLACK,
    //backgroundColor: Colors.PRIMARY,
  },
 searchLeftComponent: {
	width:75, 
	height:40, 
	alignSelf:'flex-end',
	alignItems:'flex-end',
	borderRadius:50, 
	backgroundColor:Colors.MORE_ORANGE, 
	justifyContent:'center',
  },
  textInput: {
	//flex:5,
	alignItems:'center',
	justifyContent:'center',
    color: Colors.DARK_GRAY_TEXT,
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
    fontSize:14,
    ...Platform.select({
      ios: {
        paddingLeft: 16,
      },
      android: {
        paddingLeft: 6,
      },
    }),
  },
})